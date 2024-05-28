/*eslint-disable*/
//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = null;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tiempoRegresivoId = null;
let timerInicial = timer;

//Audio

let wineAudio = new Audio('./audio/winner.wav')
let arraAudio = new Audio('./audio/arranque.wav')
let corrAudio = new Audio('./audio/correcto.wav')
let incoAudio = new Audio('./audio/incorrecto.wav')
let loseAudio = new Audio('./audio/loser.wav')



//Apuntando a DOM
let mostrarMovimiento = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante')


let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numeros = numeros.sort(()=>{return Math.random()-0.5})

//Funciones

function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Timpo ${timer} segundos`
        if(timer == 0){
            clearInterval(tiempoRegresivoId)
            bloquearTarjeta()
            loseAudio.play()
        }
    },1000)
}

 function bloquearTarjeta() {
     for (let i = 0; i <= 15; i++){
         let tarjetaBloqueada = document.getElementById(i);
         tarjetaBloqueada.innerHTML = numeros[i]
         tarjetaBloqueada.disabled = true;
     }
}
//Funcion principal

function destapar(id) {

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if(tarjetasDestapadas == 1){
        //Mostrar 1er numero
      tarjeta1 = document.getElementById(id);
      primerResultado = numeros[id];
      tarjeta1.innerHTML = primerResultado;
      arraAudio.play()
      //Deshabilitar
      tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        //Mostrar 2do elemento
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        //Deshabilitar
        tarjeta2.disabled = true;
        
        //Incrementa movimientos
        movimientos++;
        mostrarMovimiento.innerHTML = `Movimientos: ${movimientos}`

        if(primerResultado == segundoResultado){
            //Volver a cero tarjetas destapadas
            tarjetasDestapadas = 0;
            corrAudio.play()
            //Aumenta aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`

            if (aciertos == 8) {
                wineAudio.play()
                clearInterval(tiempoRegresivoId)
                mostrarAciertos.innerHTML = `Felicitaciones 😁👏🏻  \n Total de aciertos: ${aciertos}`
                mostrarTiempo.innerHTML = `Solo demoraste ${timerInicial - timer} segundos! ⌚️`
                mostrarMovimiento.innerHTML = `Movimientos realizados: ${movimientos} 😎`
            }
        }else{
            //Mostrar valores y volver a tapar
            incoAudio.play()
            setTimeout(()=>{
                tarjeta1.innerHTML = '  ';
                tarjeta2.innerHTML = '  ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },200)
        }
    }

}
