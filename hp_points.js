/**
 * HP and Points Manager
 * Handles all player stats (HP and Points) in one centralized place
 */
class HPPointsManager {
    constructor() {
        this.defaultHP = 100;
        this.defaultPoints = 0;
        this.currentHP = this.defaultHP;
        this.currentPoints = this.defaultPoints;
    }

    /**
     * Initialize HP and Points displays
     */
    initialize() {
        this.updateDisplay();

    }

    /**
     * Get current HP value
     */
    getHP() {
        return this.currentHP;
    }

    /**
     * Get current Points value
     */
    getPoints() {
        return this.currentPoints;
    }

    /**
     * Set HP to specific value
     */
    setHP(value) {
        this.currentHP = Math.max(0, Math.min(100, value)); // Clamp between 0-100
        this.updateDisplay();

    }

    /**
     * Set Points to specific value
     */
    setPoints(value) {
        this.currentPoints = Math.max(0, value); // Points can't go below 0
        this.updateDisplay();

    }

    /**
     * Add points (positive or negative)
     */
    addPoints(amount) {
        this.currentPoints = Math.max(0, this.currentPoints + amount);
        this.updateDisplaySmooth();

    }

    /**
     * Add HP (positive or negative)
     */
    addHP(amount) {
        this.currentHP = Math.max(0, Math.min(100, this.currentHP + amount));
        this.updateDisplaySmooth();

    }

    /**
     * Reset to default values
     */
    reset() {
        this.currentHP = this.defaultHP;
        this.currentPoints = this.defaultPoints;
        this.updateDisplay();

    }

    /**
     * Update the display elements
     */
    updateDisplay() {
        const hpDisplay = document.getElementById('hpDisplay');
        const pointsDisplay = document.getElementById('pointsDisplay');

        if (hpDisplay) {
            hpDisplay.textContent = this.currentHP.toString();
        }

        if (pointsDisplay) {
            pointsDisplay.textContent = this.currentPoints.toString();
        }
    }

    /**
     * Update the display elements smoothly (only numbers, not labels)
     */
    updateDisplaySmooth() {
        const hpDisplay = document.getElementById('hpDisplay');
        const pointsDisplay = document.getElementById('pointsDisplay');

        if (hpDisplay) {
            this.animateNumberChange(hpDisplay, this.currentHP);
        }

        if (pointsDisplay) {
            this.animateNumberChange(pointsDisplay, this.currentPoints);
        }
    }

    /**
     * Animate number change smoothly
     */
    animateNumberChange(element, targetValue) {
        const currentValue = parseInt(element.textContent) || 0;
        const difference = targetValue - currentValue;
        
        
        
        if (difference === 0) return; // No change needed
        
        const duration = 800; // 0.8 seconds
        const steps = 20;
        const stepValue = difference / steps;
        const stepTime = duration / steps;
        
        let currentStep = 0;
        
        const animate = () => {
            currentStep++;
            const newValue = Math.round(currentValue + (stepValue * currentStep));
            
            // Ensure we don't exceed the target
            if ((difference > 0 && newValue >= targetValue) || 
                (difference < 0 && newValue <= targetValue)) {
                element.textContent = targetValue.toString();
                return;
            }
            
            element.textContent = newValue.toString();
            
            if (currentStep < steps) {
                setTimeout(animate, stepTime);
            }
        };
        
        animate();
    }

    /**
     * Get points as string for tweet
     */
    getPointsForTweet() {
        return this.currentPoints.toString();
    }

    /**
     * Check if player is alive (HP > 0)
     */
    isAlive() {
        return this.currentHP > 0;
    }
}

// Export for use in other files
export default HPPointsManager; 