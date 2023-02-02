var table;
var configuracion = {};
var listadoconfiguracionPagos = [];
var listadoCarrera = [];
var listadoTipoCarrera = [];
$(document).ready(function() {
	$('#costoCarrera').val(0);
	$('#duracionCarrera').val(0)
	$('#nuevo').click(function() {
		nuevoconfiguracionPagos();
	});
	$('.grabarRegistro').click(function() {
		grabarconfiguracionPagos();
	});

	$('.actualizarRegistro').click(function() {
		actualizarconfiguracionPagos();
	});

	$('.eliminarRegistro').click(function() {
		eliminarconfiguracionPagos();
	});

	$('.buscarconfiguracionPagos').click(function() {
		listarconfiguracionPago();
	});
	$('#costoCarrera').blur(function() {
		calcularCostototal();
	});
	$('#duracionCarrera').blur(function() {
		calcularCostototal();
	});
	
	listarCarrera();
	

});


function nuevoconfiguracionPagos() {
	limpiar();
	$('#modalConfiguracionPagos').modal('show');
}

function grabarconfiguracionPagos() {

	cargarconfiguracionPagos();
	$("#loading-div").show();
	$.ajax({
		url: catminer + '/grabarconfiguracionPagos',
		type: 'POST',
		data: JSON.stringify(configuracion),
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

function editar(id) {

	if (listadoconfiguracionPagos.length > 0) {

		$.each(listadoconfiguracionPagos, function(key, reg) {
			if (reg.coConfiguracionPagos === id) {
				
				
				$('#idConfiguracionPagos').val(reg.coConfiguracionPagos);
				$(".carrerasN").val(reg.coCarrera);
				$("#duracionCarrera").val(reg.duracion);
				$("#costoCarrera").val(reg.costoUnitario);
				$("#costoTotalCarrera").val(reg.costoTotal);
				$('.carrerasN').trigger('change');
				$('.nuevoTitulo').text("Actualización Tipo de configuracionPagos");
				$("#grabar").removeClass("grabarRegistro");
				$("#grabar").addClass("actualizarRegistro");

				$('#modalConfiguracionPagos').modal('show');

			}
		});


	}


}

function actualizarconfiguracionPagos() {

	cargarconfiguracionPagos();
	$("#loading-div").show();
	$.ajax({
		url: catminer + '/grabarconfiguracionPagos',
		type: 'POST',
		data: JSON.stringify(carrera),
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
	if (listadoconfiguracionPagos.length > 0) {

		$.each(listadoconfiguracionPagos, function(key, reg) {
			if (reg.coConfiguracionPagos === id) {
				configuracion = reg;
				$('#datoEliminar').text(reg.carrera);
				$('#eliminarRegistro').modal('show');
			}
		});
	}

}

function eliminarconfiguracionPagos() {
	configuracion.esRegistro = 0;
	$("#loading-div").show();
	$.ajax({
		url: catminer + '/grabarconfiguracionPagos',
		type: 'POST',
		data: JSON.stringify(configuracion),
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
  	    		carrera.text="Seleccione Tipo de configuracionPagos";
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
			listarconfiguracionPago();
			

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


function listarconfiguracionPago() {
	listadoconfiguracionPagos.length = 0;
	var url = catminer + "/listarConfiguracionPago";
	$("#loading-div").show();
	configuracionRequest = {
		coCarrera: $('#carreraB').val()
	}
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(configuracionRequest),
		contentType: "application/json; charset=utf-8",
		success: function(lista) {
			var miJson = [];
			listadoconfiguracionPagos = lista;

			$.each(lista, function(key, reg) {

				reg.opciones = '<a title="Editar Registro" href=javascript:editar(' + reg.coConfiguracionPagos + ');>' +
					'<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
					'</a>&nbsp;&nbsp;<a title="Eliminar Registro" href=javascript:darBaja(' + reg.coConfiguracionPagos + ');>' +
					'<i class="fa fa-trash" aria-hidden="true"></i>' +
					'</a>&nbsp;&nbsp;';
				

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

		{ data: "codigoConfiguracion", className: "dt-left", targets: "_all" },
		{ data: "carrera", className: "dt-left", targets: "_all" },
		{ data: "tipoCarrera", className: "dt-left", targets: "_all" },
		{ data: "duracion", className: "dt-left", targets: "_all" },
		{ data: "costoUnitario", className: "dt-left", targets: "_all" },
		{ data: "costoTotal", className: "dt-left", targets: "_all" },
		{ data: "opciones", className: "dt-center opciones-table", targets: "_all" }

	];

	if (table) {
		table.destroy();
		$('#listadoConfiguracionPagos > tbody').empty();
	}
	table = $('#listadoConfiguracionPagos').DataTable({
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
function cargarconfiguracionPagos() {
	configuracion.esRegistro = 1;
	configuracion.coConfiguracionPagos = $('#idConfiguracionPagos').val();
	configuracion.coCarrera = $(".carrerasN option:selected").val();
	configuracion.duracion = $("#duracionCarrera").val();
	configuracion.costoUnitario = $("#costoCarrera").val();
	configuracion.costoTotal = $("#costoTotalCarrera").val();

}

function obtenerObjetoEliminar(id) {

	if (listadoconfiguracionPagos.length > 0) {

		$.each(listadoconfiguracionPagos, function(key, reg) {
			if (reg.coconfiguracionPagos === id) {
				return reg;
			}
		});
	}
}

function limpiar() {
	$('#').val('');
	$('#descripcionconfiguracionPagos').val('');
	$('#tipoconfiguracionPagosN').val(0);
	$('#tipoconfiguracionPagosN').trigger('change');
	$("#grabar").removeClass("grabarRegistro");
	$("#grabar").removeClass("actualizarRegistro");
	$("#grabar").addClass("grabarRegistro");
}

function obtenerNombreTipoCarrera(id) {
var tipoCarrera="-";
	if (listadoTipoCarrera.length > 0) {

		$.each(listadoTipoCarrera, function(key, reg) {
			if (reg.coTipoCarrera === id) {
				tipoCarrera= reg.deTipoCarrera
				return false;
			}
		});
		return tipoCarrera;
	}
}

function obtenerNombreCarrera(id) {
var carrera="-";
	if (listadoCarrera.length > 0) {

		$.each(listadoCarrera, function(key, reg) {
			if (reg.coCarrera === id) {
				carrera= reg.deCarrera
				return false;
			}
		});
		return carrera;
	}
}
function calcularCostototal(){
	var duracion = $("#duracionCarrera").val();
	var costo = $("#costoCarrera").val();
	var costoTotal = duracion * costo;
	$("#costoTotalCarrera").val(costoTotal);
	
	
}

function retornar() {
	window.location = catminer + "/mantenimiento/configuracionPagos";
}
