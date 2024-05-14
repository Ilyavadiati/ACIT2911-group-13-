
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




