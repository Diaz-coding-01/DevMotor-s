const API_URL = 'https://retoolapi.dev/fcwghh/ApiDevMotor';

const tbody = document.getElementById('MotorsTbody');

async function cargarMotos() {
    const res = await fetch(API_URL);
    const data = await res.json();
    cargarTabla(data);
}

function cargarTabla(motos) {
    tbody.innerHTML = '';
    motos.forEach(moto => {
        tbody.innerHTML += `
            <tr>
                <td>${moto.Marca}</td>
                <td>${moto.Modelo}</td>
                <td>${moto.Año}</td>
                <td>${moto.Precio}</td>
                <td>
                    <a href="#" class="action-link" onclick="CargarParaEditar('${moto.id}')">Editar</a>
                    <a href="#" class="action-link" onclick="EliminarPersona('${moto.id}')">Eliminar</a>
                </td>
            </tr>
        `;
    });
}

const modal = document.getElementById("modalAgregar");
const btnAgregar = document.getElementById("btnAgregar");

btnAgregar.addEventListener("click", () => {
    modal.style.display = "flex";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

window.addEventListener('DOMContentLoaded', cargarMotos);