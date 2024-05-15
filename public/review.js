// Function to toggle the visibility of the first dropdown menu
function myFunction() {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");
}

// Function to toggle the visibility of the second dropdown menu
function myFunctions() {
    var dropdown = document.getElementById("myDropdown1");
    dropdown.classList.toggle("show1");
}

// Close both dropdown menus if the user clicks outside of them
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn1')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }

        var dropdowns1 = document.getElementsByClassName("dropdown-content1");
        for (var j = 0; j < dropdowns1.length; j++) {
            var openDropdown1 = dropdowns1[j];
            if (openDropdown1.classList.contains('show1')) {
                openDropdown1.classList.remove('show1');
            }
        }
    }
}
