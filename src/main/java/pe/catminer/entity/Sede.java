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
@Table(name = "SEDE", schema = "public")
public class Sede {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column (name = "coSede")
	private int coSede;
	@Column (name = "deSede")
	private String deSede;
	
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

