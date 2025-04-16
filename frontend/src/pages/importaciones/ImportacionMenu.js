import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { BreadCrumb } from "primereact/breadcrumb";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Badge } from "primereact/badge";
import { Tooltip } from 'primereact/tooltip';

const ImportacionMenu = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const breadcrumbItems = [
    { label: "Home", url: "/home" },
    { label: "Importaciones" }
  ];

  const breadcrumbHome = { icon: 'pi pi-home', url: '/home' };
  
  // Definir los campos de la tabla facturastmp
  const facturasTmpFields = [
    { field: 'numero_registro', header: 'Núm. Registro', type: 'number', description: 'Número de registro secuencial' },
    { field: 'fecha_factura', header: 'Fecha Factura', type: 'date', description: 'Fecha de emisión de la factura (YYYY-MM-DD)' },
    { field: 'numero_factura', header: 'Núm. Factura', type: 'string', description: 'Número de factura asignado' },
    { field: 'codigo_autorizacion', header: 'Cód. Autorización', type: 'string', description: 'Código de autorización de la factura' },
    { field: 'nit_ci', header: 'NIT/CI Cliente', type: 'string', description: 'NIT o CI del cliente' },
    { field: 'complemento', header: 'Complemento', type: 'string', description: 'Complemento del documento de identidad' },
    { field: 'nombre_razon_social', header: 'Nombre/Razón Social', type: 'string', description: 'Nombre o razón social del cliente' },
    { field: 'importe_total_venta', header: 'Importe Total', type: 'decimal', description: 'Importe total de la venta' },
    { field: 'importe_ice', header: 'Importe ICE', type: 'decimal', description: 'Importe del ICE' },
    { field: 'importe_iehd', header: 'Importe IEHD', type: 'decimal', description: 'Importe del IEHD' },
    { field: 'importe_ipj', header: 'Importe IPJ', type: 'decimal', description: 'Importe del IPJ' },
    { field: 'tasas', header: 'Tasas', type: 'decimal', description: 'Importe de tasas' },
    { field: 'otros_no_sujetos_iva', header: 'Otros no sujetos a IVA', type: 'decimal', description: 'Importe de conceptos no sujetos al IVA' },
    { field: 'exportaciones_operaciones_exentas', header: 'Export. y Op. Exentas', type: 'decimal', description: 'Importe de exportaciones y operaciones exentas' },
    { field: 'ventas_gravadas_tasa_cero', header: 'Ventas tasa cero', type: 'decimal', description: 'Importe de ventas gravadas a tasa cero' },
    { field: 'subtotal', header: 'Subtotal', type: 'decimal', description: 'Subtotal factura' },
    { field: 'descuentos_bonificaciones_rebajas', header: 'Descuentos', type: 'decimal', description: 'Importe de descuentos, bonificaciones y rebajas' },
    { field: 'importe_gift_card', header: 'Importe Gift Card', type: 'decimal', description: 'Importe de gift card' },
    { field: 'importe_base_debito_fiscal', header: 'Base para débito fiscal', type: 'decimal', description: 'Importe base para débito fiscal' },
    { field: 'debito_fiscal', header: 'Débito fiscal', type: 'decimal', description: 'Débito fiscal' },
    { field: 'estado', header: 'Estado', type: 'string', description: 'Estado de la factura (VALIDA, ANULADA, etc.)' },
    { field: 'codigo_control', header: 'Código de control', type: 'string', description: 'Código de control de la factura' },
    { field: 'tipo_venta', header: 'Tipo venta', type: 'string', description: 'Tipo de venta' },
    { field: 'derecho_credito_fiscal', header: 'Derecho Créd. Fiscal', type: 'string', description: 'Indica si tiene derecho a crédito fiscal' },
    { field: 'estado_consolidacion', header: 'Estado consolidación', type: 'string', description: 'Estado de consolidación' },
  ];
  
  // Lista de tablas
  const importOptions = [
    {
      id: "facturastmp",
      title: "Facturas tmp",
      description: "Importación de datos de facturas desde archivos CSV",
      longDescription: "Permite la carga masiva de información de facturas desde archivos CSV o Excel para alimentar la tabla facturastmp en la base de datos.",
      icon: "pi pi-file-excel",
      color: "#22C55E",
      route: "/importacion-facturas",
      enabled: true,
      tableName: "facturastmp",
      schema: "public",
      fields: facturasTmpFields,
      requiredFields: ['numero_registro', 'fecha_factura', 'numero_factura', 'nit_ci', 'nombre_razon_social', 'importe_total_venta']
    },
    {
      id: "pagos",
      title: "Pagos",
      description: "Importación de datos de pagos desde archivos CSV",
      longDescription: "Esta funcionalidad permitirá importar información sobre pagos y transacciones financieras.",
      icon: "pi pi-money-bill",
      color: "#3B82F6",
      route: "/importacion-pagos",
      enabled: false,
      tableName: "tblpagos",
      fields: []
    },
    {
      id: "clientes",
      title: "Clientes",
      description: "Importación de datos de clientes desde archivos CSV",
      longDescription: "Esta funcionalidad permitirá importar información de clientes para actualizar el registro de la empresa.",
      icon: "pi pi-users",
      color: "#F59E0B",
      route: "/importacion-clientes",
      enabled: false,
      tableName: "tblclientes",
      fields: []
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  const openDetailsModal = (option) => {
    setSelectedOption(option);
    setDisplayModal(true);
  };

  const hideDetailsModal = () => {
    setDisplayModal(false);
  };

  const cardFooter = (option) => {
    return (
      <div className="flex justify-content-between align-items-center">
        {option.enabled && (
          <Button 
            label="Ver detalles" 
            icon="pi pi-info-circle" 
            className="p-button-text p-button-sm" 
            onClick={(e) => { e.stopPropagation(); openDetailsModal(option); }}
          />
        )}
        <Button 
          label={option.enabled ? "Importar" : "Próximamente"} 
          icon={option.enabled ? "pi pi-upload" : "pi pi-clock"} 
          className={option.enabled ? "p-button-primary" : "p-button-secondary"} 
          onClick={() => option.enabled && handleCardClick(option.route)}
          disabled={!option.enabled}
        />
      </div>
    );
  };

  const renderModalContent = () => {
    if (!selectedOption) return null;
    
    return (
      <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
        <TabPanel header="Información General">
          <div className="p-3">
            <div className="mb-4">
              <h5 className="text-xl font-medium text-900 mb-3">Detalles de la tabla</h5>
              <div className="grid">
                <div className="col-12 md:col-6">
                  <div className="surface-100 p-3 border-round mb-3">
                    <div className="flex align-items-center mb-2">
                      <i className="pi pi-database mr-2 text-primary"></i>
                      <span className="font-medium text-900">Esquema</span>
                    </div>
                    <div className="pl-4 text-700">{selectedOption.schema || 'public'}</div>
                  </div>
                </div>
                <div className="col-12 md:col-6">
                  <div className="surface-100 p-3 border-round mb-3">
                    <div className="flex align-items-center mb-2">
                      <i className="pi pi-table mr-2 text-primary"></i>
                      <span className="font-medium text-900">Nombre de tabla</span>
                    </div>
                    <div className="pl-4 text-700">{selectedOption.tableName}</div>
                  </div>
                </div>
                <div className="col-12 md:col-6">
                  <div className="surface-100 p-3 border-round mb-3">
                    <div className="flex align-items-center mb-2">
                      <i className="pi pi-list mr-2 text-primary"></i>
                      <span className="font-medium text-900">Cantidad de campos</span>
                    </div>
                    <div className="pl-4 text-700">{selectedOption.fields.length}</div>
                  </div>
                </div>
                <div className="col-12 md:col-6">
                  <div className="surface-100 p-3 border-round mb-3">
                    <div className="flex align-items-center mb-2">
                      <i className="pi pi-check-square mr-2 text-primary"></i>
                      <span className="font-medium text-900">Campos obligatorios</span>
                    </div>
                    <div className="pl-4 text-700">
                      {selectedOption.requiredFields?.map(field => (
                        <Badge key={field} value={field} severity="info" className="mr-1 mb-1" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-xl font-medium text-900 mb-3">Proceso de importación</h5>
              <div className="surface-100 p-3 border-round">
                <p className="line-height-3 mb-0 text-700">
                  {selectedOption.longDescription}
                </p>
              </div>
            </div>
            
            <div className="flex flex-column bg-blue-50 p-3 border-round">
              <div className="flex align-items-center mb-3">
                <i className="pi pi-file-excel mr-2 text-blue-500"></i>
                <span className="font-medium text-900">Formatos aceptados</span>
              </div>
              <ul className="list-none p-0 m-0 pl-4">
                <li className="mb-2 flex align-items-center">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-700">CSV</span>
                </li>
              </ul>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Campos de la tabla">
          <div className="card p-0">
            <DataTable
              value={selectedOption.fields}
              scrollable
              scrollHeight="400px"
              size="small"
              stripedRows
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              tableStyle={{ minWidth: '50rem' }}
            >
              <Column field="field" header="Campo" sortable style={{ width: '20%' }} />
              <Column field="header" header="Descripción" sortable style={{ width: '25%' }} />
              <Column field="type" header="Tipo" sortable style={{ width: '15%' }} 
                body={(rowData) => {
                  const badgeColor = 
                    rowData.type === 'string' ? 'info' :
                    rowData.type === 'number' || rowData.type === 'decimal' ? 'success' :
                    rowData.type === 'date' ? 'warning' : 'primary';
                  return <Badge value={rowData.type} severity={badgeColor} />;
                }}
              />
              <Column field="description" header="Detalle" style={{ width: '40%' }} />
            </DataTable>
          </div>
        </TabPanel>
      </TabView>
    );
  };

  const modalFooter = (
    <div>
      <Button label="Cerrar" icon="pi pi-times" onClick={hideDetailsModal} className="p-button-text" />
      {selectedOption?.enabled && (
        <Button label="Ir a importar" icon="pi pi-arrow-right" onClick={() => {
          hideDetailsModal();
          handleCardClick(selectedOption.route);
        }} />
      )}
    </div>
  );

  return (
    <div className="importacion-menu">
      <Tooltip target=".import-card" mouseTrack mouseTrackLeft={10} />
      
      <Dialog 
        header={selectedOption?.title ? `Detalles de importación - ${selectedOption.title}` : "Detalles de importación"}
        visible={displayModal} 
        style={{ width: '90vw', maxWidth: '900px' }} 
        onHide={hideDetailsModal}
        footer={modalFooter}
        maximizable
      >
        {renderModalContent()}
      </Dialog>

      <div className="surface-0 p-4">
        <div className="flex align-items-center justify-content-between mb-3">
          <div>
            <h2 className="text-900 font-bold m-0">Centro de Importaciones</h2>
            <BreadCrumb model={breadcrumbItems} home={breadcrumbHome} className="p-0 text-sm" />
          </div>
        </div>
        
        <Divider className="my-3" />
        
        <div className="text-500 mb-5">
          <p className="line-height-3">
            Seleccione el tipo de datos que desea importar. El sistema le guiará a través del proceso de importación.
          </p>
        </div>

        <div className="grid">
          {importOptions.map((option) => (
            <div key={option.id} className="col-12 md:col-6 lg:col-4 mb-3">
              <div 
                className={`import-card card shadow-2 border-round-lg cursor-pointer transition-all transition-duration-200 ${!option.enabled ? 'opacity-60' : ''}`}
                style={{ 
                  borderLeft: `6px solid ${option.color}`,
                  transform: 'translateY(0)',
                  transition: 'transform 0.2s ease-in-out'
                }}
                data-pr-tooltip={option.enabled ? "Haga clic para ver detalles" : "No disponible"}
                data-pr-position="right"
                onClick={(e) => option.enabled && openDetailsModal(option)}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="p-3">
                  <div className="flex align-items-center mb-3">
                    <div 
                      className="flex align-items-center justify-content-center border-round mr-3" 
                      style={{ 
                        backgroundColor: `${option.color}20`,
                        width: '3.5rem', 
                        height: '3.5rem' 
                      }}
                    >
                      <i 
                        className={`${option.icon}`} 
                        style={{ color: option.color, fontSize: '1.5rem' }}
                      ></i>
                    </div>
                    <div>
                      <h3 className="text-900 font-bold text-xl mb-1">{option.title}</h3>
                      <span className="block text-600 text-sm">
                        <i className="pi pi-database mr-1"></i>
                        Tabla: {option.tableName}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-700 line-height-3 mb-3">{option.description}</p>
                  
                  {option.enabled && (
                    <div className="mb-3">
                      <span className="inline-flex align-items-center bg-green-50 text-green-600 border-round px-2 py-1 text-sm">
                        <i className="pi pi-check-circle mr-1"></i>
                        Disponible para importar
                      </span>
                    </div>
                  )}
                  
                  {!option.enabled && (
                    <div className="mb-3">
                      <span className="inline-flex align-items-center bg-blue-50 text-blue-600 border-round px-2 py-1 text-sm">
                        <i className="pi pi-clock mr-1"></i>
                        No disponible
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-content-end">
                    <Button 
                      label={option.enabled ? "Importar" : "No disponible"} 
                      icon={option.enabled ? "pi pi-upload" : "pi pi-lock"} 
                      className={option.enabled ? "p-button-primary p-button-sm" : "p-button-secondary p-button-sm"} 
                      onClick={(e) => {
                        e.stopPropagation();
                        option.enabled && handleCardClick(option.route);
                      }}
                      disabled={!option.enabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportacionMenu;
