package pe.catminer.api.service;

import java.util.List;

import pe.catminer.api.request.BancoRequest;
import pe.catminer.api.response.BancoResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;

public interface BancoService {

	public List<BancoResponse> listarBancos(BancoRequest req);
	
	public RespuestaGeneralResponse grabarBanco(BancoRequest req);
		
}
