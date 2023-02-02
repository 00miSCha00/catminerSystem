package pe.catminer.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MatriculaRequest {
	
	private int coPersona;
	private int coCarrera;
	private int coAlumno;
	private int coAlumnoCarrera;
	private String direccion;
	private String correo;
	private String celular;
	private int costoUnitario;
	private int costoTotal;
	private boolean especial;
	
	private String numeroDocumento;
	private String apellidos;
	private String nombres;
	
	private int esRegistro;
}

