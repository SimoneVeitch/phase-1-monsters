document.addEventListener("DOMContentLoaded", () => {

    const contentContainer = document.querySelector("#monster-container");
    const forwardBtn = document.querySelector("#forward");
    const backBtn = document.querySelector("#back");

    let currentPage = 1;
    const monstersPerPage = 50;

    function renderOneMonster(monster) {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <h3>${monster.name}</h3>
        <p>${monster.age}<p>
        <p>${monster.description}<p>
        `;
        contentContainer.appendChild(card);
    }

    function getMonsters(page) {
        fetch(`http://localhost:3000/monsters/?_page=${page}&_limit=${monstersPerPage}`)
            .then(response => response.json())
            .then(monsterData => {
                contentContainer.innerHTML = ''; // Clear existing monsters
                monsterData.forEach(monster => renderOneMonster(monster));
            })
            .catch(error => console.error("Error fetching monsters", error));
    }

    function nextPage() {
        console.log("Next page clicked");
        currentPage++;
        getMonsters(currentPage); // Fetch monsters with the updated currentPage value
    }

    function previousPage() {
        if (currentPage > 1) {
            currentPage--;
            getMonsters(currentPage);
        }
    }

    forwardBtn.addEventListener("click", nextPage);
    backBtn.addEventListener("click", previousPage);

    getMonsters(currentPage);

// Create new monsters

document.querySelector('.add-monster-form').addEventListener('submit', handleSubmit);

function handleSubmit(e){
 e.preventDefault();
 let monsterObj = {
   name: e.target.name.value,
   age: e.target.age.value,
   description: e.target.description.value
 };
 renderOneMonster(monsterObj);
 addNewMonster(monsterObj);
}

function addNewMonster(monsterObj){
 fetch('http://localhost:3000/monsters', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(monsterObj)
 })
 .then(response => response.json())
 .then(monster => console.log(monster))
 .catch(error => console.error("Error adding new toy:", error));
}

});
