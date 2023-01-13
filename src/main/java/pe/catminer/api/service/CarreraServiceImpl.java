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

import pe.catminer.api.repository.CarreraRepository;
import pe.catminer.api.request.CarreraRequest;
import pe.catminer.api.response.CarreraResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.entity.Carrera;

@Service
public class CarreraServiceImpl implements CarreraService {

	@Autowired
	EntityManager em;

	@Autowired
	private CarreraRepository carreraRepository;

	@Override
	public List<CarreraResponse> listarCarreras(CarreraRequest req) {

		List<Carrera> listadoCarreras = new ArrayList<Carrera>();
		List<CarreraResponse> listadoCarreraResponse = new ArrayList<CarreraResponse>();
		try {

			CriteriaBuilder qb = em.getCriteriaBuilder();
			CriteriaQuery<Carrera> cq = qb.createQuery(Carrera.class);
			Root<Carrera> carrera = cq.from(Carrera.class);
			List<Predicate> predicates = new ArrayList<Predicate>();

			if (req.getDeCarrera() != null && !req.getDeCarrera().isEmpty())
				predicates.add(qb.like(carrera.get("deCarrera"), "%"+req.getDeCarrera()+"%"));
			
			if (req.getCoTipoCarrera() >0)
				predicates.add(qb.equal(carrera.get("coTipoCarrera"), req.getCoTipoCarrera()));

			cq.select(carrera).where(predicates.toArray(new Predicate[] {}));
			listadoCarreras = (List<Carrera>) em.createQuery(cq).getResultList();

			listadoCarreras.forEach(t -> {
				CarreraResponse rep = new CarreraResponse();
				BeanUtils.copyProperties(t, rep);
				listadoCarreraResponse.add(rep);
			});

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return listadoCarreraResponse;
	}

	@Override
	public RespuestaGeneralResponse grabarCarrera(CarreraRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		Carrera carreraSave = null;
		try {
			if (req.getCoCarrera() > 0)
				carreraSave = carreraRepository.findById(req.getCoCarrera()).get();
			else
				carreraSave = new Carrera();
			BeanUtils.copyProperties(req, carreraSave);
			carreraRepository.save(carreraSave);
			mRespuesta.setExito(true);
		} catch (Exception e) {
			return mRespuesta;
		}
		return mRespuesta;
	}

}
