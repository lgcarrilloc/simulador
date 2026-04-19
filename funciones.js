function calcularDisponible(ingresos, egresos) {
    return Math.max(ingresos - egresos, 0);
}

function calcularCapacidadDePago(disponible) {
    return disponible / 2;
}

function calcularInteresSimple(monto, tasa, anios) {
    return monto * (tasa / 100) * anios;
}

function calcularTotalPagar(monto, interes) {
    return monto + interes + 100; // Contribución SOLCA
}

function calcularCuotaMensual(total, anios) {
    return total / (anios * 12);
}

function aprobarCredito(capacidad, cuota) {
    return capacidad > cuota;
}