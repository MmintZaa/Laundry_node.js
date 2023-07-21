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

//จองเครื่องซักผ้า
const laundryRecord = async (payload, userId) => {
    try {

      let data = payload.body;
      const startDate = new Date();
      const endDate = new Date();

      // เพิ่มอีก 30 นาที
      endDate.setMinutes(endDate.getMinutes() + 30);

      let laundry = new Laundry();
      laundry.user_id = userId;
      laundry.laundry_type = data.laundry_type;
      laundry.laundry_weight = data.laundry_weight;
      laundry.total = data.total;
      laundry.start_time = startDate;
      laundry.end_time = endDate;
      laundry.status = data.status;

      
      if (data.laundry_weight == null) {
        throw new Error("invalid laundry weight  to create "
        );
      }
      if (data.total == null) {
        throw new Error("invalid total to create "
        );
      }
       
        await laundry.save();
         return "laundryRecord ready to work"
     
    } catch (error) {
      console.log('error' ,error)
      throw error;
    }
  };

//update เวลาสิ้นสุดไม่เท่ากับปัจจุบัน 10 นาที  
  const send = async (userId) => { 
    try {   
      const endDate = new Date();   
      
      const id = await Laundry.find().select('_id');
      const end = await Laundry.find().select('end_time');
      const myJSON = JSON.stringify(end).split('end_time:')[1];
      //myJSON.setMinutes(myJSON.getMinutes() - 20);
      console.log('end_time', endDate)
    console.log('end_time', end)
   // if(endDate == myJSON){
      return id +" เวลาเหลือ 10 นาที"
   // }
   // return await User.find();
    } catch (error) {
      return error;
    }
  }



  const laundryService = {
    laundryRecord,
    send
  };
  
  
  module.exports = laundryService;

