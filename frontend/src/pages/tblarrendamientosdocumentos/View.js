import { Button } from 'primereact/button';
import { ImageViewer } from 'components/ImageViewer';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import TblarrendamientosdocumentosEditPage from 'pages/tblarrendamientosdocumentos/Edit';
import useApp from 'hooks/useApp';

import useViewPage from 'hooks/useViewPage';
const TblarrendamientosdocumentosViewPage = (props) => {
    const app = useApp();
    const pageController = useViewPage(props);
    const { item, pageReady, loading, apiRequestError, deleteItem } = pageController;
    
    // Helper functions para determinar el tipo de archivo
    const isImageFile = (filePath) => {
        if (!filePath) return false;
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
        return imageExtensions.some(ext => filePath.toLowerCase().endsWith(ext));
    };
    
    const isPdfFile = (filePath) => {
        if (!filePath) return false;
        return filePath.toLowerCase().endsWith('.pdf');
    };
    
    const getFileType = (filePath) => {
        if (isImageFile(filePath)) return 'image';
        if (isPdfFile(filePath)) return 'pdf';
        return 'other';
    };
    
    function renderFilePreview(fileUrl) {
        const fileType = getFileType(fileUrl);
        
        if (!fileUrl) return null;
        
        if (fileType === 'image') {
            return (
                <div className="mt-3">
                    <ImageViewer 
                        className="border-round" 
                        style={{maxWidth: '100%', maxHeight: '100px'}} 
                        width="auto" 
                        height="auto" 
                        imageSize="medium" 
                        src={fileUrl} 
                    />
                </div>
            );
        } else if (fileType === 'pdf') {
            return (
                <div className="mt-3">
                    <div className="pdf-viewer-container" style={{ width: '100%', height: '500px', position: 'relative' }}>
                        {/* Usar iframe como visualizador principal de PDF */}
                        <iframe
                            src={fileUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            title="PDF Viewer"
                            className="border-round"
                        ></iframe>
                        
                        {/* Control de acciones para el PDF */}
                        <div className="pdf-controls" style={{ 
                            position: 'absolute', 
                            top: '10px', 
                            right: '10px', 
                            zIndex: 10 
                        }}>
                            <Button
                                icon="pi pi-external-link"
                                className="p-button-rounded p-button-info p-button-outlined"
                                tooltip="Abrir en nueva ventana"
                                onClick={() => window.open(fileUrl, '_blank')}
                            />
                            <Button
                                icon="pi pi-download"
                                className="p-button-rounded p-button-success p-button-outlined ml-2"
                                tooltip="Descargar PDF"
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = fileUrl;
                                    link.download = fileUrl.split('/').pop();
                                    link.click();
                                }}
                            />
                        </div>
                        
                        {/* Mensaje de fallback en caso de que el navegador no soporte iframe para PDF */}
                        <div className="pdf-fallback" style={{ 
                            position: 'absolute', 
                            bottom: '10px', 
                            left: '50%', 
                            transform: 'translateX(-50%)',
                            background: 'rgba(255,255,255,0.8)', 
                            padding: '10px', 
                            borderRadius: '4px',
                            display: 'none' 
                        }}>
                            <p className="m-0">Si no puedes ver el PDF, puedes descargarlo directamente</p>
                        </div>
                    </div>
                    
                    {/* Vista alternativa para dispositivos móviles o si el iframe falla */}
                    <div className="pdf-mobile-view mt-2">
                        <Button
                            label="Abrir PDF en nueva ventana"
                            icon="pi pi-external-link"
                            className="p-button-outlined"
                            onClick={() => window.open(fileUrl, '_blank')}
                        />
                        <Button
                            label="Descargar PDF"
                            icon="pi pi-download"
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = fileUrl;
                                link.download = fileUrl.split('/').pop();
                                link.click();
                            }}
                            className="p-button-outlined ml-2"
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="mt-3">
                    <div className="p-3 surface-200 border-round">
                        <div className="flex align-items-center">
                            <i className="pi pi-file mr-2 text-2xl"></i>
                            <span>El archivo no se puede previsualizar.</span>
                        </div>
                        <Button 
                            label="Descargar archivo" 
                            icon="pi pi-download" 
                            className="p-button-outlined mt-2"
                            onClick={() => window.open(fileUrl, '_blank')}
                        />
                    </div>
                </div>
            );
        }
    }
    
    function ActionButton(data){
        const items = [
            {
                label: "Edit",
                command: (event) => { app.openPageDialog(<TblarrendamientosdocumentosEditPage isSubPage apiPath={`/tblarrendamientosdocumentos/edit/${data.documento_id}`} />, {closeBtn: true }) },
                icon: "pi pi-pencil"
            },
            {
                label: "Delete",
                command: (event) => { deleteItem(data.documento_id) },
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
                <main id="TblarrendamientosdocumentosViewPage" className="main-page">
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
                                        {/*PageComponentStart*/}
                                        <div className="mb-3 grid ">
                                            <div className="col-12 md:col-4">
                                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div className="">
                                                        <div className="text-400 font-medium mb-1">Documento Id</div>
                                                        <div className="font-bold">{ item.documento_id }</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 md:col-4">
                                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div className="">
                                                        <div className="text-400 font-medium mb-1">Arrendamiento Id</div>
                                                        <div className="font-bold">{ item.arrendamiento_id }</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 md:col-4">
                                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div className="">
                                                        <div className="text-400 font-medium mb-1">Documento Tipo</div>
                                                        <div className="font-bold">{ item.documento_tipo }</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 md:col-4">
                                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div className="">
                                                        <div className="text-400 font-medium mb-1">Documento Nombre</div>
                                                        <div className="font-bold">{ item.documento_nombre }</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="card shadow-none p-3 surface-100">
                                                    <div className="text-400 font-medium mb-1">Documento</div>
                                                    <div className="font-bold mb-2">{ item.documento_url }</div>
                                                    {/* Mostrar el visualizador de archivo */}
                                                    { renderFilePreview(item.documento_url) }
                                                </div>
                                            </div>
                                            <div className="col-12 md:col-4">
                                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div className="">
                                                        <div className="text-400 font-medium mb-1">Documento Descripcion</div>
                                                        <div className="font-bold">{ item.documento_descripcion }</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 md:col-4">
                                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div className="">
                                                        <div className="text-400 font-medium mb-1">Fecha Subida</div>
                                                        <div className="font-bold">{ item.fecha_subida }</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 md:col-4">
                                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div className="">
                                                        <div className="text-400 font-medium mb-1">Documento Estado</div>
                                                        <div className="font-bold">{ item.documento_estado }</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*PageComponentEnd*/}
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
TblarrendamientosdocumentosViewPage.defaultProps = {
    id: null,
    primaryKey: 'documento_id',
    pageName: 'tblarrendamientosdocumentos',
    apiPath: 'tblarrendamientosdocumentos/view',
    routeName: 'tblarrendamientosdocumentosview',
    msgBeforeDelete: "¿Seguro que quieres borrar este registro?",
    msgTitle: "Eliminar el registro",
    msgAfterDelete: "Grabar eliminado con éxito",
    showHeader: true,
    showFooter: true,
    exportButton: true,
    isSubPage: false,
}
export default TblarrendamientosdocumentosViewPage;