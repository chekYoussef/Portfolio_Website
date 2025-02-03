$(document).ready(function () {

    // Smooth Zoom-Out Transition on Navigation Click
    $("nav a").on("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        let newLocation = this.href;

        $("body").addClass("zoom-out"); // Apply zoom-out effect

        setTimeout(function () {
            window.location.href = newLocation; // Navigate after transition
        }, 500); // Match the CSS transition duration
    });

    // Smooth Fade-In Effect on Page Load
    $("body").css("opacity", "0").animate({ opacity: 1 }, 500);

    // Typing effect for "I AM YOUSSEF"
    let text = "I AM YOUSSEF";
    let index = 0;
    let speed = 100;

    function typeWriter() {
        if (index < text.length) {
            $("#typewriter").append(text.charAt(index));
            index++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
});


