var table;
var tipoPago = {

};
var listadoTipoPago = [];
$(document).ready(function() {
	$('#nuevo').click(function() {
		nuevoTipoPago();
	});
	$('.grabarRegistro').click(function() {
		grabarTipoPago();
	});

	$('.actualizarRegistro').click(function() {
		actualizarTipoPago();
	});
	
	$('.eliminarRegistro').click(function() {
		eliminarTipoPago();
	});
	
	$('.buscarTipoPago').click(function() {
		listarTipoPago();
	});
	
	listarTipoPago();
});


function nuevoTipoPago() {
	limpiar();
	$('#modalTipoPago').modal('show');
}

function grabarTipoPago() {

	cargarTipoPago();
	$("#loading-div").show(); 
	$.ajax({
		url: catminer+'/grabarTipoPago',
		type: 'POST',
		data: JSON.stringify(tipoPago),
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

	if (listadoTipoPago.length > 0) {

		$.each(listadoTipoPago, function(key, reg) {
			if (reg.coTipoPago === id) {
				$('#idTipoPago').val(reg.coTipoPago);
				$('#descripcionTipoPago').val(reg.deTipoPago);
				

				$('.nuevoTitulo').text("Actualización Tipo de Carrera");
				$("#grabar").removeClass("grabarRegistro");
				$("#grabar").addClass("actualizarRegistro");

				$('#modalTipoPago').modal('show');

			}
		});


	}


}

function actualizarTipoPago() {

	cargarTipoPago();
	$("#loading-div").show(); 
	$.ajax({
		url: catminer+'/grabarTipoPago',
		type: 'POST',
		data: JSON.stringify(tipoPago),
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
	if (listadoTipoPago.length > 0) {

		$.each(listadoTipoPago, function(key, reg) {
			if (reg.coTipoPago === id) {
				tipoPago = reg;
				$('#datoEliminar').text(reg.noTipoPago);
				$('#eliminarRegistro').modal('show');
			}
		});
	}

}

function eliminarTipoPago() {
	tipoPago.esRegistro=0;
	$("#loading-div").show(); 
	$.ajax({
		url: catminer+'/grabarTipoPago',
		type: 'POST',
		data: JSON.stringify(tipoPago),
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

function listarTipoPago() {
	listadoTipoPago.length = 0;
	var url = catminer+"/listarTipoPago";
	$("#loading-div").show();
	tipoPagoRequest= {
		deTipoPago:$('#descripcionTipoPagoBusqueda').val().toUpperCase()
	}
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(tipoPagoRequest),
		contentType: "application/json; charset=utf-8",
		success: function(lista) {
			var miJson = [];
			listadoTipoPago = lista;

			$.each(lista, function(key, reg) {

				reg.opciones = '<a title="Editar Registro" href=javascript:editar(' + reg.coTipoPago + ');>' +
					'<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
					'</a>&nbsp;&nbsp;<a title="Eliminar Registro" href=javascript:darBaja(' + reg.coTipoPago + ');>' +
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

		{ data: "codigoTipoPago", className: "dt-left", targets: "_all" },
		{ data: "deTipoPago", className: "dt-left", targets: "_all" },
		{ data: "opciones", className: "dt-center opciones-table", targets: "_all" }

	];

	if (table) {
		table.destroy();
		$('#listadoTipoPagos > tbody').empty();
	}
	table = $('#listadoTipoPagos').DataTable({
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
function cargarTipoPago() {
	tipoPago.coTipoPago = $('#idTipoPago').val();
	tipoPago.deTipoPago = $('#descripcionTipoPago').val().toUpperCase();
	tipoPago.esRegistro=1;
}

function obtenerObjetoEliminar(id){
	
	if (listadoTipoPago.length > 0) {

		$.each(listadoTipoPago, function(key, reg) {
			if (reg.coTipoPago === id) {
				return reg;
			}
		});
	}
}

function limpiar() {
	$('#idTipoPago').val('');
	$('#descripcionTipoPago').val('');
	$("#grabar").removeClass("grabarRegistro");
	$("#grabar").removeClass("actualizarRegistro");
	$("#grabar").addClass("grabarRegistro");
}

function retornar() {
	window.location = catminer+"/mantenimiento/tipoPago";
}
