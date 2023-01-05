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

import pe.catminer.api.repository.ConfiguracionPagoRepository;
import pe.catminer.api.request.ConfiguracionPagoRequest;
import pe.catminer.api.response.ConfiguracionPagoResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.entity.ConfiguracionPago;

@Service
public class ConfiguracionPagoServiceImpl implements ConfiguracionPagoService {

	@Autowired
	EntityManager em;

	@Autowired
	private ConfiguracionPagoRepository configuracionPagoRepository;

	@Override
	public List<ConfiguracionPagoResponse> listarConfiguracionPagos(ConfiguracionPagoRequest req) {

		List<ConfiguracionPago> listadoConfiguracionPagos = new ArrayList<ConfiguracionPago>();
		List<ConfiguracionPagoResponse> listadoConfiguracionPagoResponse = new ArrayList<ConfiguracionPagoResponse>();
		try {

			CriteriaBuilder qb = em.getCriteriaBuilder();
			CriteriaQuery<ConfiguracionPago> cq = qb.createQuery(ConfiguracionPago.class);
			Root<ConfiguracionPago> carrera = cq.from(ConfiguracionPago.class);
			List<Predicate> predicates = new ArrayList<Predicate>();

			if (req.getCarrera() != null && !req.getCarrera().isEmpty())
				predicates.add(qb.like(carrera.get("deConfiguracionPago"), "%"+req.getCarrera()+"%"));

			cq.select(carrera).where(predicates.toArray(new Predicate[] {}));
			listadoConfiguracionPagos = (List<ConfiguracionPago>) em.createQuery(cq).getResultList();

			listadoConfiguracionPagos.forEach(t -> {
				ConfiguracionPagoResponse rep = new ConfiguracionPagoResponse();
				BeanUtils.copyProperties(t, rep);
				listadoConfiguracionPagoResponse.add(rep);
			});

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return listadoConfiguracionPagoResponse;
	}

	@Override
	public RespuestaGeneralResponse grabarConfiguracionPago(ConfiguracionPagoRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		ConfiguracionPago carreraSave = null;
		try {
			if (req.getCoConfiguracionPagos() > 0)
				carreraSave = configuracionPagoRepository.findById(req.getCoConfiguracionPagos()).get();
			else
				carreraSave = new ConfiguracionPago();
			BeanUtils.copyProperties(req, carreraSave);
			configuracionPagoRepository.save(carreraSave);
			mRespuesta.setExito(true);
		} catch (Exception e) {
			return mRespuesta;
		}
		return mRespuesta;
	}

}
