const baseUrl = "http://127.0.0.1:8000/api"

// Selector
const container = document.getElementById('container')
const modal = document.getElementById('modal-rating');
const reviewInput = document.getElementById('review');
const btnSubmit = document.getElementById('submit');
const startReviewDiv = document.createElement('div')
startReviewDiv.classList.add("flex", "content-center", "space-x-4", "mb-10")

const addReviewStar = document.getElementById('addReview')

let rate;

// Event Listener
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


function getBook(id=1) {
    fetch(`${ baseUrl }/book/detail/${id}`).then(async (response) => {
        res_json = await response.json()
        const book_title = document.getElementById('book-title')
        const rate = document.getElementById('rate-number')
        
        rate.innerHTML = res_json.rate
        book_title.innerHTML = res_json.book.title
        reviews = res_json.ratings

        genrateStar(res_json.rate, "yes", "ratingHeader")

        reviews.forEach((item, index) => {
            createStarReviewList(index, item)

            genrateStar(item.rate, "yes", `${index}ratingSystem`)
        })

    })
}

function createStarReviewList(uniqueId, reviewData) {
    const mainDiv = document.getElementById('main-div')
    const firstDiv = elementCreator('div', {
        class: "flex content-center space-x-4 mb-10"
    })
    const starDiv = elementCreator('div', {id: "starReview"})
    const reviewDiv = elementCreator('div')
    const starRating = elementCreator('div', {class: "starRatingContainer"})
    const ratingSystem = elementCreator('div', {class: `${uniqueId}ratingSystem`})
    const ratingHolder = elementCreator('div', {class: "ratingHolder"})
    const reviewSpan = elementCreator('span', {
        id: "rate-review",
        class: "text-lg decoration-auto",
    })
    reviewSpan.innerHTML = `${reviewData.rate}, ${reviewData.review}`
    
    firstDiv.appendChild(starDiv)
    firstDiv.appendChild(reviewDiv)
    starDiv.appendChild(starRating)
    starDiv.appendChild(ratingHolder)
    starRating.appendChild(ratingSystem)

    reviewDiv.appendChild(reviewSpan)

    mainDiv.appendChild(firstDiv)

}


function genrateStar(rate, readOnly, className, func) {
    properties = setStarProperties(rate, readOnly)

    let starProperties = [properties];

    return rateSystem(className, starProperties, func);

}

function setStarProperties(rate, readOnly) {
    return {
        "rating": rate, 
        "maxRating":"5",
        "minRating":"1",
        "readOnly":readOnly,
        "starImage":"./star.png",
        "emptyStarImage":"./starbackground.png", 
        "starSize":"32",
        "step":"0.5"
    };
}

function openModal(modalId) {
    genrateStar(0, "no", "addReview", (rating, ratingTargetElement) => {
        rate = rating
        console.log(rate)
        // ratingTargetElement.parentElement.parentElement.getElementsByClassName("ratingHolder")[0].setAttribute("data-rate", rating); 
    })
    modal.classList.remove('hidden');
    
}

function closeModal() {
    modal.classList.add('hidden');
}

function elementCreator(tagName, attributes) {
    this.element = document.createElement(tagName);

    for (let i in attributes) {
        this.element.setAttribute(i, attributes[i]);
        // this.element[i] = attributes[i];
    }

    return this.element;
}   


closeModal();
getBook();
