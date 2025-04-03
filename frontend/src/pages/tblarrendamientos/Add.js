import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const TblarrendamientosAddPage = (props) => {
    const app = useApp();
    
    //form validation rules
    const validationSchema = yup.object().shape({
        ambiente_id: yup.string().nullable().label("Ambiente Id"),
        num_contrato: yup.string().required().label("Num Contrato"),
        operador_nombre: yup.string().required().label("Operador Nombre"),
        arrendatario_nombre: yup.string().required().label("Arrendatario Nombre"),
        arrendatario_apellido_paterno: yup.string().nullable().label("Arrendatario Apellido Paterno"),
        arrendatario_apellido_materno: yup.string().nullable().label("Arrendatario Apellido Materno"),
        arrendatario_ci: yup.string().nullable().label("Arrendatario Ci"),
        arrendatario_nombre_comercial: yup.string().required().label("Arrendatario Nombre Comercial"),
        arrendatario_telefono: yup.string().nullable().label("Arrendatario Telefono"),
        arrendatario_celular: yup.string().nullable().label("Arrendatario Celular"),
        ambiente_codigo: yup.string().required().label("Ambiente Codigo"),
        arrendamiento_fecha_inicio: yup.string().required().label("Arrendamiento Fecha Inicio"),
        arrendamiento_fecha_fin: yup.string().required().label("Arrendamiento Fecha Fin"),
        arrendamiento_canon: yup.number().required().label("Arrendamiento Canon"),
        arrendamiento_funcion: yup.string().nullable().label("Arrendamiento Funcion"),
        arrendamiento_forma_pago: yup.string().nullable().label("Arrendamiento Forma Pago"),
        arrendamiento_estado: yup.string().nullable().label("Arrendamiento Estado"),
        arrendamiento_fecha: yup.string().nullable().label("Arrendamiento Fecha")
    });
    
    //form default values
    const formDefaultValues = {
        ambiente_id: '', 
        num_contrato: '', 
        operador_nombre: '', 
        arrendatario_nombre: '', 
        arrendatario_apellido_paterno: '', 
        arrendatario_apellido_materno: '', 
        arrendatario_ci: '', 
        arrendatario_nombre_comercial: '', 
        arrendatario_telefono: '', 
        arrendatario_celular: '', 
        ambiente_codigo: '', 
        arrendamiento_fecha_inicio: new Date(), 
        arrendamiento_fecha_fin: new Date(), 
        arrendamiento_canon: '', 
        arrendamiento_funcion: '', 
        arrendamiento_forma_pago: '', 
        arrendamiento_estado: '', 
        arrendamiento_fecha: new Date(), 
    }
    
    //page hook where logics resides
    const pageController = useAddPage({ props, formDefaultValues, afterSubmit });
    
    // destructure and grab what the page needs
    const { formData, resetForm, handleSubmit, submitForm, pageReady, loading, saving, inputClassName } = pageController;
    
    //event raised after form submit
    function afterSubmit(response){
        app.flashMsg(props.msgTitle, props.msgAfterSave);
        resetForm();
        if(app.isDialogOpen()){
            app.closeDialogs(); // if page is open as dialog, close dialog
        }
        else if(props.redirect) {
            app.navigate(`/tblarrendamientos`);
        }
    }
    
    function AmbienteIdItemTemplate(data){
        if(data){
            return (
                <div className="">
                    <div className="font-bold">{data.label}</div>
                    <div className="text-sm text-500">{data.caption}</div>
                </div>
            );
        }
    }
    
    function AmbienteIdValueTemplate(data, props){
        if(data){
            return (
                <div className="">
                    <div className="font-bold">{data.label}</div>
                    <div className="text-sm text-500">{data.caption}</div>
                </div>
            );
        }
        return (<span>{props.placeholder}</span>);
    }
    
    // page loading form data from api
    if(loading){
        return (
            <div className="p-3 text-center">
                <ProgressSpinner style={{width:'50px', height:'50px'}} />
            </div>
        );
    }
    
    //page has loaded any required data and ready to render
    if(pageReady){
        return (
            <main id="TblarrendamientosAddPage" className="main-page">
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
                                <Title title="Agregar Nuevo Arrendamiento" titleClass="text-2xl text-primary font-bold" subTitleClass="text-500" separator={false} />
                            </div>
                        </div>
                    </div>
                </section>
                }
                <section className="page-section" >
                    <div className="container">
                        <div className="grid justify-content-center">
                            <div className="md:col-10 sm:col-12 comp-grid" >
                                <div >
                                    <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values, actions) =>submitForm(values)}>
                                        {(formik) => 
                                        <>
                                        <Form className={`${!props.isSubPage ? 'card p-3' : ''}`}>
                                            <div className="grid">
                                                <div className="col-12">
                                                    <div className="text-xl font-semibold text-primary mb-3">Información del Contrato</div>
                                                </div>
                                                
                                                {/* Contract Information */}
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="num_contrato" className="block mb-2 font-medium">Número de Contrato *</label>
                                                            <InputText id="num_contrato" name="num_contrato" onChange={formik.handleChange} value={formik.values.num_contrato} 
                                                                placeholder="Escribir Num Contrato" className={`w-full ${inputClassName(formik?.errors?.num_contrato)}`} />
                                                            <ErrorMessage name="num_contrato" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="ambiente_id" className="block mb-2 font-medium">Ambiente</label>
                                                            <DataSource apiPath="components_data/ambiente_id_option_list">
                                                                {({ response }) => 
                                                                <>
                                                                <Dropdown id="ambiente_id" name="ambiente_id" optionLabel="label" optionValue="value" 
                                                                    value={formik.values.ambiente_id} onChange={formik.handleChange} 
                                                                    options={response} placeholder="Seleccione un valor" 
                                                                    className={`w-full ${inputClassName(formik?.errors?.ambiente_id)}`} 
                                                                    valueTemplate={AmbienteIdValueTemplate} 
                                                                    itemTemplate={AmbienteIdItemTemplate} />
                                                                <ErrorMessage name="ambiente_id" component="span" className="p-error" />
                                                                </>
                                                                }
                                                            </DataSource>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="ambiente_codigo" className="block mb-2 font-medium">Código de Ambiente *</label>
                                                            <InputText id="ambiente_codigo" name="ambiente_codigo" onChange={formik.handleChange} 
                                                                value={formik.values.ambiente_codigo} placeholder="Escribir Ambiente Codigo" 
                                                                className={`w-full ${inputClassName(formik?.errors?.ambiente_codigo)}`} />
                                                            <ErrorMessage name="ambiente_codigo" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="operador_nombre" className="block mb-2 font-medium">Nombre del Operador *</label>
                                                            <InputText id="operador_nombre" name="operador_nombre" onChange={formik.handleChange} 
                                                                value={formik.values.operador_nombre} placeholder="Escribir Operador Nombre" 
                                                                className={`w-full ${inputClassName(formik?.errors?.operador_nombre)}`} />
                                                            <ErrorMessage name="operador_nombre" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Divider */}
                                                <div className="col-12">
                                                    <hr className="my-3" />
                                                    <div className="text-xl font-semibold text-primary mb-3">Información del Arrendatario</div>
                                                </div>
                                                
                                                {/* Tenant Information */}
                                                <div className="col-12 md:col-4">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendatario_nombre" className="block mb-2 font-medium">Nombre *</label>
                                                            <InputText id="arrendatario_nombre" name="arrendatario_nombre" onChange={formik.handleChange} 
                                                                value={formik.values.arrendatario_nombre} placeholder="Escribir Nombre" 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendatario_nombre)}`} />
                                                            <ErrorMessage name="arrendatario_nombre" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-4">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendatario_apellido_paterno" className="block mb-2 font-medium">Apellido Paterno</label>
                                                            <InputText id="arrendatario_apellido_paterno" name="arrendatario_apellido_paterno" 
                                                                onChange={formik.handleChange} value={formik.values.arrendatario_apellido_paterno} 
                                                                placeholder="Escribir Apellido Paterno" 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendatario_apellido_paterno)}`} />
                                                            <ErrorMessage name="arrendatario_apellido_paterno" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-4">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendatario_apellido_materno" className="block mb-2 font-medium">Apellido Materno</label>
                                                            <InputText id="arrendatario_apellido_materno" name="arrendatario_apellido_materno" 
                                                                onChange={formik.handleChange} value={formik.values.arrendatario_apellido_materno} 
                                                                placeholder="Escribir Apellido Materno" 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendatario_apellido_materno)}`} />
                                                            <ErrorMessage name="arrendatario_apellido_materno" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-4">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendatario_ci" className="block mb-2 font-medium">CI/DNI</label>
                                                            <InputText id="arrendatario_ci" name="arrendatario_ci" onChange={formik.handleChange} 
                                                                value={formik.values.arrendatario_ci} placeholder="Escribir CI/DNI" 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendatario_ci)}`} />
                                                            <ErrorMessage name="arrendatario_ci" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-8">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendatario_nombre_comercial" className="block mb-2 font-medium">Nombre Comercial *</label>
                                                            <InputText id="arrendatario_nombre_comercial" name="arrendatario_nombre_comercial" 
                                                                onChange={formik.handleChange} value={formik.values.arrendatario_nombre_comercial} 
                                                                placeholder="Escribir Nombre Comercial" 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendatario_nombre_comercial)}`} />
                                                            <ErrorMessage name="arrendatario_nombre_comercial" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendatario_telefono" className="block mb-2 font-medium">Teléfono</label>
                                                            <InputText id="arrendatario_telefono" name="arrendatario_telefono" onChange={formik.handleChange} 
                                                                value={formik.values.arrendatario_telefono} placeholder="Escribir Teléfono" 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendatario_telefono)}`} />
                                                            <ErrorMessage name="arrendatario_telefono" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendatario_celular" className="block mb-2 font-medium">Celular</label>
                                                            <InputText id="arrendatario_celular" name="arrendatario_celular" onChange={formik.handleChange} 
                                                                value={formik.values.arrendatario_celular} placeholder="Escribir Celular" 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendatario_celular)}`} />
                                                            <ErrorMessage name="arrendatario_celular" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Divider */}
                                                <div className="col-12">
                                                    <hr className="my-3" />
                                                    <div className="text-xl font-semibold text-primary mb-3">Detalles del Arrendamiento</div>
                                                </div>
                                                
                                                {/* Lease Details */}
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendamiento_fecha_inicio" className="block mb-2 font-medium">Fecha de Inicio *</label>
                                                            <Calendar id="arrendamiento_fecha_inicio" name="arrendamiento_fecha_inicio" showButtonBar 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendamiento_fecha_inicio)}`} 
                                                                dateFormat="yy-mm-dd" value={formik.values.arrendamiento_fecha_inicio} 
                                                                onChange={formik.handleChange} showIcon />
                                                            <ErrorMessage name="arrendamiento_fecha_inicio" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendamiento_fecha_fin" className="block mb-2 font-medium">Fecha de Fin *</label>
                                                            <Calendar id="arrendamiento_fecha_fin" name="arrendamiento_fecha_fin" showButtonBar 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendamiento_fecha_fin)}`} 
                                                                dateFormat="yy-mm-dd" value={formik.values.arrendamiento_fecha_fin} 
                                                                onChange={formik.handleChange} showIcon />
                                                            <ErrorMessage name="arrendamiento_fecha_fin" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendamiento_canon" className="block mb-2 font-medium">Canon de Arrendamiento *</label>
                                                            <InputText id="arrendamiento_canon" name="arrendamiento_canon" onChange={formik.handleChange} 
                                                                value={formik.values.arrendamiento_canon} type="number" placeholder="Escribir Canon" 
                                                                min={0} step={0.1} className={`w-full ${inputClassName(formik?.errors?.arrendamiento_canon)}`} />
                                                            <ErrorMessage name="arrendamiento_canon" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendamiento_forma_pago" className="block mb-2 font-medium">Forma de Pago</label>
                                                            <InputText id="arrendamiento_forma_pago" name="arrendamiento_forma_pago" onChange={formik.handleChange} 
                                                                value={formik.values.arrendamiento_forma_pago} placeholder="Ej: Mensual, Trimestral" 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendamiento_forma_pago)}`} />
                                                            <ErrorMessage name="arrendamiento_forma_pago" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendamiento_funcion" className="block mb-2 font-medium">Función/Uso del Local</label>
                                                            <InputTextarea id="arrendamiento_funcion" name="arrendamiento_funcion" rows={3}
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendamiento_funcion)}`} 
                                                                value={formik.values.arrendamiento_funcion} 
                                                                placeholder="Describir la función o uso del local" onChange={formik.handleChange} />
                                                            <ErrorMessage name="arrendamiento_funcion" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendamiento_estado" className="block mb-2 font-medium">Estado</label>
                                                            <Dropdown id="arrendamiento_estado" name="arrendamiento_estado" 
                                                                value={formik.values.arrendamiento_estado} onChange={formik.handleChange} 
                                                                options={[
                                                                    {label: 'Activo', value: 'Activo'},
                                                                    {label: 'Pendiente', value: 'Pendiente'},
                                                                    {label: 'Finalizado', value: 'Finalizado'}
                                                                ]} 
                                                                placeholder="Seleccione un estado" 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendamiento_estado)}`} />
                                                            <ErrorMessage name="arrendamiento_estado" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-12 md:col-6">
                                                    <div className="formgrid grid mb-3">
                                                        <div className="col-12">
                                                            <label htmlFor="arrendamiento_fecha" className="block mb-2 font-medium">Fecha de Registro</label>
                                                            <Calendar id="arrendamiento_fecha" name="arrendamiento_fecha" 
                                                                value={formik.values.arrendamiento_fecha} onChange={formik.handleChange} 
                                                                showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24" showIcon 
                                                                className={`w-full ${inputClassName(formik?.errors?.arrendamiento_fecha)}`} />
                                                            <ErrorMessage name="arrendamiento_fecha" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            { props.showFooter && 
                                            <div className="flex justify-content-end mt-4">
                                                <Button onClick={() => app.navigate(-1)} label="Cancelar" icon="pi pi-times" 
                                                    className="p-button-secondary mr-2" type="button" />
                                                <Button onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" 
                                                    type="submit" label="Guardar" icon="pi pi-save" loading={saving} />
                                            </div>
                                            }
                                        </Form>
                                        </>
                                        }
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

//page props and default values
TblarrendamientosAddPage.defaultProps = {
    primaryKey: 'arrendamiento_id',
    pageName: 'tblarrendamientos',
    apiPath: 'tblarrendamientos/add',
    routeName: 'tblarrendamientosadd',
    submitButtonLabel: "Guardar",
    formValidationError: "El formulario no es válido",
    formValidationMsg: "Por favor complete el formulario",
    msgTitle: "Crear registro",
    msgAfterSave: "Registro agregado exitosamente",
    msgBeforeSave: "",
    showHeader: true,
    showFooter: true,
    redirect: true,
    isSubPage: false
}
export default TblarrendamientosAddPage;