function permitirSoloNumeros(event) {
    const tecla = event.key;
    if (
        (tecla >= "0" && tecla <= "9") ||
        tecla === "." ||
        tecla === "Backspace" ||
        tecla === "Delete" ||
        tecla === "ArrowLeft" ||
        tecla === "ArrowRight" ||
        tecla === "Tab"
    ) return;

    event.preventDefault();
}

function mostrarError(campoId, mensaje) {
    const campo = document.getElementById(campoId);
    let error = campo.nextElementSibling;

    if (!error || !error.classList.contains("error")) {
        error = document.createElement("div");
        error.className = "error";
        campo.parentNode.appendChild(error);
    }
    error.textContent = mensaje;
}

function limpiarErrores() {
    document.querySelectorAll(".error").forEach(e => e.remove());
}

function calcular() {
    limpiarErrores();
    let valido = true;

    const ingresos = parseFloat(txtIngresos.value);
    if (isNaN(ingresos) || ingresos < 100 || ingresos > 50000) {
        mostrarError("txtIngresos", "Ingrese un valor entre 100 y 50 000.");
        valido = false;
    }

    const egresos = parseFloat(txtEgresos.value);
    if (isNaN(egresos) || egresos < 0 || egresos >= ingresos) {
        mostrarError("txtEgresos", "Los egresos deben ser menores a los ingresos.");
        valido = false;
    }

    const monto = parseFloat(txtMonto.value);
    if (isNaN(monto) || monto < 500 || monto > 100000) {
        mostrarError("txtMonto", "Monto entre 500 y 100 000.");
        valido = false;
    }

    const plazo = parseInt(txtPlazo.value);
    if (isNaN(plazo) || plazo < 1 || plazo > 30) {
        mostrarError("txtPlazo", "Plazo entre 1 y 30 años.");
        valido = false;
    }

    const tasa = parseFloat(txtTasaInteres.value);
    if (isNaN(tasa) || tasa < 1 || tasa > 30) {
        mostrarError("txtTasaInteres", "Tasa entre 1% y 30%.");
        valido = false;
    }

    if (!valido) return;

    const disponible = calcularDisponible(ingresos, egresos);
    spnDisponible.innerText = "$" + disponible.toFixed(2);

    const capacidad = calcularCapacidadDePago(disponible);
    spnCapacidadPago.innerText = "$" + capacidad.toFixed(2);

    const interes = calcularInteresSimple(monto, tasa, plazo);
    spnInteresPagar.innerText = "$" + interes.toFixed(2);

    const total = calcularTotalPagar(monto, interes);
    spnTotalPrestamo.innerText = "$" + total.toFixed(2);

    const cuota = calcularCuotaMensual(total, plazo);
    spnCuotaMensual.innerText = "$" + cuota.toFixed(2);

    spnEstadoCredito.innerText =
        aprobarCredito(capacidad, cuota) ? "CRÉDITO APROBADO" : "CRÉDITO RECHAZADO";
}

function reiniciar() {
    ["txtIngresos","txtEgresos","txtMonto","txtPlazo","txtTasaInteres"].forEach(id => document.getElementById(id).value = "");
    ["spnDisponible","spnCapacidadPago","spnInteresPagar","spnTotalPrestamo","spnCuotaMensual"].forEach(id => document.getElementById(id).innerText = "");
    spnEstadoCredito.innerText = "ANALIZANDO...";
    limpiarErrores();
}

window.onload = () => {
    ["txtIngresos","txtEgresos","txtMonto","txtPlazo","txtTasaInteres"]
        .forEach(id => document.getElementById(id).addEventListener("keydown", permitirSoloNumeros));
}