
document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('courseSelect');
    const displayArea = document.getElementById('displayArea');
    selectElement.addEventListener('change', function() { 
        const selectedText = selectElement.options[this.selectedIndex].text;
        displayArea.textContent = this.value ? `${selectedText}` : '';
    });
});

const stars = document.querySelectorAll('.star-rating .star');

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    stars.forEach(s => s.classList.remove('selected'));
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add('selected');
    }
    console.log(`Rating is ${index + 1}`);
  });

  star.addEventListener('mouseover', () => {
    stars.forEach((s, i) => {
      if (i <= index) s.classList.add('hover');
      else s.classList.remove('hover');
    });
  });

  star.addEventListener('mouseout', () => {
    stars.forEach(s => s.classList.remove('hover'));
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rating_form');
    const submitButton = document.getElementById('rating-submit');
    submitButton.addEventListener('click', function(event) {
        // Prevent form submission if validation fails
        if (!validateForm()) {
            event.preventDefault();
        } else {
            const rating = getRating();
            const course = getCourse();
            fetch("/rating", {
                method: "POST",
                body: JSON.stringify({
                    rating: rating,
                    course: course,
                    comment: form.comment.value
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })

            .then(response => {
                if (response.status === 200) {
                    alert('Rating submitted successfully!');
                    window.location.href = '/reviews';
                } else {
                    alert('An error occurred. Please try again.');
                }
            
            })
        }
    });

    function validateForm() {
        if (!getRating()) {
            alert('Please select a rating.');
            return false;
        }

        if (!getCourse()) {
            alert('Please select a course.');
            return false;
        }

        return true;
    }

    function getRating() {
        const stars = document.querySelectorAll('.star-rating .star');
        return Array.from(stars).filter(
            star => star.classList.contains('selected')
        ).length;
    }

    function getCourse() {
        const selectElement = document.getElementById('courseSelect');
        return selectElement.value;
    }
})

