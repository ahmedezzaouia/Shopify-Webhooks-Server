import express from 'express'
import bodyParser from 'body-parser'
import updateOrder from './updateOrder.js'
import dotenv from 'dotenv';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();

const port = 3000;
// const orders = [];
app.post("/", async (req, res) => {
  // if (orders.includes(req.body.id)) {
  //   console.log("this order already handled", req.body.id);
  //   res.status(200).send("Order already handled");
  //   return;
  // }
  console.log(req.body.id);
  if (req.body.id) {
    res.status(200).end();
  } else {
    res.status(400).send("Invalid id");
    return;
  }
  try {
    await updateOrder(req.body.id, "payment ", "browser");
    // orders.push(req.body.id);
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => console.log(`node.js app listening on port ${port}!`));
