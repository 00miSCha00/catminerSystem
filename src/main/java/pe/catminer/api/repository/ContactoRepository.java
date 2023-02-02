package pe.catminer.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pe.catminer.entity.Contacto;

@Repository
public interface ContactoRepository extends CrudRepository<Contacto, Integer> {
	
	public boolean existsByCoAlumno(int coAlumno);
}
