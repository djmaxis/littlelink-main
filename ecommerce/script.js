const productos = [
  { id: 1, nombre: 'Collar Rojo', precio: 100, imagen: 'imagenes/collarrojo.jpg' },
  { id: 2, nombre: 'Sepillo dentel', precio: 200, imagen: 'imagenes/sepillo.jpg' },
  { id: 3, nombre: 'Dispensador', precio: 300, imagen: 'imagenes/dispenser.jpg' },
];

const carrito = {};

// Archivo JavaScript
function agregarAlCarrito(id, cantidad) {
  if (!carrito[id]) {
    carrito[id] = { ...productos.find(p => p.id === id), cantidad: 0 };
  }
  carrito[id].cantidad += cantidad;
  actualizarCarrito();

  // Mostrar mensaje de cantidad en el carrito
  const producto = carrito[id];
  const mensaje = `Tienes ${producto.cantidad} ${producto.nombre} añadido al carrito.`;
  const mensajeElement = document.getElementById(`mensaje-${id}`);
  mensajeElement.textContent = mensaje;
  mensajeElement.style.display = 'block';

  // Ocultar el mensaje después de 3 segundos
  setTimeout(() => {
    mensajeElement.style.display = 'none';
  }, 3000);
}


function eliminarDelCarrito(id) {
  delete carrito[id];
  actualizarCarrito();
}

// Archivo JavaScript
function actualizarCarrito() {
  const carritoDiv = document.getElementById('carrito');
  const totalSpan = document.getElementById('total');
  carritoDiv.innerHTML = '';
  let total = 0;

  for (const id in carrito) {
    const producto = carrito[id];
    total += producto.precio * producto.cantidad;
    carritoDiv.innerHTML += `<p>${producto.cantidad} Unidad de ${producto.nombre} a $${producto.precio} = $${producto.precio * producto.cantidad} <button class="eliminar-btn" onclick="eliminarDelCarrito(${id})">Eliminar</button></p>`;
  }

  totalSpan.textContent = total;
}

function enviarCarrito(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const direccion = document.getElementById('direccion').value;
  const metodo_pago = document.getElementById('metodo_pago').value;

  let mensaje = `*Orden de compra*\n\n`;
  mensaje += `*Nombre:* ${nombre}\n`;
  mensaje += `*Teléfono:* ${telefono}\n`;
  mensaje += `*Dirección:* ${direccion}\n`;
  mensaje += `*Método de pago:* ${metodo_pago}\n\n`;
  mensaje += '*Quiero ordenar estos productos:*\n';
  let total = 0;

  for (const id in carrito) {
    const producto = carrito[id];
    total += producto.precio * producto.cantidad;
    mensaje += `${producto.cantidad} - ${producto.nombre} de $${producto.precio}  hacen: $${producto.precio * producto.cantidad}\n`;
  }

  mensaje += `\n*Total a pagar:* $${total}\n`;

  const url = `https://api.whatsapp.com/send?phone=$18295463303&text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

function renderProductos() {
  const productosDiv = document.getElementById('productos');

  productos.forEach(producto => {
    const productoDiv = `
      <div class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <input type="number" id="cantidad-${producto.id}" value="1" min="1">
        <button onclick="agregarAlCarrito(${producto.id}, parseInt(document.getElementById('cantidad-${producto.id}').value))">Agregar al carrito</button>
        <span id="mensaje-${producto.id}" class="mensaje"></span> <!-- Añadir el mensaje aquí -->
      </div>
    `;

    productosDiv.innerHTML += productoDiv;
  });
}

document.getElementById('formulario').addEventListener('submit', enviarCarrito);
renderProductos();
actualizarCarrito();

