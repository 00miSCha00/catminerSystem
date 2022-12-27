package pe.catminer.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pe.catminer.entity.Banco;

@Repository
public interface CarreraRepository extends CrudRepository<Banco, Integer> {
	
}
