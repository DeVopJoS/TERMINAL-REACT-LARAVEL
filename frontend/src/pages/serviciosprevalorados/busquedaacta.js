import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import ActaEntregaPopup from "./actaentregapopup"; // Importar el componente del popup

const ActaEntregaSystem = () => {
  // States
  const [actas, setActas] = useState([
    // ... (datos de actas)
  ]);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [correlativo, setCorrelativo] = useState("");
  const [fecha, setFecha] = useState(null);
  const [estado, setEstado] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del popup

  const [newActa, setNewActa] = useState({
    actaId: 0,
    correlativo: 0,
    punto: "",
    fecha: "",
    grupo: 4,
    operador1: "",
    operador2: "",
    observacion: "",
    recaudacion: 0,
    estado: "M",
  });

  const toast = useRef(null);

  // Action button templates
  const actionTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-button-sm"
        />
        <Button
          icon="pi pi-file"
          className="p-button-rounded p-button-info p-button-sm"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
        />
      </div>
    );
  };

  // Search function
  const searchActa = () => {
    // Lógica de búsqueda
    toast.current.show({
      severity: "info",
      summary: "Búsqueda",
      detail: "Buscando actas de entrega",
    });
  };

  // Add new acta
  const addNewActa = () => {
    setDialogVisible(false);
    const newId = Math.max(...actas.map((acta) => acta.actaId)) + 1;
    const formattedActa = {
      ...newActa,
      actaId: newId,
      fecha: new Date().toLocaleDateString(),
    };

    setActas([formattedActa, ...actas]);
    setNewActa({
      actaId: 0,
      correlativo: 0,
      punto: "",
      fecha: "",
      grupo: 4,
      operador1: "",
      operador2: "",
      observacion: "",
      recaudacion: 0,
      estado: "M",
    });

    toast.current.show({
      severity: "success",
      summary: "Éxito",
      detail: "Acta de entrega creada",
    });
  };
  // const [dialogVisible, setDialogVisible] = useState(false);

  const addNewActa1 = () => {
    // Cerrar el diálogo actual si es necesario
    setDialogVisible(false);

    // Generar el nuevo ID y formatear el acta
    const newId = Math.max(...actas.map((acta) => acta.actaId)) + 1;
    const formattedActa = {
      ...newActa,
      actaId: newId,
      fecha: new Date().toLocaleDateString(),
    };

    // Aquí podrías guardar el `formattedActa` en el estado o enviarlo a una API

    // Abrir el diálogo `actaentregapopup`
    setDialogVisible(true);
  };

  // Abrir el popup
  const openPopup = () => {
    setModalVisible(true); // Abre el popup
  };

  // Handle pagination
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="sistema-integrado-qmagic">
      <Toast ref={toast} />
      {/* {actaDialog} */}
      <div className="h-50 bg-gray-500 pb-4">
        {" "}
        {/* Fondo gris claro para toda la pantalla */}
        {/* Panel del título */}
        <div className="bg-gray-500 text-white p-3 w-full">
          <h5>Creación de Acta Entrega</h5>
        </div>
        {/* Contenido principal */}
        <div className="p-2">
          {" "}
          {/* Espaciado alrededor del contenido */}
          {/* Search Section */}
          <Card className="m-3 mt-0">
            <h5>Búsqueda de Acta Entrega</h5>
            <p className="text-sm text-gray-600">
              En el siguiente formulario puede buscar un registro
              correspondiente a los parámetros ingresados.
            </p>

            <div className="flex flex-nowrap gap-4 align-items-end">
              <div className="w-20rem">
                <span className="block font-bold text-sm mb-1">
                  CORRELATIVO
                </span>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <Checkbox checked={true} />
                  </span>
                  <InputText
                    value={correlativo}
                    onChange={(e) => setCorrelativo(e.target.value)}
                    className="p-inputtext-sm"
                  />
                </div>
              </div>

              <div className="w-20rem">
                <span className="block font-bold text-sm mb-1">FECHA</span>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <Checkbox checked={true} />
                  </span>
                  <Calendar
                    value={fecha}
                    onChange={(e) => setFecha(e.value)}
                    showIcon
                    className="p-inputtext-sm"
                  />
                </div>
              </div>

              <div className="w-20rem">
                <span className="block font-bold text-sm mb-1">ESTADO</span>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <Checkbox checked={true} />
                  </span>
                  <InputText
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="p-inputtext-sm"
                  />
                </div>
              </div>

              <div className="w-20rem">
                <Button
                  label="BUSCAR DATOS DE ACTA ENTREGA"
                  icon="pi pi-search"
                  className="p-button-rounded p-button-info p-button-sm w-full"
                  onClick={searchActa}
                />
              </div>
            </div>
          </Card>
          {/* DataTable */}
          <Card className="m-3 mt-3">
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
            <DataTable
              value={actas}
              responsiveLayout="scroll"
              className="p-datatable-sm text-xs"
              showGridlines
            >
              <Column
                field="actaId"
                header="ACTA ID"
                className="text-xs py-1 px-2"
              />
              <Column
                field="correlativo"
                header="CORRELATIVO"
                className="text-xs py-1 px-2"
              />
              <Column
                field="punto"
                header="PUNTO RECAUDACIÓN"
                className="text-xs py-1 px-2"
              />
              <Column
                field="fecha"
                header="FECHA"
                className="text-xs py-1 px-2"
              />
              <Column
                field="grupo"
                header="GRUPO"
                className="text-xs py-1 px-2"
              />
              <Column
                field="operador1"
                header="OPERADOR 1ER TURNO"
                className="text-xs py-1 px-2"
              />
              <Column
                field="operador2"
                header="OPERADOR 2DO TURNO"
                className="text-xs py-1 px-2"
              />
              <Column
                field="observacion"
                header="OBSERVACIÓN"
                className="text-xs py-1 px-2"
              />
              <Column
                field="recaudacion"
                header="RECAUDACIÓN TOTAL BS"
                className="text-xs py-1 px-2"
                body={(rowData) => rowData.recaudacion.toFixed(2)}
              />
              <Column
                field="estado"
                header="ESTADO"
                className="text-xs py-1 px-2"
              />
              <Column
                body={actionTemplate}
                header=""
                className="text-xs py-1 px-2"
              />
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
          </Card>
          {/* Floating Action Button */}
          <div style={{ position: "fixed", bottom: "2rem", right: "2rem" }}>
            <Button
              icon="pi pi-plus"
              className="p-button-rounded p-button-info shadow-8"
              style={{ width: "3rem", height: "3rem", fontSize: "1.5rem" }} // Tamaño personalizado
              onClick={openPopup} // Abre el popup
            />
          </div>
          <div>
            {/* Otros componentes y lógica */}

            {/* <button onClick={addNewActa}>Agregar Nueva Acta</button> */}

            {/* Renderizar el popup condicionalmente */}
            {modalVisible && (
              <ActaEntregaPopup
                visible={modalVisible}
                onHide={() => setModalVisible(false)} // Cierra el popup
                actaData={newActa} // Pasar los datos del acta si es necesario
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActaEntregaSystem;
