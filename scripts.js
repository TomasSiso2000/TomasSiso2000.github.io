let menu = document.getElementById("menu");
let toggle_open = document.getElementById("toggle_open");
let toggle_close = document.getElementById("toggle_close");

toggle_open.addEventListener("click", toggleMenu);
toggle_close.addEventListener("click", toggleMenu);

function toggleMenu() {
    menu.classList.toggle("show-menu");

    if (menu.classList.contains("show-menu")) {
        toggle_open.style.display = "none";
        toggle_close.style.display = "block";
    } else {
        toggle_open.style.display = "block";
        toggle_close.style.display = "none";
    }
}

/* --------------------VALIDAR FORMULARIO ---------------------------*/
const formulario = document.getElementById("form-group");
const inputs = document.querySelectorAll("#form-group input");

const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const campos = {
    name: false,
    email: false,
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "name":
            validarCampo(expresiones.name, e.target, "name");
            break;
        case "email":
            validarCampo(expresiones.email, e.target, "email");
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo_${campo}`).classList.remove("form-group-incorrecto");
        document.getElementById(`grupo_${campo}`).classList.add("form-group-correcto");
        document.querySelector(`#grupo_${campo} i`).classList.add("fa-circle-check");
        document.querySelector(`#grupo_${campo} i`).classList.remove("fa-circle-xmark");
        document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    } else {
        document.getElementById(`grupo_${campo}`).classList.add("form-group-incorrecto");
        document.getElementById(`grupo_${campo}`).classList.remove("form-group-correcto");
        document.querySelector(`#grupo_${campo} i`).classList.add("fa-circle-xmark");
        document.querySelector(`#grupo_${campo} i`).classList.remove("fa-circle-check");
        document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
    if (campos.name == false || campos.email == false) {
        e.preventDefault();
    }
});
