import express from 'express'; 
import updateOrder from './updateOrder.js'; 
import dotenv from 'dotenv';

// Initialize Express app
const app = express();

// Configure middleware
app.use(express.json());

// Load environment variables from a .env file
dotenv.config(); 

// Set port number
const port = 5000 || process.env.PORT;

app.get("/",  (req, res) => {
  res.send("<h1>Hello from your Server</h1>")
})
// Define a route for handling POST requests to the root path
app.post("/", async (req, res) => {
  console.log("🚀 ~ file: index.js:44 ~ app.post ~ process.env.ACCESS_TOKEN:", process.env.ACCESS_TOKEN)  
  console.log("🚀 ~ file: index.js:23 ~ app.post ~ process.env.STORE_URL:", process.env.STORE_URL)
  
  // Check if the request body contains an order ID
  if (!req.body.id) {
    res.status(400).send("invalid order id"); // Respond with a 400 status code and an error message
    return; // Exit the function
  }

  try {
    const payment_gateway_names = req.body.payment_gateway_names || []; // Ensure that payment_gateway_names is an array, even if it is not provided in the request body
    const validPaymentGatewayNames = payment_gateway_names.filter(name => name && typeof name === 'string'); // Filter out any invalid or empty values in the array
    const payment_refference = validPaymentGatewayNames.join(", "); // Join the filtered array using ", " as a separator
    if (payment_refference) {
      await updateOrder(req.body.id, "payment_info:", payment_refference); // Call the updateOrder function with the order ID and other parameters
    }
  } catch (error) {
    console.log(error); // Log any errors that occur
  }
  
  res.status(200).end(); // Respond with a 200 status code and an empty response body
});

// Start the server and listen on the specified port
app.listen(port, () => console.log(`node.js app listening on port ${port}`));
