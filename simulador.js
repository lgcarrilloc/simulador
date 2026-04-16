function calcular() {
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);
    let disponible = calcularDisponible(ingresos, egresos);
    texto("spnDisponible", disponible);
    
    let capasidadDePago = calcularCapacidadDePago(disponible);
    texto("spnCapacidadPago", capasidadDePago);
    
    let monto = parseInt(document.getElementById("txtMonto").value);
    let plazoAños = parseInt(document.getElementById("txtPlazo").value);
    let tasa = parseInt(document.getElementById("txtTasaInteres").value);
    let interes = calcularInteresSimple(monto, plazoAños, tasa);
    texto("spnInteresPagar", interes);

    let totalPagar = calcularTotalPagar(monto, interes);
    texto("spnTotalPrestamo", totalPagar);

    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAños);
    texto("spnCuotaMensual", cuotaMensual);

    let aprobado = aprobarCredito(capasidadDePago, cuotaMensual);
    if (aprobado){
        document.getElementById("spnEstadoCredito").innerText="CREDITO APROBADO";
        } else {
        document.getElementById("spnEstadoCredito").innerText="CREDITO RECHAZADO";
        }
}
