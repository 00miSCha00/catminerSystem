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
public class TipoCarreraResponse {
	
	private int coTipoCarrera;
	private String deTipoCarrera;
	@Getter(value = AccessLevel.NONE)
	private String codigoTipoCarrera;
	
	public String getCodigoTipoCarrera() {
		this.codigoTipoCarrera=StringUtils.leftPad(String.valueOf(coTipoCarrera), 4, '0');
		return codigoTipoCarrera;
	}
}

