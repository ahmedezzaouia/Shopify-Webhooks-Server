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
const port = process.env.PORT || 5000;

const stores = {
  store_uk: {
    storeUrl: process.env.STORE_URL_UK,
    accessToken: process.env.ACCESS_TOKEN_UK
  },
  store_de: {
    storeUrl: process.env.STORE_URL_DE,
    accessToken: process.env.ACCESS_TOKEN_DE
  }
};

console.log("🚀 ~ file: index.js:20 ~ stores:", stores)

app.get("/",  (req, res) => {
  res.send("<h1>Hello from your Server</h1>")
})
// Define a route for handling POST requests to the root path
app.post("/", async (req, res) => {  
  console.log("🚀 ~ file: index.js:28 ~ app.post ~ req.body:", req.body.order_status_url)
  console.log("🚀 ~ file: index.js:40 ~ app.post ~ req.body.id:", req.body.id)
  // Check if the request body contains an order ID
  if (!req.body.id) {
    res.status(400).send("invalid order id"); // Respond with a 400 status code and an error message
    return; // Exit the function
  }
  else res.status(200).end(); // Respond with a 200 status code


  try {
    const storeUrl = req.body.order_status_url;

    if (!storeUrl.includes('uk') && !storeUrl.includes('de')) return;
    
    let storeData;
    if (storeUrl.includes('uk')) {
      storeData = stores.store_uk;
    } else {
      storeData = stores.store_de;
    }
    console.log("🚀 ~ file: index.js:50 ~ app.post ~ storeData:", storeData)
    
    const payment_gateway_names = req.body.payment_gateway_names || []; // Ensure that payment_gateway_names is an array, even if it is not provided in the request body
    const validPaymentGatewayNames = payment_gateway_names.filter(name => name && typeof name === 'string'); // Filter out any invalid or empty values in the array
    const payment_name = validPaymentGatewayNames.join(", "); // Join the filtered array using ", " as a separator
    if (payment_name) {
      await updateOrder(req.body.id, "payment_gateway:", payment_name, storeData); // Call the updateOrder function with the order ID and other parameters
    }
  } catch (error) {
    console.log(error); // Log any errors that occur
  }
  
});

// Start the server and listen on the specified port
app.listen(port, () => console.log(`node.js app listening on port ${port}`));
