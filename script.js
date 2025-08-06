/**
 * Windows 2000s UI Manager
 * Professional Windows-style interface with desktop icons and windows
 * 
 * @author 0xArtix
 * @version 1.0.0
 */

// Import HP/Points Manager
import HPPointsManager from './hp_points.js';

class WindowsUIManager {
    constructor() {
        this.isWindowDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.activeWindows = new Set();
        this.scenes = {};
        this.hpPointsManager = new HPPointsManager();
        this.visitedScenes = new Set(); // Track visited scenes
        this.currentScene = null; // Track current scene for dev buttons
        this.gameMusic = null; // Game background music
        this.isMuted = false; // Global mute state
        this.openApplications = new Set(); // Track open applications
        
        // Calculate responsive scaling for 1920x1080 baseline
        this.calculateResponsiveScale();
        
        // Update scale on window resize
        window.addEventListener('resize', () => {
            this.calculateResponsiveScale();
        });
        
        this.initializeUI();
        this.initializeScenes();
    }
    


    /**
     * Calculate responsive scaling for 1920x1080 baseline
     * Mobile gets special handling with no scaling
     */
    calculateResponsiveScale() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Base window size (800x600) for 1920x1080
        const baseWindowWidth = 800;
        const baseWindowHeight = 600;
        
        // Calculate scale factors
        const scaleX = Math.min(viewportWidth / baseWindowWidth, 1.2); // Max 120% on large screens
        const scaleY = Math.min(viewportHeight / baseWindowHeight, 1.2);
        
        // Use the smaller scale to maintain proportions
        const scale = Math.min(scaleX, scaleY, 0.8); // Min 80% on small screens
        
