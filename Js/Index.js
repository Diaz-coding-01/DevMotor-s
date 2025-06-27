API_URL = 'https://retoolapi.dev/fcwghh/ApiDevMotor';

const grid = document.getElementById('cardsGrid');

const motoID = document.getElementById('Motoid');

const marcaInput = document.getElementById('marca');
const modeloInput = document.getElementById('modelo');
const anioInput = document.getElementById('anio');
const precioInput = document.getElementById('precio');
const modal = document.getElementById("modal");

function loadCards(data) {
  grid.innerHTML = '';
  if (data.length == 0) {
    grid.innerHTML = "<p style='color: white;'>No hay motos registradas</p>"
    return;
  }
  data.forEach((moto) => {
    grid.innerHTML += `
        <div class="card">
          <div class="cardHeader">
            <p>${moto.Modelo}</p>
            <p>${moto.Año}</p>
          </div>
          <div class="cardBody">
            <p class="info"> <span class="date">${moto.Marca}</span></p>
          </div>
          <div class="cardFooter">
            <button class="btnMoto" onclick="abrirModalAgregar()" >Ver moto</button>
            <p>$${moto.Precio}</p>
          </div>
        </div>
      `;
  });
}

async function loadData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    loadCards(data);
  } catch (error) {
    console.error('Error al cargar los datos: ', error);
    grid.innerHTML = '<p style="color: white;">Error al cargar las motos</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadData)
