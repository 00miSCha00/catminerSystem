package pe.catminer.api.service;

import java.util.List;

import pe.catminer.api.request.SedeRequest;
import pe.catminer.api.response.SedeResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;

public interface SedeService {

	public List<SedeResponse> listarSedes(SedeRequest req);
	
	public RespuestaGeneralResponse grabarSede(SedeRequest req);
		
}
