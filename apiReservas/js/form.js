document.querySelector("#submit").addEventListener("click", e => {
  e.preventDefault();

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
🐾${perro}🐾%0A%0A
Recuerden que *${perro}* es *${gperro}* de tamano *${tperro}* con alergias a *${alperro}*, comportamiento *${cperro}* y *${perro}* puede ser *${sperro}.*%0A%0A
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
