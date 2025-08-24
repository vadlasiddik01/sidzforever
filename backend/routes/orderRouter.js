import express from 'express';
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderRazorpay,
  placeOrderStripe,
  updateOrderStatus,
  verifyRazorpay,
  verifyStrpePayment,
} from '../controllers/orderController.js';

import adminAuth from '../middlewares/adminAuth.js';
import { userAuth } from '../middlewares/userAuth.js';

const orderRouter = express.Router();

// Admin features
orderRouter.use('/list', adminAuth, getAllOrders);
orderRouter.use('/status', adminAuth, updateOrderStatus);

// Place order / Payment features
orderRouter.use('/place', userAuth, placeOrderCOD);
orderRouter.use('/stripe', userAuth, placeOrderStripe);
orderRouter.use('/razorpay',userAuth, placeOrderRazorpay);

// User features
orderRouter.use('/userorders', userAuth, getUserOrders);

// verify payment
orderRouter.use('/verifyStripe', userAuth, verifyStrpePayment);
orderRouter.use('/verifyRazorpay', userAuth, verifyRazorpay);

export default orderRouter;
