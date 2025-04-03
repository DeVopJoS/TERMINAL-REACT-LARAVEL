import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const TbledificioambienteAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		edificio_id: yup.string().required().label("Edificio Id"),
		nivel_id: yup.string().required().label("Nivel Id"),
		seccion_id: yup.string().required().label("Seccion Id"),
		ambiente_nombre: yup.string().required().label("Ambiente Nombre"),
		ambiente_tamano: yup.number().nullable().label("Ambiente Tamano"),
		ambiente_tipo_uso: yup.string().nullable().label("Ambiente Tipo Uso"),
		ambiente_precio_alquiler: yup.number().nullable().label("Ambiente Precio Alquiler"),
		ambiente_codigo_interno: yup.string().nullable().label("Ambiente Codigo Interno"),
		ambiente_superficie_m2: yup.number().nullable().label("Ambiente Superficie M2"),
		ambiente_estado: yup.string().required().label("Ambiente Estado")
	});
	
	//form default values
	const formDefaultValues = {
		edificio_id: '', 
		nivel_id: '', 
		seccion_id: '', 
		ambiente_nombre: '', 
		ambiente_tamano: '', 
		ambiente_tipo_uso: '', 
		ambiente_precio_alquiler: '', 
		ambiente_codigo_interno: '', 
		ambiente_superficie_m2: '', 
		ambiente_estado: '', 
	}
	
	//page hook where logics resides
	const pageController =  useAddPage({ props, formDefaultValues, afterSubmit });
	
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
			app.navigate(`/tbledificioambiente`);
		}
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
<main id="TbledificioambienteAddPage" className="main-page">
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
                    <Title title="Add New Tbl Edificio Ambiente"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
