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

import pe.catminer.api.request.BancoRequest;
import pe.catminer.api.response.BancoResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.service.BancoService;

@RestController
public class BancoApiController {
	
	@Autowired
	private BancoService bancoService; 
	
	@PostMapping(value = "/grabarBanco", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RespuestaGeneralResponse>  listado(@RequestBody BancoRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		try {
			mRespuesta = bancoService.grabarBanco(req);
			
		} catch (Exception e) {
			
			return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
		}

		return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
	}
	
	@PostMapping(value = "/listarBanco", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<BancoResponse> listarBanco(@RequestBody BancoRequest req){	
		List<BancoResponse> listado = new ArrayList<BancoResponse>();
		try {
			listado = bancoService.listarBancos(req);
		} catch (Exception e) {
			
		}
		return listado;
	}
	
	

}
