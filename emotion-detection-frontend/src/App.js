import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const detectEmotion = async () => {
    console.log("Detect Emotion button clicked or Enter pressed!");
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://emotion-detection-api-production.up.railway.app/api/emotion/detect', { text });
      if (!response.data || !response.data.success) {
        throw new Error(response.data.error || 'Invalid response from server');
      }
      setResult(response.data.data);
    } catch (err) {
      setError('Error detecting emotion. Try again!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default new line
      detectEmotion();
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>😊 Emotion Detection</h1>
        <p>Type text and detect emotions using AI</p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your text here... (Press Ctrl+Enter to analyze)"
          rows="5"
          disabled={loading}
        />

        <button onClick={detectEmotion} disabled={loading}>
          {loading ? 'Analyzing...' : 'Detect Emotion'}
        </button>

        {error && <div className="error">{error}</div>}

        {result && (
          <div className="result">
            <h2>Result:</h2>
            <div className="emotion-result">
              <div className="emotion-name">{result.emotion.toUpperCase()}</div>
              <div className="confidence">
                Confidence: {result.confidence}%
              </div>
              <div className="bar">
                <div className="fill" style={{ width: `${result.confidence}%` }}></div>
              </div>
            </div>
          </div>
        )}

        <div className="examples">
          <h3>Try These:</h3>
          <button onClick={() => setText('I love this! I am so happy!')} className="example-btn">
            Happy
          </button>
          <button onClick={() => setText('I am very sad and disappointed')} className="example-btn">
            Sad
          </button>
          <button onClick={() => setText('This makes me angry!')} className="example-btn">
            Angry
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;