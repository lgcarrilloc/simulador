//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
function calcularDisponible(ingresos, egresos){
    let disponible = ingresos - egresos;
    if(disponible < 0){
        disponible = 0;
    }
    return disponible;
}
function calcularCapacidadDePago(montoDisponible){
    let capasidadDePago = montoDisponible / 2;
 
    return capasidadDePago;
}
function texto (id,vari){
    let texto1 = document.getElementById(id);
    texto1.innerText=vari.toFixed(2);    
}
function calcularInteresSimple(monto, tasa, plazoAños){
    let interes = monto * (tasa/100) * plazoAños;
    return interes;
}
function calcularTotalPagar(monto, interes){
    let total = monto + interes + 100; // 100 contribucion solca
    return total;
}
function calcularCuotaMensual(total, plazoAños){
    let meses = plazoAños * 12;
    let cuotaMensual = total / meses;
    return cuotaMensual;
}

function aprobarCredito(capacidadPago, cuotaMensual){
    if(capacidadPago > cuotaMensual){
        return true;
    } else {
        return false;
    }
}