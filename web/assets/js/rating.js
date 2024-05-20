import { getUser } from './userSession.js';

document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('courseSelect');
    const displayCourse = document.getElementById('displayCourse');
    const displayInstructor = document.getElementById('displayInstructor');
    selectElement.addEventListener('change', function() { 
        const selectedText = selectElement.options[this.selectedIndex].text;
        displayCourse.textContent = this.value ? `${selectedText}` : '';
        displayInstructor.textContent = this.value ? `${selectElement.options[this.selectedIndex].getAttribute('data-instructor')}` : '';
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
    
    const user = getUser();
    const form = document.getElementById('rating_form');
    const submitButton = document.getElementById('rating-submit');
    submitButton.addEventListener('click', function(event) {
        // Prevent form submission if validation fails
        // if (!validateForm()) {
        //     event.preventDefault();
        // } else {
            event.preventDefault();

            const rating = getRating();
            const course = getCourse();
            const username = user.username; // Replace with actual username
            const date = new Date(); 
            const instructor = getInstructor();
            fetch("/rating", {
                method: "POST",
                body: JSON.stringify({
                    _id: new Date().getTime().toString(), // consider to use a timestamp as an ID (for uniqueness)
                    rating: rating,
                    course: course,
                    comment: form.comment.value,
                    username: username,
                    date: date,
                    instructor: instructor

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
        // }
    });
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
        // return selectElement.value;
         return selectElement.options[selectElement.selectedIndex].text
    }


    function getInstructor() {
        const selectElement = document.getElementById('courseSelect');
        return selectElement.options[selectElement.selectedIndex].getAttribute('data-instructor');
    }

