package pe.catminer.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pe.catminer.entity.TipoCarrera;

@Repository
public interface TipoCarreraRepository extends CrudRepository<TipoCarrera, Integer> {
	
}
