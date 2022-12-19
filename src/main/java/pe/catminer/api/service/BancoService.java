package pe.catminer.api.service;

import java.util.List;

import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.entity.Banco;

public interface BancoService {

	public List<Banco> listarBancos();
	
	public RespuestaGeneralResponse grabarBanco(Banco req);
		
}
