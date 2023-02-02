var table;
var persona = {};
var alumno = {};
var matricula = {};
var listadoPersona = [];
var listadoCarrera = [];
$(document).ready(function() {
	$(".activarEspecial").hide();
	$('#nuevo').click(function() {
		nuevoPersona();
	});
	$('.grabarRegistro').click(function() {
		grabarPersona();
	});
	
	$('#matricular').click(function() {
		matricular();
	});

	$('.actualizarRegistro').click(function() {
		actualizarPersona();
	});
	$("#activar").change(function() {
		if (this.checked) {
			$(".activarEspecial").show();
		} else {
			$(".activarEspecial").hide();
		}
	});


	$('.eliminarRegistro').click(function() {
		eliminarPersona();
	});

	$('.buscarPersona').click(function() {
		listarPersona();
	});

	listarPersona();
	
	listarCarrera();
});


function nuevoPersona() {
	limpiar();
	$('#modalPersona').modal('show');
}

function listarCarrera() {
	listado = [];
	var url = catminer + "/listarCarrera";
	$("#loading-div").show();
	carreraRequest = {
		deCarrera: ''
	}
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(carreraRequest),
		contentType: "application/json; charset=utf-8",
		success: function(res) {

			$.each(res, function(i, data) {
				var carrera = {}
				carrera.id = data.coCarrera;
				carrera.text = data.deCarrera;

				listado.push(carrera);
			});

			var carrera ={}
	  	    	carrera.id=0;
  	    		carrera.text="Seleccione Carrea";
	  	    	listado.unshift(carrera);

			$(".carreraB").select2({
				data: listado,
				placeholder: "Seleccione",
				width: "100%"
			});
			$(".carrerasN").select2({
				data: listado,
				placeholder: "Seleccione",
				width: "100%"
			});
			listadoCarrera=res;
					

		},
		error: function(res) {
			$("#loading-div").hide();
			var texto = 'Hubo un problema con el listado de carreras.';
			notificacionMensaje(texto, 'danger');
			return false;
		},
		complete: function() {
			$("#loading-div").hide();
		}
	});

};


function grabarPersona() {

	cargarPersona();
	$("#loading-div").show();
	$.ajax({
		url: catminer + '/grabarPersona',
		type: 'POST',
		data: JSON.stringify(persona),
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function(res) {
			if (res.exito) {
				var texto = 'Se dio registro satisfactoriamente';
				notificacionMensaje(texto, 'success')
				retornar();

			} else {
				var texto = 'No se grabo hubo un inconveniente al momento del registro';
				notificacionMensaje(texto, 'danger')
				return false;
			}

		},
		error: function(res) {
			var texto = 'Hubo un problema con el registro';
			notificacionMensaje(texto, 'danger')
			$("#loading-div").hide();
			return false;
		},
		complete: function() {
			$("#loading-div").hide();
		}
	});

}

function editaMatriculaAlumno(id) {

	if (listadoPersona.length > 0) {

		$.each(listadoPersona, function(key, reg) {
			if (reg.coAlumno === id) {
				$('#idPersona').val(reg.coPersona);
				$('#idAlumno').val(reg.coAlumno);
				$("#direccion").val(reg.direccion.toUpperCase());
				$("#email").val(reg.correo.toUpperCase());
				$("#celular").val(reg.celular);
			
				$('.activarEspecial').prop("checked", reg.especial);
				
				$("#costoCarrera").val(reg.costounitario);
				$("#costoTotalCarrera").val(reg.costototal);
				$("#carrerasN option:selected").val(reg.coCarrera);
				
				$('.numeroDocumentoM').text(reg.numeroDocumento);
				$('.apellidosNombresM').text(reg.apellidos);
				$('.feNacimientoM').text(reg.feNacimiento);
				$('.sexoM').text(reg.sexoTexto);

				$('.nuevoTitulo').text("Matricular alumno");
				$("#grabar").removeClass("grabarRegistro");
				$("#grabar").addClass("actualizarRegistro");

				$('#modalMatricula').modal('show');

			}
		});


	}


}

