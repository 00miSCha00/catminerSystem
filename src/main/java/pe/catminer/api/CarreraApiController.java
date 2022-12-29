package pe.catminer.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.catminer.api.request.TipoCarreraRequest;
import pe.catminer.api.response.TipoCarreraResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.service.TipoCarreraService;

@RestController
@RequestMapping("/carrera")
public class CarreraApiController {
	
	@Autowired
	private TipoCarreraService tipoCarreraService; 
	
	@PostMapping(value = "/grabarTipoCarrera", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RespuestaGeneralResponse>  listado(@RequestBody TipoCarreraRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		try {
			mRespuesta = tipoCarreraService.grabarTipoCarrera(req);
			
		} catch (Exception e) {
			
			return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
		}

		return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
	}
	
	@PostMapping(value = "/listarTipoCarrera", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<TipoCarreraResponse> listarTipoCarrera(@RequestBody TipoCarreraRequest req){	
		List<TipoCarreraResponse> listado = new ArrayList<TipoCarreraResponse>();
		try {
			listado = tipoCarreraService.listarTipoCarreras(req);
		} catch (Exception e) {
			
		}
		return listado;
	}
	
	

}
