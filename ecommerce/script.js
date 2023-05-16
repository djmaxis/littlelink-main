const carrito = {};
let productos = [];

async function cargarProductos() {
  try {
    const response = await fetch('productos.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    productos = data;
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

// ...

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

// ...

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

// ...

document.getElementById('formulario').addEventListener('submit', enviarCarrito);
