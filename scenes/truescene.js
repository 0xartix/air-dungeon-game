// True Scene Configuration - Correct Answer
export const truescene = {
    id: 'truescene',
    image: 'truescene.jpg',
    description: 'Correct answer!',
    // Custom Dialog Configuration - Correct Answer Scene
    customDialog: {
        enabled: true,
        question: ['That\'s True!', '+200 points'],
        buttons: [
            { text: 'Take it', action: 'goToScene12FromTrue', id: 'dialog_goToScene12FromTrue' }
        ],
        position: { 
            left: '68.5%', 
            top: '74%', 
            transform: 'translate(-50%, -50%)',
            maxWidth: '80vw',
            maxHeight: '35vh'
        },
        style: {
            background: '#dcdcdc',
            border: 'calc(3px * var(--window-scale, 1)) solid black',
            padding: 'calc(25px * var(--window-scale, 1)) calc(30px * var(--window-scale, 1))',
            boxShadow: 'inset 0 0 calc(3px * var(--window-scale, 1)) #ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'calc(1px * var(--window-scale, 1))',
            overflow: 'hidden',
            minWidth: 'calc(500px * var(--window-scale, 1))'
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
            background: 'transparent',
            color: 'black',
            padding: 'calc(16px * var(--window-scale, 1))',
            fontWeight: 'bold',
            border: 'calc(3px * var(--window-scale, 1)) solid black',
            marginRight: 'calc(10px * var(--window-scale, 1))',
            borderRadius: '50%',
            fontSize: 'calc(20px * var(--window-scale, 1))',
            boxShadow: 'none',
            minWidth: 'calc(68px * var(--window-scale, 1))',
            minHeight: 'calc(68px * var(--window-scale, 1))',
            textAlign: 'center',
            lineHeight: 'calc(40px * var(--window-scale, 1))',
            backgroundImage: 'url("checkmark.png")',
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