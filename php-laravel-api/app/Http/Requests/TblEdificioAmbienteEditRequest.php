<?php
namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class TblEdificioAmbienteEditRequest extends FormRequest
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
            
				"edificio_id" => "filled",
				"nivel_id" => "filled",
				"seccion_id" => "filled",
				"ambiente_nombre" => "filled",
				"ambiente_tamano" => "nullable|numeric",
				"ambiente_tipo_uso" => "nullable",
				"ambiente_precio_alquiler" => "nullable|numeric",
				"ambiente_codigo_interno" => "nullable",
				"ambiente_superficie_m2" => "nullable|numeric",
				"ambiente_estado" => "filled|string",
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
