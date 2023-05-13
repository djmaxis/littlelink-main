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
  const empleado = document.querySelector("#empleado").value;
  const servicio = document.querySelector("#servicio").value;
  const resp = document.querySelector("#respuesta");

  resp.classList.remove("fail");
  resp.classList.remove("send");

  const url = `https://api.whatsapp.com/send?phone=${telefono}&text=
		
		*Buenas*%0A%0A
		*Mi nombre es:*%0A
		${cliente}%0A
        *Yo eleji este servicio:*%0A
		${servicio}%0A%0A
		*Quiero reservar para el:*%0A
		${fecha} a las ${hora}%0A
		*Mi paseador:*%0A
		${empleado}%0A
        *Estara ciudando a:%0A
        ${perro}%0A
         Recuerden que ${perro} de genero ${gperro} y tamano ${tperro}, es alergic@ a ${alperro} y tiene un comportamiento ${cperro}, ademas ${perro} tiene un ${sperro}`;

  if (cliente === "" || fecha === "" || hora === "") {
    resp.classList.add("fail");
    resp.innerHTML = `Faltan algunos datos, ${cliente}`;
    return false;
  }
  resp.classList.remove("fail");
  resp.classList.add("send");
  resp.innerHTML = `Se ha enviado tu reserva, ${cliente}`;

  window.open(url);
});
