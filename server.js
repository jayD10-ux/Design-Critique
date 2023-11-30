const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
const API_KEY = 'your-openai-api-key'; // Replace with your actual OpenAI API key

app.post('/get-critique', async (req, res) => {
  const { frameText } = req.body; // The text from the selected Figma frame

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        prompt: `Please provide a design critique for the following text:\n${frameText}`,
        max_tokens: 150
      },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    res.json({ critique: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing your request');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
