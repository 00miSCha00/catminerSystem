var table;
var sede = {

};
var listadoSede = [];
$(document).ready(function() {
	$('#nuevo').click(function() {
		nuevoSede();
	});
	$('.grabarRegistro').click(function() {
		grabarSede();
	});

	$('.actualizarRegistro').click(function() {
		actualizarSede();
	});
	
	$('.eliminarRegistro').click(function() {
		eliminarSede();
	});
	
	$('.buscarSede').click(function() {
		listarSede();
	});
	
	listarSede();
});


function nuevoSede() {
	limpiar();
	$('#modalSede').modal('show');
}

function grabarSede() {

	cargarSede();
	$("#loading-div").show(); 
	$.ajax({
		url: './grabarSede',
		type: 'POST',
		data: JSON.stringify(sede),
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
		complete: function () {
        $("#loading-div").hide(); 
      }
	});

}

function editar(id) {

	if (listadoSede.length > 0) {

		$.each(listadoSede, function(key, reg) {
			if (reg.coSede === id) {
				$('#idSede').val(reg.coSede);
				$('#descripcionSede').val(reg.deSede);
				$('#direccionSede').val(reg.direccion);

				$('.nuevoTitulo').text("Actualización de Sede");
				$("#grabar").removeClass("grabarRegistro");
				$("#grabar").addClass("actualizarRegistro");

				$('#modalSede').modal('show');

			}
		});


	}


}

function actualizarSede() {

	cargarSede();
	$("#loading-div").show(); 
	$.ajax({
		url: './grabarSede',
		type: 'POST',
		data: JSON.stringify(sede),
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
		complete: function () {
        $("#loading-div").hide(); 
      }
	});

	
};

function darBaja(id){
	if (listadoSede.length > 0) {

		$.each(listadoSede, function(key, reg) {
			if (reg.coSede === id) {
				sede = reg;
				$('#datoEliminar').text(reg.noSede);
				$('#eliminarRegistro').modal('show');
			}
		});
	}

}

function eliminarSede() {
	sede.esRegistro=0;
	$("#loading-div").show(); 
	$.ajax({
		url: './grabarSede',
		type: 'POST',
		data: JSON.stringify(sede),
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
		complete: function () {
        $("#loading-div").hide(); 
      }
	});



};

function listarSede() {
	listadoSede.length = 0;
	var url = "./listarSede";
	$("#loading-div").show();
	sedeRequest= {
		deSede:$('#descripcionSedeBusqueda').val().toUpperCase()
	}
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(sedeRequest),
		contentType: "application/json; charset=utf-8",
		success: function(lista) {
			var miJson = [];
			listadoSede = lista;

			$.each(lista, function(key, reg) {

				reg.opciones = '<a title="Editar Registro" href=javascript:editar(' + reg.coSede + ');>' +
					'<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
					'</a>&nbsp;&nbsp;<a title="Eliminar Registro" href=javascript:darBaja(' + reg.coSede + ');>' +
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
		complete: function () {
        $("#loading-div").hide(); 
      }
	});
	
};

function loadTable(data) {
	var colBusqueda = [

		{ data: "deSede", className: "dt-left", targets: "_all" },
		{ data: "direccion", className: "dt-center", targets: "_all" },
		{ data: "opciones", className: "dt-center opciones-table", targets: "_all" }

	];

	if (table) {
		table.destroy();
		$('#listadoSedes > tbody').empty();
	}
	table = $('#listadoSedes').DataTable({
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
function cargarSede() {
	sede.coSede = $('#idSede').val();
	sede.deSede = $('#descripcionSede').val().toUpperCase();
	sede.direccion = $('#direccionSede').val().toUpperCase();
	sede.esRegistro=1;
}

function obtenerObjetoEliminar(id){
	
	if (listadoSede.length > 0) {

		$.each(listadoSede, function(key, reg) {
			if (reg.coSede === id) {
				return reg;
			}
		});
	}
}

function limpiar() {
	$('#idSede').val('');
	$('#descripcionSede').val('');
	$('#direccionSede').val('');
	$('.nuevoTitulo').text("Registro de Sede");
	$("#grabar").removeClass("grabarRegistro");
	$("#grabar").removeClass("actualizarRegistro");
	$("#grabar").addClass("grabarRegistro");
}

function retornar() {
	window.location = "./sede";
}
