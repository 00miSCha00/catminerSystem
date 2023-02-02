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
public class PersonaRequest {
	
	private int coPersona;
	private int coTipoDocumento;
	private String numeroDocumento;
	private String apellidoPaterno;
	private String apellidoMaterno;
	private String apellidos;
	private String nombres;
	private int sexo;
	private String fechaNacimiento;
	private String alumno;
	private int esRegistro;
}

