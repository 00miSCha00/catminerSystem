package pe.catminer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/panel")
public class PanelControlController {
	
	@RequestMapping("/")
	public String Inicio(Model model) {
		
		model.addAttribute("view", "views/panelControl/index");
		return "index";
	}
	
	@RequestMapping("/mantenimiento")
	public String Mantenimiento(Model model) {
		
		model.addAttribute("view", "views/panelControl/mantenimiento");
		return "index";
	}
	
	@RequestMapping("/inscripciones")
	public String Inscripciones(Model model) {
		
		model.addAttribute("view", "views/panelControl/inscripciones");
		return "index";
	}
	
	@RequestMapping("/pagos")
	public String pagos(Model model) {
		
		model.addAttribute("view", "views/panelControl/pagos");
		return "index";
	}

}
