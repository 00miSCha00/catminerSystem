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

import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.service.BancoService;
import pe.catminer.entity.Banco;

@RestController
public class BancoApiController {
	
	@Autowired
	private BancoService bancoService; 
	
	@PostMapping(value = "/grabarBanco", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RespuestaGeneralResponse>  listado(@RequestBody Banco req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		try {
			mRespuesta = bancoService.grabarBanco(req);
			
		} catch (Exception e) {
			
			return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
		}

		return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
	}
	
	@PostMapping(value = "/listarBanco", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Banco> listarBanco(){	
		List<Banco> listado = new ArrayList<Banco>();
		try {
			listado = bancoService.listarBancos();
		} catch (Exception e) {
			
		}
		return listado;
	}
	
	

}
