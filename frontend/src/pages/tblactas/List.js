import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Paginator } from "primereact/paginator";
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from "primereact/toast";
import { InputSwitch } from 'primereact/inputswitch';
import { saveAs } from "file-saver";
import { pdf } from '@react-pdf/renderer';
import DialogActa from "./DialogActa";
import axios from "axios";
import MyPDF from '../../pdf/ActasTemplate'
import TemplateActa from '../../pdf/ActasTemplate2'

const TblActasList = () => {
  const [ actas, setActas ] = useState([]);
  const [ selectedIds, setSelectedIds ] = useState([]);
  const [ correlativo, setCorrelativo ] = useState("");
  const [ selectedRowId, setSelectedRowId ] = useState();
  const [ fecha, setFecha ] = useState(null);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ globalFilter, setGlobalFilter ] = useState("");

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if( !modalVisible ) setSelectedRowId();
  }, [modalVisible]);
  
  const fetchData = async () => {
    try{
      setLoading(true);
      const { data } = await axios.get('actas/index/ae_estado/P');
      setActas(data);
    } catch (error){
      console.log("Error: " + error);
    } finally {
      setLoading(false);
    }
  }

  const toast = useRef(null);

  const actionTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-sm"
        onClick={ () => handleDel(rowData) }
        />
        <Button 
        icon="pi pi-pencil"
        className="p-button-rounded p-button-warning p-button-sm"
        onClick={ () => handleEdit(rowData) }
        />
        <Button
          icon="pi pi-download"
          className="p-button-rounded p-button-info p-button-sm"
          onClick={() => findActa(rowData.ae_actaid)}
        />
      </div>
    );
  };

  const handleEdit = ({ae_actaid}) => {
    setSelectedRowId(ae_actaid);
    setModalVisible(true);
  }

  const handleDel = ({ ae_actaid }) => {
    const deleteActa = async () => {
      try{
        const deleteActa = await axios.get(`actaentregacab/delete/${ae_actaid}`);
        
        toast.current.show({severity:'success', summary: 'Exito', detail:'Acta eliminada exitosamente!', life: 3000});
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }

    confirmDialog({
        message: '¿Estas seguro de seguir con la acción?',
        header: 'Eliminar acta',
        icon: 'pi pi-exclamation-triangle',
        accept: deleteActa,
    });
  }

  const searchActa = async () => {
    try {
      const formattedDate = fecha ? fecha.toISOString().split('T')[0] : '';

      const { data } = await axios.get(`/actas/index?ae_estado=P&ae_fecha=${formattedDate}`);

      setActas(data);
    } catch (error) {
        console.error("Error al buscar datos:", error);
    }
  };

  const findActa = async (ae_actaid) => {
    try {
      const { data } = await axios.get(`/actas/cabecera/${ae_actaid}`);

      if (!data || data.length === 0) {
        console.error("No se encontraron datos en la cabecera");
        return;
      }
      console.log(data.cabecera[0])
      console.log(data.detalles)
      const blob = await pdf(<MyPDF cabecera={data.cabecera[0]} detalles={data.detalles} />).toBlob();
      saveAs(blob, "acta.pdf");
    } catch (error) {
      console.error("Error obteniendo el acta:", error);
    }
  }

  const handleSwitchChange = (e, actaId) => {
      if (e.value) {
          setSelectedIds(prev => [...prev, actaId]);
      } else {
          setSelectedIds(prev => prev.filter(id => id !== actaId));
      }
  };

  const printSelectedActas = async () => {
      try {
          if (selectedIds.length === 0) {
              toast.current.show({severity:'warn', summary: 'Advertencia', detail:'Selecciona al menos un acta para imprimir', life: 3000});
              return;
          }

          const { data } = await axios.post('/actas/cabecera', { 
              rec_ids: selectedIds 
          });

          if (!data || data.length === 0) {
              toast.current.show({severity:'error', summary: 'Error', detail:'No se encontraron datos para las actas seleccionadas', life: 3000});
              return;
          }
          
          const blob = await pdf(<TemplateActa actas={data} />).toBlob();
          saveAs(blob, "actas_seleccionadas.pdf");
          
          toast.current.show({severity:'success', summary: 'Éxito', detail:'PDF generado correctamente', life: 3000});
          setSelectedIds([]);
      } catch (error) {
          console.error("Error imprimiendo actas:", error);
          toast.current.show({severity:'error', summary: 'Error', detail:`Error al generar PDF: ${error.message}`, life: 3000});
      }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <h5 className="text-black">Creación de Acta Entrega</h5>
        {/* <div className="grid mb-3">
          
          <div className="col-12 md:col-3">
            <InputText
              value={correlativo}
              placeholder="Correlativo"
              onChange={(e) => setCorrelativo(e.target.value)}
              className="w-full"
            />           
          </div>

          <div className="col-12 md:col-3">
              <Calendar placeholder="Fecha" value={fecha} onChange={(e) => setFecha(e.value)} showIcon className="w-full"
              />
          </div>

          <div className="col-12 md:col-6 flex justify-content-end">
            <Button label="BUSCAR DATOS DE ACTA ENTREGA" icon="pi pi-search" className="px-8" onClick={searchActa}/>
          </div>
        </div> */}

        <div className="flex justify-content-end mb-2 mr-2">
          <InputText 
              value={globalFilter} 
              onChange={(e) => setGlobalFilter(e.target.value)} 
              placeholder="Buscar..."
              className="ml-5 p-inputtext-sm md:w-50"
          />
        </div>
        { selectedIds.length != 0 && <Button label="Imprimir" onClick={printSelectedActas}/>}
        {" "}
        
        {/* DataTable */}
        <DataTable 
          value={actas} 
          loading={loading} 
          paginator rows={10} 
          responsiveLayout="scroll" 
          rowsPerPageOptions={[10, 25, 50]} 
          className="p-datatable-sm text-xs" 
          emptyMessage="No se encontraron actas"
          filters={{ global: { value: globalFilter, matchMode: "contains" } }}
          globalFilterFields={[
              "ae_actaid",
              "ae_correlativo",
              "punto_recaudacion.puntorecaud_nombre",
              "ae_fecha",
              "ae_grupo",
              "ae_operador1erturno",
              "ae_operador2doturno",
              "ae_recaudaciontotalbs",
          ]}>
          <Column 
              body={(rowData) => (
                  <InputSwitch 
                      checked={selectedIds.includes(rowData.ae_actaid)} 
                      onChange={(e) => handleSwitchChange(e, rowData.ae_actaid)}
                  />
              )}
              headerStyle={{ width: '4rem' }}
              className="text-xs py-1 px-2"
          />
          <Column field="ae_actaid" header="ACTA ID" className="text-xs py-1 px-2" sortable/>
          <Column field="ae_correlativo" header="CORRELATIVO" className="text-xs py-1 px-2" sortable/>
          <Column field="punto_recaudacion.puntorecaud_nombre" header="PUNTO RECAUDACIÓN" className="text-xs py-1 px-2" sortable/>
          <Column field="ae_fecha" header="FECHA" className="text-xs py-1 px-2" sortable/>
          <Column field="ae_grupo" header="GRUPO" className="text-xs py-1 px-2" sortable/>
          <Column field="ae_operador1erturno" header="OPERADOR 1ER TURNO" className="text-xs py-1 px-2" sortable/>
          <Column field="ae_operador2doturno" header="OPERADOR 2DO TURNO" className="text-xs py-1 px-2" sortable/>
          <Column field="ae_observacion" header="OBSERVACIÓN" className="text-xs py-1 px-2" sortable/>
          <Column field="ae_recaudaciontotalbs" header="RECAUDACIÓN TOTAL BS" className="text-xs py-1 px-2"
            // body={(rowData) => rowData.ae_recaudaciontotalbs.toFixed(2)} 
            sortable/>
          <Column body={actionTemplate} header="" className="text-xs py-1 px-2"/>
        </DataTable>
        
      </div>
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem" }}>
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-info shadow-8"
          style={{ width: "3rem", height: "3rem", fontSize: "1.5rem" }} 
          onClick={() => setModalVisible(true) } 
        />
      </div>
      <div>
        {modalVisible && (
          <DialogActa
            visible={modalVisible}
            onHide={() => setModalVisible(false)} 
            reloadData={fetchData}
            selectedRowId={selectedRowId}
          />
        )}
      </div>      
    </>
  );
};

export default TblActasList;
