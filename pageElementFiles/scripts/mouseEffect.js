document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.project-container');

    containers.forEach(container => {
        // Create the pattern layer
        const patternLayer = document.createElement('div');
        patternLayer.classList.add('pattern-layer');
        container.appendChild(patternLayer);

        // Add mouse move listener
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set CSS variables for mask position
            container.style.setProperty('--mouse-x', `${x}px`);
            container.style.setProperty('--mouse-y', `${y}px`);
        });

        // Optional: Hide pattern when mouse leaves
        container.addEventListener('mouseleave', () => {
            // You could fade it out or just leave it at the last position. 
            // Leaving it at the last position (or resetting variables) is fine.
            // If we want it to disappear, we'd need to toggle a class or change opacity based on hover state in CSS.
            // For now, let's just let the CSS hover state handle visibility if needed, 
            // or let the mask stick to the last position.
            // The CSS mask implementation usually relies on the mouse being present.
            // If we want it to "turn off", we can set the variables to somewhere off-screen or use a class.
            // Let's keep it simple: the mask follows the mouse. If mouse leaves, it stays at last known pos.
            // But actually, the mask is based on --mouse-x/y. 
        });
    });
});
