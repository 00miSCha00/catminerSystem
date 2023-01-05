package pe.catminer.api.service;

import java.util.List;

import pe.catminer.api.request.TipoPagoRequest;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.response.TipoPagoResponse;

public interface TipoPagoService {

	public List<TipoPagoResponse> listarTipoPagos(TipoPagoRequest req);
	
	public RespuestaGeneralResponse grabarTipoPago(TipoPagoRequest req);
		
}
