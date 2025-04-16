import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { CellEditor } from 'components/CellEditor';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FilterTags } from 'components/FilterTags';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { PageRequestError } from 'components/PageRequestError';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SplitButton } from 'primereact/splitbutton';
import { Title } from 'components/Title';
import { Toast } from 'primereact/toast';
import { useRef, useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import useApi from 'hooks/useApi';
import useApp from 'hooks/useApp';

import useListPage from 'hooks/useListPage';
const ActaentregadetListPage = (props) => {
	const app = useApp();
	const api = useApi();
	const toast = useRef(null);
	const dt = useRef(null); // Reference to the DataTable component
	const [rowStyles, setRowStyles] = useState({});
	const [totalImporteBs, setTotalImporteBs] = useState(0);
	
	const filterSchema = {
		search: {
			tagTitle: "Search",
			value: '',
			valueType: 'single',
			options: [],
		}
	}
	const pageController = useListPage(props, filterSchema);
	const filterController = pageController.filterController;
	const { records, pageReady, loading, selectedItems, sortBy, sortOrder, apiRequestError, setSelectedItems, getPageBreadCrumbs, onSort, deleteItem, pagination } = pageController;
	const { filters, setFilterValue } = filterController;
	const { totalRecords, totalPages, recordsPosition, firstRow, limit, onPageChange } =  pagination;
	
	// Initialize row styles based on estado values when records change
	useEffect(() => {
		if (records && records.length > 0) {
			const newRowStyles = {};
			records.forEach(record => {
				if (record.aed_estado === 'L') {
					newRowStyles[record.aed_actaid] = 'bg-green-100';
				} else if (record.aed_estado === 'C') {
					newRowStyles[record.aed_actaid] = 'bg-gray-200 opacity-80'; // Style for read-only rows
				}
			});
			setRowStyles(newRowStyles);
		}
	}, [records]);
	
	// Calculate sum of aed_importebs for records with estado "L"
	useEffect(() => {
		if (records && records.length > 0) {
			// Calculate sum of aed_importebs for records with aed_estado === 'L'
			const sum = records
				.filter(record => record.aed_estado === 'L')
				.reduce((total, record) => total + Number(record.aed_importebs || 0), 0);
			
			setTotalImporteBs(sum);
		} else {
			setTotalImporteBs(0);
		}
	}, [records]);
	
	// Check if row is editable (not in state "C")
	const isRowEditable = (rowData) => {
		return rowData.aed_estado !== 'C';
	};
	
	// Function to focus on next row after editing
	const focusNextRow = (rowIndex, field) => {
		if (dt.current && rowIndex < records.length - 1) {
			// Check if the next row is editable
			const nextRowData = records[rowIndex + 1];
			if (!isRowEditable(nextRowData)) {
				// If next row is not editable, find the first editable row after it
				for (let i = rowIndex + 2; i < records.length; i++) {
					if (isRowEditable(records[i])) {
						setTimeout(() => {
							dt.current.editRows([{ rowIndex: i, field }]);
						}, 100);
						return;
					}
				}
				return; // No editable rows found after this one
			}
			
			setTimeout(() => {
				const nextRowIdx = rowIndex + 1;
				dt.current.editRows([{ rowIndex: nextRowIdx, field }]);
			}, 100);
		}
	};
	
	function ActionButton(data){
		// If row is not editable (estado = "C"), return empty cell
		if (!isRowEditable(data)) {
			return null;
		}
		
		const items = [
		{
			label: "View",
			command: (event) => { app.navigate(`/actaentregadet/view/${data.aed_actaid}`) },
			icon: "pi pi-eye"
		},
		{
			label: "Edit",
			command: (event) => { app.navigate(`/actaentregadet/edit/${data.aed_actaid}`) },
			icon: "pi pi-pencil"
		},
		{
			label: "Delete",
			command: (event) => { deleteItem(data.aed_actaid) },
			icon: "pi pi-trash"
		}
	]
		return (<SplitButton dropdownIcon="pi pi-bars" className="dropdown-only p-button-text p-button-plain" model={items} />);
	}
	
	async function onCellEditComplete(e) {
		const { rowData: data, newValue, field, originalEvent: event, rowIndex } = e;
		
		// Check if row is editable
		if (!isRowEditable(data)) {
			toast.current.show({
				severity: 'warn', 
				summary: 'Fila bloqueada', 
				detail: 'No se puede editar una fila ya Liquidado en estado "C"', 
				life: 3000
			});
			return;
		}
		
		if (field === 'aed_cantidad') {
			// Validate: Cantidad should be within the valid range
			const cantidad = Number(newValue);
			const hastaNumero = Number(data.aed_hastanumero);
			const desdeNumero = Number(data.aed_desdenumero);
			const maxPosible = hastaNumero - desdeNumero + 1;
			
			if (cantidad <= 0 || cantidad > maxPosible) {
				toast.current.show({
					severity: 'error', 
					summary: 'Error de validación', 
					detail: `La cantidad debe ser mayor a 0 y no mayor a ${maxPosible}`, 
					life: 3000
				});
				return;
			}
			
			try {
				// Calculate new values
				const vendidoHasta = desdeNumero + cantidad - 1;
				const precioUnitario = Number(data.aed_preciounitario);
				const importebs = cantidad * precioUnitario;
				
				// Update local data
				data[field] = cantidad;
				data.aed_vendidohasta = vendidoHasta;
				data.aed_importebs = importebs;
				data.aed_estado = "L"; // Set estado to "L"
				
				// Prepare payload for API update
				const payload = {
					[field]: cantidad,
					aed_vendidohasta: vendidoHasta,
					aed_importebs: importebs,
					aed_estado: "L" // Add estado to payload
				};
				
				const url = `actaentregadet/edit/${data.aed_actaid}`;
				await api.post(url, payload);
				
				// Focus on the same field in the next row
				focusNextRow(rowIndex, field);
				
				// Apply green background to the row since the estado is now "L"
				setRowStyles(prev => ({
					...prev,
					[data.aed_actaid]: 'bg-green-100'
				}));
				
				// Recalculate total import amount immediately after cell edit
				const updatedRecords = [...records];
				updatedRecords[rowIndex] = { ...data }; // Update the specific record
				
				// Calculate new total
				const newTotalImporteBs = updatedRecords
					.filter(record => record.aed_estado === 'L')
					.reduce((total, record) => total + Number(record.aed_importebs || 0), 0);
				
				// Update the total
				setTotalImporteBs(newTotalImporteBs);
				
			} catch(err) {
				const msg = err?.request?.response || "No se pudo completar la solicitud";
				toast.current.show({
					severity: 'error',
					summary: 'Error de actualización',
					detail: msg,
					life: 3000
				});
				console.error(err);
			}
		}
	}
	
	// Function to handle checkbox click
	const handleCheckboxChange = async (e, rowData, rowIndex) => {
		// Check if row is editable
		if (!isRowEditable(rowData)) {
			toast.current.show({
				severity: 'warn', 
				summary: 'Fila bloqueada', 
				detail: 'No se puede modificar una fila en estado "C"', 
				life: 3000
			});
			return;
		}
		
		const isChecked = e.checked;
		
		if (isChecked) {
			const hastaNumero = Number(rowData.aed_hastanumero);
			const desdeNumero = Number(rowData.aed_desdenumero);
			const maxCantidad = hastaNumero - desdeNumero + 1;
			
			// Create a synthetic event for onCellEditComplete
			const syntheticEvent = {
				rowData: rowData,
				newValue: maxCantidad,
				field: 'aed_cantidad',
				rowIndex: rowIndex
			};
			
			// Call the edit complete function
			await onCellEditComplete(syntheticEvent);
		}
	};
	
	// Checkbox template
	function AutofillCheckboxTemplate(rowData, options) {
		// Calculate max possible quantity
		const hastaNumero = Number(rowData.aed_hastanumero);
		const desdeNumero = Number(rowData.aed_desdenumero);
		const maxCantidad = hastaNumero - desdeNumero + 1;
		
		// If row is not editable, show disabled checkbox
		if (!isRowEditable(rowData)) {
			return (
				<Checkbox 
					disabled={true}
					checked={Number(rowData.aed_cantidad) === maxCantidad}
				/>
			);
		}
		
		return (
			<Checkbox 
				onChange={(e) => handleCheckboxChange(e, rowData, options.rowIndex)} 
				checked={Number(rowData.aed_cantidad) === maxCantidad}
			/>
		);
	}
	
	function AedActaidTemplate(data){
		if(data){
			return (
				<Link to={`/actaentregadet/view/${data.aed_actaid}`}> { data.aed_actaid }</Link>
			);
		}
	}
	
	function ServicioAbreviaturaTemplate(data){
		if(data){
			return (
				<span className="table-inlined-edit">{ data.servicio.servicio_abreviatura }</span>
			);
		}
	}
	
	function ServicioDescripcionTemplate(data){
		if(data){
			return (
				<span className="table-inlined-edit">{ data.servicio.servicio_descripcion }</span>
			);
		}
	}
	
	function AedDesdenumeroTemplate(data){
		if(data){
			return (
				<span className="table-inlined-edit">{ data.aed_desdenumero }</span>
			);
		}
	}
	
	function AedHastanumeroTemplate(data){
		if(data){
			return (
				<span className="table-inlined-edit">{ data.aed_hastanumero }</span>
			);
		}
	}
	
	function AedVendidohastaTemplate(data){
		if(data){
			return (
				<span className="table-inlined-edit">{ data.aed_vendidohasta }</span>
			);
		}
	}
	
	function AedCantidadTemplate(data){
		if(data){
			return (
				<span className="table-inlined-edit">{ data.aed_cantidad }</span>
			);
		}
	}
	
	function AedPreciounitarioTemplate(data){
		if(data){
			return (
				<span className="table-inlined-edit">{ data.aed_preciounitario }</span>
			);
		}
	}
	
	function AedImportebsTemplate(data){
		if(data){
			return (
				<span className="table-inlined-edit">{ data.aed_importebs }</span>
			);
		}
	}
	
	function AedEstadoTemplate(data){
		if(data){
			// Apply styling to the estado cell based on the value
			let className = 'table-inlined-edit';
			
			if (data.aed_estado === 'L') {
				className += ' font-bold text-green-600';
			} else if (data.aed_estado === 'C') {
				className += ' font-bold text-blue-600';
			}
			
			return (
				<span className={className}>{ data.aed_estado }</span>
			);
		}
	}
	
	function PageLoading(){
		if(loading){
			return (
				<>
					<div className="flex align-items-center justify-content-center text-gray-500 p-3">
						<div><ProgressSpinner style={{width:'30px', height:'30px'}} /> </div>
						<div  className="font-bold text-lg">Cargando...</div>
					</div>
				</>
			);
		}
	}
	
	function EmptyRecordMessage(){
		if(pageReady && !records.length){
			return (
				<div className="text-lg mt-3 p-3 text-center text-400 font-bold">
					ningún record fue encontrado
				</div>
			);
		}
	}
	
	function MultiDelete() {
		// Filter out non-editable items from selectedItems before showing delete button
		const editableSelectedItems = selectedItems.filter(item => {
			const record = records.find(r => r.aed_actaid === item);
			return record && isRowEditable(record);
		});
		
		if (editableSelectedItems.length) {
			return (
				<div className="m-2 flex-grow-0">
					<Button onClick={() => deleteItem(editableSelectedItems)} icon="pi pi-trash" className="p-button-danger" title="Eliminar seleccionado"/>
				</div>
			)
		}
	}
	
	function PagerControl() {
		if (props.paginate && totalPages > 1) {
		const pagerReportTemplate = {
			layout: pagination.layout,
			CurrentPageReport: (options) => {
				return (
					<>
						<span className="text-sm text-gray-500 px-2">Archivos <b>{ recordsPosition } de { options.totalRecords }</b></span>
					</>
				);
			}
		}
		return (
			<div className="flex-grow-1">
				<Paginator first={firstRow} rows={limit} totalRecords={totalRecords}  onPageChange={onPageChange} template={pagerReportTemplate} />
			</div>
		)
		}
	}
	
	function PageActionButtons() {
		return (
			<div className="flex flex-wrap">
				<MultiDelete />
			</div>
		);
	}
	
	function PageFooter() {
		if (pageReady && props.showFooter) {
			return (
				<div className="flex flex-wrap">
					<PageActionButtons />
					<PagerControl />
				</div>
			);
		}
	}
	
	function PageBreadcrumbs(){
		if(props.showBreadcrumbs) {
			const items = getPageBreadCrumbs();
			return (items.length > 0 && <BreadCrumb className="mb-3" model={items} />);
		}
	}
	
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	
	// Keyboard handler for navigating to next row
	const handleKeyDown = (e, rowIndex, field) => {
		if (e.key === 'Enter' || e.key === 'Tab') {
			e.preventDefault();
			focusNextRow(rowIndex, field);
		}
	};
	
	// Custom CellEditor for aed_cantidad
	const CantidadEditor = (options) => {
		// Check if the current row is editable
		const rowData = records[options.rowIndex];
		if (!isRowEditable(rowData)) {
			return <span>{options.value}</span>; // Non-editable display
		}
		
		return (
			<CellEditor 
				options={options} 
				type="number" 
				style={{ backgroundColor: '#f0f0f0' }}
				onKeyDown={(e) => handleKeyDown(e, options.rowIndex, options.field)}
			/>
		);
	};
	
	// Custom row styling
	const rowClassName = (data) => {
		return rowStyles[data.aed_actaid] || '';
	};
	
	// DataTable row selection function - prevent selecting rows with estado "C"
	const onRowSelectionChange = (e) => {
		const newSelection = e.value;
		
		// Filter out non-editable items
		const filteredSelection = newSelection.filter(item => {
			const record = records.find(r => r.aed_actaid === item);
			return record && isRowEditable(record);
		});
		
		setSelectedItems(filteredSelection);
		
		// Show a message if some items were filtered out
		if (newSelection.length !== filteredSelection.length) {
			toast.current.show({
				severity: 'info', 
				summary: 'Selección limitada', 
				detail: 'No se pueden seleccionar filas en estado "C"', 
				life: 3000
			});
		}
	};
	
	return (
		<main id="ActaentregadetListPage" className="main-page">
			<Toast ref={toast} />
			{ (props.showHeader) && 
			<section className="page-section mb-3" >
				<div className="container-fluid">
					<div className="grid justify-content-between align-items-center">
						<div className="col" >
							<Title title="Detalle" titleClass="text-2xl text-primary font-bold" subTitleClass="text-500" separator={false} />
						</div>
						<div className="col" >
							<div className="text-right">
								<span className="font-bold mr-2">Total Liquidado (Bs):</span>
								<span className="text-xl text-green-600 font-bold">{totalImporteBs.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
							</div>
						</div>
						<div className="col-fixed" >
							<Link to={`/actaentregadet/add`}>
								<Button label="Agregar nuevo" icon="pi pi-plus" type="button" className="p-button w-full bg-primary" />
							</Link>
						</div>
						<div className="col-12 md:col-3" >
							<span className="p-input-icon-left w-full">
								<i className="pi pi-search" />
								<InputText placeholder="Buscar" className="w-full" value={filters.search.value} onChange={(e) => setFilterValue('search', e.target.value)} />
							</span>
						</div>
					</div>
				</div>
			</section>
			}
			<section className="page-section" >
				<div className="container-fluid">
					<div className="grid">
						<div className="col comp-grid" >
							<FilterTags filterController={filterController} />
							<div>
								<PageBreadcrumbs />
								<div className="page-records">
									<DataTable 
										ref={dt}
										lazy={true} 
										loading={loading} 
										editMode="cell" 
										selectionMode="checkbox" 
										selection={selectedItems} 
										onSelectionChange={onRowSelectionChange}
										value={records} 
										dataKey="aed_actaid" 
										sortField={sortBy} 
										sortOrder={sortOrder} 
										onSort={onSort}
										className="editable-cells-table p-datatable-sm compact-table" 
										stripedRows={true}
										showGridlines={false} 
										rowHover={true}
										rowClassName={rowClassName}
										responsiveLayout="stack" 
										emptyMessage={<EmptyRecordMessage />} 
									>
										{/*PageComponentStart*/}
										<Column selectionMode="multiple" headerStyle={{width: '2rem'}}></Column>
										<Column field="aed_actaid" header="Actaid" body={AedActaidTemplate}></Column>
										<Column field="servicio.servicio_abreviatura" header="Abreviatura" body={ServicioAbreviaturaTemplate}></Column>
										<Column field="servicio.servicio_descripcion" header="Descripcion" body={ServicioDescripcionTemplate}></Column>
										<Column field="aed_desdenumero" header="Desde Numero" body={AedDesdenumeroTemplate}></Column>
										<Column field="aed_hastanumero" header="Hasta Numero" body={AedHastanumeroTemplate}></Column>
										
										<Column 
											field="autofill" 
											header="Máxima" 
											body={(rowData, options) => AutofillCheckboxTemplate(rowData, options)} 
											style={{width: '5rem'}}
											className="text-center"
										></Column>
										
										<Column 
											field="aed_cantidad" 
											header="Cantidad" 
											body={AedCantidadTemplate} 
											onCellEditComplete={onCellEditComplete} 
											editor={(options) => CantidadEditor(options)}
											className="bg-gray-100" // Applying light gray background to the column
										></Column>
										
										<Column field="aed_vendidohasta" header="Vendido Hasta" body={AedVendidohastaTemplate}></Column>
										<Column field="aed_preciounitario" header="Precio Unitario" body={AedPreciounitarioTemplate}></Column>
										<Column field="aed_importebs" header="Importe Bs" body={AedImportebsTemplate}></Column>
										<Column field="aed_estado" header="Estado" body={AedEstadoTemplate}></Column>
										<Column headerStyle={{width: '2rem'}} headerClass="text-center" body={ActionButton}></Column>
										{/*PageComponentEnd*/}
									</DataTable>
								</div>
								<PageFooter />
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

ActaentregadetListPage.defaultProps = {
	primaryKey: 'aed_actaid',
	pageName: 'actaentregadet',
	apiPath: 'actaentregadet/index',
	routeName: 'actaentregadetlist',
	msgBeforeDelete: "¿Seguro que quieres borrar este registro?",
	msgTitle: "Eliminar el registro",
	msgAfterDelete: "Grabar eliminado con éxito",
	showHeader: true,
	showFooter: true,
	paginate: true,
	isSubPage: false,
	showBreadcrumbs: true,
	exportData: false,
	importData: false,
	keepRecords: false,
	multiCheckbox: true,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
	pageNo: 1,
	limit: 10,
}

export default ActaentregadetListPage;