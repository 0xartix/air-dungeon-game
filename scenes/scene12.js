// Scene 12 Configuration - Number Choice
export const scene12 = {
    id: 'scene12',
    image: 'scene12.jpg', 
    description: 'Choose a number...',
    // Custom Dialog Configuration - Question Scene
    customDialog: {
        enabled: true,
        question: 'Once every __ day',
        buttons: [
            { text: '2', action: 'goToTrueSceneFromScene12', id: 'dialog_goToTrueSceneFromScene12' },
            { text: '3', action: 'goToFalseSceneFromScene12', id: 'dialog_goToFalseSceneFromScene12' }
        ],
        position: { 
            left: '68.5%', 
            top: '74%', 
            transform: 'translate(-50%, -50%)',
            maxWidth: '80vw',
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
            fontSize: 'calc(20px * var(--window-scale, 1))',
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
            backgroundImage: 'url("questionmark.png")',
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
            padding: 'calc(8px * var(--window-scale, 1)) calc(15px * var(--window-scale, 1))',
            minHeight: 'calc(35px * var(--window-scale, 1))',
            minWidth: 'calc(150px * var(--window-scale, 1))',
            maxWidth: 'calc(300px * var(--window-scale, 1))',
            border: 'calc(2px * var(--window-scale, 1)) solid black',
            boxShadow: 'inset calc(-1px * var(--window-scale, 1)) calc(-1px * var(--window-scale, 1)) 0 #ffffff',
            margin: '0 calc(5px * var(--window-scale, 1))',
            whiteSpace: 'nowrap'
        }
    }
};