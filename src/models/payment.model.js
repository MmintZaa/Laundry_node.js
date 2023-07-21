const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");


const PaymentSchema = mongoose.Schema({
    //userId: { type: String, default: () => uuid(), unique: true, index: true },
    user_id : { type: String, require: true},
    payment_amount: { type: Number , require: true },
    payment_date: { type: Date, required: true },
    payment_status: { type: String, required: true },    
},
{
  timestamps: true,
}
);



const Payment = mongoose.model("Payment", PaymentSchema);


module.exports = Payment;