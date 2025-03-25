<?php
namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class ArqueocabEditRequest extends FormRequest
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
            
				"arqueoid" => "filled|numeric",
				"arqueonumero" => "filled|numeric",
				"arqueofecha" => "filled|date",
				"arqueoturno" => "filled|string",
				"arqueohorainicio" => "filled|date",
				"arqueohorafin" => "filled|date",
				"arqueosupervisor" => "nullable|numeric",
				"arqueorealizadopor" => "nullable|numeric",
				"arqueorevisadopor" => "nullable|numeric",
				"arqueorecaudaciontotal" => "nullable|numeric",
				"arqueodiferencia" => "nullable|numeric",
				"arqueoobservacion" => "nullable",
				"arqueoestado" => "nullable|string",
				"arqueofecharegistro" => "nullable|date",
				"arqueousuario" => "nullable|numeric",
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
