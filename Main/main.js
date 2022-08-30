console.log(document.getElementById("searchIcon"))
var searchIcon = document.getElementById("searchIcon");
var searchBox = document.getElementById("searchInput");

searchIcon.addEventListener('click', (e) => {
    searchBox.classList.toggle("active");
    console.log('active search works');
});
