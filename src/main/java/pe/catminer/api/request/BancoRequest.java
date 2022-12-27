package pe.catminer.api.request;

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
public class BancoRequest {
	
	private int coBanco;
	private String noBanco;
	private String nuCuenta;
	private String nucci;
	private int esRegistro;
}

