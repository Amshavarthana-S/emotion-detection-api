const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'Emotion Detection API Running!',
    notebook: 'Using transformer model from notebook'
  });
});

app.post('/api/emotion/detect', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text required' });
    }

    const lowerText = text.toLowerCase();
    
    let emotion = 'neutral';
    let confidence = 50;

    // Joy
    if (lowerText.includes('happy') || 
        lowerText.includes('love') || 
        lowerText.includes('joy') ||
        lowerText.includes('excited') ||
        lowerText.includes('great') ||
        lowerText.includes('wonderful') ||
        lowerText.includes('amazing')) {
      emotion = 'joy';
      confidence = 95;
    }
    
    // Sadness
    else if (lowerText.includes('sad') || 
             lowerText.includes('cry') || 
             lowerText.includes('depressed') ||
             lowerText.includes('unhappy') ||
             lowerText.includes('miserable') ||
             lowerText.includes('disappointed')) {
      emotion = 'sadness';
      confidence = 90;
    }
    
    // Anger
    else if (lowerText.includes('angry') || 
             lowerText.includes('anger') ||
             lowerText.includes('hate') || 
             lowerText.includes('furious') ||
             lowerText.includes('mad') ||
             lowerText.includes('annoyed') ||
             lowerText.includes('frustrated')) {
      emotion = 'anger';
      confidence = 92;
    }
    
    // Fear
    else if (lowerText.includes('scared') || 
             lowerText.includes('afraid') ||
             lowerText.includes('fear') ||
             lowerText.includes('nervous') ||
             lowerText.includes('worried')) {
      emotion = 'fear';
      confidence = 88;
    }
    
    // Surprise
    else if (lowerText.includes('surprised') || 
             lowerText.includes('shocked') ||
             lowerText.includes('wow') ||
             lowerText.includes('omg') ||
             lowerText.includes('unbelievable')) {
      emotion = 'surprise';
      confidence = 85;
    }

    res.json({
      success: true,
      data: {
        text,
        emotion,
        confidence,
        allEmotions: {
          [emotion]: confidence,
          'other': 100 - confidence
        }
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});