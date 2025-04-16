import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import TblfacturasEditPage from 'pages/tblfacturas/Edit';
import useApp from 'hooks/useApp';

import useViewPage from 'hooks/useViewPage';
import MasterDetailPages from './MasterDetailPages';
const TblfacturasViewPage = (props) => {
		const app = useApp();
	const pageController = useViewPage(props);
	const { item, currentRecord, pageReady, loading, apiRequestError, deleteItem } = pageController;
	function ActionButton(data){
		const items = [
		{
			label: "Edit",
			command: (event) => { app.openPageDialog(<TblfacturasEditPage isSubPage apiPath={`/tblfacturas/edit/${data.factura_id}`} />, {closeBtn: true }) },
			icon: "pi pi-pencil"
		},
		{
			label: "Delete",
			command: (event) => { deleteItem(data.factura_id) },
			icon: "pi pi-trash"
		}
	]
		return (<Menubar className="p-0 " model={items} />);
	}
	function PageFooter() {
		if (props.showFooter) {
			return (
				<div className="flex justify-content-between">
	<div className="flex justify-content-start">
	{ActionButton(item)}
	</div>
				</div>
			);
		}
	}
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	if(pageReady){
		return (
			<div>
<main id="TblfacturasViewPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label=""  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className="col " >
                    <Title title="Ver"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="col comp-grid" >
                    <div >
                        <div className="grid ">
                            <div className="col">
                                {/*PageComponentStart*/}
                                <div className="mb-3 grid ">
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Factura Id</div>
                                                <div className="font-bold">{ item.factura_id }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">N</div>
                                                <div className="font-bold">{ item.n }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Fecha De La Factura</div>
                                                <div className="font-bold">{ item.fecha_de_la_factura }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">N De La Factura</div>
                                                <div className="font-bold">{ item.n_de_la_factura }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Codigo De Autorizacion</div>
                                                <div className="font-bold">{ item.codigo_de_autorizacion }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Nit Ci Cliente</div>
                                                <div className="font-bold">{ item.nit_ci_cliente }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Complemento</div>
                                                <div className="font-bold">{ item.complemento }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Nombre O Razon Social</div>
                                                <div className="font-bold">{ item.nombre_o_razon_social }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Importe Total De La Venta</div>
                                                <div className="font-bold">{ item.importe_total_de_la_venta }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Importe Ice</div>
                                                <div className="font-bold">{ item.importe_ice }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Importe Iehd</div>
                                                <div className="font-bold">{ item.importe_iehd }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Importe Ipj</div>
                                                <div className="font-bold">{ item.importe_ipj }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Tasas</div>
                                                <div className="font-bold">{ item.tasas }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Otros No Sujetos Al Iva</div>
                                                <div className="font-bold">{ item.otros_no_sujetos_al_iva }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Exportaciones Y Operaciones Exentas</div>
                                                <div className="font-bold">{ item.exportaciones_y_operaciones_exentas }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Ventas Gravadas A Tasa Cero</div>
                                                <div className="font-bold">{ item.ventas_gravadas_a_tasa_cero }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Subtotal</div>
                                                <div className="font-bold">{ item.subtotal }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Descuentos Bonificaciones Y Rebajas Sujetas Al Iva</div>
                                                <div className="font-bold">{ item.descuentos_bonificaciones_y_rebajas_sujetas_al_iva }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Importe Gift Card</div>
                                                <div className="font-bold">{ item.importe_gift_card }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Importe Base Para Debito Fiscal</div>
                                                <div className="font-bold">{ item.importe_base_para_debito_fiscal }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Debito Fiscal</div>
                                                <div className="font-bold">{ item.debito_fiscal }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Estado</div>
                                                <div className="font-bold">{ item.estado }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Codigo De Control</div>
                                                <div className="font-bold">{ item.codigo_de_control }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Tipo De Venta</div>
                                                <div className="font-bold">{ item.tipo_de_venta }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Con Derecho A Credito Fiscal</div>
                                                <div className="font-bold">{ item.con_derecho_a_credito_fiscal }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Estado Consolidacion</div>
                                                <div className="font-bold">{ item.estado_consolidacion }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Fecha Registro</div>
                                                <div className="font-bold">{ item.fecha_registro }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">Factura Estado</div>
                                                <div className="font-bold">{ item.factura_estado }</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*PageComponentEnd*/}
                            </div>
                            {
                            (currentRecord && !props.isSubPage) && 
                            <div className="col-12">
                                <div className="card my-3 p-1">
                                    <MasterDetailPages masterRecord={currentRecord} scrollIntoView={false} />
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
				<PageFooter />
			</div>
		);
	}
}
TblfacturasViewPage.defaultProps = {
	id: null,
	primaryKey: 'factura_id',
	pageName: 'tblfacturas',
	apiPath: 'tblfacturas/view',
	routeName: 'tblfacturasview',
	msgBeforeDelete: "¿Seguro que quieres borrar este registro?",
	msgTitle: "Eliminar el registro",
	msgAfterDelete: "Grabar eliminado con éxito",
	showHeader: true,
	showFooter: true,
	exportButton: true,
	isSubPage: false,
}
export default TblfacturasViewPage;
