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

import pe.catminer.api.repository.AlumnoRepository;
import pe.catminer.api.repository.PersonaRepository;
import pe.catminer.api.request.PersonaRequest;
import pe.catminer.api.response.PersonaResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.entity.Persona;

@Service
public class PersonaServiceImpl implements PersonaService {

	@Autowired
	EntityManager em;

	@Autowired
	private PersonaRepository personaRepository;
	
	@Autowired
	private AlumnoRepository alumnoRepository;

	@Override
	public List<PersonaResponse> listarPersonas(PersonaRequest req) {

		List<Persona> listadoPersonas = new ArrayList<Persona>();
		List<PersonaResponse> listadoPersonaResponse = new ArrayList<PersonaResponse>();
		try {

			CriteriaBuilder qb = em.getCriteriaBuilder();
			CriteriaQuery<Persona> cq = qb.createQuery(Persona.class);
			Root<Persona> persona = cq.from(Persona.class);
			List<Predicate> predicates = new ArrayList<Predicate>();

			if (req.getNombres() != null && !req.getNombres().isEmpty())
				predicates.add(qb.like(persona.get("nombres"), "%"+req.getNombres()+"%"));
			
			if (req.getApellidos() != null && !req.getApellidos().isEmpty()) {
				predicates.add(qb.like(persona.get("apellidopaterno"), "%"+req.getApellidos()+"%"));
				predicates.add(qb.or(qb.like(persona.get("apellidomaterno"), "%"+req.getApellidos()+"%")));
				
			}

			cq.select(persona).where(predicates.toArray(new Predicate[] {}));
			listadoPersonas = (List<Persona>) em.createQuery(cq).getResultList();

			//listadoPersonas = (List<Persona>) personaRepository.findAll();
			listadoPersonas.forEach(t -> {
				PersonaResponse rep = new PersonaResponse();
				boolean existeAlumno = alumnoRepository.existsByCoPersona(t.getCoPersona());
				BeanUtils.copyProperties(t, rep);
				rep.setAlumno("No");
				if(existeAlumno)
					rep.setAlumno("Si");
				
				listadoPersonaResponse.add(rep);
			});

		} catch (Exception e) {
			// TODO: handle exception
		}

		return listadoPersonaResponse;
	}

	@Override
	public RespuestaGeneralResponse grabarPersona(PersonaRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		Persona personaSave = null;
		try {
			if (req.getCoPersona() > 0)
				personaSave = personaRepository.findById(req.getCoPersona()).get();
			else
				personaSave = new Persona();
			BeanUtils.copyProperties(req, personaSave);
			personaRepository.save(personaSave);
			mRespuesta.setExito(true);
		} catch (Exception e) {
			return mRespuesta;
		}
		return mRespuesta;
	}

}
