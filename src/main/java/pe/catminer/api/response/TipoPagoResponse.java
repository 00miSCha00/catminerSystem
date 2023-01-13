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
public class TipoPagoResponse {
	
	private int coTipoPago;
	private String deTipoPago;
	@Getter(value = AccessLevel.NONE)
	private String codigoTipoPago;
	
	public String getCodigoTipoPago() {
		this.codigoTipoPago=StringUtils.leftPad(String.valueOf(coTipoPago), 4, '0');
		return codigoTipoPago;
	}
	
	
}

