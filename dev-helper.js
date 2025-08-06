/**
 * Development Helper - Force Refresh JavaScript Files
 * Run this in browser console to see changes immediately
 */

// Function to force refresh all JavaScript files
function forceRefreshJS() {
    // Clear module cache
    if (window.location.reload) {
        window.location.reload(true);
    }
}

// Function to reload specific scene files
function reloadScene(sceneName) {
    
    
    // Force reload the scene file
    const script = document.createElement('script');
    script.src = `scenes/${sceneName}.js?v=${Date.now()}`;
    document.head.appendChild(script);
    
    // Reload the main script
    const mainScript = document.createElement('script');
    mainScript.type = 'module';
    mainScript.src = `script.js?v=${Date.now()}`;
    document.head.appendChild(mainScript);
}

// Add to window for easy access
window.devHelper = {
    forceRefresh: forceRefreshJS,
    reloadScene: reloadScene
};

// Drag functionality for dev panel
function makeDraggable() {

    
    // Wait a bit for elements to be ready
    setTimeout(() => {
        const devPanel = document.querySelector('.dev-button-container');
        if (!devPanel) {
    
            return;
        }
        

        
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        // Mouse down event
        devPanel.addEventListener('mousedown', (e) => {
            
            
            // Only start drag if NOT clicking on buttons
            if (e.target.classList.contains('dev-button')) {
                
                return;
            }
            
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            
            const rect = devPanel.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            
            devPanel.style.transition = 'none';
            document.body.style.cursor = 'move';
            e.preventDefault();
            e.stopPropagation();
        });
        
        // Mouse move event
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newLeft = startLeft + deltaX;
            const newTop = startTop + deltaY;
            
            // Keep panel within viewport bounds
            const maxLeft = window.innerWidth - devPanel.offsetWidth;
            const maxTop = window.innerHeight - devPanel.offsetHeight;
            
            const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
            const clampedTop = Math.max(0, Math.min(newTop, maxTop));
            
            devPanel.style.left = clampedLeft + 'px';
            devPanel.style.top = clampedTop + 'px';
            devPanel.style.right = 'auto';
        });
        
        // Mouse up event
        document.addEventListener('mouseup', () => {
            if (isDragging) {

                isDragging = false;
                devPanel.style.transition = '';
                document.body.style.cursor = 'default';
            }
        });
        
    }, 500); // Wait 500ms for DOM to be fully ready
}

// Initialize drag functionality
makeDraggable();

 