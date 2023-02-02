package pe.catminer.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import pe.catminer.util.PathCatminet;

@Controller
@RequestMapping("/inscripcion")
public class InscripcionController {
	
	@RequestMapping("/alumno")
	public String listadoBanco(Model model,HttpServletRequest request) {
		String resultPath = PathCatminet.obtenerContext(request);
		model.addAttribute("catminer", resultPath);
		model.addAttribute("view", "views/inscripcion/persona/index");
		return "index";
	}
	
	@RequestMapping("/matricula")
	public String nuevobanco(Model model,HttpServletRequest request) {
		String resultPath = PathCatminet.obtenerContext(request);
		model.addAttribute("catminer", resultPath);
		model.addAttribute("view", "views/inscripcion/persona/nuevo");
		return "index";
	}
	

}
