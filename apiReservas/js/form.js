// Función para validar el formato del número de teléfono
function validarTelefono(telefono) {
  const telefonoValido = /^8(?:0[9]|2[89]|49)\d{7}$/.test(telefono);

  const telError = document.getElementById('telError');
  if (telefonoValido) {
    telError.style.display = 'none';
  } else {
    telError.style.display = 'block';
  }
}

document.querySelector("#submit").addEventListener("click", e => {
  e.preventDefault();

  // Número de WhatsApp
  const telefono = "+18292140255";

  const cliente = document.querySelector("#cliente").value;
  const numerocliente = document.querySelector("#numerocliente").value;
  const direccion = document.querySelector("#direccion").value;
  const sector = document.querySelector("#sector").value;
  const perro = document.querySelector("#perro").value;
  const fechanacimiento = document.querySelector("#fechanacimiento").value;
  const gperro = document.querySelector("#gperro").value;
  const tperro = document.querySelector("#tperro").value;
  const alperro = document.querySelector("#alperro").value;
  const ttrata = document.querySelector("#ttrata").value;
  const cperro = document.querySelector("#cperro").value;
  const sperro = document.querySelector("#sperro").value;
  const coment = document.querySelector("#coment").value;
  const alcliente = document.querySelector("#alcliente").value;
  const telcliente = document.querySelector("#telcliente").value;

  const resp = document.querySelector("#respuesta");

  resp.classList.remove("fail");
  resp.classList.remove("send");

  const url = `https://api.whatsapp.com/send?phone=${telefono}&text=
*Saludos -Datos de registro-*%0A
*Mi nombre es:*%0A
${cliente}%0A
*Numero de telefono:*%0A
${numerocliente}%0A
*Nombre de contacto de emergencia:*%0A
${alcliente}%0A
*Numero de telefono de contacto de emergencia:*%0A
${telcliente}%0A
*Direccion:*%0A
${direccion}%0A
*Sector:*%0A
${sector}%0A
*Nombre de la mascota:*%0A
${perro}%0A
*Fecha de nacimiento de la mascota:*%0A
${fechanacimiento}%0A
*Genero de la mascota:*%0A
${gperro}%0A
*Tamano de la mascota:*%0A
${tperro}%0A
*Alergias de la mascota:*%0A
${alperro}%0A
*Tratamiento de la mascota:*%0A
${ttrata}%0A
*Comportamiento de la mascota:*%0A
${cperro}%0A
*Convivencia con otras mascotas:*%0A
${sperro}%0A
*Comentarios:*%0A
${coment}`;

  if (cliente === "" || numerocliente === "" || direccion === "" || sector === "" || perro === "" || fechanacimiento === "" || gperro === "" || tperro === "" || alperro === "" || ttrata === "" || cperro === "" || sperro === "" || alcliente === "" || telcliente === "" || coment === "") {
    resp.classList.add("fail");
    resp.innerHTML = `Faltan campos por completar.`;
    return false;
  }

  resp.classList.remove("fail");
  resp.classList.add("send");
  resp.innerHTML = `Gracias ${cliente}, tu información ha sido enviada.`;

  window.location.href = url;
});

document.querySelector("#submit").addEventListener("click", function (e) {
  const isTermsChecked = document.getElementById("terminos").checked;
  if (!isTermsChecked) {
    e.preventDefault();
    alert("Por favor, lee y acepta los términos y condiciones");
  }
});
