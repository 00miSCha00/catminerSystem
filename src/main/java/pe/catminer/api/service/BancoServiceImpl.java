package pe.catminer.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.catminer.api.repository.BancoRepository;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.entity.Banco;

@Service
public class BancoServiceImpl implements BancoService {

	@Autowired
	private BancoRepository bancoRepository;
	
	@Override
	public List<Banco> listarBancos() {
		
		List<Banco> listadoBancos = new ArrayList<Banco>();
		
		listadoBancos = (List<Banco>) bancoRepository.findAll();
		return listadoBancos;
	}

	@Override
	public RespuestaGeneralResponse grabarBanco(Banco req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		
		try {
			if(req.getCoBanco()>0) {
				return this.actualizar(req);
			}
			
			bancoRepository.save(req);
			mRespuesta.setExito(true);
		} catch (Exception e) {
			return mRespuesta;
		}
		return mRespuesta;
	}
	
	private RespuestaGeneralResponse actualizar(Banco req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		Banco bancoSave = null;
		try {
			bancoSave = bancoRepository.findById(req.getCoBanco()).get();
			BeanUtils.copyProperties(req, bancoSave);
			bancoRepository.save(req);
			mRespuesta.setExito(true);
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return mRespuesta;
		
	}

}
