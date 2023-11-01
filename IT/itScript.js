document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("playButton");
    
    button.addEventListener("click", function() {
        console.log("Button clicked");
        
        // Remove existing iframe
        const myIframe = document.getElementById("wraper");
        if (myIframe) {
            myIframe.parentNode.removeChild(myIframe);
        }

        // Call the function to create a new iframe
        create_iframe();
    });


    function create_iframe() {
        let section = document.createElement("section")
        section.className = "game-section"
        section.id = "wraper"
        
        let iframe = document.createElement("iframe")
        iframe.id = "gameIframe"
        iframe.src = "itGame.html"
        iframe.style.height = "425px"
        iframe.style.width = "420px"
        iframe.title = "IT 1 eksempel"

        section.appendChild(iframe)

        let div = document.getElementById("div1")
        div.appendChild(section)
        setTimeout(() => {
            iframe.focus()
        }, 50)
    }
});
