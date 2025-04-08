import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Paginator } from "primereact/paginator";
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
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ actaToEdit, setActaToEdit ] = useState(null);

  useEffect(() => {
    fetchData();
  }, [])
  
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
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-button-sm"
          onClick={() => handleEditActa(rowData)}
        />
        <Button
          icon="pi pi-download"
          className="p-button-rounded p-button-info p-button-sm"
          onClick={() => findActa(rowData.ae_actaid)}
        />
      </div>
    );
  };

  const searchActa = async () => {
    try {
      setLoading(true);
      
      if (!searchTerm.trim()) {
        fetchData();
        return;
      }
      
      const { data } = await axios.get(`/actas/index?search=${searchTerm}`);
      setActas(data);
    } catch (error) {
      console.error("Error al buscar datos:", error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al buscar actas',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchActa();
    }
  };

  const findActa = async (ae_actaid) => {
    try {
      const { data } = await axios.get(`/actas/cabecera/${ae_actaid}`);

      if (!data || data.length === 0) {
        return;
      }
      
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
        toast.warning('Selecciona al menos un acta para imprimir');
        return;
      }

      const { data } = await axios.post('/actas/cabecera', { 
        rec_ids: selectedIds 
      });
      
      const blob = await pdf(<TemplateActa actas={data} />).toBlob();
      saveAs(blob, "actas_seleccionadas.pdf");

      setSelectedIds([]);
    } catch (error) {
      console.error("Error imprimiendo actas:", error);
    }
  };

  const handleEditActa = (acta) => {
    setActaToEdit(acta);
    setModalVisible(true);
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <h5 className="text-black">Creación de Acta Entrega</h5>
        <div className="grid mb-3">
          <div className="col-12 md:col-8">
            <span className="p-input-icon-left w-full">
              <i className="pi pi-search" />
              <InputText 
                placeholder="Buscar por Acta ID, Correlativo, Fecha, Grupo, Operador, Recaudación..." 
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </span>
          </div>
          <div className="col-12 md:col-4 flex justify-content-end">
            <Button 
              label="BUSCAR" 
              icon="pi pi-search" 
              className="px-8"
              onClick={searchActa}
            />
          </div>
        </div>
        { selectedIds.length != 0 && <Button label="Imprimir" onClick={printSelectedActas}/>}
        {" "}
        
        {/* DataTable */}
        <DataTable 
          value={actas} 
          responsiveLayout="scroll" 
          className="p-datatable-sm text-xs" 
          paginator 
          rows={10} 
          loading={loading} 
          rowsPerPageOptions={[10, 25, 50]} 
          emptyMessage="No se encontraron actas"
          rowStyle={{ height: '2rem', padding: '0' }}
        >
          <Column 
              body={(rowData) => (
                  <InputSwitch 
                      checked={selectedIds.includes(rowData.ae_actaid)} 
                      onChange={(e) => handleSwitchChange(e, rowData.ae_actaid)}
                  />
              )}
              headerStyle={{ width: '4rem' }}
              bodyStyle={{ padding: '0' }}
              className="text-xs"
          />
          <Column field="ae_actaid" header="ACTA ID" className="text-xs" bodyStyle={{ padding: '0 0.1rem' }} sortable/>
          <Column field="ae_correlativo" header="CORRELATIVO" className="text-xs" bodyStyle={{ padding: '0 0.1rem' }} sortable/>
          <Column field="punto_recaudacion.puntorecaud_nombre" header="PUNTO RECAUDACIÓN" className="text-xs" bodyStyle={{ padding: '0 0.1rem' }} sortable/>
          <Column field="ae_fecha" header="FECHA" className="text-xs" bodyStyle={{ padding: '0 0.1rem' }} sortable/>
          <Column field="ae_grupo" header="GRUPO" className="text-xs" bodyStyle={{ padding: '0 0.1rem' }} sortable/>
          <Column field="ae_operador1erturno" header="OPERADOR 1ER TURNO" className="text-xs" bodyStyle={{ padding: '0 0.1rem' }} sortable/>
          <Column field="ae_operador2doturno" header="OPERADOR 2DO TURNO" className="text-xs" bodyStyle={{ padding: '0 0.1rem' }} sortable/>
          <Column field="ae_observacion" header="OBSERVACIÓN" className="text-xs" bodyStyle={{ padding: '0 0.1rem' }} sortable/>
          <Column field="ae_recaudaciontotalbs" header="RECAUDACIÓN TOTAL BS" className="text-xs" bodyStyle={{ padding: '0 0.1rem' }} sortable/>
          <Column body={actionTemplate} header="" className="text-xs" bodyStyle={{ padding: '0 0.1rem' }}/>
        </DataTable>
        
      </div>
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem" }}>
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-info shadow-8"
          style={{ width: "3rem", height: "3rem", fontSize: "1.5rem" }} 
          onClick={() => {
            setActaToEdit(null);
            setModalVisible(true);
          }} 
        />
      </div>
      <div>
        {modalVisible && (
          <DialogActa
            visible={modalVisible}
            onHide={() => {
              setModalVisible(false);
              setActaToEdit(null);
            }} 
            reloadData={fetchData}
            editData={actaToEdit}
          />
        )}
      </div>      
    </>
  );
};

export default TblActasList;
