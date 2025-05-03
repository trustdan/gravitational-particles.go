// Custom gravity simulation with vanilla JavaScript
let gravityAnimationId = null;
let pureGravityActive = false;

function applyPureGravity() {
    console.log('Applying pure gravity simulation');
    
    // First destroy existing particles if any
    if (typeof destroyParticles === 'function') {
        destroyParticles();
    }
    
    // Hide particles.js container
    const particlesContainer = document.getElementById('particles-js');
    particlesContainer.style.display = 'none';
    
    // Create our own canvas for gravity simulation
    let gravityCanvas = document.getElementById('gravity-canvas');
    if (!gravityCanvas) {
        gravityCanvas = document.createElement('canvas');
        gravityCanvas.id = 'gravity-canvas';
        gravityCanvas.style.position = 'fixed';
        gravityCanvas.style.top = '0';
        gravityCanvas.style.left = '0';
        gravityCanvas.style.width = '100%';
        gravityCanvas.style.height = '100%';
        gravityCanvas.style.zIndex = '1';
        gravityCanvas.style.backgroundColor = '#0a192f';
        document.body.appendChild(gravityCanvas);
    } else {
        gravityCanvas.style.display = 'block';
    }
    
    // Setup canvas and context
    const ctx = gravityCanvas.getContext('2d');
    gravityCanvas.width = window.innerWidth;
    gravityCanvas.height = window.innerHeight;
    
    // Update status
    const statusEl = document.getElementById('status');
    statusEl.textContent = 'Current preset: Pure Gravity';
    
    // Define central sun
    const sun = {
        x: gravityCanvas.width / 2,
        y: gravityCanvas.height / 2,
        radius: 30,
        mass: 2000,
        color: '#ffdd00'
    };
    
    // Create planets
    const planets = [];
    const colors = ['#ff7e7e', '#7eff8e', '#7ee0ff', '#ffffff'];
    
    for (let i = 0; i < 150; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 150;
        const x = sun.x + Math.cos(angle) * distance;
        const y = sun.y + Math.sin(angle) * distance;
        
        const speed = Math.sqrt(sun.mass / distance) * 0.5;
        
        planets.push({
            x: x,
            y: y,
            radius: 2 + Math.random() * 4,
            mass: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: Math.sin(angle) * speed,
            vy: -Math.cos(angle) * speed
        });
    }
    
    // Flag to track if simulation is active
    pureGravityActive = true;
    
    // Animation loop
    function animate() {
        if (!pureGravityActive) {
            cancelAnimationFrame(gravityAnimationId);
            return;
        }
        
        // Clear canvas
        ctx.clearRect(0, 0, gravityCanvas.width, gravityCanvas.height);
        
        // Draw sun
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
        ctx.fillStyle = sun.color;
        ctx.fill();
        
        // Update and draw planets
        for (const planet of planets) {
            // Calculate gravitational force
            const dx = sun.x - planet.x;
            const dy = sun.y - planet.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);
            
            // Skip if too close to prevent extreme forces
            if (dist > sun.radius + planet.radius) {
                const force = sun.mass / distSq * 0.1;
                
                // Apply acceleration
                planet.vx += (dx / dist) * force;
                planet.vy += (dy / dist) * force;
            }
            
            // Apply slight damping
            planet.vx *= 0.999;
            planet.vy *= 0.999;
            
            // Update position
            planet.x += planet.vx;
            planet.y += planet.vy;
            
            // Bounce off edges
            if (planet.x < 0 || planet.x > gravityCanvas.width) {
                planet.vx *= -0.9;
            }
            if (planet.y < 0 || planet.y > gravityCanvas.height) {
                planet.vy *= -0.9;
            }
            
            // Draw planet
            ctx.beginPath();
            ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
            ctx.fillStyle = planet.color;
            ctx.fill();
            
            // Draw line to sun
            const lineMaxDist = 250;
            if (dist < lineMaxDist) {
                ctx.beginPath();
                ctx.moveTo(planet.x, planet.y);
                ctx.lineTo(sun.x, sun.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / lineMaxDist})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
        
        // Request next frame
        gravityAnimationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    console.log('Pure gravity simulation started');
}

// Handle window resizing
window.addEventListener('resize', function() {
    const gravityCanvas = document.getElementById('gravity-canvas');
    if (gravityCanvas && pureGravityActive) {
        gravityCanvas.width = window.innerWidth;
        gravityCanvas.height = window.innerHeight;
    }
});

// Function to stop gravity simulation
function stopGravitySimulation() {
    if (pureGravityActive) {
        pureGravityActive = false;
        cancelAnimationFrame(gravityAnimationId);
        
        const gravityCanvas = document.getElementById('gravity-canvas');
        if (gravityCanvas) {
            gravityCanvas.style.display = 'none';
        }
        
        const particlesContainer = document.getElementById('particles-js');
        particlesContainer.style.display = 'block';
        
        console.log('Stopped gravity simulation');
    }
}

// Set up override of destroyParticles when the page loads
window.addEventListener('DOMContentLoaded', function() {
    if (typeof destroyParticles === 'function') {
        const originalDestroyParticles = destroyParticles;
        window.destroyParticles = function() {
            originalDestroyParticles();
            stopGravitySimulation();
        };
    }
}); 