function editar(id) {

	if (listadoPersona.length > 0) {

		$.each(listadoPersona, function(key, reg) {
			if (reg.coPersona === id) {
				$('#idPersona').val(reg.coPersona);
				$("#direccion").val(reg.direccion.toUpperCase());
				$("#email").val(reg.correo.toUpperCase());
				$("#celular").val(reg.celular);
			
				$('.activarEspecial').prop("checked", reg.especial);
				
				$("#costoCarrera").val(reg.costounitario);
				$("#costoTotalCarrera").val(reg.costototal);
				$("#carrerasN option:selected").val(reg.coCarrera);
				
				$('#numeroDocumento').text(reg.numeroDocumento);
				$('#apePaterno').text(reg.apellidoPaterno);
				$('#apeMaterno').text(reg.apellidoMaterno);
				$('#feNacimiento').text(reg.feNacimiento);
				$("#sexoN").val(reg.sexo);
				$('#sexoN').trigger('change');
			
				$('.nuevoTitulo').text("Actualización de Persona");
				$("#grabar").removeClass("grabarRegistro");
				$("#grabar").addClass("actualizarRegistro");

				$('#modalPersona').modal('show');

			}
		});


	}


}

function actualizarPersona() {

	cargarPersona();
	$("#loading-div").show();
	$.ajax({
		url: catminer + '/grabarPersona',
		type: 'POST',
		data: JSON.stringify(persona),
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function(res) {
			if (res.exito) {
				var texto = 'Se dio registro satisfactoriamente';
				notificacionMensaje(texto, 'success')
				retornar();

			} else {
				var texto = 'Hubo un inconveniente';
				notificacionMensaje(texto, 'danger')
				return false;
			}

		},
		error: function(res) {
			var texto = 'Hubo un problema';
			notificacionMensaje(texto, 'danger')
			$("#loading-div").hide();
			return false;
		},
		complete: function() {
			$("#loading-div").hide();
		}
	});


};

function darBaja(id) {
	if (listadoPersona.length > 0) {

		$.each(listadoPersona, function(key, reg) {
			if (reg.coPersona === id) {
				persona = reg;
				$('#datoEliminar').text(reg.noPersona);
				$('#eliminarRegistro').modal('show');
			}
		});
	}

}

function eliminarPersona() {
	persona.esRegistro = 0;
	$("#loading-div").show();
	$.ajax({
		url: catminer + '/grabarPersona',
		type: 'POST',
		data: JSON.stringify(persona),
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function(res) {
			if (res.exito) {

				var texto = 'Se dio registro satisfactoriamente';
				notificacionMensaje(texto, 'success')
				retornar();

			} else {

				var texto = 'Hubo un inconveniente';
				notificacionMensaje(texto, 'danger')
				return false;
			}

		},
		error: function(res) {
			var texto = 'Hubo un problema';
			notificacionMensaje(texto, 'danger')
			$("#loading-div").hide();
			return false;
		},
		complete: function() {
			$("#loading-div").hide();
		}
	});



};

function matricular() {

	cargaMatricula();
	$("#loading-div").show();
	$.ajax({
		url: catminer + '/matricular',
		type: 'POST',
		data: JSON.stringify(alumno),
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function(res) {
			if (res.exito) {
				var texto = 'Se dio registro satisfactoriamente';
				notificacionMensaje(texto, 'success')
				retornar();

			} else {
				var texto = 'Hubo un inconveniente';
				notificacionMensaje(texto, 'danger')
				return false;
			}

		},
		error: function(res) {
			var texto = 'Hubo un problema';
			notificacionMensaje(texto, 'danger')
			$("#loading-div").hide();
			return false;
		},
		complete: function() {
			$("#loading-div").hide();
		}
	});


};

function listarPersona() {
	listadoPersona.length = 0;
	var url = catminer + "/listarPersonaMatricula";
	$("#loading-div").show();
	personaRequest = {
		numeroDocumento: $('#dniPersonaBusqueda').val()
	}
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(personaRequest),
		contentType: "application/json; charset=utf-8",
		success: function(lista) {
			var miJson = [];
			listadoPersona = lista;

			$.each(lista, function(key, reg) {
				reg.opciones = '&nbsp;&nbsp';
				if (reg.alumno === 'No') {
					reg.opciones += '<a title="Matricular alumno" href=javascript:matriculaAlumno(' + reg.coPersona + ');>' +
						'<i class="fa fa-address-card" aria-hidden="true"></i></a>'
				}else{
					reg.opciones += '<a title="Editar Matricula alumno" href=javascript:editaMatriculaAlumno(' + reg.coAlumno + ');>' +
						'<i class="fa fa-id-card-o" aria-hidden="true"></i></a>'
				}
				
				
				reg.opciones += '<a title="Editar Registro" href=javascript:editar(' + reg.coPersona + ');>' +
					'<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
					'</a>&nbsp;&nbsp;<a title="Eliminar Registro" href=javascript:darBaja(' + reg.coPersona + ');>' +
					'<i class="fa fa-trash" aria-hidden="true"></i></a>&nbsp;&nbsp;';

				miJson.push(reg);
			});

			loadTable(miJson);

		},
		error: function(res) {
			$("#loading-div").hide();
			var texto = 'Hubo un problema con la obtencion de las RSEs.';
			notificacionMensaje(texto, 'danger');
			return false;
		},
		complete: function() {
			$("#loading-div").hide();
		}
	});

};

