var table;
var persona = {};
var alumno = {};
var matricula = {};
var listadoPago = [];

$(document).ready(function() {
	$(".activarEspecial").hide();
	$('#nuevo').click(function() {
		nuevoPago();
	});
	$('.grabarRegistro').click(function() {
		grabarPago();
	});
	
	$('.actualizarRegistro').click(function() {
		actualizarPago();
	});
	
	$('.eliminarRegistro').click(function() {
		eliminarPago();
	});

	$('.buscarPago').click(function() {
		listarPago();
	});

	listarPago();
	
	listarCarrera();
});


function nuevoPago() {
	limpiar();
	$('#modalPago').modal('show');
}



function grabarPago() {

	cargarPago();
	$("#loading-div").show();
	$.ajax({
		url: catminer + '/grabarPago',
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

	if (listadoPago.length > 0) {

		$.each(listadoPago, function(key, reg) {
			if (reg.coAlumno === id) {
				$('#idPago').val(reg.coPago);
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

	if (listadoPago.length > 0) {

		$.each(listadoPago, function(key, reg) {
			if (reg.coPago === id) {
				$('#idPago').val(reg.coPago);
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
			
				$('.nuevoTitulo').text("Actualización de Pago");
				$("#grabar").removeClass("grabarRegistro");
				$("#grabar").addClass("actualizarRegistro");

				$('#modalPago').modal('show');

			}
		});


	}


}

function actualizarPago() {

	cargarPago();
	$("#loading-div").show();
	$.ajax({
		url: catminer + '/grabarPago',
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
	if (listadoPago.length > 0) {

		$.each(listadoPago, function(key, reg) {
			if (reg.coPago === id) {
				persona = reg;
				$('#datoEliminar').text(reg.noPago);
				$('#eliminarRegistro').modal('show');
			}
		});
	}

}

function eliminarPago() {
	persona.esRegistro = 0;
	$("#loading-div").show();
	$.ajax({
		url: catminer + '/grabarPago',
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

function listarPago() {
	listadoPago.length = 0;
	var url = catminer + "/listarPagoMatricula";
	$("#loading-div").show();
	personaRequest = {
		numeroDocumento: $('#dniPagoBusqueda').val()
	}
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(personaRequest),
		contentType: "application/json; charset=utf-8",
		success: function(lista) {
			var miJson = [];
			listadoPago = lista;

			$.each(lista, function(key, reg) {
				reg.opciones = '&nbsp;&nbsp';
				if (reg.alumno === 'No') {
					reg.opciones += '<a title="Matricular alumno" href=javascript:matriculaAlumno(' + reg.coPago + ');>' +
						'<i class="fa fa-address-card" aria-hidden="true"></i></a>'
				}else{
					reg.opciones += '<a title="Editar Matricula alumno" href=javascript:editaMatriculaAlumno(' + reg.coAlumno + ');>' +
						'<i class="fa fa-id-card-o" aria-hidden="true"></i></a>'
				}
				
				
				reg.opciones += '<a title="Editar Registro" href=javascript:editar(' + reg.coPago + ');>' +
					'<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
					'</a>&nbsp;&nbsp;<a title="Eliminar Registro" href=javascript:darBaja(' + reg.coPago + ');>' +
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
		$('#listadoPagos > tbody').empty();
	}
	table = $('#listadoPagos').DataTable({
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
function cargarPago() {
	persona.coPago = $('#idPago').val();
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
	alumno.coPago = $('#idPago').val();
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

	if (listadoPago.length > 0) {

		$.each(listadoPago, function(key, reg) {
			if (reg.coPago === id) {
				return reg;
			}
		});
	}
}

function limpiar() {
	$('#idPago').val('');
	$('#descripcionPago').val('');
	$('#numeroCuenta').val('');
	$('#codigoInterbancario').val('');
	$("#grabar").removeClass("grabarRegistro");
	$("#grabar").removeClass("actualizarRegistro");
	$("#grabar").addClass("grabarRegistro");
}

function matriculaAlumno(id) {
	if (listadoPago.length > 0) {

		$.each(listadoPago, function(key, reg) {
			if (reg.coPago === id) {
				$('#idPago').val(reg.coPago);
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
