package pe.catminer.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import pe.catminer.api.request.UsuarioRequest;
import pe.catminer.api.security.model.Usuario;
import pe.catminer.api.security.service.UsuarioService;

@Controller
public class LoginController {

	@Autowired
	private UsuarioService usuarioService;

	@RequestMapping(value = { "/", "/login" })
	public String loginForm() {
		return "login";
	}

	@GetMapping("/registration")
	public String registrationForm(Model model) {
		UsuarioRequest user = new UsuarioRequest();
		model.addAttribute("user", user);
		return "registration";
	}

	@PostMapping("/registration")
	public String registration(@Valid @ModelAttribute("user") UsuarioRequest userDto, BindingResult result,
			Model model) {
		Usuario existingUser = usuarioService.findUserByEmail(userDto.getEmail());

		if (existingUser != null)
			result.rejectValue("email", null, "User already registered !!!");

		if (result.hasErrors()) {
			model.addAttribute("user", userDto);
			return "/registration";
		}

		usuarioService.saveUser(userDto);
		return "redirect:/registration?success";
	}
}
