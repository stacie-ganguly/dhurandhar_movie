//back to top button logic
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

//faq logic

//gets the elements with the class .faq-question
const questions = document.querySelectorAll(".faq-question");

//takes each of those elemeents
questions.forEach(question => {
    console.log("Javascript connected!")
    
    //on click for each .faq-question tag
  question.addEventListener("click", () => {

    //take the element right below it
    const answer = question.nextElementSibling;
    
    //if it is at max-height then close and make main-height 0, vice versa
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight =
        answer.scrollHeight + "px";
    }

  });
});



// ============================================
// STAR RATING LOGIC
// ============================================

const stars = document.querySelectorAll('.star');
// grabs all 5 star <span> elements as a list

let selectedRating = 0;
// tracks which star number was clicked and locked in
// starts at 0 meaning nothing selected yet

// loop through every star and attach 3 event listeners each
stars.forEach(star => {

    // HOVER IN — highlight stars up to the one being hovered
    star.addEventListener('mouseover', () => {
        const val = parseInt(star.dataset.value);
        // dataset.value reads the data-value="1-5" attribute off the HTML element
        // parseInt converts it from a string ("3") to a number (3)

        stars.forEach(s => {
            s.classList.toggle('hovered', parseInt(s.dataset.value) <= val);
            // toggle(class, condition) adds the class if condition is true, removes it if false
            // so every star whose number is <= the hovered star gets the 'hovered' class
        });
    });

    // HOVER OUT — remove all hover highlights when mouse leaves
    star.addEventListener('mouseout', () => {
        stars.forEach(s => s.classList.remove('hovered'));
        // clears hovered from all stars so they go back to dim
    });

    // CLICK — lock in the rating
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value);
        // saves the clicked star's number to our variable

        document.getElementById('rating').value = selectedRating;
        // also saves it into the hidden input so the form can read it on submit

        stars.forEach(s => {
            s.classList.toggle('selected', parseInt(s.dataset.value) <= selectedRating);
            // same logic as hover but with 'selected' class — stays on even after mouse leaves
        });
    });
});


// ============================================
// FORM SUBMIT LOGIC
// ============================================

function submitReview(event) {

    event.preventDefault();
    // prevents the default form behavior (refreshing the page / sending to a server)
    // we want to handle it ourselves with JS instead

    // read the values out of each field
    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;      // comes from the hidden input
    const reviewText = document.getElementById('review').value;

    // guard: if they never clicked a star, rating is still "0" — block submission
    if (rating === '0') {
        alert('Please select a star rating!');
        return; // stops the function here so nothing else runs
    }

    // build the star display string
    // e.g. rating = 4 → '★'.repeat(4) = '★★★★' and '☆'.repeat(1) = '☆'
    // combined = '★★★★☆'
    const starDisplay = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    // create a brand new <div> element in JS (not yet on the page)
    const card = document.createElement('div');
    card.classList.add('review-card'); // gives it the CSS class for styling

    // fill the card with the submitted info using a template literal (backtick string)
    // ${} lets you drop variables directly into the HTML string
    card.innerHTML = `
        <p class="reviewer-name">${name}</p>
        <p class="reviewer-stars">${starDisplay}</p>
        <p class="reviewer-text">${reviewText}</p>
    `;

    // add the card to the reviews-list div on the page
    document.getElementById('reviews-list').prepend(card);
    // prepend = inserts at the TOP so newest review appears first

    // reset everything back to empty/default
    event.target.reset();           // clears all the form fields
    selectedRating = 0;             // resets our JS variable
    stars.forEach(s => s.classList.remove('selected')); // removes red from all stars
    document.getElementById('rating').value = '0';      // resets the hidden input
}