// Variables globales
let jugador = 'X';
let maquina = 'O';
let casillas = Array.from(document.querySelectorAll('.casilla'));
let puntuacionJugador = 0;
let puntuacionMaquina = 0;
let turno = 0;

// Función para reiniciar el juego
function reiniciar() {
    turno = 0;
    casillas.forEach(casilla => casilla.textContent = '');
}

// Función para actualizar la puntuación en pantalla
function actualizarPuntuacion() {
    document.getElementById('puntuacion-jugador').textContent = `Jugador: ${puntuacionJugador}`;
    document.getElementById('puntuacion-maquina').textContent = `Máquina: ${puntuacionMaquina}`;
}

// Función para jugar
function jugar(casilla) {
    if (casilla.textContent === '') {
        casilla.textContent = jugador;
        turno++;
        if (verificarGanador()) {
            puntuacionJugador++;
            actualizarPuntuacion();
            guardarPuntuacion();
            setTimeout(reiniciar, 1000); // Reinicia después de 1 segundo
        } else if (turno < 9) {
            setTimeout(maquinaJuega, 500); // La máquina juega después de 0.5 segundos
        } else {
            setTimeout(reiniciar, 1000); // Reinicia después de 1 segundo en caso de empate
        }
    }
}

// Función para que la máquina juegue
function maquinaJuega() {
    let casillaAleatoria;
    let movimientosDisponibles = casillas.filter(casilla => casilla.textContent === '');
    if (movimientosDisponibles.length > 0) {
        casillaAleatoria = movimientosDisponibles[Math.floor(Math.random() * movimientosDisponibles.length)];
        casillaAleatoria.textContent = maquina;
        turno++;
        if (verificarGanador()) {
            puntuacionMaquina++;
            actualizarPuntuacion();
            guardarPuntuacion();
            setTimeout(reiniciar, 1000); // Reinicia después de 1 segundo
        }
    }
}

// Función para verificar si hay un ganador
function verificarGanador() {
    let combinaciones = [
        [casillas[0], casillas[1], casillas[2]],
        [casillas[3], casillas[4], casillas[5]],
        [casillas[6], casillas[7], casillas[8]],
        [casillas[0], casillas[3], casillas[6]],
        [casillas[1], casillas[4], casillas[7]],
        [casillas[2], casillas[5], casillas[8]],
        [casillas[0], casillas[4], casillas[8]],
        [casillas[2], casillas[4], casillas[6]]
    ];
    return combinaciones.some(combinacion => {
        if (combinacion[0].textContent !== '' && 
            combinacion[0].textContent === combinacion[1].textContent && 
            combinacion[1].textContent === combinacion[2].textContent) {
            return true;
        }
        return false;
    });
}

// Función para guardar la puntuación en LocalStorage
function guardarPuntuacion() {
    localStorage.setItem('puntuacionJugador', puntuacionJugador);
    localStorage.setItem('puntuacionMaquina', puntuacionMaquina);
}

// Función para cargar la puntuación desde LocalStorage
function cargarPuntuacion() {
    puntuacionJugador = parseInt(localStorage.getItem('puntuacionJugador')) || 0;
    puntuacionMaquina = parseInt(localStorage.getItem('puntuacionMaquina')) || 0;
    actualizarPuntuacion();
}

// Eventos
document.getElementById('reiniciar').addEventListener('click', () => {
    reiniciar();
    puntuacionJugador = 0;
    puntuacionMaquina = 0;
    guardarPuntuacion();
    actualizarPuntuacion();
});

casillas.forEach(casilla => casilla.addEventListener('click', () => jugar(casilla)));

// Cargar la puntuación al cargar la página
window.onload = () => {
    cargarPuntuacion();
};
  

