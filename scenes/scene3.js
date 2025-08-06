// Scene 3 Configuration
export const scene3 = {
    id: 'scene3',
    image: 'scene3.jpg',
    description: 'You continue deeper into the dungeon...',
    // Custom Dialog Configuration - Retro Style
    customDialog: {
        enabled: true,
        question: 'You found a chest',
        buttons: [
            { text: 'Open', action: 'go_forward_scene3', id: 'dialog_open_scene3' },
            { text: 'Go Back', action: 'go_back_scene3', id: 'dialog_go_back_scene3' }
        ],
        position: { 
            left: '30%', 
            top: '40%', 
            transform: 'translate(-50%, -50%)',
            maxWidth: '780px',
            maxHeight: '325px'
        },
        style: {
            background: '#c0c0c0',
            border: 'calc(2.6px * var(--window-scale, 1)) solid #000000',
            padding: 'calc(10.4px * var(--window-scale, 1))',
            boxShadow: 'calc(2.6px * var(--window-scale, 1)) calc(2.6px * var(--window-scale, 1)) calc(5.2px * var(--window-scale, 1)) rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'calc(19.5px * var(--window-scale, 1))',
            overflow: 'hidden',
            borderRadius: '0',
            minWidth: 'calc(390px * var(--window-scale, 1))',
            minHeight: 'calc(156px * var(--window-scale, 1))'
        },
        questionStyle: {
            fontFamily: 'BBManualMonoRegular, Arial, sans-serif',
            fontSize: 'calc(28px * var(--window-scale, 1))',
            fontWeight: 400,
            color: 'black',
            textAlign: 'center',
            marginBottom: '0',
            lineHeight: '1.4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'calc(19.5px * var(--window-scale, 1))',
            width: '100%'
        },
        questionPrefixIcon: {
            content: '',
            display: 'inline-block',
            background: '#ff9966',
            color: 'black',
            padding: 'calc(10.4px * var(--window-scale, 1))',
            fontWeight: 'bold',
            border: 'calc(2.6px * var(--window-scale, 1)) solid black',
            marginRight: 'calc(13px * var(--window-scale, 1))',
            borderRadius: '0',
            fontSize: 'calc(26px * var(--window-scale, 1))',
            boxShadow: 'inset calc(-1.3px * var(--window-scale, 1)) calc(-1.3px * var(--window-scale, 1)) calc(2.6px * var(--window-scale, 1)) rgba(255,255,255,0.3)',
            minWidth: 'calc(52px * var(--window-scale, 1))',
            minHeight: 'calc(52px * var(--window-scale, 1))',
            textAlign: 'center',
            lineHeight: 'calc(31.2px * var(--window-scale, 1))',
            backgroundImage: 'url("chest.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        },
        buttonStyle: {
            background: '#b3b3b3',
            color: 'black',
            fontSize: 'calc(14px * var(--window-scale, 1))',
            fontFamily: 'BBManualMonoSemiBold, Arial, sans-serif',
            fontWeight: 600,
            padding: 'calc(5px * var(--window-scale, 1)) calc(10px * var(--window-scale, 1))',
            minHeight: 'calc(28px * var(--window-scale, 1))',
            minWidth: 'calc(120px * var(--window-scale, 1))',
            maxWidth: 'calc(250px * var(--window-scale, 1))',
            border: 'calc(2px * var(--window-scale, 1)) solid black',
            boxShadow: 'inset calc(-1px * var(--window-scale, 1)) calc(-1px * var(--window-scale, 1)) 0 #ffffff',
            margin: '0 calc(5px * var(--window-scale, 1))',
            whiteSpace: 'nowrap'
        }
    }
}; 