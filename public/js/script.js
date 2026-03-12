//found this code here: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
//Theres more code in the getIngrediants.ejs file that is related to this, but this is the main part of the code that makes it work
let dragged;
let droppedIngredients = new Set();

const draggableElements = document.querySelectorAll('.draggable');

dragElement(draggableElements);

// Set up drag and drop event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    const dropzone = document.querySelector(".dropzone");
    if (dropzone) {
        console.log("Dropzone found, setting up event listeners");
        dropzone.addEventListener('dragover', allowDrop);
        dropzone.addEventListener('drop', drop);
    }
    
    // Set up drag events for ingredients
    draggableElements.forEach(element => {
        element.addEventListener('dragstart', function(e) {
            dragged = e.target.closest('[id^="draggable-ingredient"]');
            console.log("Started dragging:", dragged ? dragged.id : "none");
        });
        console.log("Drag event added to:", element.textContent);
    });
});

function allowDrop(ev) {
    ev.preventDefault();
    console.log("Allowing drop");
}

function drop(e) {
    e.preventDefault();
    
    if (!dragged) {
        console.log("No dragged element found");
        return;
    }
    
    console.log("Drop event fired, dragged element:", dragged);
    
    // Get the ingredient ID from the dragged element
    const ingredientElement = dragged.querySelector('.draggable');
    if (!ingredientElement) {
        console.log("No .draggable element found in dragged item");
        return;
    }
    
    const ingredientId = ingredientElement.getAttribute('data-id');
    const ingredientName = ingredientElement.textContent;
    
    console.log("Dropping ingredient:", ingredientName, "with ID:", ingredientId);
    
    // Add to the set of dropped ingredients
    droppedIngredients.add(ingredientId);
    
    // Hide the dragged ingredient
    dragged.style.opacity = '0.5';
    dragged.style.pointerEvents = 'none';
    
    console.log("Current dropped ingredients count:", droppedIngredients.size);
    
    let recipe = "<%= recipe %>";
    switch (recipe) {
        case 'Chocolate Chip Cookies':
            console.log("Selected recipe: " + recipe);
            checkAllIngredientsDropped("<%= requiredIngredients.length %>");
            break;
        case 'Blueberry Muffins':
            console.log("Selected recipe: " + recipe);
            break;
        case 'Apple Pie':
            console.log("Selected recipe: " + recipe);
            break;
        case 'Bread rolls':
            console.log("Selected recipe: " + recipe);
            break;
        case 'Bread Loaf':
            console.log("Selected recipe: " + recipe);
            break;
        default:
            console.log("Unknown recipe selected: " + recipe);
    }
    // Check if all 3 ingredients are dropped
    function checkAllIngredientsDropped(requiredIngredients) {
        if (droppedIngredients.size === requiredIngredients) {
            console.log("All ingredients collected! Redirecting...");
            setTimeout(() => {
                // Extract recipe name from title
                const titleText = document.title;
                const recipeMatch = titleText.match(/for: (.*?) to/);
                const recipeName = recipeMatch ? recipeMatch[1].trim() : "Unknown Recipe";
                
                console.log("Extracted recipe name:", recipeName, "from title:", titleText);
                
                window.location.href = '/bakingProcess?recipe=' + encodeURIComponent(recipeName);
            }, 500);
        }
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