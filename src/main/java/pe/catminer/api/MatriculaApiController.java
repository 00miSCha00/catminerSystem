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

import pe.catminer.api.request.MatriculaRequest;
import pe.catminer.api.response.MatriculaResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.service.MatriculaService;
import pe.catminer.api.service.PersonaService;

@RestController
public class MatriculaApiController {
	
	@Autowired
	private PersonaService personaService; 
	
	@Autowired
	private MatriculaService matriculaService;
	
	@PostMapping(value = "/matricular", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RespuestaGeneralResponse>  listado(@RequestBody MatriculaRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		try {
			mRespuesta = matriculaService.matricular(req);
			
		} catch (Exception e) {
			
			return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
		}

		return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
	}
	
	@PostMapping(value = "/listarPersonaMatricula", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<MatriculaResponse> listarPersonaMatricula(@RequestBody MatriculaRequest req){	
		List<MatriculaResponse> listado = new ArrayList<MatriculaResponse>();
		try {
			listado = matriculaService.listarPersonasMatricula(req);
		} catch (Exception e) {
			
		}
		return listado;
	}
	
	

}
