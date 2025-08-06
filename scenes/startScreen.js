// Start Screen Configuration
export const startScreen = {
    id: 'startScreen',
    video: 'start_video.mp4',
    playButton: 'play button.png',
    description: 'Welcome to AIR Dungeon Crawler',
    // Start screen doesn't have choices, just the play button
    choices: [],
    // Start screen specific settings
    videoDuration: 5000, // 5 seconds
    playButtonPosition: { bottom: '9%', left: '46%' },
    playButtonSize: { width: '244px', height: '73px' },
    playButtonOpacity: '1',
    // Animation settings
    fadeInDelay: 500,
    videoEndAction: 'goToScene1'
}; 