import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
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
import ArqueorecaudacioncabViewPage from 'pages/arqueorecaudacioncab/View';
import useApp from 'hooks/useApp';
import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';

import useListPage from 'hooks/useListPage';
const ArqueorecaudaciondetListPage = (props) => {
	const app = useApp();
	const [totalImportebs, setTotalImportebs] = useState(0);
	
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
	
	// Calculate the total of arqueodetimportebs where arqueoestado is "L"
	useEffect(() => {
		if (records && records.length > 0) {
			const total = records
				.filter(record => record.arqueoestado === "L")
				.reduce((sum, record) => sum + (parseFloat(record.arqueodetimportebs) || 0), 0);
			setTotalImportebs(total);
		} else {
			setTotalImportebs(0);
		}
	}, [records]);
	
	function ActionButton(data){
		const items = [
		{
			label: "View",
			command: (event) => { app.navigate(`/arqueorecaudaciondet/view/${data.arqueorecdetid}`) },
			icon: "pi pi-eye"
		},
		{
			label: "Edit",
			command: (event) => { app.navigate(`/arqueorecaudaciondet/edit/${data.arqueorecdetid}`) },
			icon: "pi pi-pencil"
		},
		{
			label: "Delete",
			command: (event) => { deleteItem(data.arqueorecdetid) },
			icon: "pi pi-trash"
		}
	]
		return (<SplitButton dropdownIcon="pi pi-bars" className="dropdown-only p-button-text p-button-plain" model={items} />);
	}
	function ArqueorecdetidTemplate(data){
		if(data){
			return (
				<Link to={`/arqueorecaudaciondet/view/${data.arqueorecdetid}`}> { data.arqueorecdetid }</Link>
			);
		}
	}
	function ArqueorecidTemplate(data){
		if(data){
			return (
				<>{data.arqueorecid && <Button className="p-button-text" icon="pi pi-eye" label="Arqueorecaudacioncab" onClick={() => app.openPageDialog(<ArqueorecaudacioncabViewPage isSubPage apiPath={`/arqueorecaudacioncab/view/${data.arqueorecid}`} />, {closeBtn: true })} /> }</>
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
		if (selectedItems.length) {
			return (
				<div className="m-2 flex-grow-0">
					<Button onClick={() => deleteItem(selectedItems)} icon="pi pi-trash" className="p-button-danger" title="Eliminar seleccionado"/>
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
	return (
<main id="ArqueorecaudaciondetListPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title="Arqueorecaudaciondet"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
				<div className="col-12 md:col-3 " >
					<Card className="p-2 border-1 border-primary">
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-money-bill text-primary mr-2" style={{fontSize: '1.2rem'}}></i>
                                <span className="font-bold mr-2">Total (Estado "L"):</span>
                                <span className="font-bold text-primary text-xl">{totalImportebs.toFixed(2)} Bs</span>
                            </div>
                    </Card>
                </div>
                <div className="col-fixed " >

                    <div className="flex flex-column">
                        <Link to={`/arqueorecaudaciondet/add`}>
                            <Button label="Agregar nuevo" icon="pi pi-plus" type="button" className="p-button w-full bg-primary mb-2"  />
                        </Link>

                    </div>
                </div>
                <div className="col-12 md:col-3 " >
                    <span className="p-input-icon-left w-full">
                        <i className="pi pi-search" />
                        <InputText placeholder="Buscar" className="w-full" value={filters.search.value}  onChange={(e) => setFilterValue('search', e.target.value)} />
                    </span>
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container-fluid">
            <div className="grid ">
                <div className="col comp-grid" >
                    <FilterTags filterController={filterController} />
                    <div >
                        <PageBreadcrumbs />
                        <div className="page-records">
                            <DataTable 
                                lazy={true} 
                                loading={loading} 
                                selectionMode="checkbox" selection={selectedItems} onSelectionChange={e => setSelectedItems(e.value)}
                                value={records} 
                                dataKey="arqueorecdetid" 
                                sortField={sortBy} 
                                sortOrder={sortOrder} 
                                onSort={onSort}
                                className=" p-datatable-sm" 
                                stripedRows={true}
                                showGridlines={false} 
                                rowHover={true} 
                                responsiveLayout="stack" 
                                emptyMessage={<EmptyRecordMessage />} 
                                >
                                {/*PageComponentStart*/}
                                <Column selectionMode="multiple" headerStyle={{width: '2rem'}}></Column>
                                <Column  field="arqueorecdetid" header="Arqueorecdetid" body={ArqueorecdetidTemplate}  ></Column>
                                <Column  field="arqueorecid" header="Arqueorecid" body={ArqueorecidTemplate}  ></Column>
                                <Column  field="servicio_id" header="Servicio Id"   ></Column>
                                <Column  field="arqueodetcantidad" header="Arqueodetcantidad"   ></Column>
                                <Column  field="arqueodettarifabs" header="Arqueodettarifabs"   ></Column>
                                <Column  field="arqueodetimportebs" header="Arqueodetimportebs"   ></Column>
                                <Column  field="arqueoestado" header="Arqueoestado"   ></Column>
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
ArqueorecaudaciondetListPage.defaultProps = {
	primaryKey: 'arqueorecdetid',
	pageName: 'arqueorecaudaciondet',
	apiPath: 'arqueorecaudaciondet/index',
	routeName: 'arqueorecaudaciondetlist',
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
export default ArqueorecaudaciondetListPage;