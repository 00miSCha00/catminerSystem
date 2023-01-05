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
public class TipoPagoRequest {
	
	private int coTipoPago;
	private String deTipoPago;
	private int esRegistro;
}

