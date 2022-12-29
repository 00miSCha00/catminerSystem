package pe.catminer.api.service;

import java.util.List;

import pe.catminer.api.request.TipoCarreraRequest;
import pe.catminer.api.response.TipoCarreraResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;

public interface CarreraService {

	public List<TipoCarreraResponse> listarTipoCarreras(TipoCarreraRequest req);
	
	public RespuestaGeneralResponse grabarTipoCarrera(TipoCarreraRequest req);
		
}
