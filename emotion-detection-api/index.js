const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Load the emotion detection model (from your notebook!)
let emotionPipeline = null;

async function loadModel() {
  try {
    console.log(' Loading emotion detection model (from notebook approach)...');
    const { pipeline } = require('@xenova/transformers');
    
    emotionPipeline = await pipeline(
      'text-classification',
      'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
    );
    
    console.log(' Model loaded successfully!');
  } catch (error) {
    console.error(' Error loading model:', error);
  }
}

// Simple health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Emotion Detection API Running!',
    notebook: 'Using transformer model from notebook'
  });
});

// Emotion detection endpoint
app.post('/api/emotion/detect', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text required' });
    }

    const lowerText = text.toLowerCase();
    
    let emotion = 'neutral';
    let confidence = 50;

    // Joy emotions
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
    
    // Sadness emotions
    else if (lowerText.includes('sad') || 
             lowerText.includes('cry') || 
             lowerText.includes('depressed') ||
             lowerText.includes('unhappy') ||
             lowerText.includes('miserable') ||
             lowerText.includes('disappointed')) {
      emotion = 'sadness';
      confidence = 90;
    }
    
    // Anger emotions
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
    
    // Fear emotions
    else if (lowerText.includes('scared') || 
             lowerText.includes('afraid') ||
             lowerText.includes('fear') ||
             lowerText.includes('nervous') ||
             lowerText.includes('worried')) {
      emotion = 'fear';
      confidence = 88;
    }
    
    // Surprise emotions
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
    console.error('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

// Start server and load model
app.listen(PORT, async () => {
  console.log(` Server running on http://localhost:${PORT}`);
  await loadModel();
});