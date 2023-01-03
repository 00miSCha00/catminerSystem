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

import pe.catminer.api.request.CarreraRequest;
import pe.catminer.api.response.CarreraResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.service.CarreraService;

@RestController
public class CarreraApiController {
	
	@Autowired
	private CarreraService carreraService; 
	
	@PostMapping(value = "/grabarCarrera", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RespuestaGeneralResponse>  listado(@RequestBody CarreraRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		try {
			mRespuesta = carreraService.grabarCarrera(req);
			
		} catch (Exception e) {
			
			return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
		}

		return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
	}
	
	@PostMapping(value = "/listarCarreras", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<CarreraResponse> listarCarreras(@RequestBody CarreraRequest req){	
		List<CarreraResponse> listado = new ArrayList<CarreraResponse>();
		try {
			listado = carreraService.listarCarreras(req);
		} catch (Exception e) {
			
		}
		return listado;
	}
	
	

}
