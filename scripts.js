let menu= document.getElementById("menu");

let toggle_open= document.getElementById("toggle_open");
let toggle_close= document.getElementById("toggle_close");

toggle_open.addEventListener("click", toggleMenu);
toggle_close.addEventListener("click", toggleMenu);

function toggleMenu(){
    menu.classList.toggle("show-menu");

    if (menu.classList.contains("show-menu")){
        toggle_open.style.display="none";
        toggle_close.style.display="block";
    }
    else{
        toggle_open.style.display="block";
        toggle_close.style.display="none";
    }
}

/* --------------------VALIDAR FORMULARIO ---------------------------*/

const formulario= document.getElementById("form-group");
const inputs= document.querySelectorAll("#form-group input");

const expresiones = {   /*------------------------ EXPRESIONES REGULARES --------------------------*/
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {  /* LOS INICIALIZAMOS EN FALSE (ESTO PARA QUE NO SE PUEDA ENVIAR FORMULARIO CON ERRORES EN LOS CAMPOS) */
    name: false,
    email: false,

}

const validarFormulario = (e) => {
    switch (e.target.name){
        case "name":  /*VALIDAMOS EL CAMPO NOMBRE */
            validarCampo(expresiones.name, e.target, "name"); /*EJECUTAMOS LA FUNCION VALIDAR CAMPO, PASANDOLE LA EXPRESION REGULAR PARA VALIDAR EL CAMPO(expresiones.name), LE PASAMOS EL INPUT(e.target) Y EL NOMBRE DEL CAMPO*/
        break;

        case "email":
            validarCampo(expresiones.email, e.target, "email");
        break;
    }
}

const validarCampo = (expresion, input, campo) =>{
    if(expresion.test(input.value)){  /*VALIDAMOS EL VALOR QUE INGRESAMOS EN EL CAMPO/INPUT */
        document.getElementById(`grupo_${campo}`).classList.remove("form-group-incorrecto");  /* SACA EL COLOR ROJO */      /* (`grupo_${campo}`)  TOMA EL VALOR QUE LE PASEMOS A LA VARIABLE DESDE LOS "CASE" DE ARRIBA . ESTO LO USAMOS ASI PARA NO TENER QUE REPETIR LO MISMO CON EL CASE DE NOMBR Y EL DE EMAIL*/
        document.getElementById(`grupo_${campo}`).classList.add("form-group-correcto");       /* PONE EL COLOR VERDE */
        document.querySelector(`#grupo_${campo} i`).classList.add("fa-circle-check");          /*PONE EL ICONO DEL CHECK O TILDE*/
        document.querySelector(`#grupo_${campo} i`).classList.remove("fa-circle-xmark");        /* SACA EL ICONO DE LA CRUZ*/
        document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo"); /*SACA EL MENSAJE DE ERROR*/
        campos[campo] = true;  /*ESTO SERIA COMO PONER campos[email]=true, pero está de forma dinamica */



    }
    else{
        document.getElementById(`grupo_${campo}`).classList.add("form-group-incorrecto");       /* PONE EL COLOR ROJO */
        document.getElementById(`grupo_${campo}`).classList.remove("form-group-correcto");      /* SACA EL COLOR VERDE */
        document.querySelector(`#grupo_${campo} i`).classList.add("fa-circle-xmark");           /*PONE EL ICONO DE LA CRUZ*/
        document.querySelector(`#grupo_${campo} i`).classList.remove("fa-circle-check");           /* SACA EL ICONO DEL TILDE O CHECK*/
        document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");     /*PONE EL MENSAJE DE ERROR*/
        campos[campo] = false;
    }
}

inputs.forEach((input) => {       /* PARA CADA INPUT..... */
    input.addEventListener("keyup", validarFormulario);   /* AL APRETAR UNA TECLA, QUE SE EJECUTE validarFormulario */
    input.addEventListener("blur", validarFormulario);   /* AL HACER CLICK AFUERA DEL PUNTO , QUE SE EJECUTE validarFormulario */
});

formulario.addEventListener("submit", (e) => {    /* ESTO ESTÁ PREVINIENDO QUE SE ENVÍE EL FORMULARIO SI HAY ERRORES */
    

    if(campos.name && campos.email){
    /*  e.preventDefault();                LO COMENTO PARA QUE SE MANDE MENSAJE, ARREGLAR    ??????????????*/ 
        $(formulario).unbind("submit");

    }
    else {

        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');

    }
});