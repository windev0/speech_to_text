import { createContext } from "react";
import { useSpeechRecognition } from 'react-speech-recognition';

export const textContext = createContext()

const TextContextPovider = ({ children }) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        browserSupportsContinuousListening,
        isMicrophoneAvailable
    } = useSpeechRecognition();


    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(transcript);
            alert('Texte copié dans le presse-papier');
        } catch (error) {
            console.error('Erreur lors de la copie dans le presse-papier:', error);
        }
    };

    const values = {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        browserSupportsContinuousListening,
        isMicrophoneAvailable,
        handleCopyClick,
    }


    return (
        <textContext.Provider value={values}>{children}</textContext.Provider>
    )
}

export default TextContextPovider