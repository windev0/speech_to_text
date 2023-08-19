import { createContext } from "react";
import { useSpeechRecognition } from 'react-speech-recognition';
import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

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

    const facebookShare = <FacebookShareButton url="https://www.facebook.com/" />
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
        facebookShare,
    }


    return (
        <textContext.Provider value={values}>{children}</textContext.Provider>
    )
}

export default TextContextPovider