package pe.catminer.api.response;

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
public class SedeResponse {
	
	private int coSede;
	private String deSede;
	private String direccion;
	private int esRegistro;
}

