package pe.catminer.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import pe.catminer.util.PathCatminet;

@Controller
@RequestMapping("/mantenimiento")
public class MantenimientoController {
	
	@RequestMapping("/banco")
	public String listadoBanco(Model model,HttpServletRequest request) {
		String resultPath = PathCatminet.obtenerContext(request);
		model.addAttribute("catminer", resultPath);
		model.addAttribute("view", "views/mantenimiento/banco/index");
		return "index";
	}
	
	@RequestMapping("/nuevoBanco")
	public String nuevobanco(Model model,HttpServletRequest request) {
		String resultPath = PathCatminet.obtenerContext(request);
		model.addAttribute("catminer", resultPath);
		model.addAttribute("view", "views/mantenimiento/banco/nuevo");
		return "index";
	}
	
	@RequestMapping("/sede")
	public String listadoSede(Model model,HttpServletRequest request) {
		String resultPath = PathCatminet.obtenerContext(request);
		model.addAttribute("catminer", resultPath);
		model.addAttribute("view", "views/mantenimiento/sede/index");
		return "index";
	}
	
	@RequestMapping("/nuevaSede")
	public String nuevaSede(Model model,HttpServletRequest request) {
		String resultPath = PathCatminet.obtenerContext(request);
		model.addAttribute("catminer", resultPath);
		model.addAttribute("view", "views/mantenimiento/sede/nuevo");
		return "index";
	}
	
	@RequestMapping("/tipoCarrera")
	public String listadoTipoCarrera(Model model,HttpServletRequest request) {
		String resultPath = PathCatminet.obtenerContext(request);
		model.addAttribute("catminer", resultPath);
		model.addAttribute("view", "views/mantenimiento/tipoCarrera/index");
		return "index";
	}
	
	@RequestMapping("/nuevaTipoCarrera")
	public String nuevaTipoCarrera(Model model,HttpServletRequest request) {
		String resultPath = PathCatminet.obtenerContext(request);
		model.addAttribute("catminer", resultPath);
		model.addAttribute("view", "views/mantenimiento/tipoCarrera/nuevo");
		return "index";
	}
	
	

}
