import express from 'express'; 
import bodyParser from 'body-parser';
import updateOrder from './updateOrder.js'; 
import dotenv from 'dotenv';

// Initialize Express app
const app = express();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded request bodies
dotenv.config(); // Load environment variables from a .env file

// Set port number
const port = 5000 || process.env.PORT;

app.get("/hello",  (req, res) => {
  res.send("<h1>Hello from your Server</h1>")
})
// Define a route for handling POST requests to the root path
app.post("/", async (req, res) => {
  // Log the request ID and body to the console
  console.log("🚀 ~ file: index.js:14 ~ app.post ~ req.body.id:", req.body.id);
  console.log("🚀 ~ file: index.js:15 ~ app.post ~ req.body:", req.body);

  // Check if the request body contains an order ID
  if (req.body.id) {
    res.status(200).end(); // Respond with a 200 status code and an empty response body
  } else {
    res.status(400).send("Invalid id"); // Respond with a 400 status code and an error message
    return; // Exit the function
  }

  try {
    // Call the updateOrder function with the order ID and other parameters
    await updateOrder(req.body.id, "key ", "value");
  } catch (error) {
    console.log(error); // Log any errors that occur
  }
});

// Start the server and listen on the specified port
app.listen(port, () => console.log(`node.js app listening on port ${port}`));
