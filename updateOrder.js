import axios from 'axios'

// function to update order with new note attribute
const updateOrder = async (order_id, key, value, storeData) => {
  console.log("🚀 ~ file: updateOrder.js:5 ~ updateOrder ~ storeData:", storeData)
  try {
    // make a GET request to Shopify API to retrieve order data
    const response = await axios({
      method: "GET",
      url: `${storeData.storeUrl}/admin/orders/${order_id}.json?access_token=${storeData.accessToken}`,
    });
    if (!response.data.order) {
      throw new Error(`Order ${order_id} not found`);
    }
    // extract order data from response
    const order = response.data.order;
    // add new note attribute to existing ones
    const noteAttributes = [...order.note_attributes, { name: key, value }];
    // make a PUT request to Shopify API to update order with new note attribute
    await axios({
      method: "put",
      url: `${storeData.storeUrl}/admin/orders/${order_id}.json?access_token=${storeData.accessToken}`,
      data: {
        order: {
          note_attributes: noteAttributes,
        },
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default updateOrder;
