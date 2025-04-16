import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "hooks/useApi";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Message } from "primereact/message";
import { BreadCrumb } from "primereact/breadcrumb";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { Steps } from "primereact/steps";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Timeline } from "primereact/timeline";

const ImportarFacturas = () => {
  const api = useApi();
  const navigate = useNavigate();
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [importEvents, setImportEvents] = useState([]);

  const breadcrumbItems = [
    { label: "Home", url: "/home" },
    { label: "Importaciones", url: "/importacion" },
    { label: "Importar Facturas" }
  ];

  const breadcrumbHome = { icon: 'pi pi-home', url: '/home' };

  const steps = [
    { 
      label: 'Seleccionar archivo',
      icon: 'pi pi-file'
    },
    { 
      label: 'Validar información',
      icon: 'pi pi-check-circle' 
    },
    { 
      label: 'Importar datos',
      icon: 'pi pi-upload'
    },
    { 
      label: 'Completado',
      icon: 'pi pi-check'
    }
  ];

  const onSelectFile = (e) => {
    setUploadedFile(e.files[0]);
    setResponse(null);
    setError(null);
    setActiveStep(1);
    
    addEvent({
      status: 'success',
      title: 'Archivo seleccionado',
      description: `Archivo "${e.files[0].name}" seleccionado correctamente`,
      time: new Date()
    });
  };

  const onRemoveFile = () => {
    setUploadedFile(null);
    setResponse(null);
    setError(null);
    setActiveStep(0);
    
    addEvent({
      status: 'warn',
      title: 'Archivo eliminado',
      description: 'Se ha eliminado el archivo seleccionado',
      time: new Date()
    });
  };

  const addEvent = (event) => {
    setImportEvents(prev => [event, ...prev]);
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      setError("Por favor, seleccione un archivo primero");
      return;
    }
    
    setShowConfirm(true);
  };
  
  const confirmImport = async () => {
    setShowConfirm(false);
    setLoading(true);
    setError(null);
    setResponse(null);
    setActiveStep(2);

    addEvent({
      status: 'info',
      title: 'Importación iniciada',
      description: 'Procesando el archivo...',
      time: new Date()
    });

    const formData = new FormData();
    formData.append("archivo", uploadedFile);

    try {
      const response = await api.post("importar-facturas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.status === "success") {
        setResponse(response.data);
        setActiveStep(3);
        
        addEvent({
          status: 'success',
          title: 'Importación completa',
          description: `Se importaron ${response.data.registros_importados} registros correctamente`,
          time: new Date()
        });
        
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: response.data.message,
          life: 5000,
        });
      } else {
        throw new Error(response.data?.message || "Error al importar datos");
      }
    } catch (error) {
      console.error("Error al importar:", error);
      setActiveStep(0);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Error al importar el archivo";
      
      setError(errorMessage);
      
      addEvent({
        status: 'error',
        title: 'Error en la importación',
        description: errorMessage,
        time: new Date()
      });
      
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: errorMessage,
        life: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap p-2">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <i className="pi pi-file-excel mr-2" style={{ fontSize: '2rem', color: '#16A34A' }}></i>
          <span className="flex flex-column text-left">
            <span className="font-bold text-overflow-ellipsis">{file.name}</span>
            <small className="text-color-secondary">{props.formatSize}</small>
          </span>
        </div>
        <Tag
          value={file.type.split("/")[1].toUpperCase()}
          severity="info"
          className="px-3 py-2 ml-auto mr-3"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => props.onRemove(props.index)}
          tooltip="Eliminar archivo"
        />
      </div>
    );
  };

  const headerTemplate = (options) => {
    const { className, chooseButton } = options;

    return (
      <div
        className={className}
        style={{
          backgroundColor: "var(--surface-0)",
          display: "flex",
          alignItems: "center",
          padding: "1.5rem"
        }}
      >
        {chooseButton}
        <div className="ml-3">
          <h5 className="font-bold m-0">Arrastre y suelte el archivo CSV aquí</h5>
          <span className="text-color-secondary">Solo archivos CSV</span>
        </div>
      </div>
    );
  };
  
  const timelineCustomMarker = (item) => {
    return (
      <span className={`p-timeline-event-marker p-timeline-event-marker-${item.status}`} style={{ 
        padding: '0.5rem',
        borderRadius: '50%', 
        backgroundColor: item.status === 'success' ? 'var(--green-100)' : 
                        item.status === 'error' ? 'var(--red-100)' : 
                        item.status === 'warn' ? 'var(--yellow-100)' : 
                        'var(--blue-100)',
        border: `2px solid ${item.status === 'success' ? 'var(--green-500)' : 
                            item.status === 'error' ? 'var(--red-500)' : 
                            item.status === 'warn' ? 'var(--yellow-500)' : 
                            'var(--blue-500)'}`
      }}>
        <i className={`pi ${item.status === 'success' ? 'pi-check' : 
                           item.status === 'error' ? 'pi-times' : 
                           item.status === 'warn' ? 'pi-exclamation-triangle' : 
                           'pi-info-circle'}`}
           style={{ 
             color: item.status === 'success' ? 'var(--green-500)' : 
                    item.status === 'error' ? 'var(--red-500)' : 
                    item.status === 'warn' ? 'var(--yellow-500)' : 
                    'var(--blue-500)',
             fontSize: '1rem'
           }}>
        </i>
      </span>
    );
  };
  
  const timelineContent = (item) => {
    return (
      <div className="p-timeline-event-content">
        <div className="flex flex-column">
          <span className="font-bold text-lg">{item.title}</span>
          <p className="m-0 line-height-3">{item.description}</p>
          <small className="text-color-secondary">
            {item.time.toLocaleTimeString()}
          </small>
        </div>
      </div>
    );
  };

  return (
    <div className="surface-ground p-2 md:p-4">
      <Toast ref={toast} />
      <ConfirmDialog
        visible={showConfirm}
        onHide={() => setShowConfirm(false)}
        message="¿Está seguro que desea importar este archivo? Esta acción no se puede deshacer."
        header="Confirmar Importación"
        icon="pi pi-exclamation-triangle"
        accept={confirmImport}
        reject={() => setShowConfirm(false)}
        acceptLabel="Sí, Importar"
        rejectLabel="Cancelar"
      />
      
      <div className="surface-0 shadow-2 border-round p-4">
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
          <div>
            <h2 className="text-900 font-bold m-0">Importación de Facturas</h2>
            <BreadCrumb model={breadcrumbItems} home={breadcrumbHome} className="p-0 text-sm border-none bg-transparent" />
          </div>
          
          <div className="mt-3 md:mt-0">
            <Button 
              label="Volver a Importaciones" 
              icon="pi pi-arrow-left" 
              className="p-button-text" 
              onClick={() => navigate('/importacion')}
            />
          </div>
        </div>
        
        <Divider className="my-4" />
        
        <div className="mb-5">
          <Steps model={steps} activeIndex={activeStep} readOnly className="custom-steps" />
        </div>
        
        <div className="grid">
          <div className="col-12 lg:col-8">
            <Card className="shadow-none">
              <div className="p-0">
                {activeStep === 0 && (
                  <>
                    <h4 className="text-900 font-medium mb-3">Seleccione el archivo CSV para importar</h4>
                    <p className="line-height-3 text-700 mb-4">
                      Seleccione el archivo CSV con la información de facturas que desea
                      importar.
                    </p>
                  </>
                )}
                
                {activeStep === 1 && (
                  <>
                    <h4 className="text-900 font-medium mb-3">Validar información del archivo</h4>
                    <p className="line-height-3 text-700 mb-4">
                      Verifique que el archivo seleccionado sea correcto y que contenga la información necesaria.
                      Una vez confirmado, haga clic en "Importar" para procesar los datos.
                    </p>
                  </>
                )}
                
                {activeStep === 2 && (
                  <>
                    <h4 className="text-900 font-medium mb-3">Importando datos...</h4>
                    <p className="line-height-3 text-700 mb-4">
                      La información está siendo procesada. Por favor, espere mientras se completa la importación.
                    </p>
                  </>
                )}
                
                {activeStep === 3 && (
                  <>
                    <h4 className="text-900 font-medium mb-3">Importación completada</h4>
                    <p className="line-height-3 text-700 mb-4">
                      La importación ha finalizado correctamente. Puede verificar los resultados a continuación.
                    </p>
                  </>
                )}
                
                <FileUpload
                  ref={fileUploadRef}
                  name="archivo"
                  accept=".csv,.xlsx,.xls"
                  maxFileSize={10000000}
                  customUpload={true}
                  auto={false}
                  onSelect={onSelectFile}
                  onClear={onRemoveFile}
                  headerTemplate={headerTemplate}
                  itemTemplate={itemTemplate}
                  emptyTemplate={
                    <div className="flex align-items-center flex-column p-5">
                      <i className="pi pi-cloud-upload text-color-secondary" style={{ fontSize: '5rem', opacity: '.5' }}></i>
                      <span className="text-color-secondary mt-2">Arrastre y suelte el archivo CSV aquí</span>
                    </div>
                  }
                  className="surface-ground"
                />

                {loading && (
                  <div className="mt-4">
                    <ProgressBar
                      mode="indeterminate"
                      style={{ height: "6px" }}
                    ></ProgressBar>
                    <p className="text-center mt-2">Importando datos...</p>
                  </div>
                )}

                {error && (
                  <div className="mt-4">
                    <Message severity="error" text={error} className="w-full" />
                  </div>
                )}

                {response && (
                  <div className="mt-4">
                    <Message
                      severity="success"
                      text={`${response.message}`}
                      className="w-full"
                    />
                    {response.registros_con_campos_faltantes > 0 && (
                      <div className="p-3 mt-3 bg-yellow-50 border-round border-1 border-yellow-300">
                        <div className="flex align-items-center mb-2">
                          <i className="pi pi-exclamation-triangle text-yellow-700 mr-2"></i>
                          <span className="font-medium text-yellow-900">Advertencia</span>
                        </div>
                        <p className="text-yellow-800 m-0 line-height-3">
                          Se detectaron {response.registros_con_campos_faltantes} registros con campos faltantes. 
                          Verifique que los nombres de las columnas en su archivo CSV sean exactamente:
                        </p>
                        <ul className="text-yellow-800 mt-2 mb-0 pl-3">
                          <li><strong>Nº DE LA FACTURA</strong> (para el número de factura)</li>
                          <li><strong>NIT / CI CLIENTE</strong> (para el NIT o CI)</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-content-end mt-4 pt-3">
                  <Button
                    label="Cancelar"
                    icon="pi pi-times"
                    className="p-button-text mr-2"
                    onClick={() => navigate('/importacion')}
                    disabled={loading}
                  />
                  
                  {activeStep === 0 && (
                    <Button
                      label="Seleccionar archivo"
                      icon="pi pi-upload"
                      className="p-button-primary"
                      onClick={() => {
                        if (fileUploadRef.current) {
                          fileUploadRef.current.choose();
                        }
                      }}
                      disabled={loading}
                    />
                  )}
                  
                  {activeStep === 1 && (
                    <Button
                      label="Importar"
                      icon="pi pi-upload"
                      className="p-button-primary"
                      onClick={handleSubmit}
                      disabled={!uploadedFile || loading}
                    />
                  )}
                  
                  {activeStep === 3 && (
                    <Button
                      label="Nueva importación"
                      icon="pi pi-plus"
                      className="p-button-primary"
                      onClick={() => {
                        setUploadedFile(null);
                        setResponse(null);
                        setActiveStep(0);
                        if (fileUploadRef.current) {
                          fileUploadRef.current.clear();
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>
          
          <div className="col-12 lg:col-4">
            <Card title="Historial de actividad" className="shadow-none">
              <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                {importEvents.length > 0 ? (
                  <Timeline 
                    value={importEvents} 
                    marker={timelineCustomMarker} 
                    content={timelineContent} 
                    className="custom-timeline"
                  />
                ) : (
                  <div className="flex flex-column align-items-center p-5">
                    <i className="pi pi-clock text-color-secondary" style={{ fontSize: '2rem', opacity: '.5' }}></i>
                    <span className="text-color-secondary mt-2">No hay actividad registrada</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportarFacturas;
