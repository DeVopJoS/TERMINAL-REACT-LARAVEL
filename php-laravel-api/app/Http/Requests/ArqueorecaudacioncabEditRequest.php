<?php
namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class ArqueorecaudacioncabEditRequest extends FormRequest
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
            
				"arqueocorrelativo" => "nullable|numeric",
				"arqueofecha" => "filled|date",
				"arqueoturno" => "nullable|string",
				"punto_recaud_id" => "filled",
				"arqueonombreoperador" => "nullable",
				"arqueousuario" => "nullable|numeric",
				"arqueofecharegistro" => "nullable|date",
				"arqueoid" => "nullable|numeric",
				"arqueoestado" => "nullable|string",
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
