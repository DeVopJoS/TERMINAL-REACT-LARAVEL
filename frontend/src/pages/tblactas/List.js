import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
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
  const [actas, setActas] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [correlativo, setCorrelativo] = useState("");
  const [fecha, setFecha] = useState(null);
  const [estado, setEstado] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const { data } = await axios.get('actas/index/ae_estado/E');
    setActas(data);
  }

  const toast = useRef(null);

  const actionTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        {/* <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-button-sm"
        /> */}
        <Button
          icon="pi pi-download"
          className="p-button-rounded p-button-info p-button-sm"
          onClick={() => findActa(rowData.ae_actaid)}
        />
        {/* <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
        /> */}
      </div>
    );
  };

  const searchActa = async () => {
    try {
      const formattedDate = fecha ? fecha.toISOString().split('T')[0] : '';

      const { data } = await axios.get(`/actas/index?ae_estado=${estado}&ae_fecha=${formattedDate}`);

      setActas(data);
    } catch (error) {
        console.error("Error al buscar datos:", error);
    }
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const findActa = async (ae_actaid) => {
    try {
      const { data } = await axios.get(`/actas/cabecera/${ae_actaid}`);

      if (!data || data.length === 0) {
        console.error("No se encontraron datos en la cabecera");
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

          console.log(data)
          
          const blob = await pdf(<TemplateActa actas={data} />).toBlob();
          saveAs(blob, "actas_seleccionadas.pdf");

          setSelectedIds([]);
      } catch (error) {
          console.error("Error imprimiendo actas:", error);
      }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <h5 className="text-black">Creación de Acta Entrega</h5>
        <div className="grid mb-3">
          
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
        </div>
        { selectedIds.length != 0 && <Button label="Imprimir" onClick={printSelectedActas}/>}
        {" "}
        {/* Añadido margen superior (mt-5) */}
        <div className="mt-2 mb-4 flex align-items-center text-sm">
          <div className="mr-2">Mostrar</div>
          <Dropdown
            value={rows}
            options={[5, 10, 20, 50]}
            onChange={(e) => setRows(e.value)}
            className="w-6rem mr-2 text-sm p-dropdown-sm"
          />
          <div>registros</div>
          <div className="ml-auto flex align-items-center">
            <span className="mr-2">Buscar:</span>
            <InputText className="w-10rem text-sm p-inputtext-sm" />
          </div>
        </div>
        {/* DataTable */}
        <DataTable value={actas} responsiveLayout="scroll" className="p-datatable-sm text-xs" showGridlines>
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
          <Column field="ae_actaid" header="ACTA ID" className="text-xs py-1 px-2"/>
          <Column field="ae_correlativo" header="CORRELATIVO" className="text-xs py-1 px-2"/>
          <Column field="punto_recaudacion.puntorecaud_nombre" header="PUNTO RECAUDACIÓN" className="text-xs py-1 px-2"/>
          <Column field="ae_fecha" header="FECHA" className="text-xs py-1 px-2"/>
          <Column field="ae_grupo" header="GRUPO" className="text-xs py-1 px-2"/>
          <Column field="ae_operador1erturno" header="OPERADOR 1ER TURNO" className="text-xs py-1 px-2"/>
          <Column field="ae_operador2doturno" header="OPERADOR 2DO TURNO" className="text-xs py-1 px-2"/>
          <Column field="ae_observacion" header="OBSERVACIÓN" className="text-xs py-1 px-2"/>
          <Column field="ae_recaudaciontotalbs" header="RECAUDACIÓN TOTAL BS" className="text-xs py-1 px-2"
            // body={(rowData) => rowData.ae_recaudaciontotalbs.toFixed(2)}
          />
          <Column field="ae_estado" header="ESTADO" className="text-xs py-1 px-2"/>
          <Column body={actionTemplate} header="" className="text-xs py-1 px-2"/>
        </DataTable>
        <div className="mt-2 flex justify-content-between align-items-center text-sm">
          <span>
            Mostrando registros del 1 al 6 de un total de {actas.length}{" "}
            registros.
          </span>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={actas.length}
            onPageChange={onPageChange}
            template="PrevPageLink PageLinks NextPageLink"
            className="p-paginator-rounded text-sm"
          />
        </div>
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
          />
        )}
      </div>      
    </>
  );
};

export default TblActasList;
