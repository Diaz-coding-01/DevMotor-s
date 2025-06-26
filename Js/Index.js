API_URL = 'https://retoolapi.dev/fcwghh/ApiDevMotor';

const grid = document.getElementById('cardsGrid');

function loadCards(data) {
  grid.innerHTML = '';
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
            <button class="btnMoto">Ver moto</button>
            <p>$${moto.Precio}</p>
          </div>
        </div>
      `;
  });
}

async function loadData() {
  const response = await fetch(API_URL);
  const data = await response.json();
  loadCards(data);
}

document.addEventListener('DOMContentLoaded', loadData)
