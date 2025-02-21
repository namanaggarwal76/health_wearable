function openVisualization(page) {
    window.open(page, "_blank");
  }
  
  // Main function to draw the clock
  function drawClock() {
    const canvas = document.getElementById("analogClock");
    const ctx = canvas.getContext("2d");
    const radius = canvas.height / 2;
    // Move the canvas origin to its center
    ctx.translate(radius, radius);
  
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
  
    // Reset the translation so the next draw is clean
    ctx.translate(-radius, -radius);
  }
  
  function drawFace(ctx, radius) {
    // Draw the clock face (circle)
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  
    // Draw the border
    ctx.lineWidth = radius * 0.05;
    ctx.strokeStyle = "#333";
    ctx.stroke();
  
    // Draw the center dot
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
  }
  
  function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.15 + "px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num <= 12; num++) {
      let ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillStyle = "#333";
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }
  
  function drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
  
    // Calculate the angle for the hour hand
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
           (minute * Math.PI / (6 * 60)) +
           (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  
    // Calculate the angle for the minute hand
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.75, radius * 0.05);
  
    // Calculate the angle for the second hand
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.85, radius * 0.02, "red");
  }
  
  function drawHand(ctx, pos, length, width, color = "#333") {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
  
  // Update the clock every second
  setInterval(() => {
    const canvas = document.getElementById("analogClock");
    const ctx = canvas.getContext("2d");
    // Clear the canvas before redrawing
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    drawClock();
  }, 1000);
  
  // Initial draw
  drawClock();
  