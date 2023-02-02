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
@Table(name = "alumnocarrera")
@Where(clause = "esregistro=1")
public class AlumnoCarrera {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column (name = "coalumnocarrera")
	private int coAlumnoCarrera;
	@Column (name = "coalumno")
	private int coAlumno;
	@Column (name = "cocarrera")
	private int coCarrera;
	@Column (name = "costounitario")
	private int costoUnitario;
	@Column (name = "costototal")
	private int costoTotal;
	@Column (name = "especial")
	private boolean especial;
	
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

