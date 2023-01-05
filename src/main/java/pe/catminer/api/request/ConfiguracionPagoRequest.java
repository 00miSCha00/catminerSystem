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
public class ConfiguracionPagoRequest {
	
	private int coConfiguracionPagos;
	private int coCarrera;
	private String carrera;
	private int duracion;
	private long costoUnitario;
	private long costoTotal;
	private int esRegistro;
}

