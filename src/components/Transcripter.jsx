import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import QRCode from 'qrcode.react';
import { useState } from 'react'

function Transcripter() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [QRValue, setQRValue] = useState();
  const handleQRVlaue = (transcript) => {
    setQRValue((previousValue) => previousValue = transcript)
    return true;
  }
  const isDefinded = () => {
    return QRValue != null
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      {/* <button onClick={SpeechRecognition.startListening({ language: 'en-US' })}>Start in english</button> */}
      <button onClick={SpeechRecognition.stopListening} style={{ marginLeft: "8px" }}>Stop</button>
      <button onClick={resetTranscript} style={{ marginLeft: "8px" }}>Reset</button>
      <p>{transcript}</p>
      <button onClick={() => handleQRVlaue({ transcript })}>Generate QR code</button>
      <div>
        <br />
        {isDefinded() ? <div>
          <h1>QR Code</h1>
          <p>
            <QRCode value={"Winner"} />
          </p>
        </div> : 'No text found'}
      </div>
    </div>
  );
}

export default Transcripter;
