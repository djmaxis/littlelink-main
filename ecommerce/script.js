const productos = [
  { id: 1, nombre: 'Collar de perro', precio: 100 },
  { id: 2, nombre: 'Cartera de perro', precio: 200 },
  { id: 3, nombre: 'Shampo', precio: 300 },
];

const carrito = {};

function agregarAlCarrito(id, cantidad) {
  if (!carrito[id]) {
    carrito[id] = { ...productos.find(p => p.id === id), cantidad: 0 };
  }
  carrito[id].cantidad += cantidad;
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoDiv = document.getElementById('carrito');
  const totalSpan = document.getElementById('total');
  carritoDiv.innerHTML = '';
  let total = 0;

  for (const id in carrito) {
    const producto = carrito[id];
    total += producto.precio * producto.cantidad;
    carritoDiv.innerHTML += `<p>${producto.nombre} - ${producto.cantidad} - $${producto.precio * producto.cantidad}</p>`;
  }

  totalSpan.textContent = total;
}

function enviarCarrito() {
  const telefono = "18295463303"; // Aquí debes ingresar el número de teléfono al que deseas enviar el mensaje
  let mensaje = 'Resumen de compra: %0A%0A';
  let total = 0;

  for (const id in carrito) {
    const producto = carrito[id];
    total += producto.precio * producto.cantidad;
    mensaje += `${producto.nombre}: ${producto.cantidad} x $${producto.precio * producto.cantidad}%0A`;
  }

  mensaje += `%0ATotal: $${total}%0A`;

  const url = `https://api.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;
  window.open(url, '_blank');
}

function renderProductos() {
  const productosDiv = document.getElementById('productos');

  productos.forEach(producto => {
    const productoDiv = `
      <div class="producto">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <input type="number" id="cantidad-${producto.id}" value="1" min="1">
        <button onclick="agregarAlCarrito(${producto.id}, parseInt(document.getElementById('cantidad-${producto.id}').value))">Agregar al carrito</button>
      </div>
    `;

    productosDiv.innerHTML += productoDiv;
  });
}

document.getElementById('enviarCarrito').addEventListener('click', enviarCarrito);
renderProductos();

