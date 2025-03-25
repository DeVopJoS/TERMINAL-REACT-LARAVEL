<?php
namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class TblArrendamientosEditRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
		
        return [
            
				"ambiente_id" => "nullable|numeric",
				"num_contrato" => "filled|string",
				"operador_nombre" => "filled|string",
				"arrendatario_nombre" => "filled",
				"arrendatario_apellido_paterno" => "nullable|string",
				"arrendatario_apellido_materno" => "nullable|string",
				"arrendatario_ci" => "nullable|string",
				"arrendatario_nombre_comercial" => "filled",
				"arrendatario_telefono" => "nullable|string",
				"arrendatario_celular" => "nullable|string",
				"ambiente_codigo" => "filled|string",
				"arrendamiento_fecha_inicio" => "filled|date",
				"arrendamiento_fecha_fin" => "filled|date",
				"arrendamiento_canon" => "filled|numeric",
				"arrendamiento_funcion" => "nullable",
				"arrendamiento_forma_pago" => "nullable|string",
				"arrendamiento_estado" => "nullable|string",
        ];
    }

	public function messages()
    {
        return [
            //using laravel default validation messages
        ];
    }

	/**
     * If validator fails return the exception in json form
     * @param Validator $validator
     * @return array
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
