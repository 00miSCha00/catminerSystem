package pe.catminer.api.security.service;

import pe.catminer.api.request.UsuarioRequest;
import pe.catminer.api.security.model.Usuario;

public interface UsuarioService {
    
	void saveUser(UsuarioRequest userDto);

    Usuario findUserByEmail(String email);
}
