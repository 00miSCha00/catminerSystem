package pe.catminer.api.response;

import org.apache.commons.lang3.StringUtils;

import lombok.AccessLevel;
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
public class MatriculaResponse {
	
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

	private int coTipoDocumento;
	private String numeroDocumento;
	private String apellidoPaterno;
	private String apellidoMaterno;
	
	private String nombres;
	private int sexo;
	private String alumno;
	private String contacto;
	
	@Getter(value = AccessLevel.NONE)
	private String codigoPersona;
	
	@Getter(value = AccessLevel.NONE)
	private String apellidos;
	@Getter(value = AccessLevel.NONE)
	private String sexoTexto;

	public String getCodigoPersona() {
		this.codigoPersona=StringUtils.leftPad(String.valueOf(coPersona), 4, '0');
		return codigoPersona;
	}

	public String getApellidos() {
		this.apellidos =  apellidoPaterno +" " + apellidoMaterno;
		return apellidos;
	}

	public String getSexoTexto() {
		switch (sexo) {
		case 0:
			this.sexoTexto="Masculino";
			break;

		case 1:
			this.sexoTexto="Femenino";
			break;
		}
		return sexoTexto;
	}
	
	
}

