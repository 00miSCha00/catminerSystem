package pe.catminer.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pe.catminer.api.request.PersonaRequest;
import pe.catminer.api.response.PersonaResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.service.PersonaService;

@RestController
public class PersonaApiController {
	
	@Autowired
	private PersonaService personaService; 
	
	@PostMapping(value = "/grabarPersona", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RespuestaGeneralResponse>  listado(@RequestBody PersonaRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		try {
			mRespuesta = personaService.grabarPersona(req);
			
		} catch (Exception e) {
			
			return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
		}

		return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
	}
	
	@PostMapping(value = "/listarPersona", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<PersonaResponse> listarPersona(@RequestBody PersonaRequest req){	
		List<PersonaResponse> listado = new ArrayList<PersonaResponse>();
		try {
			listado = personaService.listarPersonas(req);
		} catch (Exception e) {
			
		}
		return listado;
	}
	
	

}
