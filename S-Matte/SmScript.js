document.addEventListener("DOMContentLoaded", function() {
    const enkeltbox = document.querySelectorAll("#enkeltbilde");
    const flerbox = document.querySelectorAll("#flerbilde");

    function change() {
        if (window.innerWidth < 541) {
            enkeltbox.forEach(box => {
                box.style.display = "none";
            });
            flerbox.forEach(box => {
                box.style.display = "flex";
            });
        } else {
            enkeltbox.forEach(box => {
                box.style.display = "flex";
            });
            flerbox.forEach(box => {
                box.style.display = "none";
            });
        }
    }

    change();

    window.addEventListener('resize', change);
});