

const carrito = {};


async function cargarProductos() {
  try {
    const response = await fetch('productos.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

// Llamar a cargarProductos y luego renderizar los productos en la página
cargarProductos().then(productos => {
  if (productos) {
    renderProductos(productos);
    actualizarCarrito();
  }
});



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

function actualizarCantidad(id, nuevaCantidad) {
  if (nuevaCantidad <= 0) {
    eliminarDelCarrito(id);
  } else {
    carrito[id].cantidad = nuevaCantidad;
    actualizarCarrito();
  }
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
    carritoDiv.innerHTML += `
      <p>
        <input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${id}, parseInt(this.value))">
        Unidad de ${producto.nombre} a $${producto.precio} = $${producto.precio * producto.cantidad}
        <button onclick="eliminarDelCarrito(${id})">x</button>
      </p>`;
  }

  totalSpan.textContent = total;
}

function enviarCarrito(e) {
  e.preventDefault();

  if (Object.keys(carrito).length === 0) {
    alert('No has agregado productos al carrito');
    return;
  }

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

  const url = `https://api.whatsapp.com/send?phone=18295463303&text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

function renderProductos(productos) {
  const productosDiv = document.getElementById('productos');
  const detallesContenedor = document.createElement('div');
  detallesContenedor.id = 'detalles-contenedor';
  detallesContenedor.style.display = 'none';

  productos.forEach(producto => {
    const productoDiv = `
      <div class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <input type="number" id="cantidad-${producto.id}" value="1" min="1">
        <button onclick="agregarAlCarrito(${producto.id}, parseInt(document.getElementById('cantidad-${producto.id}').value))">Añadir al carrito</button>
        <button onclick="mostrarDetalles(${producto.id})">Detalles</button>
        <span id="mensaje-${producto.id}" class="mensaje"></span>
      </div>`;
    productosDiv.innerHTML += productoDiv;
  });

  // Agregamos el contenedor de detalles al final del div 'productos'
  productosDiv.appendChild(detallesContenedor);
}

	/*script popup*/
	
	function mostrarDetalles(id) {
  const producto = productos.find(p => p.id === id);
  const detallesContenedor = document.getElementById('detalles-contenedor');
  detallesContenedor.innerHTML = `
    <div class="detalles-popup" onclick="cerrarDetalles()">
      <div class="detalles-wrapper" onclick="event.stopPropagation()">
        <div class="detalles-contenido">
          <button class="detalles-cerrar" onclick="cerrarDetalles()">X</button>
          <h3>Especificaciones de ${producto.nombre}</h3>
          <!-- Agrega aquí las especificaciones de cada producto -->
          <p>${producto.descripcion}</p>
        </div>
      </div>
    </div>`;
  detallesContenedor.style.display = 'block';
}


function cerrarDetalles(id) {
  const detallesPopup = document.getElementById(`detalles-${id}`);
  detallesPopup.style.display = 'none';
}

function cerrarDetalles() {
  const detallesContenedor = document.getElementById('detalles-contenedor');
  detallesContenedor.style.display = 'none';
}
	/*script popup*/
	
document.getElementById('formulario').addEventListener('submit', enviarCarrito);
renderProductos();
actualizarCarrito();

