package pe.catminer.api.security.service;


import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pe.catminer.api.request.UsuarioRequest;
import pe.catminer.api.security.model.Rol;
import pe.catminer.api.security.model.Usuario;
import pe.catminer.api.security.repository.RolRepository;
import pe.catminer.api.security.repository.UsuarioRepository;
import pe.catminer.util.TbConstants;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private RolRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void saveUser(UsuarioRequest userDto) {
        Rol role = roleRepository.findByName(TbConstants.Roles.USER);

        if (role == null)
            role = roleRepository.save(new Rol(TbConstants.Roles.USER));

        Usuario user = new Usuario(userDto.getName(), userDto.getEmail(), passwordEncoder.encode(userDto.getPassword()),
                Arrays.asList(role));
        userRepository.save(user);
    }

    @Override
    public Usuario findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
