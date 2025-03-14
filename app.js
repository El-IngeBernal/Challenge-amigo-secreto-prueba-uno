// Esperar a que el DOM se cargue completamente antes de asignar eventos

document.addEventListener("DOMContentLoaded", function() {
    // Obtener los elementos de entrada y botones por su ID
    const participantesInput = document.getElementById("participantes");
    const agregarBtn = document.getElementById("agregar");
    const asignarBtn = document.getElementById("asignar");
    const listaParticipantes = document.getElementById("listaParticipantes");
    const resultado = document.getElementById("resultado");

    let participantes = []; // Lista para almacenar los participantes

    // Función para agregar un participante a la lista
    agregarBtn.addEventListener("click", function() {
        const nombre = participantesInput.value.trim();
        if (nombre && !participantes.includes(nombre)) {
            participantes.push(nombre);
            actualizarLista();
            participantesInput.value = ""; // Limpiar el campo de entrada
        }
    });

    // Función para actualizar la lista de participantes en el HTML
    function actualizarLista() {
        listaParticipantes.innerHTML = ""; // Limpiar la lista
        participantes.forEach((nombre, index) => {
            const li = document.createElement("li");
            li.textContent = nombre;
            listaParticipantes.appendChild(li);
        });
    }

    // Función para asignar amigos secretos
    asignarBtn.addEventListener("click", function() {
        if (participantes.length < 2) {
            resultado.textContent = "Se necesitan al menos 2 participantes.";
            return;
        }
        let asignaciones = asignarAmigosSecretos(participantes);
        mostrarAsignaciones(asignaciones);
    });

    // Función para mezclar y asignar amigos secretos
    function asignarAmigosSecretos(lista) {
        let copiaLista = [...lista]; // Copia de la lista original
        let asignaciones = {};
        
        for (let participante of lista) {
            let posibles = copiaLista.filter(p => p !== participante);
            if (posibles.length === 0) {
                return asignarAmigosSecretos(lista); // Reintentar si no hay combinaciones válidas
            }
            let elegido = posibles[Math.floor(Math.random() * posibles.length)];
            asignaciones[participante] = elegido;
            copiaLista = copiaLista.filter(p => p !== elegido);
        }
        return asignaciones;
    }

    // Función para mostrar los resultados de la asignación
    function mostrarAsignaciones(asignaciones) {
        resultado.innerHTML = "";
        for (let [participante, amigo] of Object.entries(asignaciones)) {
            const p = document.createElement("p");
            p.textContent = `${participante} → ${amigo}`;
            resultado.appendChild(p);
        }
    }
});
