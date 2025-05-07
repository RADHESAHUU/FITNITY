import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceAssistant = ({ onCommand }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleStartListening = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert('Your browser does not support speech recognition.');
      return;
    }
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    if (onCommand) {
      onCommand(transcript);
    }
    resetTranscript();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4">
        <div className={`p-4 rounded-lg bg-white/5 border border-white/10 transition-colors ${listening ? 'border-blue-500/50' : ''}`}>
          <p className="text-white/70">
            {listening ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Listening...
              </span>
            ) : (
              'Click the button below to start speaking'
            )}
          </p>
          <p className="mt-2 text-white/90 font-mono text-sm break-words min-h-[3rem]">
            {transcript || 'No transcript yet...'}
          </p>
        </div>

        <button
          onClick={listening ? handleStopListening : handleStartListening}
          className={`w-full py-3 px-6 rounded-lg transition-all duration-300 ${
            listening 
              ? 'bg-red-500/90 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
              : 'btn-glow'
          }`}
        >
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-sm text-white/50">
          Try saying: "Start a workout" or "Track my progress"
        </p>
      </div>
    </div>
  );
};

export default VoiceAssistant;