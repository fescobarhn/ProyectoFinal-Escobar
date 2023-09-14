// Datos iniciales - Podrían ser tasas según calificación crediticia por ejemplo
const tasasDeInteres = [
    { calificacion: 'A', tasa: 0.05 },
    { calificacion: 'B', tasa: 0.07 },
    { calificacion: 'C', tasa: 0.1 }
];

// Función para simular el crédito
function simularCredito(monto, plazo) {
    // Vamos a asumir que todos tienen calificación 'A' para simplificar
    const { tasa } = _.find(tasasDeInteres, { 'calificacion': 'A' });
    
    // Formula simple para interés compuesto
    const montoFinal = monto * Math.pow((1 + tasa), plazo);
    return montoFinal.toFixed(2);
}

// Función para mostrar el resultado en el DOM
function mostrarResultado(montoFinal) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `El monto total a pagar después del plazo es: $${montoFinal}`;
}

// Evento para el form
document.getElementById('creditForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const monto = parseFloat(document.getElementById('monto').value);
    const plazo = parseInt(document.getElementById('plazo').value);

    const montoFinal = simularCredito(monto, plazo);

    mostrarResultado(montoFinal);

    // Almacenando en el localStorage
    localStorage.setItem('ultimoSimulado', JSON.stringify({ monto, plazo, montoFinal }));
});

// Al cargar la página, mostramos el último simulado si existe
document.addEventListener('DOMContentLoaded', function() {
    const ultimoSimulado = JSON.parse(localStorage.getItem('ultimoSimulado'));
    if (ultimoSimulado) {
        const { monto, plazo, montoFinal } = ultimoSimulado;
        mostrarResultado(montoFinal);
    }
});
