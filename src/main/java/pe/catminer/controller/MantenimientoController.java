package pe.catminer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MantenimientoController {
	
	@RequestMapping("/banco")
	public String listado(Model model) {
		
		model.addAttribute("view", "views/mantenimiento/banco/index");
		return "index";
	}
	
	@RequestMapping("/nuevoBanco")
	public String nuevo(Model model) {
		
		model.addAttribute("view", "views/mantenimiento/banco/nuevo");
		return "index";
	}
	
	

}
