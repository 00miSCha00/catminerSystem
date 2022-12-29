package pe.catminer.api.service;

import java.util.List;

import pe.catminer.api.request.CarreraRequest;
import pe.catminer.api.response.CarreraResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;

public interface CarreraService {

	public List<CarreraResponse> listarCarreras(CarreraRequest req);
	
	public RespuestaGeneralResponse grabarCarrera(CarreraRequest req);
		
}
