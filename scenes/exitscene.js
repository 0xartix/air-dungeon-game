// Exit Scene Configuration - Final Scene
export const exitscene = {
    id: 'exitscene',
    image: 'exit_image.jpg',
    description: 'Exit scene...',
    // Custom Dialog Configuration - Exit Scene
    customDialog: {
        enabled: true,
        question: 'You\'ve found a way out!',
        buttons: [
            { text: 'Exit', action: 'exitGame', id: 'dialog_exitGame' }
        ],
        position: { 
            left: '68.5%', 
            top: '74%', 
            transform: 'translate(-50%, -50%)',
            maxWidth: '90vw',
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
            gap: 'calc(20px * var(--window-scale, 1))',
            overflow: 'hidden',
            minWidth: 'calc(450px * var(--window-scale, 1))'
        },
        questionStyle: {
            fontFamily: 'BBManualMonoRegular, Arial, sans-serif',
            fontSize: 'calc(26px * var(--window-scale, 1))',
            fontWeight: 400,
            color: 'black',
            textAlign: 'center',
            marginBottom: 'calc(10px * var(--window-scale, 1))',
            lineHeight: '1.2',
            display: 'flex',
            alignItems: 'center',
            gap: 'calc(10px * var(--window-scale, 1))'
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
            backgroundImage: 'url("ladder.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        },
        buttonStyle: {
            background: '#4CAF50',
            color: 'white',
            fontSize: 'calc(14px * var(--window-scale, 1))',
            fontFamily: 'BBManualMonoSemiBold, Arial, sans-serif',
            fontWeight: 600,
            padding: 'calc(6px * var(--window-scale, 1)) calc(12px * var(--window-scale, 1))',
            minHeight: 'calc(25px * var(--window-scale, 1))',
            minWidth: 'calc(120px * var(--window-scale, 1))',
            maxWidth: 'calc(250px * var(--window-scale, 1))',
            border: 'calc(2px * var(--window-scale, 1)) solid black',
            boxShadow: 'inset calc(-1px * var(--window-scale, 1)) calc(-1px * var(--window-scale, 1)) 0 #66BB6A',
            margin: '0 calc(5px * var(--window-scale, 1))',
            whiteSpace: 'nowrap'
        }
    }
};