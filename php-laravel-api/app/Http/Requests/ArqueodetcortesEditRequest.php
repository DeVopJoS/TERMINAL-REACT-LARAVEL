<?php
namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class ArqueodetcortesEditRequest extends FormRequest
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
            
				"arqueodetcorteid" => "filled|numeric",
				"arqueoid" => "nullable|numeric",
				"arqueocorte200_00" => "nullable|numeric",
				"arqueocorte100_00" => "nullable|numeric",
				"arqueocorte050_00" => "nullable|numeric",
				"arqueocorte020_00" => "nullable|numeric",
				"arqueocorte010_00" => "nullable|numeric",
				"arqueocorte005_00" => "nullable|numeric",
				"arqueocorte002_00" => "nullable|numeric",
				"arqueocorte001_00" => "nullable|numeric",
				"arqueocorte000_50" => "nullable|numeric",
				"arqueocorte000_20" => "nullable|numeric",
				"arqueocorte000_10" => "nullable|numeric",
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
