const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');

CALCULAR.addEventListener('click', () => {
    const DATO = parseInt(document.getElementById('peso').value)
    //validamos que se cargue un dato:
    if (DATO > 0) {
        let flujo = 0
        ERROR.style.display = 'none'
        if (DATO >= 30) {
            flujo = calcMetodoSuperficieCorporal(DATO)
            FLU.innerHTML = 'SC * 1500: ' + flujo[0];
            MAN.innerHTML = 'SC * 2000: ' + flujo[1];
        }else{
            flujo = calcMetodoHolliday_Segar(DATO);
            let mantenimiento = flujo * 1.5;
            FLU.innerHTML = flujo + ' cc/hr';
            MAN.innerHTML = 'm+m/2 ' + Math.floor(mantenimiento) + ' cc/hr';
        }
        FLU.style.display = 'block';
        MAN.style.display = 'block';
    } else {
        ERROR.style.display = 'block';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
    }
})

function calcMetodoHolliday_Segar(peso) {
    let dosis = 0
    let resto = 0
    if (peso > 20) {
        resto = peso - 20
        dosis += resto * 20
        peso -= resto
    }
    if (peso > 10) {
        resto = peso - 10
        dosis += resto * 50
        peso -= resto
    }
    dosis += peso * 100

    return Math.round(dosis / 24)
}

function calcMetodoSuperficieCorporal(peso) {
    let dosis = ((peso * 4) + 7) / (peso + 90)
    let SC1 = Math.round(dosis * 1500)
    let SC2 = Math.round(dosis * 2000)
    return [SC1, SC2]
}
