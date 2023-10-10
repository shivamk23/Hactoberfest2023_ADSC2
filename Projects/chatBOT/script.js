// Function to add a user message to the chat box
function addUserMessage(message) {
    const chatBox = document.getElementById('chatBox');
    const userMsg = document.createElement('div');
    userMsg.classList.add('chat-msg', 'user-msg');
    userMsg.innerText = message;
    chatBox.appendChild(userMsg);
  }
  
  // Function to add a bot message to the chat box
  function addBotMessage(message) {
    const chatBox = document.getElementById('chatBox');
    const botMsg = document.createElement('div');
    botMsg.classList.add('chat-msg', 'bot-msg');
    botMsg.innerText = message;
    chatBox.appendChild(botMsg);
  }
  
  // Function to handle user input and send a bot response
  async function handleUserInput() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;
  
    addUserMessage(userInput);
    document.getElementById('userInput').value = ''; // Clear input field after sending
  
    try {
      const botResponse = await getBotResponseFromAPI(userInput);
      addBotMessage(botResponse);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      // Handle error scenarios, such as showing an error message to the user
    }
  }
  


  async function getBotResponseFromAPI(userInput) {
    const apiKey = 'Ysk-NHsbMHBTGBI49mVUhEDoT3BlbkFJrK2O6eTC0TEvCDKGOKea'; // Replace with your actual OpenAI API key
    const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Correct OpenAI API endpoint
  
    try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo', // Replace with the specific model you want to use
            messages: [
              {
                role: 'user',
                content: userInput
              }
            ]
          })
        });
    
        if (!response.ok) {
          throw new Error('API request failed');
        }
    
        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        // If there's an error, return an error message
        return `Error: ${error.message}`;
      }
    }
  

  
  document.getElementById('sendBtn').addEventListener('click', handleUserInput);
  document.getElementById('userInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleUserInput();
    }
  });
  