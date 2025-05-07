const getAIResponse = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    // Dummy response for AI integration
    const aiResponse = `This is a dummy response to your message: "${message}"`;
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error('Error generating dummy AI response:', error);
    res.status(500).json({ message: 'Failed to generate AI response', error });
  }
};

module.exports = { getAIResponse };