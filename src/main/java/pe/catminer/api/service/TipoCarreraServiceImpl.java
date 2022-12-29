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

import pe.catminer.api.repository.TipoCarreraRepository;
import pe.catminer.api.request.TipoCarreraRequest;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.response.TipoCarreraResponse;
import pe.catminer.entity.TipoCarrera;

@Service
public class TipoCarreraServiceImpl implements TipoCarreraService {

	@Autowired
	EntityManager em;

	@Autowired
	private TipoCarreraRepository tipoCarreraRepository;

	@Override
	public List<TipoCarreraResponse> listarTipoCarreras(TipoCarreraRequest req) {

		List<TipoCarrera> listadoTipoCarreras = new ArrayList<TipoCarrera>();
		List<TipoCarreraResponse> listadoTipoCarreraResponse = new ArrayList<TipoCarreraResponse>();
		try {

			CriteriaBuilder qb = em.getCriteriaBuilder();
			CriteriaQuery<TipoCarrera> cq = qb.createQuery(TipoCarrera.class);
			Root<TipoCarrera> tipoCarrera = cq.from(TipoCarrera.class);
			List<Predicate> predicates = new ArrayList<Predicate>();

			if (req.getDeTipoCarrera() != null && !req.getDeTipoCarrera().isEmpty())
				predicates.add(qb.like(tipoCarrera.get("deTipoCarrera"), "%"+req.getDeTipoCarrera()+"%"));

			cq.select(tipoCarrera).where(predicates.toArray(new Predicate[] {}));
			listadoTipoCarreras = (List<TipoCarrera>) em.createQuery(cq).getResultList();

			listadoTipoCarreras.forEach(t -> {
				TipoCarreraResponse rep = new TipoCarreraResponse();
				BeanUtils.copyProperties(t, rep);
				listadoTipoCarreraResponse.add(rep);
			});

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return listadoTipoCarreraResponse;
	}

	@Override
	public RespuestaGeneralResponse grabarTipoCarrera(TipoCarreraRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		TipoCarrera tipoCarreraSave = null;
		try {
			if (req.getCoTipoCarrera() > 0)
				tipoCarreraSave = tipoCarreraRepository.findById(req.getCoTipoCarrera()).get();
			else
				tipoCarreraSave = new TipoCarrera();
			BeanUtils.copyProperties(req, tipoCarreraSave);
			tipoCarreraRepository.save(tipoCarreraSave);
			mRespuesta.setExito(true);
		} catch (Exception e) {
			return mRespuesta;
		}
		return mRespuesta;
	}

}
