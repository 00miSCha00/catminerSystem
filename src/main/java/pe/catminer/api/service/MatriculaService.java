package pe.catminer.api.service;

import java.util.List;

import pe.catminer.api.request.MatriculaRequest;
import pe.catminer.api.response.MatriculaResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;

public interface MatriculaService {

	public RespuestaGeneralResponse matricular(MatriculaRequest req);
	
	public List<MatriculaResponse> listarPersonasMatricula(MatriculaRequest req);
		
}
