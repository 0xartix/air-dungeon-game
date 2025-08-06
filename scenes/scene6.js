// Scene 6 Configuration - Yes/No Choice Scene
export const scene6 = {
    id: 'scene6',
    image: 'scene6.jpg',
    description: 'A choice appears before you...',
    // Custom Dialog Configuration - Eth OS Choice
    customDialog: {
        enabled: true,
        question: 'Are you bullish on Eth OS?',
        buttons: [
            { text: 'Yes', action: 'yes_scene6', id: 'dialog_yes_scene6' },
            { text: 'No', action: 'no_scene6', id: 'dialog_no_scene6' }
        ],
        position: { 
            left: '34.5%', 
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
            gap: 'calc(50px * var(--window-scale, 1))',
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