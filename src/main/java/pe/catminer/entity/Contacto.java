package pe.catminer.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

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
@Entity
@Table(name = "contacto")
@Where(clause = "esregistro=1")
public class Contacto {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column (name = "cocontacto")
	private int coContacto;
	@Column (name = "coalumno")
	private int coAlumno;
	@Column (name = "copersona")
	private int coPersona;
	@Column (name = "coparentesco")
	private int coParentesco;
	@Column (name = "direccion")
	private String direccion;
	@Column (name = "correo")
	private String correo;
	@Column (name = "celular")
	private String celular;
	
	@Column (name = "esregistro")
	private int esRegistro;
	@Column (name = "usucrea")
	private String usuarioCreacion;
	@Column (name = "fecrea")
	private Date fechaCreacion;
	@Column (name = "ipcrea")
	private String ipCreacion;
	@Column (name = "usumodi")
	private String usuarioModificacion;
	@Column (name = "femodi")
	private Date fechaModificacion;
	@Column (name = "ipmodi")
	private String ipModificacion;

	
}

