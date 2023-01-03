var table;
var banco = {

};
var listadoBanco = [];
$(document).ready(function() {
	$('#nuevo').click(function() {
		nuevoBanco();
	});
	$('.grabarRegistro').click(function() {
		grabarBanco();
	});

	$('.actualizarRegistro').click(function() {
		actualizarBanco();
	});
	
	$('.eliminarRegistro').click(function() {
		eliminarBanco();
	});
	
	$('.buscarBanco').click(function() {
		listarBanco();
	});
	
	listarBanco();
});


function nuevoBanco() {
	limpiar();
	$('#modalBanco').modal('show');
}

function grabarBanco() {

	cargarBanco();
	$("#loading-div").show(); 
	$.ajax({
		url: catminer+'/grabarBanco',
		type: 'POST',
		data: JSON.stringify(banco),
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

	if (listadoBanco.length > 0) {

		$.each(listadoBanco, function(key, reg) {
			if (reg.coBanco === id) {
				$('#idBanco').val(reg.coBanco);
				$('#descripcionBanco').val(reg.noBanco);
				$('#numeroCuenta').val(reg.nuCuenta);
				$('#codigoInterbancario').val(reg.nucci);

				$('.nuevoTitulo').text("Actualización de Banco");
				$("#grabar").removeClass("grabarRegistro");
				$("#grabar").addClass("actualizarRegistro");

				$('#modalBanco').modal('show');

			}
		});


	}


}

function actualizarBanco() {

	cargarBanco();
	$("#loading-div").show(); 
	$.ajax({
		url: catminer+'/grabarBanco',
		type: 'POST',
		data: JSON.stringify(banco),
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
	if (listadoBanco.length > 0) {

		$.each(listadoBanco, function(key, reg) {
			if (reg.coBanco === id) {
				banco = reg;
				$('#datoEliminar').text(reg.noBanco);
				$('#eliminarRegistro').modal('show');
			}
		});
	}

}

function eliminarBanco() {
	banco.esRegistro=0;
	$("#loading-div").show(); 
	$.ajax({
		url: catminer+'/grabarBanco',
		type: 'POST',
		data: JSON.stringify(banco),
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

function listarBanco() {
	listadoBanco.length = 0;
	var url = catminer+"/listarBanco";
	$("#loading-div").show();
	bancoRequest= {
		noBanco:$('#descripcionBancoBusqueda').val().toUpperCase()
	}
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(bancoRequest),
		contentType: "application/json; charset=utf-8",
		success: function(lista) {
			var miJson = [];
			listadoBanco = lista;

			$.each(lista, function(key, reg) {

				reg.opciones = '<a title="Editar Registro" href=javascript:editar(' + reg.coBanco + ');>' +
					'<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
					'</a>&nbsp;&nbsp;<a title="Eliminar Registro" href=javascript:darBaja(' + reg.coBanco + ');>' +
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

		{ data: "noBanco", className: "dt-left", targets: "_all" },
		{ data: "nuCuenta", className: "dt-center", targets: "_all" },
		{ data: "nucci", className: "dt-left", targets: "_all" },
		{ data: "opciones", className: "dt-center opciones-table", targets: "_all" }

	];

	if (table) {
		table.destroy();
		$('#listadoBancos > tbody').empty();
	}
	table = $('#listadoBancos').DataTable({
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
function cargarBanco() {
	banco.coBanco = $('#idBanco').val();
	banco.noBanco = $('#descripcionBanco').val().toUpperCase();
	banco.nuCuenta = $('#numeroCuenta').val();
	banco.nucci = $('#codigoInterbancario').val();
	banco.esRegistro=1;
}

function obtenerObjetoEliminar(id){
	
	if (listadoBanco.length > 0) {

		$.each(listadoBanco, function(key, reg) {
			if (reg.coBanco === id) {
				return reg;
			}
		});
	}
}

function limpiar() {
	$('#idBanco').val('');
	$('#descripcionBanco').val('');
	$('#numeroCuenta').val('');
	$('#codigoInterbancario').val('');
	$("#grabar").removeClass("grabarRegistro");
	$("#grabar").removeClass("actualizarRegistro");
	$("#grabar").addClass("grabarRegistro");
}

function retornar() {
	window.location = catminer+"/mantenimiento/banco";
}
