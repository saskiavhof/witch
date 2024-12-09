const witch = document.getElementById('witch');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;
let moving = false;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  moving = true;

  // Switch to flying state
  witch.style.backgroundImage = "url('flying.png')";
});

// Smooth follow effect with angle adjustment
function animateWitch() {
  const speed = 0.1; // Adjust for smoother or faster following
  const deltaX = mouseX - currentX;
  const deltaY = mouseY - currentY;

  // Calculate the angle in radians and convert to degrees
  let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  // Adjust angle to match forward-facing orientation of the witch
  angle += 180; // Rotate by 90 degrees to correct the default direction

  // Interpolation for smooth movement
  currentX += deltaX * speed;
  currentY += deltaY * speed;

  // Apply position and rotation
  witch.style.transform = `translate(${currentX - 50}px, ${currentY - 50}px) rotate(${angle}deg)`;

  // Check if mouse is almost stationary
  if (Math.abs(mouseX - currentX) < 0.5 && Math.abs(mouseY - currentY) < 0.5) {
    if (moving) {
      moving = false;
      // Switch to hovering state
      witch.style.backgroundImage = "url('hover.png')";
      witch.style.transform = `translate(${currentX - 50}px, ${currentY - 50}px)`; // Reset rotation
    }
  }

    // Apply position and rotation for flying
    if (moving) {
        witch.style.transform = `translate(${currentX - 50}px, ${currentY - 50}px) rotate(${angle}deg)`;
      } else {
        // When hovering, reset to 0 degrees rotation
        witch.style.transform = `translate(${currentX - 50}px, ${currentY - 50}px) rotate(0deg)`;
      }

  requestAnimationFrame(animateWitch);
}

// Start animation
animateWitch();
