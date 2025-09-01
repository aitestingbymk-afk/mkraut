const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(bodyParser.json());

// Sample order endpoint
app.post('/order', async (req, res) => {
  const { items, total } = req.body;
  const deliveryCharge = 10;
  const grandTotal = total + deliveryCharge;
  const message = `New Order:\nItems: ${JSON.stringify(items)}\nTotal: ₹${total}\nDelivery: ₹${deliveryCharge}\nGrand Total: ₹${grandTotal}`;
  
  if (TELEGRAM_TOKEN && CHAT_ID) {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message
    });
  }

  res.json({ success: true, grandTotal });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
