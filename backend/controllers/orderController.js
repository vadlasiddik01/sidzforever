import orderModel from '../models/orderModel.js';
import UserModel from '../models/userModel.js';
import Stripe from 'stripe';
import razorpay from 'razorpay';

// global variables
const currency = 'usd';
const deliveryCharges = 10; // Delivery charges in AED

// Stripe payment configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance= new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY
})

// Place order using COD method --> /api/order/place
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });
    res.status(200).json({
      success: true,
      message: 'Order placed successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Place order using Stripe method --> /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    res.status(200).json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// verify Stripe payment success or failure --> /api/order/verifyStripe
export const verifyStrpePayment = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });

      await UserModel.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({
        success: true,
        message: 'Payment successful',
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({
        success: false,
        message: 'Payment failed',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Place order using Razorpay method --> /api/order/razorpay
export const placeOrderRazorpay = async (req, res) => {
  try{
    const {userId, items, amount, address } = req.body;

    const orderData={
      userId,
      items,
      amount,
      address,
      paymentMethod:"Razorpay",
      payment:false,
      date:Date.now()
    }
    
    //tosave into model
    const newOrder= new orderModel(orderData)
    await newOrder.save()

    const options ={
      amount:amount * 100,
      currency:currency.toUpperCase(),
      receipt:newOrder._id.toString()
    }

    await razorpayInstance.orders.create(options, (error, order)=>{
      if (error) {
      console.log(error)
      return res.json({success:false, message: error})
      }
      res.status(200).json({success: true, order})
      })
      } catch (error){
      console.log(error);
      res.status(500).json({
      success: false,
      message: error.message,
    });
      }
};

export const verifyRazorpay= async(req,res)=>{
  try{
    const{userId, razorpay_order_id} =req.body

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status==='paid'){
      await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      await orderModel.findByIdAndUpdate(userId, {cartData:{}})
    }
  }catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }


};

// Get all order data for admin panel --> /api/order/list
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// user order data for frontend --> /api/order/userorders
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// upadae order status --> /api/order/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { orderStatus });
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
