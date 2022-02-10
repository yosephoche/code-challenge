// Selector
const modal = document.getElementById('modal-rating');
const starElements = document.querySelectorAll('.c-star');
const reviewInput = document.getElementById('review');
const btnSubmit = document.getElementById('submit');
let rate;

// Event Listener
starElements.forEach((star, clickedIndex) => {
    star.setAttribute("fill", "lightgrey")
    
    star.addEventListener("mouseover", () => {
        rateStar(clickedIndex)
    });

    star.addEventListener("click", () => {
        rate = star.starValue;
    })
});

btnSubmit.addEventListener("click", () => {
    const review = reviewInput.value; 
    // TODO: call API to save review here

    closeModal()
});

document.addEventListener('click', (event) => {
    const boolIsOutside = document.getElementById("bg-gray").isSameNode(event.target);
    if (boolIsOutside) {
        closeModal()
    }
});


// Function
closeModal()

function rateStar(clickedIndex) {
    star.starValue = clickedIndex+1
    starElements.forEach((otherStar, otherIndex) => {
        if (otherIndex <= clickedIndex) {
            otherStar.setAttribute("fill", "#fed94b")
        }else{
            otherStar.setAttribute("fill", "lightgrey")
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

