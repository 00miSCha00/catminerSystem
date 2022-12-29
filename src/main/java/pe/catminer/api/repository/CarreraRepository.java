package pe.catminer.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pe.catminer.entity.Carrera;

@Repository
public interface CarreraRepository extends CrudRepository<Carrera, Integer> {
	
}
