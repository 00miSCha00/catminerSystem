package pe.catminer.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
@Entity
@Table(name = "PERSONA", schema = "public")
public class Persona {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column (name = "copersona")
	private int coPersona;
	@Column (name = "coTipoDocumento")
	private int coTipoDocumento;
	@Column (name = "numeroDocumento")
	private String numeroDocumento;
	@Column (name = "apellidoPaterno")
	private String apellidoPaterno;
	@Column (name = "apellidoMaterno")
	private String apellidoMaterno;
	@Column (name = "nombres")
	private String nombres;
	@Column (name = "sexo")
	private int sexo;
	@Column (name = "fechaNacimiento")
	private String fechaNacimiento;
	@Column (name = "esRegistro")
	private int esRegistro;
	@Column (name = "usuarioCreacion")
	private String usuarioCreacion;
	@Column (name = "fechaCreacion")
	private Date fechaCreacion;
	@Column (name = "ipCreacion")
	private String ipCreacion;
	@Column (name = "usuarioModificacion")
	private String usuarioModificacion;
	@Column (name = "fechamodificacion")
	private Date fechaModificacion;
	@Column (name = "ipmodificacion")
	private String ipModificacion;	

	
}

