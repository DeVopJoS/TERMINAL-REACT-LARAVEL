<?php
namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class TblFacturaDetalleAddRequest extends FormRequest
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
            
				"factura_id" => "nullable|numeric",
				"arrendamiento_id" => "nullable|numeric",
				"fact_detalle_periodo_pago" => "required",
				"fact_detalle_canon_alquiler" => "required|numeric",
				"fact_detalle_morosidad_penalidad" => "nullable|numeric",
				"fact_detalle_dias_morosidad" => "nullable|numeric",
				"fact_detalle_total_mora" => "nullable|numeric",
				"fact_detalle_importe_bs" => "required|numeric",
				"fact_detalle_observaciones" => "nullable",
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
