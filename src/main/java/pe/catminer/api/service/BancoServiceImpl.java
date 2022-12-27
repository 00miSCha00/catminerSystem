package pe.catminer.api.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.catminer.api.repository.BancoRepository;
import pe.catminer.api.request.BancoRequest;
import pe.catminer.api.response.BancoResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.entity.Banco;

@Service
public class BancoServiceImpl implements BancoService {

	@Autowired
	EntityManager em;

	@Autowired
	private BancoRepository bancoRepository;

	@Override
	public List<BancoResponse> listarBancos(BancoRequest req) {

		List<Banco> listadoBancos = new ArrayList<Banco>();
		List<BancoResponse> listadoBancoResponse = new ArrayList<BancoResponse>();
		try {

			CriteriaBuilder qb = em.getCriteriaBuilder();
			CriteriaQuery<Banco> cq = qb.createQuery(Banco.class);
			Root<Banco> banco = cq.from(Banco.class);
			List<Predicate> predicates = new ArrayList<Predicate>();

			if (req.getNoBanco() != null && !req.getNoBanco().isEmpty())
				predicates.add(qb.like(banco.get("noBanco"), "%"+req.getNoBanco()+"%"));

			cq.select(banco).where(predicates.toArray(new Predicate[] {}));
			listadoBancos = (List<Banco>) em.createQuery(cq).getResultList();

			//listadoBancos = (List<Banco>) bancoRepository.findAll();
			listadoBancos.forEach(t -> {
				BancoResponse rep = new BancoResponse();
				BeanUtils.copyProperties(t, rep);
				listadoBancoResponse.add(rep);
			});

		} catch (Exception e) {
			// TODO: handle exception
		}

		return listadoBancoResponse;
	}

	@Override
	public RespuestaGeneralResponse grabarBanco(BancoRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		Banco bancoSave = null;
		try {
			if (req.getCoBanco() > 0)
				bancoSave = bancoRepository.findById(req.getCoBanco()).get();
			else
				bancoSave = new Banco();
			BeanUtils.copyProperties(req, bancoSave);
			bancoRepository.save(bancoSave);
			mRespuesta.setExito(true);
		} catch (Exception e) {
			return mRespuesta;
		}
		return mRespuesta;
	}

}
