import QRCode from 'qrcode.react';
import { useContext, useState } from 'react'
import { textContext } from './context/TexteContext';
import SpeechRecognition from 'react-speech-recognition';


function Transcripter() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
    handleCopyClick,
    isMicrophoneAvailable
  } = useContext(textContext);

  const [QRValue, setQRValue] = useState();
  const [text, setText] = useState('');


  const handleQRVlaue = (transcript) => {
    setQRValue((previousValue) => previousValue = transcript)
    return true;
  }
  const handleText = () => {
    setText((prevText) => prevText = transcript + ' ')
    return true
  }

  const isDefinded = () => {
    return QRValue != null
  }

  if (!browserSupportsSpeechRecognition) {
    return <div>
      <span>Votre navigateur ou appareil ne supporte pas de microphone</span>
    </div>;
  }

  if (!isMicrophoneAvailable) {
    return <div>
      <span>Cette application necéssite l'accès à votre microphone</span>
    </div>;
  }
  if (!browserSupportsContinuousListening) {
    console.log(('Votre navigateur ou appareil ne supporte pas l\'activation directe du microphone, actualisez la page voir')
    )
  } else {
    SpeechRecognition.startListening({ continuous: true })
  }

  return (
    <div className='App'>
      <p>Microphone: {listening ? 'Activé' : 'Désactivé'}</p>

      <button onClick={() => {
        SpeechRecognition.stopListening()
        handleText();
      }}
        style={{ marginLeft: "8px" }}>{listening ^ browserSupportsContinuousListening ? "ENREGISTRER" : "PAUSE"}</button>
      <button onClick={resetTranscript} style={{ marginLeft: "8px" }}>Recommencer</button>
      {transcript == '' ? <pre>votre texte va s'afficher ici,
        <br />Commencer à parler lorsque l'état <br /> du microphone sera sur <b style={{ color: 'green' }}>Activé</b>
      </pre> : ''}
      <p style={{ width: '90%' }}>{transcript}</p>
      <button onClick={() => handleQRVlaue({ transcript })} >Générer le code QR </button>
      <button onClick={handleCopyClick} style={{ marginLeft: "8px" }} >Copier le texte</button>
      <div>
        <br />
        {isDefinded() ? <div>
          <h1>Code QR</h1>
          <p>
            <QRCode value={transcript} />
          </p>
        </div> : 'Aucun texte trouvé'}
      </div>
    </div>
  );
}

export default Transcripter;
