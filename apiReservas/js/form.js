document.querySelector("#submit").addEventListener("click", e => {
  e.preventDefault();

  //INGRESE UN NUMERO DE WHATSAPP VALIDO AQUI:
  const telefono = "+18295463303

  const cliente = document.querySelector("#cliente").value;
  const fecha = document.querySelector("#fecha").value;
  const hora = document.querySelector("#hora").value;
  const empleado = document.querySelector("#empleado").value;
  const servicio = document.querySelector("#servicio").value;
  const resp = document.querySelector("#respuesta");

  resp.classList.remove("fail");
  resp.classList.remove("send");

  const url = `https://api.whatsapp.com/send?phone=${telefono}&text=
	
		*Saludos!*%0A%0A
		*Mi nombre es:*%0A
		${cliente}%0A
		*Quiero hacer una reserva en esta fecha:*%0A
		${fecha }$ a las ${ hora}%0A
		*Mi paseador:*%0A
		${empleado}%0A
		*Con este tipo de servicio*%0A
		${servicio}%0A
        *Gracias*%0A` ;

  if (cliente === "" || fecha === "" || hora === "") {
    resp.classList.add("fail");
    resp.innerHTML = `Faltan algunos datos, ${cliente}`;
    return false;
  }
  resp.classList.remove("fail");
  resp.classList.add("send");
  resp.innerHTML = `Se ha enviado tu reserva, Gracias ${cliente}`;

  window.open(url);
});
