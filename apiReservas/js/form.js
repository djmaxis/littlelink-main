// para radio de alergico

document.getElementById("siAlergia").addEventListener("click", function () {
  document.getElementById("alperro").value = "";
});

document.getElementById("noAlergia").addEventListener("click", function () {
  document.getElementById("alperro").value = "nada";
});


// // para radio de tratamiento
	
document.getElementById("sit").addEventListener("change", function () {
  if (this.checked) {
    document.getElementById("ttrata").value = "";
  }
});

document.getElementById("not").addEventListener("change", function () {
  if (this.checked) {
    document.getElementById("ttrata").value = "Sin tratamiento";
  }
});

document.getElementById("not").addEventListener("click", function () {
  document.getElementById("horatra").style.display = "none";
  document.getElementById("horatra_label").style.display = "none";
});

document.getElementById("sit").addEventListener("click", function () {
  document.getElementById("horatra").style.display = "inline";
  document.getElementById("horatra_label").style.display = "block";
});

//ejecuta ambos radios !!!cuidado!!!

document.querySelector("#submit").addEventListener("click", e => {
  e.preventDefault();
	

	//
	
function validarTelefono(telefono) {
  const telefonoValido = /^8(?:0[9]|2[89]|49)\d{7}$/.test(telefono); // Validar formato del n˙mero de telÈfono

  const telError = document.getElementById('telError');
  if (telefonoValido) {
    telError.style.display = 'none';
  } else {
    telError.style.display = 'block';
  }
}



  //INGRESE UN NUMERO DE WHATSAPP VALIDO AQUI:
	
	
  const telefono = "+18295463303";

  const cliente = document.querySelector("#cliente").value;
  const perro = document.querySelector("#perro").value;
  const gperro = document.querySelector("#gperro").value;
  const tperro = document.querySelector("#tperro").value;
  const alperro = document.querySelector("#alperro").value;
  const cperro = document.querySelector("#cperro").value;
  const sperro = document.querySelector("#sperro").value;
  const fecha = document.querySelector("#fecha").value;
  const hora = document.querySelector("#hora").value;
  const servicio = document.querySelector("#servicio").value;           
  const coment = document.querySelector("#coment").value;
  const alcliente = document.querySelector("#alcliente").value;           
  const telcliente = document.querySelector("#telcliente").value;
	
  /*const trata = document.querySelector("#trata").value;*/
	
  const ttrata = document.querySelector("#ttrata").value;           
  const horatra = document.querySelector("#horatra").value;
	
  const resp = document.querySelector("#respuesta");

  resp.classList.remove("fail");
  resp.classList.remove("send");

  const url = `https://api.whatsapp.com/send?phone=${telefono}&text=
		
*Saludos!*%0A%0A
*Mi nombre es:*%0A
${cliente}%0A
*Contacto de emergencias:*%0A
${alcliente}%0A
*Telefono:*%0A
https://api.whatsapp.com/send?phone=1${telcliente}%0A
*Quiero reservar para el:*%0A
${fecha} a las ${hora}%0A
*El servicio de:*%0A
${servicio}%0A
*Para mi querid@:*%0A
üêæ${perro}üêæ%0A%0A
Recuerden que *${perro}* es *${gperro}* de tamano *${tperro}* con alergias a *${alperro}*, comportamiento *${cperro}*, ademas *${perro}* puede ser *${sperro}.* Actualente *${perro}*a utiliza este tipo de tratamiento: *${ttrata}* - ${horatra}%0A%0A
*Comentario:*%0A
${coment}`;

  if (cliente === "" || fecha === "" || hora === "" || alcliente === "" || telcliente === "" || servicio === "" || perro === "" || gperro === "" || tperro === "" || alperro === "" || cperro === "" || sperro === "" || coment === "") {
    resp.classList.add("fail");
    resp.innerHTML = `Para enviar el formulario tienes que completar todos los campos`;
    return false;
  }
  resp.classList.remove("fail");
  resp.classList.add("send");
  resp.innerHTML = `Gracias ${cliente} Se ha enviado tu reserva a ChoLuCan`;

  window.open(url);
});
