// Mock product database
const products = {
    "laptop": { name: "Premium Laptop", price: "$999", stock: 45 },
    "mobile": { name: "Smartphone Pro", price: "$699", stock: 100 },
    "headphones": { name: "Wireless Headphones", price: "$199", stock: 75 },
    "eardops": { name: "eardops", price: "$199", stock: 15 },
    "screen guard": { name: "screen guard", price: "$199", stock: 105 },
    "back cover": { name: "back cover", price: "$199", stock: 205 }
};

// Common responses for different query types
const responses = {
    greeting: [
        "Hello! How can I assist you today?",
        "Hi there! What can I help you with?",
        "Welcome! How may I help you?"
    ],
    product: (product) => {
        if (product) {
            return `The ${product.name} is available at ${product.price}. We currently have ${product.stock} units in stock.`;
        }
        return "I'm sorry, I couldn't find information about that product. Could you please specify which product you're interested in?";
    },
    order: "To check your order status, please provide your order number and I'll look that up for you.",
    refund: "Our refund policy allows returns within 30 days of purchase. Would you like me to guide you through the refund process?",
    default: "I'm not sure I understand. Could you please rephrase your question?"
};

// Chat functionality
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.textContent = 'Just now';
    
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(timestamp);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    typingIndicator.classList.remove('hidden');
}

function hideTypingIndicator() {
    typingIndicator.classList.add('hidden');
}

function processMessage(message) {
    message = message.toLowerCase();
    
    // Simulate AI processing with basic pattern matching
    if (message.includes('hello') || message.includes('hi')) {
        return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }
    
    if (message.includes('price') || message.includes('cost')) {
        for (const [key, product] of Object.entries(products)) {
            if (message.includes(key)) {
                return responses.product(product);
            }
        }
    }
    
    if (message.includes('order') || message.includes('tracking')) {
        return responses.order;
    }
    
    if (message.includes('refund') || message.includes('return')) {
        return responses.refund;
    }
    
    return responses.default;
}

async function handleUserInput() {
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    userInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Hide typing indicator and add response
    hideTypingIndicator();
    addMessage(processMessage(message));
}

sendButton.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});