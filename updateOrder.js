import axios from 'axios'

// function to update order with new note attribute
const updateOrder = async (order_id, key, value, storeData) => {
  try {
    // make a GET request to Shopify API to retrieve order data
    const response = await axios({
      method: "GET",
      url: `${storeData.storeUrl}/admin/orders/${order_id}.json?access_token=${storeData.accessToken}`,
    });
    // extract order data from response
    const order = response.data.order;
    // add new note attribute to existing ones
    const noteAttributes = [...order.note_attributes, { name: key, value }];
    // if no order data is found, exit function
    if (!order) {
      return;
    }
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
    console.log(error);
  }
};

export default updateOrder;
