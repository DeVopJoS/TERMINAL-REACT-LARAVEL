import { useEffect, useState, useRef } from 'react';
import { Toast } from "primereact/toast";
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Link } from 'react-router-dom';
import axios from "axios";

function PrevaloradasList() {
    const toast = useRef(null);
    const [ actas, setActas ] = useState([]);
    const [ fecha, setFecha ] = useState(null);
    const [ correlativo, setCorrelativo ] = useState("");
    const [ loading, setLoading ] = useState();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => { 
        try {
            setLoading(true);
            const formattedDate = fecha ? fecha.toISOString().split('T')[0] : '';
            let url = '/actas/index?ae_estado=P';

            if(fecha)
                url += `&ae_fecha=${formattedDate}`;

            if(correlativo)
                url+= `&ae_actaid=${correlativo}`
        
            const { data } = await axios.get(url);
            setActas(data);
        } catch (error) {
            console.error("Error al buscar datos:", error);
        } finally{
            setLoading(false);
        }
    }

    const actionTemplate = (rowData) => {
        return (
          <div className="flex gap-2">
            <Link to={`/cajas/registro/prevaloradas/${rowData.ae_actaid}`}>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-button-sm mr-2" />
            </Link>
          </div>
        );
      };

  return (
    <>
        <div className='card'>
            <Toast ref={toast} />
            <h5 className="text-black mb-3 mt-0">Registro de Pre-valoradas</h5>
            
            <div className="grid mb-5">

                <div className="col-12 md:col-3">
                    <InputText type='number' id='ae_actaid' value={correlativo} onChange={(e) => setCorrelativo(e.target.value)} placeholder='Correlativo' className='w-full'/> 
                </div>

                <div className="col-12 md:col-3">
                    <Calendar id='ae_fecha' value={fecha} onChange={(e) => setFecha(e.value)} showIcon className="w-full" placeholder='Fecha'/>
                </div>

                <div className='col-12 md:col-6 flex justify-content-end'>
                    <Button label='Buscar datos de acta de entrega' icon='pi pi-search' onClick={fetchData} className="px-8"/>
                </div>

            </div>

            <DataTable value={actas} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} 
            loading={loading} responsiveLayout="scroll" className="p-datatable-sm text-xs" emptyMessage="No se encontraron actas">
                <Column field="ae_actaid" header="ACTA ID" className="text-xs py-1 px-2" sortable/>
                {/* <Column field="ae_correlativo" header="CORRELATIVO" className="text-xs py-1 px-2"/> */}
                <Column field="punto_recaudacion.puntorecaud_nombre" header="PUNTO RECAUDACIÓN" className="text-xs py-1 px-2" sortable/>
                <Column field="ae_fecha" header="FECHA" className="text-xs py-1 px-2" sortable/>
                <Column field='ae_grupo' header="GRUPO" className="text-xs py-1 px-2" sortable/>
                <Column field="ae_operador1erturno" header="OPERADOR 1ER TURNO" className="text-xs py-1 px-2" sortable/>
                <Column field="ae_operador2doturno" header="OPERADOR 2DO TURNO" className="text-xs py-1 px-2" sortable/>
                <Column field="ae_observacion" header="OBSERVACIÓN" className="text-xs py-1 px-2" sortable/>
                <Column field="ae_recaudaciontotalbs" header="RECAUDACIÓN TOTAL BS" className="text-xs py-1 px-2" sortable/>
                <Column body={actionTemplate} header="ACCIONES" className="text-xs py-1 px-2"/>
            </DataTable>
        </div>
    </>
  )
}

export default PrevaloradasList