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
public class ConfiguracionPagoResponse {
	
	private int coConfiguracionPagos;
	private int coCarrera;
	private int duracion;
	private long costoUnitario;
	private long costoTotal;
	
	@Getter(value = AccessLevel.NONE)
	private String codigoConfiguracion;

	public String getCodigoConfiguracion() {
		this.codigoConfiguracion=StringUtils.leftPad(String.valueOf(coConfiguracionPagos), 4, '0');
		return codigoConfiguracion;
	}
}

