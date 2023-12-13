document.addEventListener("DOMContentLoaded", function() {
    const containerOne = document.getElementById("1")
    const containerTwo = document.getElementById("2")
    

    function change() {
        if (window.innerWidth < 460) {
            containerOne.innerText = "Informasjons- teknologi 1";
            containerTwo.innerText = "Informasjons- teknologi 2";
        }else {
            containerOne.innerText = "Informasjonsteknologi 1";
            containerTwo.innerText = "Informasjonsteknologi 2";
        }
    }

    change();

    window.addEventListener('resize', change);
});