<section className="page-section">
  <div className="container">
    <div className="grid">
      <div className="md:col-10 md:col-offset-1 sm:col-12 comp-grid">
        <div>
          <Formik 
            initialValues={formData} 
            validationSchema={validationSchema} 
            onSubmit={(values, actions) => submitForm(values)}
          >
            {(formik) => (
              <>
                <Form className={`${!props.isSubPage ? 'card p-4 shadow-md' : ''}`}>
                  <h3 className="text-xl font-medium mb-4 text-center">Información del Ambiente</h3>
                  
                  {/* Sección de ubicación */}
                  <div className="mb-4 pb-3 border-bottom-1 border-300">
                    <h4 className="text-lg font-medium mb-3">Ubicación</h4>
                    <div className="grid">
                      <div className="col-12 md:col-4 mb-3">
                        <label htmlFor="edificio_id" className="block font-medium mb-2">Edificio *</label>
                        <DataSource apiPath="components_data/edificio_id_option_list">
                          {({ response }) => (
                            <>
                              <Dropdown
                                id="edificio_id"
                                name="edificio_id"
                                optionLabel="label"
                                optionValue="value"
                                value={formik.values.edificio_id}
                                onChange={formik.handleChange}
                                options={response}
                                placeholder="Seleccione un edificio..."
                                className={`w-full ${inputClassName(formik?.errors?.edificio_id)}`}
                              />
                              <ErrorMessage name="edificio_id" component="span" className="p-error" />
                            </>
                          )}
                        </DataSource>
                      </div>
                      <div className="col-12 md:col-4 mb-3">
                        <label htmlFor="nivel_id" className="block font-medium mb-2">Nivel *</label>
                        <DataSource apiPath="components_data/nivel_id_option_list">
                          {({ response }) => (
                            <>
                              <Dropdown
                                id="nivel_id"
                                name="nivel_id"
                                optionLabel="label"
                                optionValue="value"
                                value={formik.values.nivel_id}
                                onChange={formik.handleChange}
                                options={response}
                                placeholder="Seleccione un nivel..."
                                className={`w-full ${inputClassName(formik?.errors?.nivel_id)}`}
                              />
                              <ErrorMessage name="nivel_id" component="span" className="p-error" />
                            </>
                          )}
                        </DataSource>
                      </div>
                      <div className="col-12 md:col-4 mb-3">
                        <label htmlFor="seccion_id" className="block font-medium mb-2">Sección *</label>
                        <DataSource apiPath="components_data/seccion_id_option_list">
                          {({ response }) => (
                            <>
                              <Dropdown
                                id="seccion_id"
                                name="seccion_id"
                                optionLabel="label"
                                optionValue="value"
                                value={formik.values.seccion_id}
                                onChange={formik.handleChange}
                                options={response}
                                placeholder="Seleccione una sección..."
                                className={`w-full ${inputClassName(formik?.errors?.seccion_id)}`}
                              />
                              <ErrorMessage name="seccion_id" component="span" className="p-error" />
                            </>
                          )}
                        </DataSource>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sección de información básica */}
                  <div className="mb-4 pb-3 border-bottom-1 border-300">
                    <h4 className="text-lg font-medium mb-3">Información Básica</h4>
                    <div className="grid">
                      <div className="col-12 mb-3">
                        <label htmlFor="ambiente_nombre" className="block font-medium mb-2">Nombre del Ambiente *</label>
                        <InputTextarea
                          id="ambiente_nombre"
                          name="ambiente_nombre"
                          className={`w-full ${inputClassName(formik?.errors?.ambiente_nombre)}`}
                          value={formik.values.ambiente_nombre}
                          placeholder="Ingrese el nombre del ambiente"
                          onChange={formik.handleChange}
                          rows={2}
                        />
                        <ErrorMessage name="ambiente_nombre" component="span" className="p-error" />
                      </div>
                      <div className="col-12 md:col-6 mb-3">
                        <label htmlFor="ambiente_codigo_interno" className="block font-medium mb-2">Código Interno</label>
                        <InputText
                          id="ambiente_codigo_interno"
                          name="ambiente_codigo_interno"
                          className={`w-full ${inputClassName(formik?.errors?.ambiente_codigo_interno)}`}
                          value={formik.values.ambiente_codigo_interno}
                          placeholder="Ingrese el código interno"
                          onChange={formik.handleChange}
                        />
                        <ErrorMessage name="ambiente_codigo_interno" component="span" className="p-error" />
                      </div>
                      <div className="col-12 md:col-6 mb-3">
                        <label htmlFor="ambiente_estado" className="block font-medium mb-2">Estado *</label>
                        <Dropdown
                          id="ambiente_estado"
                          name="ambiente_estado"
                          value={formik.values.ambiente_estado}
                          onChange={formik.handleChange}
                          options={[
                            { label: 'Activo', value: 'A' },
                            { label: 'Inactivo', value: 'I' },
                            { label: 'Mantenimiento', value: 'M' }
                          ]}
                          placeholder="Seleccione un estado"
                          className={`w-full ${inputClassName(formik?.errors?.ambiente_estado)}`}
                        />
                        <ErrorMessage name="ambiente_estado" component="span" className="p-error" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Sección de características */}
                  <div className="mb-4 pb-3 border-bottom-1 border-300">
                    <h4 className="text-lg font-medium mb-3">Características</h4>
                    <div className="grid">
                      <div className="col-12 md:col-6 lg:col-4 mb-3">
                        <label htmlFor="ambiente_tamano" className="block font-medium mb-2">Tamaño</label>
                        <div className="p-inputgroup">
                          <InputText
                            id="ambiente_tamano"
                            name="ambiente_tamano"
                            onChange={formik.handleChange}
                            value={formik.values.ambiente_tamano}
                            type="number"
                            placeholder="Tamaño"
                            min={0}
                            step={0.1}
                            className={`w-full ${inputClassName(formik?.errors?.ambiente_tamano)}`}
                          />
                          <span className="p-inputgroup-addon">m</span>
                        </div>
                        <ErrorMessage name="ambiente_tamano" component="span" className="p-error" />
                      </div>
                      <div className="col-12 md:col-6 lg:col-4 mb-3">
                        <label htmlFor="ambiente_superficie_m2" className="block font-medium mb-2">Superficie</label>
                        <div className="p-inputgroup">
                          <InputText
                            id="ambiente_superficie_m2"
                            name="ambiente_superficie_m2"
                            onChange={formik.handleChange}
                            value={formik.values.ambiente_superficie_m2}
                            type="number"
                            placeholder="Superficie"
                            min={0}
                            step={0.1}
                            className={`w-full ${inputClassName(formik?.errors?.ambiente_superficie_m2)}`}
                          />
                          <span className="p-inputgroup-addon">m²</span>
                        </div>
                        <ErrorMessage name="ambiente_superficie_m2" component="span" className="p-error" />
                      </div>
                      <div className="col-12 md:col-12 lg:col-4 mb-3">
                        <label htmlFor="ambiente_tipo_uso" className="block font-medium mb-2">Tipo de Uso</label>
                        <Dropdown
                          id="ambiente_tipo_uso"
                          name="ambiente_tipo_uso"
                          value={formik.values.ambiente_tipo_uso}
                          onChange={formik.handleChange}
                          options={[
                            { label: 'Oficina', value: 'Oficina' },
                            { label: 'Comercial', value: 'Comercial' },
                            { label: 'Residencial', value: 'Residencial' },
                            { label: 'Educativo', value: 'Educativo' },
                            { label: 'Almacén', value: 'Almacén' },
                            { label: 'Otro', value: 'Otro' }
                          ]}
                          placeholder="Seleccione un tipo de uso"
                          className={`w-full ${inputClassName(formik?.errors?.ambiente_tipo_uso)}`}
                        />
                        <ErrorMessage name="ambiente_tipo_uso" component="span" className="p-error" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Sección financiera */}
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-3">Información Financiera</h4>
                    <div className="grid">
                      <div className="col-12 md:col-6">
                        <label htmlFor="ambiente_precio_alquiler" className="block font-medium mb-2">Precio de Alquiler</label>
                        <div className="p-inputgroup">
                          <span className="p-inputgroup-addon">$</span>
                          <InputText
                            id="ambiente_precio_alquiler"
                            name="ambiente_precio_alquiler"
                            onChange={formik.handleChange}
                            value={formik.values.ambiente_precio_alquiler}
                            type="number"
                            placeholder="Precio de alquiler"
                            min={0}
                            step={0.1}
                            className={`w-full ${inputClassName(formik?.errors?.ambiente_precio_alquiler)}`}
                          />
                        </div>
                        <ErrorMessage name="ambiente_precio_alquiler" component="span" className="p-error" />
                      </div>
                    </div>
                  </div>
                  
                  {props.showFooter && (
                    <div className="flex justify-content-center gap-2 mt-4">
                      <Button 
                        type="button" 
                        label="Cancelar" 
                        icon="pi pi-times" 
                        className="p-button-secondary" 
                        onClick={() => formik.resetForm()}
                      />
                      <Button 
                        onClick={(e) => handleSubmit(e, formik)} 
                        className="p-button-primary" 
                        type="submit" 
                        label="Guardar" 
                        icon="pi pi-save" 
                        loading={saving} 
                      />
                    </div>
                  )}
                </Form>
              </>
            )}
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
TbledificioambienteAddPage.defaultProps = {
	primaryKey: 'ambiente_id',
	pageName: 'tbledificioambiente',
	apiPath: 'tbledificioambiente/add',
	routeName: 'tbledificioambienteadd',
	submitButtonLabel: "Submit",
	formValidationError: "Form is invalid",
	formValidationMsg: "Please complete the form",
	msgTitle: "Create Record",
	msgAfterSave: "Record added successfully",
	msgBeforeSave: "",
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default TbledificioambienteAddPage;
