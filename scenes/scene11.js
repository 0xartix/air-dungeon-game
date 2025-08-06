// Scene 11 Configuration - Number Choice
export const scene11 = {
    id: 'scene11',
    image: 'scene11.jpg',
    description: 'Choose a number...',
    // Custom Dialog Configuration - Epoch Question
    customDialog: {
        enabled: true,
        question: 'How many epochs Eth-OS will have in total?',
        buttons: [
            { text: '5', action: 'goToFalseScene', id: 'dialog_goToFalseScene' },
            { text: '11', action: 'goToTrueScene', id: 'dialog_goToTrueScene' }
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
            lineHeight: '1.2'
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