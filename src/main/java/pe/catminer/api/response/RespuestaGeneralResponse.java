package pe.catminer.api.response;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class RespuestaGeneralResponse {
	private String  respuesta;
	private boolean exito;
	
	
}
