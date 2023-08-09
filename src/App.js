import './App.css';
import Transcripter from './components/Transcripter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Transcripter />
        {/* Nous sommes en maintenance de l'application, elle sera temporairement indisponible */}
      </header>
    </div>
  );
}

export default App;
