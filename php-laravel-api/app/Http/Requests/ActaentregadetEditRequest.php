<?php
namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class ActaentregadetEditRequest extends FormRequest
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
            
				"ae_actaid" => "nullable|numeric",
				"servicio_id" => "filled|numeric",
				"aed_desdenumero" => "nullable|numeric",
				"aed_hastanumero" => "nullable|numeric",
				"aed_vendidohasta" => "nullable|numeric",
				"aed_cantidad" => "nullable|numeric",
				"aed_importebs" => "nullable|numeric",
				"aed_estado" => "nullable|string",
				"aed_preciounitario" => "nullable|numeric",
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
