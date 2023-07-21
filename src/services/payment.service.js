const Laundry = require("../models/laundry.model");
const Payment = require("../models/payment.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let validator = require("validator");
let excel = require("excel4node");
const helpidcard = require("../helper/validate_IDcard");
const helper = require("../helper/valid_date");
const moment = require('moment');
const { ObjectId } = require('mongodb');

//ยังไม่ได้ดักเรื่องราคา
const payment = async (payload, userId) => {
    try {
      let data = payload.body;
      const currentDate = new Date();
    

      let find_register = await Laundry.findOne({
        user_id: userId,
      });

      if (!find_register) {
        throw new Error( "Is Data not Found");
      
      } 
      


      const idLaundry = await Laundry.findById(find_register).select('_id ');       
      const myJSON = JSON.stringify(idLaundry).split('{"_id":"')[1];
      const myJSON2 = myJSON.split('"}')[0];
      console.log('idLaundryString:',myJSON);
  
      let payment = new Payment();
      payment.user_id = userId;
      payment.record_id = myJSON2;
      payment.payment_amount = data.payment_amount;
      payment.payment_date = currentDate;
      payment.payment_status = data.payment_status;


      if (data.payment_amount == null) {
        throw new Error("invalid payment amount to create "
        );
      }
       
        await payment.save();
         return "Payment Success"
     
    } catch (error) {
      console.log('error' ,error)
      throw error;
    }
  };

  
  const getId_payment = async (data) => {
 
    try { 
      console.log(data.id)
      let users = await User.aggregate([
      {
        $match: {_id: new ObjectId(data.id)},
      },
      {
        $project: {
          email: 1,
          user_id: {
            $toString: "$_id"
          },
        },
      },
      {
        $lookup: {
          from: 'payments',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'payment_details'
        }
      }])

      return [true, "Success",  users] 

      

    } catch (error) {
      throw error;
    }  
  }

  const paymentService = {
    payment,
    getId_payment 
  };
  
  
  module.exports = paymentService;
