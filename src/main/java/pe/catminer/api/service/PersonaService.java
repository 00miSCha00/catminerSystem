package pe.catminer.api.service;

import java.util.List;

import pe.catminer.api.request.PersonaRequest;
import pe.catminer.api.response.PersonaResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;

public interface PersonaService {

	public List<PersonaResponse> listarPersonas(PersonaRequest req);
	
	public RespuestaGeneralResponse grabarPersona(PersonaRequest req);
		
}
