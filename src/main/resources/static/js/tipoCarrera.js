var table;
var tipoCarrera = {

};
var listadoTipoCarrera = [];
$(document).ready(function() {
	$('#nuevo').click(function() {
		nuevoTipoCarrera();
	});
	$('.grabarRegistro').click(function() {
		grabarTipoCarrera();
	});

	$('.actualizarRegistro').click(function() {
		actualizarTipoCarrera();
	});
	
	$('.eliminarRegistro').click(function() {
		eliminarTipoCarrera();
	});
	
	$('.buscarTipoCarrera').click(function() {
		listarTipoCarrera();
	});
	
	listarTipoCarrera();
});


function nuevoTipoCarrera() {
	limpiar();
	$('#modalTipoCarrera').modal('show');
}

function grabarTipoCarrera() {

	cargarTipoCarrera();
	$("#loading-div").show(); 
	$.ajax({
		url: './grabarTipoCarrera',
		type: 'POST',
		data: JSON.stringify(tipoCarrera),
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

	if (listadoTipoCarrera.length > 0) {

		$.each(listadoTipoCarrera, function(key, reg) {
			if (reg.coTipoCarrera === id) {
				$('#idTipoCarrera').val(reg.coTipoCarrera);
				$('#descripcionTipoCarrera').val(reg.deTipoCarrera);
				

				$('.nuevoTitulo').text("Actualización Tipo de Carrera");
				$("#grabar").removeClass("grabarRegistro");
				$("#grabar").addClass("actualizarRegistro");

				$('#modalTipoCarrera').modal('show');

			}
		});


	}


}

function actualizarTipoCarrera() {

	cargarTipoCarrera();
	$("#loading-div").show(); 
	$.ajax({
		url: './grabarTipoCarrera',
		type: 'POST',
		data: JSON.stringify(tipoCarrera),
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
	if (listadoTipoCarrera.length > 0) {

		$.each(listadoTipoCarrera, function(key, reg) {
			if (reg.coTipoCarrera === id) {
				tipoCarrera = reg;
				$('#datoEliminar').text(reg.noTipoCarrera);
				$('#eliminarRegistro').modal('show');
			}
		});
	}

}

function eliminarTipoCarrera() {
	tipoCarrera.esRegistro=0;
	$("#loading-div").show(); 
	$.ajax({
		url: './grabarTipoCarrera',
		type: 'POST',
		data: JSON.stringify(tipoCarrera),
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

function listarTipoCarrera() {
	listadoTipoCarrera.length = 0;
	var url = "./listarTipoCarrera";
	$("#loading-div").show();
	tipoCarreraRequest= {
		deTipoCarrera:$('#descripcionTipoCarreraBusqueda').val().toUpperCase()
	}
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(tipoCarreraRequest),
		contentType: "application/json; charset=utf-8",
		success: function(lista) {
			var miJson = [];
			listadoTipoCarrera = lista;

			$.each(lista, function(key, reg) {

				reg.opciones = '<a title="Editar Registro" href=javascript:editar(' + reg.coTipoCarrera + ');>' +
					'<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
					'</a>&nbsp;&nbsp;<a title="Eliminar Registro" href=javascript:darBaja(' + reg.coTipoCarrera + ');>' +
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

		{ data: "codigoCarrera", className: "dt-left", targets: "_all" },
		{ data: "deTipoCarrera", className: "dt-left", targets: "_all" },
		{ data: "opciones", className: "dt-center opciones-table", targets: "_all" }

	];

	if (table) {
		table.destroy();
		$('#listadoTipoCarreras > tbody').empty();
	}
	table = $('#listadoTipoCarreras').DataTable({
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
function cargarTipoCarrera() {
	tipoCarrera.coTipoCarrera = $('#idTipoCarrera').val();
	tipoCarrera.deTipoCarrera = $('#descripcionTipoCarrera').val().toUpperCase();
	tipoCarrera.esRegistro=1;
}

function obtenerObjetoEliminar(id){
	
	if (listadoTipoCarrera.length > 0) {

		$.each(listadoTipoCarrera, function(key, reg) {
			if (reg.coTipoCarrera === id) {
				return reg;
			}
		});
	}
}

function limpiar() {
	$('#idTipoCarrera').val('');
	$('#descripcionTipoCarrera').val('');
	$("#grabar").removeClass("grabarRegistro");
	$("#grabar").removeClass("actualizarRegistro");
	$("#grabar").addClass("grabarRegistro");
}

function retornar() {
	window.location = "./tipoCarrera";
}
