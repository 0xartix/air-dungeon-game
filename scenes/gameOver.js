// Game Over Scene Configuration
export const gameOver = {
    id: 'gameOver',
    image: 'gameoverfinal.png',
    description: 'Game Over - You chose to go back...',
    // Custom Dialog Configuration
    customDialog: {
        enabled: true,
        question: 'High Score: {POINTS}',
        buttons: [
            { text: 'Try Again', action: 'restart', id: 'dialog_restart' },
            { text: 'Tweet', action: 'tweet', id: 'dialog_tweet' }
        ],
        position: { 
            left: '50%', 
            bottom: '10%', 
            transform: 'translateX(-50%)',
            maxWidth: '50vw',
            maxHeight: '60vh'
        },
        style: {
            background: '#dcdcdc',
            border: 'calc(3px * var(--window-scale, 1)) solid black',
            padding: 'calc(25px * var(--window-scale, 1)) calc(40px * var(--window-scale, 1))',
            boxShadow: 'inset 0 0 calc(3px * var(--window-scale, 1)) #ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'calc(10px * var(--window-scale, 1))',
            overflow: 'hidden',
            minWidth: 'calc(400px * var(--window-scale, 1))'
        },
        questionStyle: {
            fontFamily: 'BBManualMonoSemiBold, Arial, sans-serif',
            fontSize: 'calc(24px * var(--window-scale, 1))',
            fontWeight: 600,
            color: 'black',
            textAlign: 'center',
            marginBottom: 'calc(5px * var(--window-scale, 1))'
        },
        buttonStyle: {
            background: '#b3b3b3',
            color: 'black',
            fontSize: 'calc(14px * var(--window-scale, 1))',
            fontFamily: 'BBManualMonoSemiBold, Arial, sans-serif',
            fontWeight: 600,
            padding: 'calc(8px * var(--window-scale, 1)) calc(20px * var(--window-scale, 1))',
            minHeight: 'calc(30px * var(--window-scale, 1))',
            minWidth: 'calc(120px * var(--window-scale, 1))',
            maxWidth: 'calc(200px * var(--window-scale, 1))',
            border: 'calc(2px * var(--window-scale, 1)) solid black',
            boxShadow: 'inset calc(-1px * var(--window-scale, 1)) calc(-1px * var(--window-scale, 1)) 0 #ffffff',
            margin: '0 calc(5px * var(--window-scale, 1))',
            whiteSpace: 'nowrap'
        }
    },
    // Typewriter text overlay
    typewriterText: {
        text: "You've reached the end of your journey...",
        enabled: true
    }
}; 