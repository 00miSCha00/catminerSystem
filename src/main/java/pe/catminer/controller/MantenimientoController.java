package pe.catminer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MantenimientoController {
	
	@RequestMapping("/banco")
	public String listadoBanco(Model model) {
		
		model.addAttribute("view", "views/mantenimiento/banco/index");
		return "index";
	}
	
	@RequestMapping("/nuevoBanco")
	public String nuevobanco(Model model) {
		
		model.addAttribute("view", "views/mantenimiento/banco/nuevo");
		return "index";
	}
	
	@RequestMapping("/sede")
	public String listadoSede(Model model) {
		
		model.addAttribute("view", "views/mantenimiento/sede/index");
		return "index";
	}
	
	@RequestMapping("/nuevaSede")
	public String nuevaSede(Model model) {
		
		model.addAttribute("view", "views/mantenimiento/sede/nuevo");
		return "index";
	}
	
	

}
