let contador = 1;


document
  .getElementById("btnAgregar")
  .addEventListener("click", function (event) {
    // Prevenir la acción predeterminada del evento de clic
    event.preventDefault();

    agregarAutor();
  });

function agregarAutor() {
  contador++;
  let div = document.createElement("div");
  div.className = "row g-2";
  div.innerHTML = `
<div class="col-sm">
<label for="nombreAutor${contador}">Nombre del autor (${contador})</label>
<input type="text" id="nombreAutor${contador}" name="nombreAutor${contador}" placeholder="Ingrese el nombre" class="input" />
</div>

<div class="col-sm">
<label for="apellidoAutor${contador}">Apellido del autor (${contador})</label>
<input type="text" id="apellidoAutor${contador}" name="apellidoAutor${contador}" placeholder="Ingrese el apellido" class="input" />
</div>
`;
  document.getElementById("autores").appendChild(div);

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Añadido",
    showConfirmButton: false,
    timer: 1000
  });
}