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

const ImportarFacturas = () => {
  const api = useApi();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const breadcrumbItems = [
    { label: "Home", url: "/home" },
    { label: "Importación de Facturas" }
  ];

  const breadcrumbHome = { icon: 'pi pi-home', url: '/home' };

  const onSelectFile = (e) => {
    setUploadedFile(e.files[0]);
    setResponse(null);
    setError(null);
  };

  const onRemoveFile = () => {
    setUploadedFile(null);
    setResponse(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!uploadedFile) {
      setError("Por favor, seleccione un archivo primero");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

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
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: response.data.message,
          life: 3000,
        });
      } else {
        throw new Error(response.data?.message || "Error al importar datos");
      }
    } catch (error) {
      console.error("Error al importar:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Error al importar el archivo"
      );
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          error.response?.data?.message || "Error al procesar la importación",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{props.formatSize}</small>
          </span>
        </div>
        <Tag
          value={file.type.split("/")[1].toUpperCase()}
          severity="info"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => props.onRemove(props.index)}
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
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        <span className="ml-3 font-bold">
          Arrastre y suelte el archivo CSV aquí
        </span>
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      
      <div className="page-header">
        <h2 className="mb-3 mt-3 ml-3">Importación de Facturas</h2>
        <BreadCrumb model={breadcrumbItems} home={breadcrumbHome} className="mb-3 ml-3" />
      </div>

      <Card className="mx-3 mt-3">
        <div className="p-3">
          <h5>Importar Archivo CSV de Facturas</h5>
          <p>
            Seleccione el archivo CSV con la información de facturas que desea
            importar. El archivo debe contener las columnas requeridas.
          </p>

          <FileUpload
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
              <p className="m-0">
                Arrastre y suelte el archivo CSV aquí para cargarlo.
              </p>
            }
          />

          {uploadedFile && (
            <div className="mt-3">
              <h6>Archivo seleccionado:</h6>
              <p>
                <strong>Nombre:</strong> {uploadedFile.name}
                <br />
                <strong>Tamaño:</strong>{" "}
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          {loading && (
            <div className="mt-3">
              <ProgressBar
                mode="indeterminate"
                style={{ height: "6px" }}
              ></ProgressBar>
              <p className="text-center mt-2">Importando datos...</p>
            </div>
          )}

          {error && (
            <div className="mt-3">
              <Message severity="error" text={error} />
            </div>
          )}

          {response && (
            <div className="mt-3">
              <Message
                severity="success"
                text={`${response.message}`}
              />
            </div>
          )}

          <div className="flex justify-content-end mt-3">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-text mr-2"
              onClick={() => navigate("/home")}
              disabled={loading}
            />
            <Button
              label="Importar"
              icon="pi pi-upload"
              className="p-button-primary"
              onClick={handleSubmit}
              disabled={!uploadedFile || loading}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ImportarFacturas;
