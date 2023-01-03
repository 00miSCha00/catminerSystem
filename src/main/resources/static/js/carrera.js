var table;
var carrera = {

};
var listadoCarrera = [];
$(document).ready(function() {
	$('#nuevo').click(function() {
		nuevoCarrera();
	});
	$('.grabarRegistro').click(function() {
		grabarCarrera();
	});

	$('.actualizarRegistro').click(function() {
		actualizarCarrera();
	});
	
	$('.eliminarRegistro').click(function() {
		eliminarCarrera();
	});
	
	$('.buscarCarrera').click(function() {
		listarCarrera();
	});
	
	listarCarrera();
});


function nuevoCarrera() {
	limpiar();
	$('#modalCarrera').modal('show');
}

function grabarCarrera() {

	cargarCarrera();
	$("#loading-div").show(); 
	$.ajax({
		url: catminer+'/grabarCarrera',
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

	if (listadoCarrera.length > 0) {

		$.each(listadoCarrera, function(key, reg) {
			if (reg.coCarrera === id) {
				$('#idCarrera').val(reg.coCarrera);
				$('#descripcionCarrera').val(reg.deCarrera);
				

				$('.nuevoTitulo').text("Actualización Tipo de Carrera");
				$("#grabar").removeClass("grabarRegistro");
				$("#grabar").addClass("actualizarRegistro");

				$('#modalCarrera').modal('show');

			}
		});


	}


}

function actualizarCarrera() {

	cargarCarrera();
	$("#loading-div").show(); 
	$.ajax({
		url: catminer+'/grabarCarrera',
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
		complete: function () {
        $("#loading-div").hide(); 
      }
	});

	
};

function darBaja(id){
	if (listadoCarrera.length > 0) {

		$.each(listadoCarrera, function(key, reg) {
			if (reg.coCarrera === id) {
				carrera = reg;
				$('#datoEliminar').text(reg.noCarrera);
				$('#eliminarRegistro').modal('show');
			}
		});
	}

}

function eliminarCarrera() {
	carrera.esRegistro=0;
	$("#loading-div").show(); 
	$.ajax({
		url: catminer+'/grabarCarrera',
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
		deTipoCarrera:''
	}
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(tipoCarreraRequest),
		contentType: "application/json; charset=utf-8",
		success: function(lista) {
			$(".tipoCarrera").select2({
			  data: lista
			})
	
		},
		error: function(res) {
			$("#loading-div").hide(); 
			var texto = 'Hubo un problema con el listado de tipo de carreras.';
			notificacionMensaje(texto, 'danger');
			return false;
		},
		complete: function () {
        $("#loading-div").hide(); 
      }
	});
	
};


function listarCarrera() {
	listadoCarrera.length = 0;
	var url = "./listarCarrera";
	$("#loading-div").show();
	carreraRequest= {
		deCarrera:$('#descripcionCarreraBusqueda').val().toUpperCase()
	}
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(carreraRequest),
		contentType: "application/json; charset=utf-8",
		success: function(lista) {
			var miJson = [];
			listadoCarrera = lista;

			$.each(lista, function(key, reg) {

				reg.opciones = '<a title="Editar Registro" href=javascript:editar(' + reg.coCarrera + ');>' +
					'<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
					'</a>&nbsp;&nbsp;<a title="Eliminar Registro" href=javascript:darBaja(' + reg.coCarrera + ');>' +
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
		{ data: "deCarrera", className: "dt-left", targets: "_all" },
		{ data: "opciones", className: "dt-center opciones-table", targets: "_all" }

	];

	if (table) {
		table.destroy();
		$('#listadoCarreras > tbody').empty();
	}
	table = $('#listadoCarreras').DataTable({
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
function cargarCarrera() {
	carrera.coCarrera = $('#idCarrera').val();
	carrera.deCarrera = $('#descripcionCarrera').val().toUpperCase();
	carrera.esRegistro=1;
}

function obtenerObjetoEliminar(id){
	
	if (listadoCarrera.length > 0) {

		$.each(listadoCarrera, function(key, reg) {
			if (reg.coCarrera === id) {
				return reg;
			}
		});
	}
}

function limpiar() {
	$('#idCarrera').val('');
	$('#descripcionCarrera').val('');
	$("#grabar").removeClass("grabarRegistro");
	$("#grabar").removeClass("actualizarRegistro");
	$("#grabar").addClass("grabarRegistro");
}

function retornar() {
	window.location = catminer;
}
