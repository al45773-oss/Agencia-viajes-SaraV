var formulario = document.getElementById("PrecioCalculo");
var formulario2 = document.getElementById("PrecioCalculo2");

function calcular() {
    var vuelo = formulario.vuelo.value;
    var hospedaje = formulario.hospedaje.value;
    var adultos = formulario.adultos.value;
    var menores = formulario.menores.value;
    var cantidad = formulario["dias-individual"].value;

    var total = 0;

    
    if (!vuelo) {
        alert("Selecciona un tipo de vuelo");
        return;
    }
    if (!hospedaje) {
        alert("Selecciona un tipo de hospedaje");
        return;
    }
    if (cantidad == "" || cantidad <= 0) {
        alert("Ingresa un número válido de días");
        return;
    }

   
    if (vuelo == "sin-avion") total += 999;
    else if (vuelo == "ida") total += 2499;
    else if (vuelo == "ida-vuelta") total += 5999;


    if (hospedaje == "sin-hotel") total += 499;
    else if (hospedaje == "sencilla") total += 799;
    else if (hospedaje == "doble") total += 999;

    total += parseInt(adultos) * 865;

    total += parseInt(menores) * 437;

    total = total + (cantidad * 769);

    document.getElementById("total-individual").innerHTML = "Total: $" + total.toLocaleString() + " MXN";
}

function calcularPaquete() {
    var destino = formulario2.destino.value;
    var dias = formulario2["dias-paquete"].value;
    var especial = formulario2.especial.value;
    var extras = formulario2.querySelectorAll('input[name="extras"]:checked');

    var total = 0;

   
    if (!destino && !especial) {
        alert("Selecciona un destino o el paquete especial");
        return;
    }

    
    if (destino == "suramerica") total += 7999;
    else if (destino == "europa") total += 21999;
    else if (destino == "africa") total += 17999;
    else if (destino == "asia") total += 25999;
    else if (destino == "norteamerica") total += 12999;

  
    if (dias > 0 && !especial) {
        total += dias * 899;
    } else if (!especial && (dias == "" || dias <= 0)) {
        alert("Ingresa un número válido de días");
        return;
    }

   
    if (especial == "crucero") {
        total = 19999; 
    }

   
    total += extras.length * 699;

    document.getElementById("total-paquete").innerHTML = "Total: $" + total.toLocaleString() + " MXN";
}

var crucero = document.querySelector('input[name="especial"][value="crucero"]');
var destinos = document.querySelectorAll('input[name="destino"]');
var diasPaquete = document.getElementById("dias-paquete");

crucero.addEventListener("change", function () {
    if (crucero.checked) {
        destinos.forEach(d => {
            d.checked = false;
            d.disabled = true;
        });
        diasPaquete.value = "";
        diasPaquete.disabled = true;
    }
});

destinos.forEach(d => {
    d.addEventListener("change", function () {
        if (d.checked) {
            crucero.checked = false;
            destinos.forEach(dest => dest.disabled = false);
            diasPaquete.disabled = false;
        }
    });
});