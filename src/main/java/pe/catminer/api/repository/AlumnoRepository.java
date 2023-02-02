package pe.catminer.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pe.catminer.entity.Alumno;

@Repository
public interface AlumnoRepository extends CrudRepository<Alumno, Integer> {
	
	public boolean existsByCoPersona(int coPersona);
	
	public Alumno findByCoPersona(int coPersona);
}
