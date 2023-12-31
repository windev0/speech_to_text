import QRCode from 'qrcode.react';
import { useContext, useState } from 'react'
import { textContext } from './context/TexteContext';
import SpeechRecognition from 'react-speech-recognition';
// import jsPDF from 'jspdf';
// import { ReactDOM } from 'react';
// import ReactDOMServer from 'react-dom/server';

function Transcripter() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
    handleCopyClick,
    isMicrophoneAvailable,
    facebookShare
  } = useContext(textContext);

  // const url = window.location.href;

  // const shareText = (value) => {
  //   if (navigator.canShare()) {
  //     navigator.share({
  //       title: `Texte copié depuis le site`,
  //       text: value,
  //     })
  //       .catch(err => { return <div>Une erreur est survenue lors du partage <br />Réessayez</div> })
  //   }
  // }
  // const downloadQR = (text) => {
  //   const qrCode = <QRCode value={text} />
  //   const qrPDF = new jsPDF();

  //   const qrCodeContainer = document.createElement('canvas');
  //   const qrCodeHTML = ReactDOMServer.renderToString(qrCode)
  //   qrCodeContainer.innerHTML = qrCodeHTML

  //   qrPDF.addImage(qrCodeContainer, 60, 80,  100, 100);
  //   qrPDF.save('CodeQR.pdf');
  // }

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
  }

  return (
    <div className='App'>
      <p>Microphone: {listening ? <span style={{ color: 'green' }}>Activé </span> : <span style={{ color: '#dc2626' }}>Désactivé</span>}</p>

      <button onClick={() => { SpeechRecognition.startListening({ continuous: true }) }}>
        ENREGISTRER
      </button>
      <button
        onClick={() => {
          SpeechRecognition.stopListening()
          handleText();
        }}
        style={{ marginLeft: "8px" }}>
        PAUSE
      </button>
      <button
        onClick={resetTranscript}
        style={{ marginLeft: "8px", }}>
        RECOMMENCER
      </button>
      {transcript == ''
        ? <pre>
          votre texte s'affichera ici,
          <br />Commencer à parler lorsque l'état
          <br /> du microphone sera sur <b style={{ color: 'green' }}>Activé</b>
        </pre>
        : ''}
      <p style={{ width: '90%' }}>{transcript}</p>
      <button onClick={() => handleQRVlaue({ transcript })} >Générer le code QR </button>
      <button onClick={handleCopyClick} style={{ marginLeft: "8px" }} >Copier le texte</button>
      {/* <button onClick={shareText(transcript)} style={{ marginLeft: "8px" }} >Partager le texte</button> */}
      <div>
        <br />
        {isDefinded()
          ? <div>
            <h1>Code QR</h1>
            {/* <button onClick={() => downloadQR({ transcript })}>Télécharger le code QR</button> */}
            <p><QRCode value={transcript} /></p>
          </div>
          : <span style={{ color: '#fde68a' }}>Votre code QR s'affichera ici</span>
        }
      </div>
    </div>
  );
}

export default Transcripter;
