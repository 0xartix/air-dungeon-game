// Scene 10 Configuration - Pass Result
export const scene10 = {
    id: 'scene10',
    image: 'scene10.jpg',
    description: 'You chose to pass...',
    // Custom Dialog Configuration - Trap Scene
    customDialog: {
        enabled: true,
        question: ['You triggered a trap!', '-30 HP'],
        buttons: [
            { text: 'OK', action: 'ok_scene10', id: 'dialog_ok_scene10' }
        ],
        position: { 
            left: '68.5%', 
            top: '74%', 
            transform: 'translate(-50%, -50%)',
            maxWidth: '70vw',
            maxHeight: '50vh'
        },
        style: {
            background: '#dcdcdc',
            border: 'calc(3px * var(--window-scale, 1)) solid black',
            padding: 'calc(25px * var(--window-scale, 1)) calc(30px * var(--window-scale, 1))',
            boxShadow: 'inset 0 0 calc(3px * var(--window-scale, 1)) #ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'calc(5px * var(--window-scale, 1))',
            overflow: 'hidden',
            minWidth: 'calc(450px * var(--window-scale, 1))'
        },
        questionStyle: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 'calc(6px * var(--window-scale, 1))',
            fontFamily: 'BBManualMonoRegular, Arial, sans-serif',
            fontSize: 'calc(22px * var(--window-scale, 1))',
            fontWeight: 400,
            color: 'black',
            textAlign: 'center'
        },
        questionPrefixIcon: {
            content: '',
            display: 'inline-block',
            background: '#ff9966',
            color: 'black',
            padding: 'calc(16px * var(--window-scale, 1))',
            fontWeight: 'bold',
            border: 'calc(3px * var(--window-scale, 1)) solid black',
            marginRight: 'calc(10px * var(--window-scale, 1))',
            borderRadius: '0',
            fontSize: 'calc(20px * var(--window-scale, 1))',
            boxShadow: 'inset calc(-1px * var(--window-scale, 1)) calc(-1px * var(--window-scale, 1)) calc(2px * var(--window-scale, 1)) rgba(255,255,255,0.3)',
            minWidth: 'calc(68px * var(--window-scale, 1))',
            minHeight: 'calc(68px * var(--window-scale, 1))',
            textAlign: 'center',
            lineHeight: 'calc(40px * var(--window-scale, 1))',
            backgroundImage: 'url("trap.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        },
        buttonStyle: {
            background: '#b3b3b3',
            color: 'black',
            fontSize: 'calc(16px * var(--window-scale, 1))',
            fontFamily: 'BBManualMonoSemiBold, Arial, sans-serif',
            fontWeight: 600,
            padding: 'calc(6px * var(--window-scale, 1)) calc(15px * var(--window-scale, 1))',
            minHeight: 'calc(28px * var(--window-scale, 1))',
            minWidth: 'calc(150px * var(--window-scale, 1))',
            maxWidth: 'calc(300px * var(--window-scale, 1))',
            border: 'calc(2px * var(--window-scale, 1)) solid black',
            boxShadow: 'inset calc(-1px * var(--window-scale, 1)) calc(-1px * var(--window-scale, 1)) 0 #ffffff',
            margin: '0 calc(5px * var(--window-scale, 1))',
            whiteSpace: 'nowrap'
        }
    }
};