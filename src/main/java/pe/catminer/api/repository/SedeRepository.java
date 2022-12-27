package pe.catminer.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pe.catminer.entity.Sede;

@Repository
public interface SedeRepository extends CrudRepository<Sede, Integer> {
	
}
