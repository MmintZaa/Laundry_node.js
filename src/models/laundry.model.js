const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");


const LaundrySchema = mongoose.Schema({
    //userId: { type: String, default: () => uuid(), unique: true, index: true },
    user_id : { type: String, require: true},
    laundry_type: { type: String , require: true },
    laundry_weight: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true },  
    start_time  : { type: Date, required: true },  
    end_time  : { type: Date, required: true },  
},
{
  timestamps: true,
}
);



const Laundry = mongoose.model("Laundry", LaundrySchema);


module.exports = Laundry;