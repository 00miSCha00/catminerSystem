package pe.catminer.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pe.catminer.entity.TipoPago;

@Repository
public interface TipoPagoRepository extends CrudRepository<TipoPago, Integer> {
	
}
