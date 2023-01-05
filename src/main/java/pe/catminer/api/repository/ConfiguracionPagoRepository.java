package pe.catminer.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pe.catminer.entity.ConfiguracionPago;

@Repository
public interface ConfiguracionPagoRepository extends CrudRepository<ConfiguracionPago, Integer> {
	
}
