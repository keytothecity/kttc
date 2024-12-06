window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // Set the prices of the circles
    var circles = [
        {name: "New York", price: 0, imgSrc: "NYKEYS.png", link: "https://keys-to-the-city.gitbook.io/keys-to-the-city-whitepaper/cities/nykeys-nyk"},
        {name: "Dubai", price: 0, imgSrc: "DKYS.png", link: "https://keys-to-the-city.gitbook.io/keys-to-the-city-whitepaper/cities/dubaikeys-dkys"},
        {name: "Moscow", price: 0, imgSrc: "MOSCOWKEYS.png", link: "https://keys-to-the-city.gitbook.io/keys-to-the-city-whitepaper/cities/moscowkeys-msk"}
    ];

    // Draw the ruler
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 330); // Reduced height by 20px
    for (var i = 0; i <= 280; i += 10) { // Adjusted for reduced height
        ctx.moveTo(45, 50 + i);
        ctx.lineTo(55, 50 + i);
    }
    ctx.strokeStyle = "#f2ddcc"; // White stroke color
    ctx.stroke();

    // Draw the labels on the ruler
    ctx.fillStyle = "#f2ddcc"; // White text color
    for (var j = 0; j <= 9; j++) { // Adjusted for reduced height
        ctx.fillText("$" + (j * 0.1).toFixed(1), 20, 330 - j * 30);
    }

    // Function to draw an image inside a circle
    function drawImageInCircle(imgSrc, x, y, radius) {
        var img = new Image();
        img.onload = function() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, x - radius, y - radius, radius * 2, radius * 2);
            ctx.restore();
        };
        img.src = imgSrc;
    }

    // Calculate positions based on prices and insert images into the circles
    circles.forEach(function(circle, index) {
        var x = 150 + index * 250; // Adjusted for narrower spacing
        var y = 330 - (circle.price * 280); // Calculate y position based on price
        drawImageInCircle(circle.imgSrc, x, y, 75);
        ctx.fillStyle = "#f2ddcc"; // White text color
        ctx.fillText(circle.name, x - 50, y + 90);
        ctx.fillText("$" + circle.price.toFixed(2), x - 50, y + 105);

        // Add event listener for click
        canvas.addEventListener('click', function(event) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = event.clientX - rect.left;
            var mouseY = event.clientY - rect.top;

            // Check if the click is inside the circle
            if (Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) <= Math.pow(75, 2)) {
                window.open(circle.link, '_blank');
            }
        });
    });
};
