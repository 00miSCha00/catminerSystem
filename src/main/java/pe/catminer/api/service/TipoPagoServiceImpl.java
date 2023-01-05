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

import pe.catminer.api.repository.TipoPagoRepository;
import pe.catminer.api.request.TipoPagoRequest;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.api.response.TipoPagoResponse;
import pe.catminer.entity.TipoPago;

@Service
public class TipoPagoServiceImpl implements TipoPagoService {

	@Autowired
	EntityManager em;

	@Autowired
	private TipoPagoRepository tipoCarreraRepository;

	@Override
	public List<TipoPagoResponse> listarTipoPagos(TipoPagoRequest req) {

		List<TipoPago> listadoTipoPagos = new ArrayList<TipoPago>();
		List<TipoPagoResponse> listadoTipoPagoResponse = new ArrayList<TipoPagoResponse>();
		try {

			CriteriaBuilder qb = em.getCriteriaBuilder();
			CriteriaQuery<TipoPago> cq = qb.createQuery(TipoPago.class);
			Root<TipoPago> tipoCarrera = cq.from(TipoPago.class);
			List<Predicate> predicates = new ArrayList<Predicate>();

			if (req.getDeTipoPago() != null && !req.getDeTipoPago().isEmpty())
				predicates.add(qb.like(tipoCarrera.get("deTipoPago"), "%"+req.getDeTipoPago()+"%"));

			cq.select(tipoCarrera).where(predicates.toArray(new Predicate[] {}));
			listadoTipoPagos = (List<TipoPago>) em.createQuery(cq).getResultList();

			listadoTipoPagos.forEach(t -> {
				TipoPagoResponse rep = new TipoPagoResponse();
				BeanUtils.copyProperties(t, rep);
				listadoTipoPagoResponse.add(rep);
			});

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return listadoTipoPagoResponse;
	}

	@Override
	public RespuestaGeneralResponse grabarTipoPago(TipoPagoRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		TipoPago tipoCarreraSave = null;
		try {
			if (req.getCoTipoPago() > 0)
				tipoCarreraSave = tipoCarreraRepository.findById(req.getCoTipoPago()).get();
			else
				tipoCarreraSave = new TipoPago();
			BeanUtils.copyProperties(req, tipoCarreraSave);
			tipoCarreraRepository.save(tipoCarreraSave);
			mRespuesta.setExito(true);
		} catch (Exception e) {
			return mRespuesta;
		}
		return mRespuesta;
	}

}