        // Apply scale to all windows
        document.documentElement.style.setProperty('--window-scale', scale);
    }
    
    /**
     * Initialize the Windows UI system
     */
    initializeUI() {
        this.setupWindowDragging();
        this.setupWindowControls();
        this.setupStartButton();
        this.setupDesktopIcons();
        this.setupMenuItems();
        this.setupTaskbarIcons();
        
        // Initialize HP/Points Manager
        this.hpPointsManager.initialize();
        
        // Initialize game music
        this.initializeGameMusic();
        
        // Debug setup for all devices
        this.debugSetup();
    }
    
    /**
     * Debug setup - helps identify issues on all devices
     */
    debugSetup() {
        console.log('=== UI DEBUG ===');
        console.log('Window size:', window.innerWidth, 'x', window.innerHeight);
        console.log('Desktop element:', document.querySelector('.desktop'));
        console.log('Game window:', document.getElementById('gameWindow'));
        console.log('Start screen container:', document.querySelector('.start-screen-container'));
        console.log('Start video:', document.querySelector('.start-screen-video'));
        console.log('Play button:', document.getElementById('playButton'));
    }
    
    /**
     * Initialize game background music
     */
    initializeGameMusic() {
        this.gameMusic = document.getElementById('gameMusic');
        if (this.gameMusic) {
            // Set volume to a reasonable level
            this.gameMusic.volume = 0.3;
            console.log('Game music initialized');
        }
    }
    
    /**
     * Start game background music
     */
    startGameMusic() {
        if (this.gameMusic) {
            this.gameMusic.play().then(() => {
                console.log('Game music started');
            }).catch(error => {
                console.log('Could not start music (user interaction required):', error);
            });
        }
    }
    
    /**
     * Stop game background music
     */
    stopGameMusic() {
        if (this.gameMusic) {
            this.gameMusic.pause();
            this.gameMusic.currentTime = 0;
            console.log('Game music stopped');
        }
    }
    
    /**
     * Toggle global mute for all audio
     */
    toggleGlobalMute() {
        this.isMuted = !this.isMuted;
        
        // Mute/unmute game music
        if (this.gameMusic) {
            this.gameMusic.muted = this.isMuted;
        }
        
        // Mute/unmute Metin2 music
        const metin2Audio = document.getElementById('metin2Audio');
        if (metin2Audio) {
            metin2Audio.muted = this.isMuted;
        }
        
        // Update volume icon
        this.updateVolumeIcon();
        
        console.log(this.isMuted ? 'All audio muted' : 'All audio unmuted');
    }
    
    /**
     * Update volume icon appearance
     */
    updateVolumeIcon() {
        const volumeIcon = document.querySelector('.tray-item[data-action="volume"]');
        if (volumeIcon) {
            volumeIcon.textContent = this.isMuted ? '🔇' : '🔊';
        }
    }
    
    /**
     * Show current time
     */
    showCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        alert(`Current Time: ${timeString}`);
    }
    
    /**
     * Show WiFi status
     */
    showWiFiStatus() {
        // Simple WiFi status indicator
        const isOnline = navigator.onLine;
        const wifiStrength = Math.floor(Math.random() * 3) + 1; // Random 1-3
        
        let statusMessage = isOnline ? 
            `WiFi Connected\nSignal Strength: ${'▌'.repeat(wifiStrength)}${'▌'.repeat(3-wifiStrength).replace(/▌/g, '▍')}\nStatus: Excellent` :
            'WiFi Disconnected\nPlease check your connection';
            
        alert(statusMessage);
    }
    
    /**
     * Show system performance warning dialog
     */
    showSystemWarning(appName) {
        const warnings = [
            {
                title: "System Performance Warning",
                message: `💻 Computer is lagging!\n\n🔴 Insufficient RAM (512 MB in use)\n⚠️ ${appName} is already running\n\n💡 Please close the open application first`,
                icon: "⚠️"
            },
            {
                title: "CPU Overload",
                message: `🔥 Processor at 95% usage!\n\n📊 ${appName} is already active\n🚫 Cannot launch new instance\n\n🔧 Check system resources`,
                icon: "🔥"
            },
            {
                title: "Memory Error",
                message: `🧠 RAM capacity exceeded!\n\n📈 ${appName} is already using memory\n⛔ Cannot start additional process\n\n💾 Close existing applications`,
                icon: "🧠"
            }
        ];
        
        const randomWarning = warnings[Math.floor(Math.random() * warnings.length)];
        
        // Create custom warning dialog
        const warningDialog = document.createElement('div');
        warningDialog.className = 'system-warning-dialog';
        warningDialog.innerHTML = `
            <div class="warning-content">
                <div class="warning-header">
                    <span class="warning-icon">${randomWarning.icon}</span>
                    <span class="warning-title">${randomWarning.title}</span>
                    <button class="warning-close" onclick="this.closest('.system-warning-dialog').remove()">✕</button>
                </div>
                <div class="warning-body">
                    <div class="warning-message">${randomWarning.message}</div>
                    <div class="warning-buttons">
                        <button class="warning-btn primary" onclick="this.closest('.system-warning-dialog').remove()">
                            OK
                        </button>
                        <button class="warning-btn secondary" onclick="this.closest('.system-warning-dialog').remove()">
                            Task Manager
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(warningDialog);
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (warningDialog.parentElement) {
                warningDialog.remove();
            }
        }, 8000);
    }
    
    /**
     * Setup window dragging functionality for all windows
     */
    setupWindowDragging() {
        const titleBars = document.querySelectorAll('.title-bar');
        
        titleBars.forEach(titleBar => {
            const window = titleBar.closest('.window');
            
            titleBar.addEventListener('mousedown', (e) => {
                this.isWindowDragging = true;
                const rect = window.getBoundingClientRect();
                this.dragOffset.x = e.clientX - rect.left;
                this.dragOffset.y = e.clientY - rect.top;
                
                document.body.style.cursor = 'move';
            });
        });
        
        document.addEventListener('mousemove', (e) => {
            if (this.isWindowDragging) {
                const activeWindow = document.querySelector('.window[style*="display: flex"]');
                if (activeWindow) {
                    const x = e.clientX - this.dragOffset.x;
                    const y = e.clientY - this.dragOffset.y;
                    
                    // Keep window within viewport bounds
                    const maxX = window.innerWidth - activeWindow.offsetWidth;
                    const maxY = window.innerHeight - activeWindow.offsetHeight;
                    
                    const clampedX = Math.max(0, Math.min(x, maxX));
                    const clampedY = Math.max(0, Math.min(y, maxY));
                    
                    activeWindow.style.left = clampedX + 'px';
                    activeWindow.style.top = clampedY + 'px';
                    activeWindow.style.transform = 'none';
                }
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (this.isWindowDragging) {
                this.isWindowDragging = false;
                document.body.style.cursor = 'default';
            }
        });
    }
    
    /**
     * Setup window control buttons for all windows
     */
    setupWindowControls() {
        const allWindows = document.querySelectorAll('.window');
        
        allWindows.forEach(window => {
            const minimizeBtn = window.querySelector('.window-button.minimize');
            const maximizeBtn = window.querySelector('.window-button.maximize');
            const closeBtn = window.querySelector('.window-button.close');
            
            if (minimizeBtn) {
                minimizeBtn.addEventListener('click', () => {
                    this.minimizeWindow(window);
                });
            }
            
            if (maximizeBtn) {
                maximizeBtn.addEventListener('click', () => {
                    this.toggleMaximizeWindow(window);
                });
            }
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeWindow(window);
                });
            }
        });
    }
    
    /**
     * Setup taskbar system tray icons
     */
    setupTaskbarIcons() {
        const trayItems = document.querySelectorAll('.tray-item');
        
        trayItems.forEach(item => {
            const action = item.getAttribute('data-action');
            
            item.addEventListener('click', () => {
                switch(action) {
                    case 'volume':
                        this.toggleGlobalMute();
                        break;
                    case 'clock':
                        this.showCurrentTime();
                        break;
                    case 'wifi':
                        this.showWiFiStatus();
                        break;
                }
            });
        });
    }
    
    /**
     * Setup start button functionality
     */
    setupStartButton() {
        const startButton = document.querySelector('.start-button');
        
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.showStartMenu();
            });
        }
    }
    
    /**
     * Setup desktop icon interactions
     */
    setupDesktopIcons() {
        const desktopIcons = document.querySelectorAll('.desktop-icon');
        
        desktopIcons.forEach(icon => {
            icon.addEventListener('dblclick', () => {
                this.handleDesktopIconDoubleClick(icon);
            });
        });
        
        // Setup play button functionality
        this.setupPlayButton();
        
        // Setup development button
        this.setupDevButton();
    }
    
    /**
     * Setup menu bar interactions
     */
    setupMenuItems() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                this.handleMenuClick(item);
            });
        });
    }
    
    /**
     * Handle desktop icon double clicks
     */
    handleDesktopIconDoubleClick(icon) {
        const iconText = icon.querySelector('.icon-text').textContent;
        const url = icon.getAttribute('data-url');
        const error = icon.getAttribute('data-error');
        
        if (url) {
            // Open Twitter link in new tab
            window.open(url, '_blank');
        } else if (error) {
            // Show error dialog
            this.showErrorDialog(error, iconText);
        } else if (iconText === 'AIR Dungeon') {
            // Open the game window
            this.openGameWindow();
        } else if (iconText === 'Metin2') {
            // Open the Metin2 window
            this.openMetin2Window();
        }
    }
    
    /**
     * Open the game window
     */
    openGameWindow() {
        // Check if game is already open
        if (this.openApplications.has('AIR Dungeon Crawler')) {
            this.showSystemWarning('AIR Dungeon Crawler');
            return;
        }
        
        const gameWindow = document.getElementById('gameWindow');
        this.openWindow(gameWindow);
        
        // Track that game is now open
        this.openApplications.add('AIR Dungeon Crawler');
        
        // Start game music when opening the game
        this.startGameMusic();
        
        // Adjust window size for start screen on mobile
        this.adjustStartScreenWindowSize();
    }
    
    /**
     * Open the X window
     */
    openXWindow() {
        const xWindow = document.getElementById('xWindow');
        this.openWindow(xWindow);
    }
    
    /**
     * Open the Metin2 window
     */
    openMetin2Window() {
        // Check if Metin2 is already open
        if (this.openApplications.has('Metin2')) {
            this.showSystemWarning('Metin2');
            return;
        }
        
        const metin2Window = document.getElementById('metin2Window');
        this.openWindow(metin2Window);
        
        // Track that Metin2 is now open
        this.openApplications.add('Metin2');
        
        // Adjust window aspect ratio on mobile to match banner image
        this.adjustMetin2WindowAspectRatio();
        
        // Setup Metin2 music controls
        this.setupMetin2MusicControls();
    }
    
    /**
     * Generic window opening with animation
     */
    openWindow(window) {
        window.style.display = 'flex';
        window.style.opacity = '0';
        window.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        // Animate window opening
        setTimeout(() => {
            window.style.transition = 'all 0.3s ease';
            window.style.opacity = '1';
            window.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
        
        this.activeWindows.add(window);
        this.addTaskbarItem(window);
    }
    
        /**
     * Minimize window animation
     */
    minimizeWindow(targetWindow) {
        targetWindow.style.transition = 'all 0.3s ease';
        targetWindow.style.transform = 'scale(0.1) translateY(100vh)';
        targetWindow.style.opacity = '0';
        
        setTimeout(() => {
            targetWindow.style.display = 'none';
            targetWindow.style.transform = 'scale(1) translateY(0)';
            targetWindow.style.opacity = '1';
        }, 300);
        
        // Keep the window in activeWindows and taskbar - just hide it
        this.activeWindows.add(targetWindow);
    }

    /**
     * Toggle maximize/restore window
     */
    toggleMaximizeWindow(targetWindow) {
        const maximizeBtn = targetWindow.querySelector('.window-button.maximize');
        
        // Check if window is currently maximized
        const isMaximized = targetWindow.classList.contains('maximized');
        
        if (isMaximized) {
            // Restore to original size
            targetWindow.classList.remove('maximized');
            targetWindow.style.width = '';
            targetWindow.style.height = '';
            targetWindow.style.top = '';
            targetWindow.style.left = '';
            targetWindow.style.transform = '';
            maximizeBtn.innerHTML = '□'; // Square icon for maximize
        } else {
            // Maximize window
            targetWindow.classList.add('maximized');
            targetWindow.style.width = '100vw';
            targetWindow.style.height = '100vh';
            targetWindow.style.top = '0';
            targetWindow.style.left = '0';
            targetWindow.style.transform = 'none';
            maximizeBtn.innerHTML = '❐'; // Double square icon for restore
        }
    }



    
    /**
     * Close window with confirmation
     */
    closeWindow(targetWindow) {
        const windowTitle = targetWindow.querySelector('.window-title').textContent;
        const result = confirm(`Are you sure you want to close ${windowTitle}?`);
        
        if (result) {
            // Stop Metin2 music if closing Metin2 window
            if (windowTitle === 'Metin2') {
                const audio = document.getElementById('metin2Audio');
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
            
            // Stop game music if closing game window
            if (windowTitle === 'AIR Dungeon Crawler') {
                this.stopGameMusic();
            }
            
            // Remove from open applications tracking
            this.openApplications.delete(windowTitle);
            
            targetWindow.style.transition = 'all 0.3s ease';
            targetWindow.style.transform = 'scale(0.1)';
            targetWindow.style.opacity = '0';
            
            setTimeout(() => {
                targetWindow.style.display = 'none';
            }, 300);
            
            this.activeWindows.delete(targetWindow);
            this.removeTaskbarItem(targetWindow);
        }
    }
    
    /**
     * Show start menu (simulated)
     */
    showStartMenu() {
        this.showNotification('Start Menu', "Don't start");
    }
    
    /**
     * Handle menu item clicks
     */
    handleMenuClick(menuItem) {
        const menuText = menuItem.textContent;
        this.showNotification('Menu', `${menuText} menu would appear here.`);
    }
    
    /**
     * Show Windows-style error dialog
     */
    showErrorDialog(errorMessage, appName) {
        const errorDialog = document.createElement('div');
        errorDialog.className = 'windows-error-dialog';
        errorDialog.innerHTML = `
            <div class="error-header">
                <div class="error-icon">⚠️</div>
                <div class="error-title">${appName}</div>
            </div>
            <div class="error-message">${errorMessage}</div>
            <div class="error-buttons">
                <button class="error-button primary">Retry</button>
                <button class="error-button secondary">Cancel</button>
            </div>
        `;
        
        // Add styles
        errorDialog.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ececec;
            border: 2px outset #d0d0d0;
            padding: 20px;
            min-width: 350px;
            z-index: 10000;
            box-shadow: 4px 4px 8px rgba(0,0,0,0.3);
        `;
        
        // Add to page
        document.body.appendChild(errorDialog);
        
        // Setup button handlers
        const retryBtn = errorDialog.querySelector('.error-button.primary');
        const cancelBtn = errorDialog.querySelector('.error-button.secondary');
        
        retryBtn.addEventListener('click', () => {
            document.body.removeChild(errorDialog);
            this.showErrorDialog(errorMessage, appName); // Show error again
        });
        
        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(errorDialog);
        });
    }
    
    /**
     * Add taskbar item for a window
     */
    addTaskbarItem(window) {
        const taskbarItems = document.getElementById('taskbarItems');
        const windowTitle = window.querySelector('.window-title').textContent;
        const windowIcon = window.querySelector('.window-icon').textContent;
        
        // Get short title for mobile
        const isMobile = window.innerWidth <= 768;
        let displayTitle = windowTitle;
        
        if (isMobile) {
            // Short titles for mobile taskbar
            if (windowTitle === 'AIR Dungeon Crawler') {
                displayTitle = 'ADC';
            } else if (windowTitle === 'Metin2') {
                displayTitle = 'M2';
            } else if (windowTitle === 'X (Twitter)') {
                displayTitle = 'X';
            }
        }
        
        const taskbarItem = document.createElement('div');
        taskbarItem.className = 'taskbar-item active';
        taskbarItem.dataset.windowId = window.id;
        taskbarItem.innerHTML = `
            <div class="taskbar-icon">${windowIcon}</div>
            <span>${displayTitle}</span>
        `;
        
        // Add click handler to restore/focus window
        taskbarItem.addEventListener('click', () => {
            this.restoreWindow(window);
        });
        
        taskbarItems.appendChild(taskbarItem);
    }
    
    /**
     * Remove taskbar item for a window
     */
    removeTaskbarItem(window) {
        const taskbarItems = document.getElementById('taskbarItems');
        const taskbarItem = taskbarItems.querySelector(`[data-window-id="${window.id}"]`);
        
        if (taskbarItem) {
            taskbarItem.remove();
        }
    }
    
    /**
     * Restore a minimized window
     */
    restoreWindow(window) {
        // Show the window again
        window.style.display = 'flex';
        window.style.opacity = '0';
        window.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        // Animate window restoration
        setTimeout(() => {
            window.style.transition = 'all 0.3s ease';
            window.style.opacity = '1';
            window.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
        
        // Bring window to front
        const allWindows = document.querySelectorAll('.window');
        allWindows.forEach(w => {
            w.style.zIndex = '100';
        });
        window.style.zIndex = '101';
    }
    
    /**
     * Setup play button functionality
     */
    setupPlayButton() {
        const playButton = document.getElementById('playButton');
        const startVideo = document.querySelector('.start-screen-video');
        
        if (playButton && startVideo) {
            // Ensure video shows first frame on mobile
            this.ensureVideoFirstFrame(startVideo);
            
            playButton.addEventListener('click', () => {
                this.handlePlayButtonClick(playButton, startVideo);
            });
        }
    }
    
    /**
     * Ensure video shows first frame on mobile devices
     */
    ensureVideoFirstFrame(startVideo) {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Force load video metadata and first frame
            startVideo.load(); // Reload video to ensure proper loading
            
            // Set current time to 0 to show first frame
            startVideo.addEventListener('loadedmetadata', () => {
                startVideo.currentTime = 0.1; // Slightly forward to ensure frame shows
                console.log('📱 Mobile: Video metadata loaded, showing first frame');
            });
            
            // Alternative method - seek to first frame when data is available
            startVideo.addEventListener('loadeddata', () => {
                if (startVideo.currentTime === 0) {
                    startVideo.currentTime = 0.1;
                }
                console.log('📱 Mobile: Video data loaded, frame should be visible');
            });
            
            // Fallback - try to load first frame after a short delay
            setTimeout(() => {
                if (startVideo.readyState >= 2) { // HAVE_CURRENT_DATA
                    startVideo.currentTime = 0.1;
                    console.log('📱 Mobile: Fallback frame load attempt');
                }
            }, 1000);
        }
    }
    
    /**
     * Handle play button click
     */
    handlePlayButtonClick(playButton, startVideo) {
        // Play click sound
        this.playClickSound();
        
        // Ensure video attributes for mobile inline play
        startVideo.setAttribute('playsinline', 'true');
        startVideo.setAttribute('webkit-playsinline', 'true');
        startVideo.muted = true; // Ensure muted for autoplay policies
        
        // Prevent default mobile video player behavior (mobile only)
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            startVideo.addEventListener('fullscreenchange', (e) => {
                e.preventDefault();
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
            });
            
            startVideo.addEventListener('webkitfullscreenchange', (e) => {
                e.preventDefault();
                if (document.webkitFullscreenElement) {
                    document.webkitExitFullscreen();
                }
            });
        }
        
        // Start the video with promise handling for mobile
        const playPromise = startVideo.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('✅ Video started playing successfully');
                    // Hide the play button only after successful play
                    playButton.style.display = 'none';
                    playButton.style.pointerEvents = 'none';
                })
                .catch(error => {
                    console.warn('⚠️ Video play failed:', error);
                    // Still hide button even if play fails
                    playButton.style.display = 'none';
                    playButton.style.pointerEvents = 'none';
                    // Start game immediately if video fails
                    setTimeout(() => this.startGame(), 500);
                });
        } else {
            // Fallback for older browsers
            playButton.style.display = 'none';
            playButton.style.pointerEvents = 'none';
        }
        
        // Listen for video end to transition to first scene
        startVideo.addEventListener('ended', () => {
            this.startGame();
        });
        
        // Also add a timeout as fallback (5 seconds)
        setTimeout(() => {
            if (startVideo.currentTime > 0) {
                this.startGame();
            }
        }, 5000);
    }
    
    /**
     * Start the interactive game after video ends
     */
    startGame() {
        // Hide video and show game UI
        const startVideo = document.querySelector('.start-screen-video');
        const startContainer = document.querySelector('.start-screen-container');
        const gameWindow = document.getElementById('gameWindow');
        
        if (startVideo && startContainer) {
            startVideo.style.display = 'none';
            
            // Remove start screen class for normal sizing
            if (gameWindow) {
                gameWindow.classList.remove('start-screen-active');
            }
            

            
            // SCENE 1: Load scene1 with default configuration
            this.showGameScene('scene1');
        }
    }
    

    
    /**
     * Scene configurations - Loaded from separate files
     */
    scenes = {};
    
    /**
     * Initialize scenes from separate files
     */
    async initializeScenes() {
        try {
            const { scenes: importedScenes } = await import('./scenes/index.js');
            this.scenes = importedScenes;
        } catch (error) {
            console.error('❌ Failed to load scenes:', error);
            // Fallback to inline scenes if modules fail
            this.scenes = {
                scene1: {
                    id: 'scene1',
                    image: 'scene1.png',
                    questionImage: 'scene1_question.png',
                    description: 'What will you do?',
                    choices: [
                        { text: 'Go Forward', action: 'go_forward' },
                        { text: 'Go Back', action: 'go_back' }
                    ],
                    questionPosition: { left: '40%', top: '55%' },
                    buttonPosition: { left: '21.5%', bottom: '12%' },
                    buttonOpacity: '1',
                    questionDelay: 1000,
                    buttonSpacing: '10px'
                },
                scene2: {
                    id: 'scene2',
                    image: 'scene2.png',
                    questionImage: 'scene2_question.png',
                    description: 'You move forward into the unknown...',
                    choices: [
                        { text: 'Go Forward', action: 'go_forward_scene2' },
                        { text: 'Go Back', action: 'go_back_scene2' }
                    ],
                    questionPosition: { left: '90%', top: '55%' },
                    buttonPosition: { left: '71.5%', bottom: '12%' },
                    buttonOpacity: '1',
                    questionDelay: 1000,
                    buttonSpacing: '10px'
                },
                gameOver: {
                    id: 'gameOver',
                    image: 'game-over.jpg',
                    questionImage: 'gameover_question.png',
                    description: 'Game Over - You chose to go back...',
                    choices: [
                        { text: 'Try Again', action: 'restart' },
                        { text: 'Tweet', action: 'tweet' }
                    ],
                    questionPosition: { left: '40%', top: '55%' },
                    buttonPosition: { left: '21.5%', bottom: '12%' },
                    buttonOpacity: '0.8',
                    questionDelay: 1000,
                    buttonSpacing: '10px'
                }
            };
        }
    }
    
    /**
     * Show a game scene with choices
     */
    showGameScene(sceneName) {
        // CRITICAL: Calculate responsive scale BEFORE any scene rendering
        this.calculateResponsiveScale();
        
        // Check if we have a current scene image for smooth transition
        const currentSceneImage = document.querySelector('.scene-image');
        
        if (currentSceneImage && this.currentScene && this.currentScene !== 'startScreen') {
            // Smooth transition between scenes
            this.smoothTransitionToScene(sceneName);
        } else {
            // Direct render for first scene or when no current scene image
            this.renderScene(sceneName);
        }
    }
    
    renderScene(sceneName) {
        const scene = this.scenes[sceneName];
        if (!scene) {
            console.error(`Scene "${sceneName}" not found!`);
            return;
        }
        
        // Update current scene and dev buttons
        this.currentScene = sceneName;
        this.updateDevButtons();
        
        // Adjust window aspect ratio for mobile based on scene image
        this.adjustWindowAspectRatio(scene);
        
        // Special handling for startScreen
        if (sceneName === 'startScreen') {
            this.showStartScreen();
            return;
        }
        
        // Show custom dialog (all scenes now use custom dialog)
        this.showCustomDialog(scene);
        }
    
    /**
     * Adjust window aspect ratio based on scene image for perfect mobile fit
     */
    adjustWindowAspectRatio(scene) {
        // Only apply on mobile
        if (window.innerWidth > 768) return;
        
        const gameWindow = document.getElementById('gameWindow');
        if (!gameWindow || !scene.image) return;
        
        // Create temporary image to get natural dimensions
        const tempImg = new Image();
        tempImg.onload = () => {
            const imageAspectRatio = tempImg.naturalWidth / tempImg.naturalHeight;
            
            // Use larger viewport area for better scene visibility
            const maxViewportUsage = 0.8; // Use up to 80% of viewport
            const maxWidth = 80; // 80vw
            const maxHeight = 80; // 80vh
            
            let windowWidth, windowHeight;
            
            // Calculate exact dimensions for perfect aspect ratio match
            // Try width-first approach
            windowWidth = maxWidth;
            windowHeight = windowWidth / imageAspectRatio;
            
            // If height exceeds limit, use height-first approach  
            if (windowHeight > maxHeight) {
                windowHeight = maxHeight;
                windowWidth = windowHeight * imageAspectRatio;
            }
            
            // Ensure window aspect ratio EXACTLY matches image aspect ratio
            const finalAspectRatio = windowWidth / windowHeight;
            if (Math.abs(finalAspectRatio - imageAspectRatio) > 0.01) {
                // Force exact match - prioritize larger dimension
                if (imageAspectRatio > 1) {
                    // Landscape - width priority
                    windowHeight = windowWidth / imageAspectRatio;
                } else {
                    // Portrait - height priority  
                    windowWidth = windowHeight * imageAspectRatio;
                }
            }
            
            // Apply the calculated dimensions with !important to override CSS
            gameWindow.style.setProperty('width', `${windowWidth}vw`, 'important');
            gameWindow.style.setProperty('height', `${windowHeight}vh`, 'important');
            
            console.log(`Scene ${scene.id}: Adjusted window to ${windowWidth.toFixed(1)}vw x ${windowHeight.toFixed(1)}vh (aspect ratio: ${imageAspectRatio.toFixed(2)})`);
        };
        
        // Add error handling
        tempImg.onerror = () => {
            console.warn(`Could not load image for scene ${scene.id}: ${scene.image}`);
        };
        
        // Load the scene image to get dimensions
        tempImg.src = scene.image;
    }
    
    /**
     * Dynamically adjust Metin2 window aspect ratio on mobile to match banner image
     */
    adjustMetin2WindowAspectRatio() {
        // Only apply on mobile
        if (window.innerWidth > 768) return;
        
        const metin2Window = document.getElementById('metin2Window');
        if (!metin2Window) return;
        
        // For Metin2, we need to account for both banner image AND music controls
        // Set a good default size that accommodates both elements
        const windowWidth = 70; // 70vw - slightly smaller than game
        const windowHeight = 60; // 60vh - accommodate music controls + banner
        
        // Apply the dimensions with !important to override CSS
        metin2Window.style.setProperty('width', `${windowWidth}vw`, 'important');
        metin2Window.style.setProperty('height', `${windowHeight}vh`, 'important');
        
        console.log(`Metin2 Window: Set to ${windowWidth}vw x ${windowHeight}vh to fit music controls + banner`);
    }
    
    /**
     * Smooth transition to any scene
     */
    smoothTransitionToScene(sceneName) {
        const sceneImage = document.querySelector('.scene-image');
        
        if (sceneImage) {
            // Fade out current scene image
            sceneImage.classList.add('fade-out');
            
            // After fade out, show new scene
            setTimeout(() => {
                this.renderScene(sceneName);
                
                // Yeni sahne hemen görünmez yap ve fade in başlat
                const newSceneImage = document.querySelector('.scene-image');
                if (newSceneImage) {
                    // Hemen görünmez yap (render anında)
                    newSceneImage.style.opacity = '0';
                    newSceneImage.classList.remove('fade-out');
                    
                    // Hemen fade in başlat (gecikme yok)
                    requestAnimationFrame(() => {
                        newSceneImage.classList.add('fade-in');
                        
                        // Animasyon bitince class'ı temizle
                        setTimeout(() => {
                            newSceneImage.classList.remove('fade-in');
                            newSceneImage.style.opacity = ''; // Style'ı temizle
                        }, 500);
                    });
                }
            }, 500);
        } else {
            // Fallback if no scene image
            this.renderScene(sceneName);
        }
    }
    
    /**
     * Smooth transition to start screen
     */
    smoothTransitionToStartScreen() {
        const sceneImage = document.querySelector('.scene-image');
        if (sceneImage) {
            // Fade out current scene image
            sceneImage.classList.add('fade-out');
            
            // After fade out, show start screen
            setTimeout(() => {
                this.showStartScreen();
                
                // Fade in start screen
                const startContainer = document.querySelector('.start-screen-container');
                if (startContainer) {
                    startContainer.style.opacity = '0';
                    startContainer.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        startContainer.style.opacity = '1';
                    }, 50);
                }
            }, 500);
        } else {
            // Fallback if no scene image
            this.showStartScreen();
        }
    }

    /**
     * Show custom dialog for scenes
     */
    showCustomDialog(scene) {
        const windowContent = document.querySelector('#gameWindow .window-content');
        
        if (windowContent) {
            // Create game UI with ONLY custom dialog system
            windowContent.innerHTML = `
                <div class="game-container">
                    <!-- HP and Points Display -->
                    <div class="game-stats">
                        <div class="stat-item">
                            <span class="stat-label">HP:</span>
                            <span class="stat-value" id="hpDisplay">${this.hpPointsManager.getHP()}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Points:</span>
                            <span class="stat-value" id="pointsDisplay">${this.hpPointsManager.getPoints()}</span>
                        </div>
                    </div>
                    
                    <!-- Scene Image -->
                    <div class="scene-container" data-scene="${scene.id}">
                        <img src="${scene.image}" alt="Game Scene" class="scene-image fade-in">
                        ${scene.typewriterText && scene.typewriterText.enabled ? `
                            <div class="gameover-text">${scene.typewriterText.text}</div>
                        ` : ''}
                    </div>
                    

                    
                    <!-- CUSTOM DIALOG ONLY -->
                    <div class="custom-dialog" id="customDialog" data-scene="${scene.id}" style="display: flex;">
                        <div class="dialog-question">
                            ${scene.customDialog.questionPrefixIcon && scene.id !== 'scene4' && scene.id !== 'scene5' && scene.id !== 'scene8' && scene.id !== 'scene9_1' && scene.id !== 'scene10' && scene.id !== 'truescene' && scene.id !== 'falsescene' ? 
                                scene.id === 'scene3' ? 
                                    `<span class="question-prefix-icon">${scene.customDialog.questionPrefixIcon.content}</span>` :
                                    scene.id === 'scene4_1' ? 
                                        `<span class="question-prefix-icon" style="background-image: url('skull.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"></span>` :
                                        scene.id === 'scene5' ? 
                                            `<span class="question-prefix-icon" style="background-image: url('hp_pot.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"></span>` :
                                        scene.id === 'scene7' ? 
                                            `<span class="question-prefix-icon" style="background-image: url('skull.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"></span>` :
                                        scene.id === 'scene8' ? 
                                            `<span class="question-prefix-icon" style="background-image: url('coin.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"></span>` :
                                        scene.id === 'scene9' ? 
                                            `<span class="question-prefix-icon" style="background-image: url('ghost.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"></span>` :
                                        scene.id === 'scene9_1' ? 
                                            `<span class="question-prefix-icon" style="background-image: url('skull2.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"></span>` :
                                        scene.id === 'scene10' ? 
                                            `<span class="question-prefix-icon" style="background-image: url('trap.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"></span>` :
                                        scene.id === 'truescene' ? 
                                            `<span class="question-prefix-icon" style="background-image: url('checkmark.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"></span>` :
                                        scene.id === 'falsescene' ? 
                                            `<span class="question-prefix-icon" style="background-image: url('false.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"></span>` :
                                        scene.id === 'scene12' ? 
                                            `<span class="question-prefix-icon" style="background-image: url('questionmark.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"></span>` :
                                        scene.id === 'exitscene' ? 
                                            `<span class="question-prefix-icon" style="background-image: url('ladder.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"></span>` :
                                            `<span class="question-prefix-icon">${scene.customDialog.questionPrefixIcon.content}</span>`
                                : ''
                            }
                            ${scene.customDialog.question}
                        </div>
                        <div class="dialog-buttons">
                            ${scene.customDialog.buttons.map(button => `
                                <button class="custom-dialog-button" id="${button.id}" data-action="${button.action}">
                                    ${button.text}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            

            
            // Wait for scene image to load before showing dialog
            const sceneImage = document.querySelector('.scene-image');
            if (sceneImage) {
                sceneImage.onload = () => {
                    // Remove fade-in class after image loads
                    sceneImage.classList.remove('fade-in');
                    
                    // Apply custom styles after image loads
                    this.applyCustomDialogStyles(scene.customDialog, scene);
                    
                    // Show dialog with smooth animation (wait for scene fade in to complete)
                    setTimeout(() => {
                        const dialog = document.getElementById('customDialog');
                        if (dialog) {
                            dialog.classList.add('show');
                        }
                    }, 800); // 0.5s fade in + 0.3s extra delay
                    
                    // Setup dialog button handlers
                    this.setupCustomDialogButtons(scene);
                };
                
                // Fallback: If image is already loaded
                if (sceneImage.complete) {
                    // Remove fade-in class after image loads
                    sceneImage.classList.remove('fade-in');
                    
                    this.applyCustomDialogStyles(scene.customDialog, scene);
                    
                    // Show dialog with smooth animation
                    setTimeout(() => {
                        const dialog = document.getElementById('customDialog');
                        if (dialog) {
                            dialog.classList.add('show');
                        }
                    }, 300);
                    
                    this.setupCustomDialogButtons(scene);
                }
            }
        }
        
        // Process hpEffect when entering the scene
        if (scene.hpEffect) {
            console.log(`Scene ${scene.id}: Applying hpEffect ${scene.hpEffect}`);
            this.hpPointsManager.addHP(scene.hpEffect);
        }
    }
    
    /**
     * Apply custom dialog styles
     */
    applyCustomDialogStyles(dialogConfig) {
        const dialog = document.getElementById('customDialog');
        if (!dialog) return;
        
        // Apply dialog styles
        Object.assign(dialog.style, {
            position: 'absolute',
            zIndex: '1000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.6s ease',
            ...dialogConfig.position,
            ...dialogConfig.style
        });
        
        // Start with dialog hidden
        dialog.classList.remove('show');
        
        // Apply question text styles
        const questionElement = dialog.querySelector('.dialog-question');
        if (questionElement && dialogConfig.questionStyle) {
            Object.assign(questionElement.style, dialogConfig.questionStyle);
        }
        
        // Wait for fonts to load before showing dialog
        document.fonts.ready.then(() => {
            // Start monitoring dialog size and position every 0.1 seconds
            this.startDialogMonitoring();
        });
    }
    
    startDialogMonitoring() {
        const dialog = document.getElementById('customDialog');
        if (!dialog) return;
        
        // Clear any existing interval
        if (this.dialogMonitorInterval) {
            clearInterval(this.dialogMonitorInterval);
        }
        
        // Monitor every 100ms (0.1 seconds) for 3 seconds
        this.dialogMonitorInterval = setInterval(() => {
            if (dialog) {
                const rect = dialog.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(dialog);
                
                console.log('📏 Custom Dialog Monitor:', {
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    left: `${rect.left}px`,
                    top: `${rect.top}px`,
                    position: computedStyle.position,
                    display: computedStyle.display,
                    transform: computedStyle.transform,
                    scale: getComputedStyle(document.documentElement).getPropertyValue('--window-scale')
                });
            }
        }, 100);
        
        // Stop monitoring after 3 seconds
        setTimeout(() => {
            if (this.dialogMonitorInterval) {
                clearInterval(this.dialogMonitorInterval);
                console.log('⏹️ Dialog monitoring stopped after 3 seconds');
            }
        }, 3000);
    }
    
    /**
     * Apply custom dialog styles
     */
    applyCustomDialogStyles(dialogConfig, scene) {
        const dialog = document.getElementById('customDialog');
        if (!dialog) return;
        
        // Check if mobile
        const isMobile = window.innerWidth <= 768;
        
        // Mobile positioning override - use CSS positioning instead of scene config
        const positionOverride = isMobile ? {} : dialogConfig.position;
        
        // Apply dialog styles
        Object.assign(dialog.style, {
            position: 'absolute',
            zIndex: '1000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.6s ease',
            ...positionOverride,
            ...dialogConfig.style
        });
        
        // Start with dialog hidden
        dialog.classList.remove('show');
        
        // Replace {POINTS} placeholder with actual points and handle <br> tags
        const questionElement = dialog.querySelector('.dialog-question');
        if (questionElement && dialogConfig.question) {
            // Handle array questions (multiple lines)
            if (Array.isArray(dialogConfig.question)) {
                questionElement.innerHTML = ''; // Clear existing content
                
                // Create question wrapper
                const questionWrapper = document.createElement('div');
                questionWrapper.style.display = 'flex';
                questionWrapper.style.flexDirection = 'row';
                questionWrapper.style.alignItems = 'center';
                questionWrapper.style.gap = 'calc(6px * var(--window-scale, 1))';
                
                // Create icon div
                const iconDiv = document.createElement('div');
                if (dialogConfig.questionPrefixIcon) {
                    Object.assign(iconDiv.style, dialogConfig.questionPrefixIcon);
                }
                questionWrapper.appendChild(iconDiv);
                
                // Create text wrapper
                const textWrapper = document.createElement('div');
                textWrapper.style.display = 'flex';
                textWrapper.style.flexDirection = 'column';
                textWrapper.style.alignItems = 'center';
                textWrapper.style.textAlign = 'center';
                
                dialogConfig.question.forEach((line, index) => {
                    const lineEl = document.createElement('div');
                    lineEl.innerHTML = line;
                    lineEl.style.display = 'block';
                    lineEl.style.marginBottom = 'calc(5px * var(--window-scale, 1))';
                    
                    // Make second line (index 1) semi bold
                    if (index === 1) {
                        lineEl.style.fontFamily = 'BBManualMonoSemiBold, Arial, sans-serif';
                        lineEl.style.fontWeight = '600';
                    }
                    
                    // Special handling for Scene5 to make "+50 HP" semi bold
                    if (scene.id === 'scene5' && index === 1) {
                        lineEl.style.fontFamily = 'BBManualMonoSemiBold, Arial, sans-serif';
                        lineEl.style.fontWeight = '600';
                    }
                    
                    // Special handling for Scene8 to make "+150 points" semi bold
                    if (scene.id === 'scene8' && index === 1) {
                        lineEl.style.fontFamily = 'BBManualMonoSemiBold, Arial, sans-serif';
                        lineEl.style.fontWeight = '600';
                    }
                    
                    // Special handling for Scene9_1 to make "-100 HP" semi bold
                    if (scene.id === 'scene9_1' && index === 1) {
                        lineEl.style.fontFamily = 'BBManualMonoSemiBold, Arial, sans-serif';
                        lineEl.style.fontWeight = '600';
                    }
                    
                    // Special handling for Scene10 to make "-30 HP" semi bold
                    if (scene.id === 'scene10' && index === 1) {
                        lineEl.style.fontFamily = 'BBManualMonoSemiBold, Arial, sans-serif';
                        lineEl.style.fontWeight = '600';
                    }
                    
                    // Special handling for True scene to make "+200 points" semi bold
                    if (scene.id === 'truescene' && index === 1) {
                        lineEl.style.fontFamily = 'BBManualMonoSemiBold, Arial, sans-serif';
                        lineEl.style.fontWeight = '600';
                    }
                    
                    // Special handling for False scene to make "-200 points" semi bold
                    if (scene.id === 'falsescene' && index === 1) {
                        lineEl.style.fontFamily = 'BBManualMonoSemiBold, Arial, sans-serif';
                        lineEl.style.fontWeight = '600';
                    }
                    

                    
                    textWrapper.appendChild(lineEl);
                });
                
                questionWrapper.appendChild(textWrapper);
                questionElement.appendChild(questionWrapper);
            } else {
                let questionText = dialogConfig.question;
                
                // Replace {POINTS} placeholder
                if (questionText.includes('{POINTS}')) {
                    const currentPoints = this.hpPointsManager.getPoints();
                    questionText = questionText.replace('{POINTS}', currentPoints);
                }
                
                // Set the question text with HTML support
                questionElement.innerHTML = questionText;
            }
        }
        
        // Apply question text styles
        const questionElement2 = dialog.querySelector('.dialog-question');
        if (questionElement2 && dialogConfig.questionStyle) {
            Object.assign(questionElement2.style, dialogConfig.questionStyle);
        }
        
        // Apply question prefix icon styles
        const prefixIconElement = dialog.querySelector('.question-prefix-icon');
        if (prefixIconElement && dialogConfig.questionPrefixIcon) {
            Object.assign(prefixIconElement.style, dialogConfig.questionPrefixIcon);
        }
        
        // Re-create icon if it was lost due to innerHTML (except for Scene4 and Scene5)
                    if (!prefixIconElement && dialogConfig.questionPrefixIcon && scene.id !== 'scene4' && scene.id !== 'scene5' && scene.id !== 'scene8' && scene.id !== 'scene9_1' && scene.id !== 'scene10' && scene.id !== 'truescene' && scene.id !== 'falsescene') {
            const questionElement = dialog.querySelector('.dialog-question');
            if (questionElement) {
                const iconSpan = document.createElement('span');
                iconSpan.className = 'question-prefix-icon';
                Object.assign(iconSpan.style, dialogConfig.questionPrefixIcon);
                questionElement.insertBefore(iconSpan, questionElement.firstChild);
            }
        }
        
        // Wait for fonts to load before showing dialog
        document.fonts.ready.then(() => {
            // Start monitoring dialog size and position every 0.1 seconds
            this.startDialogMonitoring();
        });
        
        // Apply button styles
        const buttons = dialog.querySelectorAll('.custom-dialog-button');
        buttons.forEach(button => {
            Object.assign(button.style, {
                cursor: 'pointer',
                transition: 'none',
                ...dialogConfig.buttonStyle
            });
            
            // Special styling for Scene9 Attack button
            if (button.textContent === 'Attack' && scene.id === 'scene9') {
                button.style.background = '#6b84ae';
                button.style.color = 'black';
            }
            
            // Add hover effects
            button.addEventListener('mouseenter', () => {
                if (button.textContent === 'Attack' && scene.id === 'scene9') {
                    button.style.background = '#5a6f8f';
                } else {
                    button.style.background = '#a0a0a0';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                if (button.textContent === 'Attack' && scene.id === 'scene9') {
                    button.style.background = '#6b84ae';
                } else {
                    button.style.background = dialogConfig.buttonStyle.background;
                }
            });
            
            button.addEventListener('mousedown', () => {
                button.style.boxShadow = 'inset 2px 2px 2px rgba(0, 0, 0, 0.3)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.boxShadow = dialogConfig.buttonStyle.boxShadow;
            });
        });
    }
    
    /**
     * Setup custom dialog button handlers
     */
    setupCustomDialogButtons(scene) {
        scene.customDialog.buttons.forEach(button => {
            const buttonElement = document.getElementById(button.id);
            if (buttonElement) {
                buttonElement.addEventListener('click', () => {
                    // Dialog'u smooth olarak yok et
                    const dialog = document.getElementById('customDialog');
                    if (dialog) {
                        dialog.classList.remove('show');
                        dialog.classList.add('hide');
                        
                        // 0.1s dialog yok olma + 0.2s delay sonra action
                        setTimeout(() => {
                            this.handleChoice(button.action);
                        }, 300); // 0.1s yok olma + 0.2s bekle = 0.3s
                    } else {
                        // Dialog yoksa direkt action çalıştır
                        this.handleChoice(button.action);
                    }
                });
                
                // Special hover effect for exit scene
                if (scene.id === 'exitscene') {
                    buttonElement.addEventListener('mouseenter', function() {
                        this.style.background = '#66BB6A';
                        this.style.filter = 'brightness(1.2)';
                    });
                    buttonElement.addEventListener('mouseleave', function() {
                        this.style.background = '#4CAF50';
                        this.style.filter = 'brightness(1)';
                    });
                }
            }
        });
    }
    
    /**
     * Show start screen with video and play button
     */
    showStartScreen() {
        const windowContent = document.querySelector('#gameWindow .window-content');
        const gameWindow = document.getElementById('gameWindow');
        if (!windowContent) return;
        
        // Clear existing content
        windowContent.innerHTML = '';
        
        // Create start screen HTML (video paused initially)
        windowContent.innerHTML = `
            <div class="start-screen-container">
                <video class="start-screen-video" muted>
                    <source src="start_video.mp4" type="video/mp4">
                </video>
                <div class="play-button-container">
                    <img src="play button.png" alt="Play Button" class="play-button-image" id="playButton">
                </div>
            </div>
        `;
        
        // Add start screen class for mobile sizing
        if (gameWindow) {
            gameWindow.classList.add('start-screen-active');
        }
        
        // Adjust window size for start screen on mobile
        this.adjustStartScreenWindowSize();
        
        // Setup play button
        this.setupPlayButton();
    }
    
    /**
     * Adjust window size for start screen on mobile
     */
    adjustStartScreenWindowSize() {
        // Only apply on mobile
        if (window.innerWidth > 768) return;
        
        const gameWindow = document.getElementById('gameWindow');
        if (!gameWindow) return;
        
        // Simply add the CSS class - CSS will handle the sizing
        gameWindow.classList.add('start-screen-active');
        console.log('🎬 Start Screen: Applied start-screen-active class for mobile sizing');
    }


    
    /**
     * Show final score text overlay
     */
    showFinalScoreText(finalScoreConfig) {
        // Remove existing final score text if any
        const existingText = document.querySelector('.final-score-text');
        if (existingText) {
            existingText.remove();
        }
        
        // Get current points
        const currentPoints = this.hpPointsManager.getPoints();
        
        // Create final score text element
        const finalScoreText = document.createElement('div');
        finalScoreText.className = 'final-score-text';
        finalScoreText.textContent = finalScoreConfig.text.replace('{POINTS}', currentPoints);
        
        // Calculate position based on number of digits
        const digitCount = currentPoints.toString().length;
        let dynamicLeft = finalScoreConfig.position.left;
        
        // Adjust position based on digit count
        if (digitCount === 1) {
            dynamicLeft = '30%'; // 1 digit: more left
        } else if (digitCount === 2) {
            dynamicLeft = '31.5%'; // 2 digits: slightly right
        } else if (digitCount === 3) {
            dynamicLeft = '33%'; // 3 digits: current position
        } else if (digitCount >= 4) {
            dynamicLeft = '35%'; // 4+ digits: more right
        }
        
        // Apply styling from config
        finalScoreText.style.cssText = `
            position: absolute;
            left: ${dynamicLeft};
            top: ${finalScoreConfig.position.top};
            transform: translate(0%, -50%);
            font-size: ${finalScoreConfig.fontSize};
            color: ${finalScoreConfig.color};
            font-weight: ${finalScoreConfig.fontWeight};
            font-family: ${finalScoreConfig.fontFamily || 'inherit'};
            text-shadow: ${finalScoreConfig.textShadow};
            z-index: 1000;
            pointer-events: none;
            text-align: right;
            min-width: 80px;
        `;
        
        // Add to scene container
        const sceneContainer = document.querySelector('.scene-container');
        if (sceneContainer) {
            sceneContainer.appendChild(finalScoreText);
            
            // Animate in
            finalScoreText.style.opacity = '0';
            finalScoreText.style.transform = 'translate(-50%, -50%) scale(0.8)';
            
            setTimeout(() => {
                finalScoreText.style.transition = 'all 0.8s ease';
                finalScoreText.style.opacity = '1';
                finalScoreText.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 100);
        }
    }


    
    /**
     * Helper function to handle scene transitions with visited tracking
     */
    transitionToScene(fromScene, toScene, pointsToAdd = 0, isPenalty = false) {
        console.log(`🔍 Before ${fromScene}→${toScene}: ${this.hpPointsManager.getPoints()} points`);
        
        // Create a unique transition key for this specific path
        const transitionKey = `${fromScene}→${toScene}`;
        
        if (pointsToAdd !== 0) {
            if (isPenalty) {
                // For penalties, check if this specific transition has been made before
                if (!this.visitedScenes.has(transitionKey)) {
                    this.hpPointsManager.addPoints(pointsToAdd);
                }
            } else {
                // Only give points if scene hasn't been visited
                if (!this.visitedScenes.has(toScene)) {
                    this.hpPointsManager.addPoints(pointsToAdd);
                }
            }
        }
        
        // Mark both the target scene and the specific transition as visited
        this.visitedScenes.add(toScene);
        this.visitedScenes.add(transitionKey);
        this.showGameScene(toScene);
    }

    /**
     * Handle player choices
     */
    handleChoice(action) {
        // Handle different choices - will be expanded as you add more scenes
        
        if (action === 'go_forward') {
            // SCENE 1 GO FORWARD: Add 100 points and show scene2
            this.transitionToScene('scene1', 'scene2', 100);
        } else if (action === 'go_back') {
            // SCENE 1 GO BACK: Show game over scene
            this.showGameScene('gameOver');
        } else if (action === 'go_forward_scene2') {
            // SCENE 2 GO FORWARD: Add 100 points and show scene3
            this.transitionToScene('scene2', 'scene3', 100);
        } else if (action === 'go_back_scene2') {
            // SCENE 2 GO BACK: Lose 50 points and return to scene1
            this.transitionToScene('scene2', 'scene1', -50, true);
        } else if (action === 'go_forward_scene3') {
            // SCENE 3 GO FORWARD: Go to scene4 (snake encounter)
            this.transitionToScene('scene3', 'scene4', 100);
        } else if (action === 'go_back_scene3') {
            // SCENE 3 GO BACK: Return to scene2 with -50 penalty
            this.transitionToScene('scene3', 'scene2', -50, true);
        } else if (action === 'go_forward_scene4') {
            // SCENE 4 RUN: Go to scene5 (health potions)
            this.transitionToScene('scene4', 'scene5', 100);
        } else if (action === 'go_back_scene4') {
            // SCENE 4 FIGHT BACK: Go to scene4_1 (snake death scene) with +100 points
            this.transitionToScene('scene4', 'scene4_1', 100);
        } else if (action === 'gameover_scene4_1') {
            // SCENE 4_1 GAME OVER: Go to main game over scene
            this.showGameScene('gameOver');
        } else if (action === 'take_and_go_scene5') {
            // SCENE 5 OK: Go to scene6 (yes/no choice) - HP already added when scene loaded
            this.transitionToScene('scene5', 'scene6', 100);
        } else if (action === 'yes_scene6') {
            // SCENE 6 YES: Go to scene8 with +150 points
            this.transitionToScene('scene6', 'scene8', 150);
        } else if (action === 'no_scene6') {
            // SCENE 6 NO: Go to scene7 with -250 points penalty
            this.transitionToScene('scene6', 'scene7', -250, true);
        } else if (action === 'ok_scene7') {
            // SCENE 7 OK: Go to game over screen
            this.showGameScene('gameOver');
        } else if (action === 'take_it_scene8') {
            // SCENE 8 TAKE IT: Go to scene9 with +150 points
            this.transitionToScene('scene8', 'scene9', 150);
        } else if (action === 'attack_scene9') {
            // SCENE 9 ATTACK: Go to scene9_1 with -100 HP
            this.hpPointsManager.addHP(-100);
            this.transitionToScene('scene9', 'scene9_1', 100);
        } else if (action === 'pass_scene9') {
            // SCENE 9 PASS: Go to scene10 with -30 HP
            this.hpPointsManager.addHP(-30);
            this.transitionToScene('scene9', 'scene10', 100);
        } else if (action === 'gameover_scene9_1') {
            // SCENE 9_1 GAME OVER: Go to main game over scene
            this.showGameScene('gameOver');
        } else if (action === 'ok_scene10') {
            // SCENE 10 OK: Go to scene11
            this.transitionToScene('scene10', 'scene11', 100);
        } else if (action === 'goToTrueScene') {
            // SCENE 11: Correct answer (11) goes to truescene with +200 points
            this.previousScene = 'scene11'; // Track where we came from
            this.transitionToScene('scene11', 'truescene', 200);
        } else if (action === 'goToFalseScene') {
            // SCENE 11: Wrong answer (5) goes to falsescene with -200 points penalty
            this.previousScene = 'scene11'; // Track where we came from
            this.transitionToScene('scene11', 'falsescene', -200, true);
        } else if (action === 'goToScene12FromTrue') {
            // TRUE SCENE: Allright button - context-aware navigation (no points)
            if (this.previousScene === 'scene11') {
                this.transitionToScene('truescene', 'scene12', 0);
            } else if (this.previousScene === 'scene12') {
                this.transitionToScene('truescene', 'exitscene', 0);
            }
        } else if (action === 'goToScene12FromFalse') {
            // FALSE SCENE: Allright button - context-aware navigation (no points)
            if (this.previousScene === 'scene11') {
                this.transitionToScene('falsescene', 'scene12', 0);
            } else if (this.previousScene === 'scene12') {
                this.transitionToScene('falsescene', 'exitscene', 0);
            }
        } else if (action === 'goToTrueSceneFromScene12') {
            // SCENE 12 CHOICE 2: Go to truescene with +200 points
            this.previousScene = 'scene12'; // Track where we came from
            this.transitionToScene('scene12', 'truescene', 200);
        } else if (action === 'goToFalseSceneFromScene12') {
            // SCENE 12 CHOICE 3: Go to falsescene with -200 points penalty
            this.previousScene = 'scene12'; // Track where we came from
            this.transitionToScene('scene12', 'falsescene', -200, true);
        } else if (action === 'goToSuccessfully') {
            // SCENE 12 EXIT: Go to win scene
            this.transitionToScene('scene12', 'win', 0);
        } else if (action === 'exitGame') {
            // EXIT SCENE: End the game and go to win scene
            this.showGameScene('win');
        } else if (action === 'restart') {
            // TRY AGAIN: Reset game to scene1 with default stats
            this.resetGame();
        } else if (action === 'tweet') {
            // Get current player score from HP/Points Manager
            const playerScore = this.hpPointsManager.getPointsForTweet();
            
            // Create tweet with player's score
            const tweetText = encodeURIComponent(`Survived (barely) in AIR Dungeon Crawler by @0xArtix\nMy score: ${playerScore} 🪦\nThink you can do better?`);
            const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
            
            // Take screenshot and open Twitter AFTER download completes
            this.takeGameScreenshotAndTweet(playerScore, tweetUrl);
        }
    }
    
    /**
     * Update dev buttons to show current scene
     */
    updateDevButtons() {
        // Remove active class from all dev buttons
        const devButtons = document.querySelectorAll('.dev-button');
        devButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Add active class to current scene button
        if (this.currentScene) {
            const currentSceneButton = document.querySelector(`[data-scene="${this.currentScene}"]`);
            if (currentSceneButton) {
                currentSceneButton.classList.add('active');
            }
        }
    }

    /**
     * Play click sound
     */
    playClickSound() {
        const audio = new Audio('click-sound.mp3');
        audio.volume = 0.5; // Set volume to 50%
        audio.play().catch(error => {
            // Audio play failed silently
        });
    }
    
    /**
     * Setup Metin2 music controls
     */
    setupMetin2MusicControls() {
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const audio = document.getElementById('metin2Audio');
        const progressFill = document.querySelector('.progress-fill');
        const currentTimeSpan = document.querySelector('.current-time');
        const totalTimeSpan = document.querySelector('.total-time');
        
        if (!playBtn || !pauseBtn || !audio) return;
        
        let isPlaying = false;
        
        // Format time helper
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };
        
        // Update progress bar
        const updateProgress = () => {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressFill.style.width = `${progress}%`;
                currentTimeSpan.textContent = formatTime(audio.currentTime);
            }
        };
        
        // Play button click handler
        playBtn.addEventListener('click', () => {
            audio.play();
            isPlaying = true;
        });
        
        // Pause button click handler
        pauseBtn.addEventListener('click', () => {
            audio.pause();
            isPlaying = false;
        });
        
        // Auto-play when window opens
        audio.play().then(() => {
            isPlaying = true;
        }).catch(error => {
            // Auto-play blocked, user must click play
            isPlaying = false;
        });
        
        // Set total time to 3:26 (206 seconds)
        totalTimeSpan.textContent = '3:26';
        
        // Update time display when metadata loads (fallback)
        audio.addEventListener('loadedmetadata', () => {
            if (audio.duration && audio.duration > 0) {
                totalTimeSpan.textContent = formatTime(audio.duration);
            }
        });
        
        // Update progress during playback
        audio.addEventListener('timeupdate', updateProgress);
        
        // Handle audio ended event
        audio.addEventListener('ended', () => {
            isPlaying = false;
            progressFill.style.width = '0%';
            currentTimeSpan.textContent = '0:00';
        });
        
        // Handle audio play/pause events
        audio.addEventListener('play', () => {
            isPlaying = true;
        });
        
        audio.addEventListener('pause', () => {
            isPlaying = false;
        });
    }

    /**
     * Setup development buttons for direct scene access
     */
    setupDevButton() {
        // Add retro dialog test button
        const testRetroDialog = document.getElementById('testRetroDialog');
        if (testRetroDialog) {
            testRetroDialog.addEventListener('click', () => {
                const retroDialog = document.getElementById('retroDialog');
                if (retroDialog) {
                    retroDialog.style.display = 'block';
                }
            });
        }
        
        // Setup retro dialog buttons
        const retroGoForward = document.getElementById('retroGoForward');
        const retroGoBack = document.getElementById('retroGoBack');
        const retroDialog = document.getElementById('retroDialog');
        
        if (retroGoForward) {
            retroGoForward.addEventListener('click', () => {
                // Go Forward clicked
                if (retroDialog) {
                    retroDialog.style.display = 'none';
                }
            });
        }
        
        if (retroGoBack) {
            retroGoBack.addEventListener('click', () => {
                // Go Back clicked
                if (retroDialog) {
                    retroDialog.style.display = 'none';
                }
            });
        }
        // Scene 1 button
        const devScene1Button = document.getElementById('devScene1Button');
        if (devScene1Button) {
            devScene1Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene1');
            });
        }

        // Scene 2 button
        const devScene2Button = document.getElementById('devScene2Button');
        if (devScene2Button) {
            devScene2Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene2');
            });
        }

        // Scene 3 button
        const devScene3Button = document.getElementById('devScene3Button');
        if (devScene3Button) {
            devScene3Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene3');
            });
        }

        // Scene 4 button
        const devScene4Button = document.getElementById('devScene4Button');
        if (devScene4Button) {
            devScene4Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene4');
            });
        }

        // Scene 4_1 button
        const devScene4_1Button = document.getElementById('devScene4_1Button');
        if (devScene4_1Button) {
            devScene4_1Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene4_1');
            });
        }

        // Scene 5 button
        const devScene5Button = document.getElementById('devScene5Button');
        if (devScene5Button) {
            devScene5Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene5');
            });
        }

        // Scene 6 button
        const devScene6Button = document.getElementById('devScene6Button');
        if (devScene6Button) {
            devScene6Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene6');
            });
        }

        // Scene 7 button
        const devScene7Button = document.getElementById('devScene7Button');
        if (devScene7Button) {
            devScene7Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene7');
            });
        }

        // Scene 8 button
        const devScene8Button = document.getElementById('devScene8Button');
        if (devScene8Button) {
            devScene8Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene8');
            });
        }

        // Scene 9 button
        const devScene9Button = document.getElementById('devScene9Button');
        if (devScene9Button) {
            devScene9Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene9');
            });
        }

        // Scene 9_1 button
        const devScene9_1Button = document.getElementById('devScene9_1Button');
        if (devScene9_1Button) {
            devScene9_1Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene9_1');
            });
        }

        // Scene 10 button
        const devScene10Button = document.getElementById('devScene10Button');
        if (devScene10Button) {
            devScene10Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene10');
            });
        }

        // Scene 11 button
        const devScene11Button = document.getElementById('devScene11Button');
        if (devScene11Button) {
            devScene11Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene11');
            });
        }

        // True Scene button
        const devTrueSceneButton = document.getElementById('devTrueSceneButton');
        if (devTrueSceneButton) {
            devTrueSceneButton.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('truescene');
            });
        }

        // False Scene button
        const devFalseSceneButton = document.getElementById('devFalseSceneButton');
        if (devFalseSceneButton) {
            devFalseSceneButton.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('falsescene');
            });
        }

        // Scene 12 button
        const devScene12Button = document.getElementById('devScene12Button');
        if (devScene12Button) {
            devScene12Button.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('scene12');
            });
        }

        // Exit Scene button
        const devExitSceneButton = document.getElementById('devExitSceneButton');
        if (devExitSceneButton) {
            devExitSceneButton.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('exitscene');
            });
        }

        // Win Scene button
        const devSuccessfullyButton = document.getElementById('devSuccessfullyButton');
        if (devSuccessfullyButton) {
            devSuccessfullyButton.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('win');
            });
        }

        // Game Over button
        const devGameOverButton = document.getElementById('devGameOverButton');
        if (devGameOverButton) {
            devGameOverButton.addEventListener('click', () => {
                this.openGameWindow();
                this.showGameScene('gameOver');
            });
        }
    }
    
    /**
     * Reset game to scene1 with default stats
     */
    resetGame() {
        // Reset HP and Points to default values using HP/Points Manager
        this.hpPointsManager.reset();
        
        // Reset visited scenes
        this.visitedScenes.clear();
        
        // Remove final score text if exists
        const existingText = document.querySelector('.final-score-text');
        if (existingText) {
            existingText.remove();
        }
        
        // Smooth transition to start screen
        this.smoothTransitionToStartScreen();
    }
    
    /**
     * Capture screenshot and open tweet in correct order
     */
    takeGameScreenshotAndTweet(playerScore, tweetUrl) {
        const gameWindow = document.getElementById('gameWindow');
        const windowContent = gameWindow ? gameWindow.querySelector('.window-content') : null;
        
        if (windowContent && typeof html2canvas !== 'undefined') {
            // Use html2canvas to capture the window content
            html2canvas(windowContent, {
                backgroundColor: '#aeafae',
                scale: 1,
                useCORS: false,
                allowTaint: true,
                logging: false,
                width: windowContent.offsetWidth,
                height: windowContent.offsetHeight,
                scrollX: 0,
                scrollY: 0
            }).then(canvas => {
                // Immediate download
                const link = document.createElement('a');
                link.download = `AIR-Dungeon-Score-${playerScore}.png`;
                link.href = canvas.toDataURL('image/png', 0.8);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Open Twitter immediately after download starts
                setTimeout(() => {
                    window.open(tweetUrl, "_blank");
                }, 100);
                
            }).catch(error => {
                console.error('Screenshot failed:', error);
                alert(`Game Over! Score: ${playerScore}\n\nPlease take a screenshot of this game window and add it to your tweet.`);
            });
        } else {
            alert(`Game Over! Score: ${playerScore}\n\nPlease take a screenshot of this game window and add it to your tweet.`);
        }
    }
    
    /**
     * Show Windows-style notification
     */
    showNotification(title, message) {
        const notification = document.createElement('div');
        notification.className = 'windows-notification';
        notification.innerHTML = `
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
            <button class="notification-close">OK</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ececec;
            border: 2px outset #d0d0d0;
            padding: 20px;
            min-width: 300px;
            z-index: 10000;
            box-shadow: 4px 4px 8px rgba(0,0,0,0.3);
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Setup close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(notification);
        });
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 5000);
    }
}

// Initialize Windows UI when page loads
document.addEventListener('DOMContentLoaded', () => {
    
    window.windowsUI = new WindowsUIManager();
});

// Add notification styles
const notificationStyles = `
    .windows-notification {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .notification-title {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 10px;
        color: #000;
    }
    
    .notification-message {
        font-size: 12px;
        margin-bottom: 15px;
        color: #333;
        line-height: 1.4;
    }
    
    .notification-close {
        background: linear-gradient(to bottom, #e8e8e8 0%, #d0d0d0 50%, #b8b8b8 100%);
        border: 2px outset #d0d0d0;
        padding: 6px 12px;
        font-size: 12px;
        cursor: pointer;
        float: right;
    }
    
    .notification-close:hover {
        background: linear-gradient(to bottom, #f0f0f0 0%, #e0e0e0 50%, #c8c8c8 100%);
    }
    
    .notification-close:active {
        border: 2px inset #d0d0d0;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet); 