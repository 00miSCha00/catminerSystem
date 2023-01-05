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

import pe.catminer.api.request.ConfiguracionPagoRequest;
import pe.catminer.api.response.ConfiguracionPagoResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.service.ConfiguracionPagoService;

@RestController
public class ConfiguracionPagoApiController {
	
	@Autowired
	private ConfiguracionPagoService configuracionPagoService; 
	
	@PostMapping(value = "/grabarConfiguracionPago", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RespuestaGeneralResponse>  listado(@RequestBody ConfiguracionPagoRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		try {
			mRespuesta = configuracionPagoService.grabarConfiguracionPago(req);
			
		} catch (Exception e) {
			
			return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
		}

		return new ResponseEntity<RespuestaGeneralResponse>(mRespuesta, HttpStatus.OK);
	}
	
	@PostMapping(value = "/listarConfiguracionPago", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ConfiguracionPagoResponse> listarConfiguracionPago(@RequestBody ConfiguracionPagoRequest req){	
		List<ConfiguracionPagoResponse> listado = new ArrayList<ConfiguracionPagoResponse>();
		try {
			listado = configuracionPagoService.listarConfiguracionPagos(req);
		} catch (Exception e) {
			
		}
		return listado;
	}
	
	

}
