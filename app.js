// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

document.addEventListener("DOMContentLoaded", function() {
    const participantsInput = document.getElementById("participants");
    const assignButton = document.getElementById("assignButton");
    const resultContainer = document.getElementById("result");

    assignButton.addEventListener("click", function() {
        const names = participantsInput.value.split(",").map(name => name.trim()).filter(name => name !== "");
        
        if (names.length < 2) {
            alert("Por favor, ingrese al menos dos nombres para asignar un amigo secreto.");
            return;
        }
        
        const assignments = assignSecretFriends(names);
        displayResults(assignments);
    });

    function assignSecretFriends(names) {
        let shuffled = [...names];
        let isValidAssignment = false;

        while (!isValidAssignment) {
            shuffled = shuffled.sort(() => Math.random() - 0.5);
            isValidAssignment = !shuffled.some((name, index) => name === names[index]);
        }
        
        let assignments = {};
        names.forEach((name, index) => {
            assignments[name] = shuffled[index];
        });

        return assignments;
    }

    function displayResults(assignments) {
        resultContainer.innerHTML = "";
        for (let giver in assignments) {
            const p = document.createElement("p");
            p.textContent = `${giver} → ${assignments[giver]}`;
            resultContainer.appendChild(p);
        }
    }
});