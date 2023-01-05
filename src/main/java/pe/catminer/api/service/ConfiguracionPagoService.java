package pe.catminer.api.service;

import java.util.List;

import pe.catminer.api.request.ConfiguracionPagoRequest;
import pe.catminer.api.response.ConfiguracionPagoResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;

public interface ConfiguracionPagoService {

	public List<ConfiguracionPagoResponse> listarConfiguracionPagos(ConfiguracionPagoRequest req);
	
	public RespuestaGeneralResponse grabarConfiguracionPago(ConfiguracionPagoRequest req);
		
}
