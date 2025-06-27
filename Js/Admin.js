const API_URL = 'https://retoolapi.dev/fcwghh/ApiDevMotor';

const tbody = document.getElementById('MotorsTbody');
const modal = document.getElementById("modalAgregar");
const btnAgregar = document.getElementById("btnAgregar");
const modalEditar = document.getElementById("modalEditar");
const btnGuardar = document.getElementById("Guardar")
const btnActualizar = document.getElementById("Actualiza");


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
                    <a href="#" class="action-link editar" onclick="Actualizar('${moto.id}','${moto.Marca}','${moto.Modelo}','${moto.Año}','${moto.Precio}')">
                        Editar
                    </a>
                    <a href="#" class="action-link eliminar" onclick="Eliminar(${moto.id})">
                        Eliminar
                    </a>
                </td>
            </tr>
        `;
    });
}

cargarMotos();

btnAgregar.addEventListener("click", () => {
    modal.classList.add("visible");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("visible");
    }
});

const frmAgregar = document.getElementById("formAgregarMoto")

frmAgregar.addEventListener("submit", async e => {
    e.preventDefault();

    btnGuardar.disabled = true;

    const Marca = document.getElementById("txtMarca").value.trim();
    const Modelo = document.getElementById("txtModelo").value.trim();
    const Año = document.getElementById("txtAnio").value.trim();
    const Precio = document.getElementById("txtPrecio").value.trim();

    if (!Marca || !Modelo || !Año || !Precio) {
        alert("Complete todos los campos requeridos");
        return;
    }

    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Marca,
                Modelo,
                Año,
                Precio
            })
        });

        if (respuesta.ok) {
            alert("El registro fue agregado correctamente");
            frmAgregar.reset();
            modal.classList.remove("visible");
            btnGuardar.disabled = false;
            cargarMotos();

        } else {
            alert("Error al guardar la moto");
        }

    } catch (err) {
        console.error("Error al enviar datos:", err);
    }
    finally {
        btnGuardar.disabled = false;
    }
});

async function Eliminar(id) {

    const confirmacion = confirm("¿Seguro que desea eliminar el regsitro")
    if (confirmacion) {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        cargarMotos();
    }

}

const frmEditar = document.getElementById("frmEditar")

function Actualizar(id, Marca, Modelo, Año, Precio) {
    document.getElementById("idMoto").value = id;
    document.getElementById("txtActualizarMarca").value = Marca;
    document.getElementById("txtActualizarModelo").value = Modelo;
    document.getElementById("txtActualizarAnio").value = Año;
    document.getElementById("txtActualizarPrecio").value = Precio;

    modalEditar.classList.add("visible");
}

modalEditar.addEventListener("click", (e) => {
    if (e.target === modalEditar) {
        modalEditar.classList.remove("visible");
    }
});


frmEditar.addEventListener("submit", async e => {
    e.preventDefault();

    btnActualizar.disabled = true;

    const id = document.getElementById("idMoto").value;
    const Marca = document.getElementById("txtActualizarMarca").value.trim();
    const Modelo = document.getElementById("txtActualizarModelo").value.trim();
    const Año = document.getElementById("txtActualizarAnio").value.trim();
    const Precio = document.getElementById("txtActualizarPrecio").value.trim();

    if (!id || !Marca || !Modelo || !Año || !Precio) {
        alert("Complete todos los campos requeridos");
        return;
    }

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
                Marca,
                Modelo,
                Año,
                Precio
            })
        });

        if (respuesta.ok) {
            alert("El registro fue actualizado correctamente");
            frmEditar.reset();
            modalEditar.classList.remove("visible");
            ObtenerRegistros();
        } else {
            alert("Hubo un error al actualizar");
        }
    } catch (err) {
        console.error("Error en la actualización:", err);
    }
    finally {
        btnActualizar.disabled = false;
    }
});