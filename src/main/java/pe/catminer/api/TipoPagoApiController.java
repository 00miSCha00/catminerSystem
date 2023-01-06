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

import pe.catminer.api.request.TipoPagoRequest;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.response.TipoPagoResponse;
import pe.catminer.api.service.TipoPagoService;

@RestController
public class TipoPagoApiController {
	
	@Autowired
	private TipoPagoService tipoCarreraService; 
	
	@PostMapping(value = "/grabarTipoPago", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RespuestaGeneralResponse>  listado(@RequestBody TipoPagoRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		try {
			mRespuesta = tipoCarreraService.grabarTipoPago(req);
			
		} catch (Exception e) {
			
			return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
		}

		return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
	}
	
	@PostMapping(value = "/listarTipoPago", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<TipoPagoResponse> listarTipoPago(@RequestBody TipoPagoRequest req){	
		List<TipoPagoResponse> listado = new ArrayList<TipoPagoResponse>();
		try {
			listado = tipoCarreraService.listarTipoPagos(req);
		} catch (Exception e) {
			
		}
		return listado;
	}
	
	

}
