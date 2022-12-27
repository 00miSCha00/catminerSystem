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

import pe.catminer.api.repository.SedeRepository;
import pe.catminer.api.request.SedeRequest;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.response.SedeResponse;
import pe.catminer.entity.Sede;

@Service
public class SedeServiceImpl implements SedeService {

	@Autowired
	EntityManager em;

	@Autowired
	private SedeRepository sedeRepository;

	@Override
	public List<SedeResponse> listarSedes(SedeRequest req) {

		List<Sede> listadoSedes = new ArrayList<Sede>();
		List<SedeResponse> listadoSedeResponse = new ArrayList<SedeResponse>();
		try {

			CriteriaBuilder qb = em.getCriteriaBuilder();
			CriteriaQuery<Sede> cq = qb.createQuery(Sede.class);
			Root<Sede> sede = cq.from(Sede.class);
			List<Predicate> predicates = new ArrayList<Predicate>();

			if (req.getDeSede() != null && !req.getDeSede().isEmpty())
				predicates.add(qb.like(sede.get("deSede"), "%"+req.getDeSede()+"%"));

			cq.select(sede).where(predicates.toArray(new Predicate[] {}));
			listadoSedes = (List<Sede>) em.createQuery(cq).getResultList();

			listadoSedes.forEach(t -> {
				SedeResponse rep = new SedeResponse();
				BeanUtils.copyProperties(t, rep);
				listadoSedeResponse.add(rep);
			});

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return listadoSedeResponse;
	}

	@Override
	public RespuestaGeneralResponse grabarSede(SedeRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		Sede sedeSave = null;
		try {
			if (req.getCoSede() > 0)
				sedeSave = sedeRepository.findById(req.getCoSede()).get();
			else
				sedeSave = new Sede();
			BeanUtils.copyProperties(req, sedeSave);
			sedeRepository.save(sedeSave);
			mRespuesta.setExito(true);
		} catch (Exception e) {
			return mRespuesta;
		}
		return mRespuesta;
	}

}
