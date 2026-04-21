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

    // INGRESOS
    const ingresos = parseFloat(txtIngresos.value);
    if (isNaN(ingresos) || ingresos < 100 || ingresos > 50000) {
        mostrarError("txtIngresos", "Ingrese un valor entre 100 y 50 000.");
        valido = false;
    }

    // GASTOS
    const arriendo = parseFloat(txtArriendo.value);
    const alimentacion = parseFloat(txtAlimentacion.value);
    const varios = parseFloat(txtVarios.value);

    if (isNaN(arriendo) || arriendo < 0) {
        mostrarError("txtArriendo", "Ingrese un valor válido.");
        valido = false;
    }

    if (isNaN(alimentacion) || alimentacion < 0) {
        mostrarError("txtAlimentacion", "Ingrese un valor válido.");
        valido = false;
    }

    if (isNaN(varios) || varios < 0) {
        mostrarError("txtVarios", "Ingrese un valor válido.");
        valido = false;
    }

    if (!valido) return;

    const totalGastos = arriendo + alimentacion + varios;

    if (totalGastos >= ingresos) {
        mostrarError("txtVarios", "Los gastos totales deben ser menores a los ingresos.");
        return;
    }

    spnTotalGastos.innerText = "$" + totalGastos.toFixed(2);

    // DISPONIBLE Y CAPACIDAD
    const disponible = calcularDisponible(ingresos, totalGastos);
    spnDisponible.innerText = "$" + disponible.toFixed(2);

    const capacidad = calcularCapacidadDePago(disponible);
    spnCapacidadPago.innerText = "$" + capacidad.toFixed(2);

    // DATOS DE CRÉDITO
    const monto = parseFloat(txtMonto.value);
    if (isNaN(monto) || monto < 500 || monto > 100000) {
        mostrarError("txtMonto", "Monto entre 500 y 100 000.");
        return;
    }

    const plazo = parseInt(txtPlazo.value);
    if (isNaN(plazo) || plazo < 1 || plazo > 30) {
        mostrarError("txtPlazo", "Plazo entre 1 y 30 años.");
        return;
    }

    const tasa = parseFloat(txtTasaInteres.value);
    if (isNaN(tasa) || tasa < 1 || tasa > 30) {
        mostrarError("txtTasaInteres", "Tasa entre 1% y 30%.");
        return;
    }

    const interes = calcularInteresSimple(monto, tasa, plazo);
    spnInteresPagar.innerText = "$" + interes.toFixed(2);

    const total = calcularTotalPagar(monto, interes);
    spnTotalPrestamo.innerText = "$" + total.toFixed(2);

    const cuota = calcularCuotaMensual(total, plazo);
    spnCuotaMensual.innerText = "$" + cuota.toFixed(2);

    spnEstadoCredito.innerText =
        aprobarCredito(capacidad, cuota)
            ? "CRÉDITO APROBADO"
            : "CRÉDITO RECHAZADO";
}

function reiniciar() {
    ["spnTotalGastos", "spnDisponible", "spnCapacidadPago", "spnInteresPagar", "spnTotalPrestamo", "spnCuotaMensual" ]
    .forEach(id => document.getElementById(id).value = "");

    ["spnTotalGastos", "spnDisponible", "spnCapacidadPago", "spnInteresPagar", "spnTotalPrestamo", "spnCuotaMensual"]
    .forEach(id => document.getElementById(id).innerText = "");

    spnEstadoCredito.innerText = "ANALIZANDO...";
    limpiarErrores();
}

window.onload = () => {
    ["txtIngresos", "txtArriendo", "txtAlimentacion", "txtVarios", "txtMonto", "txtPlazo", "txtTasaInteres"]
    .forEach(id =>
        document.getElementById(id).addEventListener("keydown", permitirSoloNumeros)
    );
};
