package pe.catminer.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pe.catminer.entity.Banco;
import pe.catminer.entity.Persona;

@Repository
public interface PersonaRepository extends CrudRepository<Persona, Integer> {
	
}
