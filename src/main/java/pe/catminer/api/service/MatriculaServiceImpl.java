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

import pe.catminer.api.repository.AlumnoCarreraRepository;
import pe.catminer.api.repository.AlumnoRepository;
import pe.catminer.api.repository.ContactoRepository;
import pe.catminer.api.repository.PersonaRepository;
import pe.catminer.api.request.MatriculaRequest;
import pe.catminer.api.response.MatriculaResponse;
import pe.catminer.api.response.RespuestaGeneralResponse;
import pe.catminer.entity.Alumno;
import pe.catminer.entity.AlumnoCarrera;
import pe.catminer.entity.Persona;

@Service
public class MatriculaServiceImpl implements MatriculaService {

	@Autowired
	EntityManager em;

	@Autowired
	private PersonaRepository personaRepository;
	
	@Autowired
	private AlumnoRepository alumnoRepository;
	
	@Autowired
	private ContactoRepository contactoRepository;
	
	@Autowired
	private AlumnoCarreraRepository alumnoCarreraRepository;

	
	@Override
	public RespuestaGeneralResponse matricular(MatriculaRequest req) {
		RespuestaGeneralResponse mRespuesta = new RespuestaGeneralResponse();
		Alumno alumnoSave = null;
		AlumnoCarrera alumnoCarreraSave = null;
		
		try {
			if (req.getCoAlumno() > 0)
				alumnoSave = alumnoRepository.findById(req.getCoAlumno()).get();
			else
				alumnoSave = new Alumno();
			BeanUtils.copyProperties(req, alumnoSave);
			Alumno alumno = alumnoRepository.save(alumnoSave);
			
			if (req.getCoAlumnoCarrera() > 0)
				alumnoCarreraSave = alumnoCarreraRepository.findById(req.getCoAlumnoCarrera()).get();
			else
				alumnoCarreraSave = new AlumnoCarrera();
			BeanUtils.copyProperties(req, alumnoCarreraSave);
			alumnoCarreraSave.setCoAlumno(alumno.getCoAlumno());
			AlumnoCarrera alumnoCarrera = alumnoCarreraRepository.save(alumnoCarreraSave);
			
			
			mRespuesta.setExito(true);
		} catch (Exception e) {
			return mRespuesta;
		}
		return mRespuesta;
	}


	@Override
	public List<MatriculaResponse> listarPersonasMatricula(MatriculaRequest req) {
		List<Persona> listadoPersonas = new ArrayList<Persona>();
		List<MatriculaResponse> listadoPersonaResponse = new ArrayList<MatriculaResponse>();
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
				MatriculaResponse rep = new MatriculaResponse();
				Alumno existeAlumno = alumnoRepository.findByCoPersona(t.getCoPersona());
				
				BeanUtils.copyProperties(t, rep);
				
				rep.setAlumno("No");
				rep.setContacto("No");
				if(existeAlumno!=null) {
					rep.setAlumno("Si");
					BeanUtils.copyProperties(existeAlumno, rep);
					boolean existeContacto = contactoRepository.existsByCoAlumno(existeAlumno.getCoAlumno());
					if(existeContacto) 
						rep.setContacto("Si");
				}
				listadoPersonaResponse.add(rep);
			});

		} catch (Exception e) {
			// TODO: handle exception
		}

		return listadoPersonaResponse;
		
	}

}
