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
@Table(name = "banco")
@Where(clause = "esregistro=1")
public class Banco {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column (name = "cobanco")
	private int coBanco;
	@Column (name = "nobanco")
	private String noBanco;
	@Column (name = "nucuenta")
	private String nuCuenta;
	@Column (name = "nucci")
	private String nucci;
	
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
	/*
	public Integer getCoBanco() {
		return coBanco;
	}
	public void setCoBanco(Integer coBanco) {
		this.coBanco = coBanco;
	}
	public String getNoBanco() {
		return noBanco;
	}
	public void setNoBanco(String noBanco) {
		this.noBanco = noBanco;
	}
	public String getNuCuenta() {
		return nuCuenta;
	}
	public void setNuCuenta(String nuCuenta) {
		this.nuCuenta = nuCuenta;
	}
	public String getNucci() {
		return nucci;
	}
	public void setNucci(String nucci) {
		this.nucci = nucci;
	}
	public int getEsRegistro() {
		return esRegistro;
	}
	public void setEsRegistro(int esRegistro) {
		this.esRegistro = esRegistro;
	}
	public String getUsuarioCreacion() {
		return usuarioCreacion;
	}
	public void setUsuarioCreacion(String usuarioCreacion) {
		this.usuarioCreacion = usuarioCreacion;
	}
	public Date getFechaCreacion() {
		return fechaCreacion;
	}
	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	public String getIpCreacion() {
		return ipCreacion;
	}
	public void setIpCreacion(String ipCreacion) {
		this.ipCreacion = ipCreacion;
	}
	public String getUsuarioModificacion() {
		return usuarioModificacion;
	}
	public void setUsuarioModificacion(String usuarioModificacion) {
		this.usuarioModificacion = usuarioModificacion;
	}
	public Date getFechaModificacion() {
		return fechaModificacion;
	}
	public void setFechaModificacion(Date fechaModificacion) {
		this.fechaModificacion = fechaModificacion;
	}
	public String getIpModificacion() {
		return ipModificacion;
	}
	public void setIpModificacion(String ipModificacion) {
		this.ipModificacion = ipModificacion;
	}	
	*/
}

