// Test Manus API key
import { config } from 'dotenv';
config();

const apiKey = process.env.VITE_MANUS_API_KEY;

if (!apiKey) {
  console.error('❌ VITE_MANUS_API_KEY not found in environment');
  process.exit(1);
}

console.log('🔑 Testing Manus API key...');
console.log(`Key starts with: ${apiKey.substring(0, 10)}...`);

try {
  const response = await fetch('https://api.manus.app/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      messages: [
        {
          role: 'user',
          content: 'Say "API key works!" if you can read this.'
        }
      ],
      max_tokens: 50
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ API request failed: ${response.status}`);
    console.error(`Response: ${errorText}`);
    process.exit(1);
  }

  const data = await response.json();
  const reply = data.choices[0].message.content;
  
  console.log('✅ API key is valid!');
  console.log(`AI response: ${reply}`);
  console.log('\n✅ Ready to rebuild with working API key!');
  process.exit(0);
  
} catch (error) {
  console.error('❌ Error testing API key:', error.message);
  process.exit(1);
}
