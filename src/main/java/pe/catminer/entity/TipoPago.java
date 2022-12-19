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
@Table(name = "TIPOPAGO", schema = "public")
public class TipoPago {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column (name = "coTipoPago")
	private int coTipoPago;
	@Column (name = "deTipoPago")
	private String deTipoPago;
	
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

