package pe.catminer.api.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pe.catminer.entity.AlumnoCarrera;

@Repository
public interface AlumnoCarreraRepository extends CrudRepository<AlumnoCarrera, Integer> {
	
	//@Query("select o from AlumnoCarrera o where  o.coAlumno =:coAlumno and o.Esregistro=1")
	//public List<AlumnoCarrera> buscarAlumno(@Param("coAlumno") String coAlumno);
	
	public List<AlumnoCarrera> findByCoAlumno(String coAlumno);
	
}
