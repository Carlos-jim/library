const options = document.querySelectorAll(".option");
const userTypeInput = document.getElementById("user_type"); // Asegúrate de tener un input con este id en tu formulario

options.forEach((option) => {
  option.addEventListener("click", () => {
    // Selecciona la opción actual
    option.classList.add("selected");

    // Deselecciona las demás opciones
    options.forEach((otherOption) => {
      if (otherOption !== option) {
        otherOption.classList.remove("selected");
      }
    });

    // Almacena el valor de la opción seleccionada en el campo oculto
    userTypeInput.value = option.textContent;
    console.log('Valor seleccionado:', userTypeInput.value);
  });
});
