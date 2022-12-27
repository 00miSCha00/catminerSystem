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

import pe.catminer.api.request.SedeRequest;
import pe.catminer.api.response.SedeResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.service.SedeService;

@RestController
public class SedeApiController {
	
	@Autowired
	private SedeService sedeService; 
	
	@PostMapping(value = "/grabarSede", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RespuestaGeneralResponse>  listado(@RequestBody SedeRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		try {
			mRespuesta = sedeService.grabarSede(req);
			
		} catch (Exception e) {
			
			return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
		}

		return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
	}
	
	@PostMapping(value = "/listarSede", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<SedeResponse> listarSede(@RequestBody SedeRequest req){	
		List<SedeResponse> listado = new ArrayList<SedeResponse>();
		try {
			listado = sedeService.listarSedes(req);
		} catch (Exception e) {
			
		}
		return listado;
	}
	
	

}
