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
    
    if (!emotionPipeline) {
      return res.status(503).json({ error: 'Model still loading, try again in 10 seconds' });
    }
    
    console.log(' Analyzing:', text.substring(0, 30) + '...');
    
    // Use the model (like in your notebook!)
    const result = await emotionPipeline(text);
    
    console.log(' Result:', result);
    
    // Convert result format
    const emotion = result[0].label === 'POSITIVE' ? 'joy' : 'sadness';
    const confidence = Math.round(result[0].score * 100);
    
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
    console.error(' Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

// Start server and load model
app.listen(PORT, async () => {
  console.log(` Server running on http://localhost:${PORT}`);
  await loadModel();
});