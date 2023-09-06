const boxes = document.querySelectorAll(".box");


window.addEventListener("scroll", checkboxes);

checkboxes();

function checkboxes(){
   const bunnAvSkjerm = window.scrollY + window.innerHeight
   console.log(bunnAvSkjerm);

   boxes.forEach((box, index) => {
    const boxTop = box.getBoundingClientRect().top;
    console.log(boxTop, box)
    console.log(index)
    if (boxTop < bunnAvSkjerm){
        box.classList.add("show");
    } 
   });
}