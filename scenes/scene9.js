// Scene 9 Configuration
export const scene9 = {
    id: 'scene9',
    image: 'scene9.jpg',
    description: 'The journey continues...',
    // Custom Dialog Configuration - FUD Scene
    customDialog: {
        enabled: true,
        question: 'You\'ve found the FUD',
        buttons: [
            { text: 'Attack', action: 'attack_scene9', id: 'dialog_attack_scene9' },
            { text: 'Pass', action: 'pass_scene9', id: 'dialog_pass_scene9' }
        ],
        position: { 
            left: '25%', 
            top: '70%', 
            transform: 'translate(-50%, -50%)',
            maxWidth: '50vw',
            maxHeight: '40vh'
        },
        style: {
            background: '#dcdcdc',
            border: 'calc(3px * var(--window-scale, 1)) solid black',
            padding: 'calc(20px * var(--window-scale, 1)) calc(25px * var(--window-scale, 1))',
            boxShadow: 'inset 0 0 calc(3px * var(--window-scale, 1)) #ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'calc(30px * var(--window-scale, 1))',
            overflow: 'hidden',
            minWidth: 'calc(350px * var(--window-scale, 1))'
        },
        questionStyle: {
            fontFamily: 'BBManualMonoRegular, Arial, sans-serif',
            fontSize: 'calc(22px * var(--window-scale, 1))',
            fontWeight: 400,
            color: 'black',
            textAlign: 'center',
            marginBottom: 'calc(8px * var(--window-scale, 1))',
            lineHeight: '1.2',
            display: 'flex',
            alignItems: 'center',
            gap: 'calc(8px * var(--window-scale, 1))'
        },
        questionPrefixIcon: {
            content: '',
            display: 'inline-block',
            background: 'transparent',
            color: 'black',
            padding: '0',
            fontWeight: 'bold',
            border: 'none',
            marginRight: 'calc(10px * var(--window-scale, 1))',
            borderRadius: '0',
            fontSize: 'calc(20px * var(--window-scale, 1))',
            boxShadow: 'none',
            minWidth: 'calc(40px * var(--window-scale, 1))',
            minHeight: 'calc(40px * var(--window-scale, 1))',
            textAlign: 'center',
            lineHeight: 'calc(24px * var(--window-scale, 1))',
            backgroundImage: 'url("ghost.png")',
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
            padding: 'calc(6px * var(--window-scale, 1)) calc(12px * var(--window-scale, 1))',
            minHeight: 'calc(30px * var(--window-scale, 1))',
            minWidth: 'calc(120px * var(--window-scale, 1))',
            maxWidth: 'calc(200px * var(--window-scale, 1))',
            border: 'calc(2px * var(--window-scale, 1)) solid black',
            boxShadow: 'inset calc(-1px * var(--window-scale, 1)) calc(-1px * var(--window-scale, 1)) 0 #ffffff',
            margin: '0 calc(4px * var(--window-scale, 1))',
            whiteSpace: 'nowrap'
        }
    }
};