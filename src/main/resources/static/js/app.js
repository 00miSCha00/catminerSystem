$(document).ready(function() {
	$('#menu_on').click(function(){
		    	$('body').toggleClass('visible_menu');
		    })
	
	$(".numeric").numeric({
			allowMinus   : false,
			allowThouSep : false
		});
	 $(".numeric").numeric("integer")
     $(".decimal").numeric({});
	

$(".upperCase").on("keypress", function () {
	  $input=$(this);
	  setTimeout(function () {
	   $input.val($input.val().toUpperCase());
	  },5);
})

});

function menuToggle(){
            const toggleMenu = document.querySelector('.menu');
            toggleMenu.classList.toggle('active')
        }

function validar_email( email ) 
{
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

function nl2br (varTest){
	  return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
};

function notificacionMensaje(texto, clase){
	setTimeout(function(){

		$.gritter.add({
		title: 'Sistema para la Generación de Ticket de Atención',
		text: texto,
		sticky: false,
		class_name: clase,
		time: '4000'
	});

}, 100)
	$(".modal-backdrop").remove();
	$("body").css({ 'padding-right': '0' });
	return false;
	
}

function b64toBlob(b64Data, contentType, sliceSize) {
	  contentType = contentType || '';
	  sliceSize = sliceSize || 512;

	  var byteCharacters = atob(b64Data);
	  var byteArrays = [];

	  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	    var slice = byteCharacters.slice(offset, offset + sliceSize);

	    var byteNumbers = new Array(slice.length);
	    for (var i = 0; i < slice.length; i++) {
	      byteNumbers[i] = slice.charCodeAt(i);
	    }

	    var byteArray = new Uint8Array(byteNumbers);

	    byteArrays.push(byteArray);
	  }
	    
	  var blob = new Blob(byteArrays, {type: contentType});
	  return blob;
	}


function fechaMenorActual(date){
    var x=new Date();
    var fecha = date.split("/");
    console.log(fecha);
    console.log("2: " + fecha[2]);
    console.log("1: " + (fecha[1] - 1));
    console.log("0: " + fecha[0]);
    x.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
    console.log("x: " + x);
    var today = new Date();

    if (x >= today)
      return false;
    else
      return true;
}

function fechaMayorActual(date){
    var x=new Date();
    var fecha = date.split("/");
    x.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
    var today = new Date();
    if (x > today)
      return true;
    else
      return false;
}