function loadTable(data) {
	var colBusqueda = [

		{ data: "numeroDocumento", className: "dt-center", targets: "_all" },
		{ data: "apellidos", className: "dt-left", targets: "_all" },
		{ data: "nombres", className: "dt-left", targets: "_all" },
		{ data: "alumno", className: "dt-left", targets: "_all" },
		{ data: "sexoTexto", className: "dt-left", targets: "_all" },
		{ data: "opciones", className: "dt-center opciones-table", targets: "_all" }

	];

	if (table) {
		table.destroy();
		$('#listadoPersonas > tbody').empty();
	}
	table = $('#listadoPersonas').DataTable({
		scrollX: true,
		searching: false,
		iDisplayLength: 20,
		//dom: "<'row be-datatable-header'<'col-sm-6'l><'col-sm-6 text-right'B>><'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>",
		bLengthChange: false,

		language: {
			"lengthMenu": '_MENU_ items por página',
			"search": '<i class="fa fa-search"></i>',
			"sZeroRecords": "No se encontraron resultados",
			"sEmptyTable": "Ningún dato disponible en esta tabla",
			"sInfo": "Total de registros: _TOTAL_",
			"sInfoEmpty": "",
			"sInfoFilteminT": "(filtrado de un total de _MAX_ registros)",
			"sLoadingRecords": "Cargando...",
			"oAria": {
				"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
				"sSortDescending": ": Activar para ordenar la columna de manera descendente"
			},
			"paginate": {
				"previous": '<i class="fa fa-angle-left"></i>',
				"next": '<i class="fa fa-angle-right"></i>'
			}
		},
		bSort: false,
		paging: true,
		data: data,
		select: true,
		columns: colBusqueda
	});


};
function cargarPersona() {
	persona.coPersona = $('#idPersona').val();
	persona.coTipoDocumento = 1;//$("").val();
	persona.numeroDocumento = $("#numeroDocumento").val();
	persona.apellidoPaterno = $("#apePaterno").val().toUpperCase();
	persona.apellidoMaterno = $("#apeMaterno").val().toUpperCase();
	persona.nombres = $("#nombres").val().toUpperCase();
	persona.sexo = $("#sexoN option:selected").val();
	persona.fechaNacimiento = $("#feNacimiento").val();
	persona.esRegistro = 1;
}
function cargaMatricula() {
	alumno.coPersona = $('#idPersona').val();
	alumno.direccion = $("#direccion").val();
	alumno.correo = $("#email").val();
	alumno.celular = $("#celular").val().toUpperCase();

	if ($('.activarEspecial').is(':checked')) {
		alumno.especial = true;
		alumno.costounitario = $("#costoCarrera").val();
		alumno.costototal = $("#costoTotalCarrera").val();
		alumno.coCarrera = $("#carrerasN option:selected").val();
	}
	alumno.esRegistro = 1;
}

function obtenerObjetoEliminar(id) {

	if (listadoPersona.length > 0) {

		$.each(listadoPersona, function(key, reg) {
			if (reg.coPersona === id) {
				return reg;
			}
		});
	}
}

function limpiar() {
	$('#idPersona').val('');
	$('#descripcionPersona').val('');
	$('#numeroCuenta').val('');
	$('#codigoInterbancario').val('');
	$("#grabar").removeClass("grabarRegistro");
	$("#grabar").removeClass("actualizarRegistro");
	$("#grabar").addClass("grabarRegistro");
}

function matriculaAlumno(id) {
	if (listadoPersona.length > 0) {

		$.each(listadoPersona, function(key, reg) {
			if (reg.coPersona === id) {
				$('#idPersona').val(reg.coPersona);
				$('.numeroDocumentoM').text(reg.numeroDocumento);
				$('.apellidosNombresM').text(reg.apellidos);
				$('.feNacimientoM').text(reg.feNacimiento);
				$('.sexoM').text(reg.sexoTexto);

				$('.nuevoTitulo').text("Matricular alumno");
				$("#grabar").removeClass("grabarRegistro");
				$("#grabar").addClass("actualizarRegistro");

				$('#modalMatricula').modal('show');

			}
		});


	}

}

function retornar() {
	window.location = catminer + "/inscripcion/alumno";
}
