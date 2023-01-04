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
public class CarreraResponse {
	
	private int coCarrera;
	private String deCarrera;
	private int coTipoCarrera;
	@Getter(value = AccessLevel.NONE)
	private String codigoCarrera;
	
	public String getCodigoCarrera() {
		this.codigoCarrera=StringUtils.leftPad(String.valueOf(coCarrera), 4, '0');
		return codigoCarrera;
	}
}

