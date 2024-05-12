// Explain document.addEventListener('DOMContentLoaded', function() {}

// When a web page is loaded in a browser, it goes through several stages. The 'DOMContentLoaded' event is fired after the HTML document has been completely loaded and parsed. This means that the entire HTML structure of the page is ready and can be manipulated using JavaScript.
// However, at this point, external resources like images, stylesheets, or scripts linked in the HTML with tags such as <img>, <link>, or <script src="..."> may not have fully loaded yet. This is why 'DOMContentLoaded' is useful: it allows you to run JavaScript as soon as the HTML is ready, without having to wait for all resources to load.
// Here's a basic timeline of what happens when a page loads:
// The browser fetches the HTML file.
// The browser begins parsing the HTML.
// When the browser encounters a link to an external resource (like an image, a CSS file, or a JavaScript file), it will start downloading it, but it will continue parsing the HTML.
// When the entire HTML file has been parsed, the 'DOMContentLoaded' event is fired. Any JavaScript that is listening for this event will now run.
// The browser continues loading any remaining external resources. When all resources are fully loaded, the 'load' event is fired.
// So, when we say "when the initial HTML document has been completely loaded and parsed", we're referring to the point at which the 'DOMContentLoaded' event is fired.


document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('courseSelect');
    const displayArea = document.getElementById('displayArea');

// The whole process includes 2 component, one is selecting the course, the other is displaying the selected course
// So I should first read the selected option when it is selected from the menu and store its content text
// Then assign the context text to display area
// Think in which element I should add a event? Yes, the whole select element
// 'change' is the keyword when some element changed
    selectElement.addEventListener('change', function() { 
        const selectedText = selectElement.options[this.selectedIndex].text; // selectElement.options returns an array of all the options, then [selectElement.selectedIndex] to access the current index of selected option, finally .text to access the option's content
        displayArea.textContent = this.value ? `${selectedText}` : ''; // When used inside an event handler function, this refers to the HTML element that the event handler is registered on.
    });
});

const stars = document.querySelectorAll('.star-rating .star');

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    // Remove the selected class from all stars
    stars.forEach(s => s.classList.remove('selected'));
    // Add the selected class back to the star clicked and those before it
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add('selected');
    }
    // Output the rating
    console.log(`Rating is ${index + 1}`);
  });

  // Optional: Add hover effect to stars
  star.addEventListener('mouseover', () => {
    // Add hover class to all stars up to the one hovered
    stars.forEach((s, i) => {
      if (i <= index) s.classList.add('hover');
      else s.classList.remove('hover');
    });
  });

  star.addEventListener('mouseout', () => {
    // Remove hover class from all stars
    stars.forEach(s => s.classList.remove('hover'));
  });
});

