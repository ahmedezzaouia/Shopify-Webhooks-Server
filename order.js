const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
require('dotenv').config();

const port = 3000;
const orders = [];
app.post("/", async (req, res) => {
  if (orders.includes(req.body.id)) {
    console.log("this order already handled", req.body.id);
    res.status(200).send("Order already handled");
    return;
  }
  console.log(req.body.id);
  if (req.body.id) {
    res.status(200).end();
  } else {
    res.status(400).send("Invalid id");
    return;
  }
  try {
    await orderNote(req.body.id, "test", "browser");
    orders.push(req.body.id);
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const orderNote = async (order_id, name, value) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://dawn-store-1.myshopify.com/admin/orders/${order_id}.json?access_token=${process.env.ACCESS_TOKEN}`,
    });
    const order = response.data.order;
    const noteAttributes = [...order.note_attributes, { name, value }];
    if (!order) {
      return;
    }
    console.log("🚀 ~ file: order.js:30 ~ orderNote ~ note_attributes", noteAttributes);
    const updatedOrder = await axios({
      method: "put",
      url: `https://dawn-store-1.myshopify.com/admin/orders/${order_id}.json?access_token=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`,
      data: {
        order: {
          note_attributes: noteAttributes,
        },
      },
    });
    console.log("🚀 ~ file: order.js:21 ~ orderNote ~ updatedOrder", updatedOrder.data.order.note_attributes);
  } catch (error) {
    console.log(error);
  }
};
