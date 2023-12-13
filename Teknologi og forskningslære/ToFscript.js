document.addEventListener("DOMContentLoaded", function() {
    const header = document.getElementById("header")

    function change() {
        if (window.innerWidth < 400) {
            header.innerText = "Teknologi og forskings- lære"
        }
    }

    change();

    window.addEventListener('resize', change);
});