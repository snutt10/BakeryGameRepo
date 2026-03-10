//found this code here: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
//Theres more code in the getIngrediants.ejs file that is related to this, but this is the main part of the code that makes it work
let dragged;
let droppedIngredients = new Set();

dragElement(document.getElementById("draggable-ingredient1"));
dragElement(document.getElementById("draggable-ingredient2"));
dragElement(document.getElementById("draggable-ingredient3"));

// Set up drag and drop event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    const dropzone = document.querySelector(".dropzone");
    if (dropzone) {
        dropzone.addEventListener('dragover', allowDrop);
        dropzone.addEventListener('drop', drop);
        dropzone.addEventListener('dragleave', dragLeave);
    }
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(e) {
    e.preventDefault();
    
    if (!dragged) return;
    
    // Get the ingredient ID from the dragged element
    const ingredientId = dragged.querySelector('.draggable').getAttribute('data-id');
    
    // Add to the set of dropped ingredients
    droppedIngredients.add(ingredientId);
    
    // Hide the dragged ingredient
    dragged.style.opacity = '0.5';
    dragged.style.pointerEvents = 'none';
    
    // Check if all 3 ingredients are dropped
    if (droppedIngredients.size === 3) {
        setTimeout(() => {
            // Extract recipe name and navigate
            const recipeMatch = document.title.match(/for: (.*?) to/);
            const recipeName = recipeMatch ? recipeMatch[1] : "Unknown Recipe";
            
            // Create form and submit
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/bakingProcess';
            
            const recipeInput = document.createElement('input');
            recipeInput.type = 'hidden';
            recipeInput.name = 'recipe';
            recipeInput.value = recipeName;
            
            form.appendChild(recipeInput);
            document.body.appendChild(form);
            form.submit();
        }, 500);
    }
}
function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = dragMouseDown;
    } else {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        dragged = element;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}