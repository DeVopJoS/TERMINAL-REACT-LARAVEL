<?php
namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class TblArrendamientosAddRequest extends FormRequest
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
				"num_contrato" => "required|string",
				"operador_nombre" => "required|string",
				"arrendatario_nombre" => "required",
				"arrendatario_apellido_paterno" => "nullable|string",
				"arrendatario_apellido_materno" => "nullable|string",
				"arrendatario_ci" => "nullable|string",
				"arrendatario_nombre_comercial" => "required",
				"arrendatario_telefono" => "nullable|string",
				"arrendatario_celular" => "nullable|string",
				"ambiente_codigo" => "required|string",
				"arrendamiento_fecha_inicio" => "required|date",
				"arrendamiento_fecha_fin" => "required|date",
				"arrendamiento_canon" => "required|numeric",
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
