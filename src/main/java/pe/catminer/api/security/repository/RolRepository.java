package pe.catminer.api.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.catminer.api.security.model.Rol;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
    Rol findByName(String name);
}