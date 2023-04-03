import axios from 'axios'

const updateOrder = async (order_id, key, value) => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://dawn-store-1.myshopify.com/admin/orders/${order_id}.json?access_token=${process.env.ACCESS_TOKEN}`,
      });
      const order = response.data.order;
      const noteAttributes = [...order.note_attributes, { name: key, value }];
      if (!order) {
        return;
      }
    await axios({
        method: "put",
        url: `https://dawn-store-1.myshopify.com/admin/orders/${order_id}.json?access_token=${process.env.ACCESS_TOKEN}`,
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

  export default updateOrder