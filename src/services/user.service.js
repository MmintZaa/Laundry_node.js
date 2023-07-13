const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let validator = require("validator");
const helpidcard = require("../helper/validate_IDcard");

const users = async (payload) => {
    try {
      console.log('เข้า');
      let data = payload.body;
      console.log('username', data.username)
      encryptedPassword = await bcrypt.hash(data.password, 10);

      let user = new User();
      user.username = data.username;
      user.password = encryptedPassword;
      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.id_card = data.id_card;
      user.email = data.email;
      user.clinic_name = data.clinic_name;
      user.license_number = data.license_number;
      user.objective = data.objective;
      user.confirm_data = data.confirm_data;
  
      //username , password

      if (!(data.username && data.password)) {
        throw new Error("Please complete your code")
      }
  
      let oldLogin = await User.findOne({
        username : data.username,
      });
  
      if(oldLogin){
        throw new Error("username มีในระบบแล้ว")
      }
      
      if (usernameIsValids(data.username) == false) {
         throw new Error("username ต้องมีความยาวอย่างน้อย 5 ตัวอักษร มีตัวอักษรตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ไม่มีช่องว่างหรืออักขระพิเศษ")
      }
        if (passwordIsValids(data.password) == false) {
          throw new Error("password ต้องมีความยาวอย่างน้อย 10 ตัวอักษร มีตัวอักษรตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ไม่มีช่องว่างหรืออักขระพิเศษ และตัวเลขอย่างน้อย 1 ตัวอักษรขึ้นไป")
      }

      let password = data.password;
      let username = data.username;
      
      // เป็นตัวอย่างฟังก์ชันสำหรับตรวจสอบ password
      function passwordIsValids(password) {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
       // เช็คว่า password ไม่มีช่องว่างหรืออักขระพิเศษ
        const hasWhitespace = /\s/.test(password);
        const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return  password.length >= 10 && hasUppercase == true && hasLowercase == true && hasNumber == true && !hasWhitespace && !hasSpecialCharacters;
      }
      // เป็นตัวอย่างฟังก์ชันสำหรับตรวจสอบ username
      function usernameIsValids(username) {
        const hasUppercase = /[A-Z]/.test(username);
        const hasLowercase = /[a-z]/.test(username);
       // เช็คว่า username ไม่มีช่องว่างหรืออักขระพิเศษ
       const hasWhitespace = /\s/.test(username);
       const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(username);
        return username.length >= 5 && hasUppercase == true && hasLowercase == true && !hasWhitespace && !hasSpecialCharacters;
      }


      if (!validator.isLength(data.firstname, { min: 10, max: 30 })) {
        throw new Error(
            "your input is shorter than 10 characters or longer than 30 characters",
        );
      }
  
      if (!validator.isLength(data.lastname, { min: 10, max: 30 })) {
        throw new Error(
            "your input is shorter than 10 characters or longer than 30 characters",
        );
      }


      //id_card
      if (!helpidcard.validThaiID(data.id_card)) {
        throw new Error(
          "invalid id card to create register"
        );
      }
  
      if (!validator.isLength(data.id_card, { min: 13, max: 13 })) {
        throw new Error(
            "your input is shorter than 13 characters or longer than 13 characters",
        );
      }

      let idCardNumber = data.id_card;

   

      //email

      if (!validator.isEmail(data.email)) {
        throw new Error(
          "invalid email to create register"
        );
      }
  
      if (!data.email.includes('@')) {
        throw new Error(
          "ไม่มีอักขระ @ ในข้อความ"
        );
      }
        if (!data.email.endsWith('.com')) {
          throw new Error(
            "ประโยคไม่มีสตริง "+".comอยู่หลัง"
          );
        } 

        if (emaillIsValids(data.email) == false) {
          throw new Error("email  ไม่มีช่องว่างหรืออักขระพิเศษ")
       }

       let email = data.email;
       // เป็นตัวอย่างฟังก์ชันสำหรับตรวจสอบ email
      function emaillIsValids(email) {       
       // เช็คว่า email ไม่มีช่องว่างหรืออักขระพิเศษ
       const hasWhitespace = /\s/.test(email);
       const hasSpecialCharacters = /[!#$%^&*(),?":{}|<>]/.test(email);
        return  !hasWhitespace && !hasSpecialCharacters;
      }



      if (!validator.contains(data.clinic_name)) {
        throw new Error("invalid clinic name to create register"
        );
      }
  
      if (!validator.contains(data.license_number)) {
        throw new Error( "invalid license number to create register"
        );
      }
  
      if (!validator.contains(data.objective)) {
        throw new Error( "invalid objective to create register"
        );
      }

      if (data.confirm_data = true) {
        await user.save();
        return "Creat Admin Success"
      } else {     
        return "Failed";
      }

    } catch (error) {
      console.log('error' ,error)
      throw error;
    }
  };
  
  const get_all = async () => { 
    try {      
      const users = await User.find().select('firstname lastname id_card email clinic_name license_number objective');
      let sum = 0;

      users.forEach(i => {
        sum ++;
      });
      return [true, "Success", sum, users]
   // return await User.find();
    } catch (error) {
      return error;
    }
  }

  const getId_users = async (id) => {
 
    try { 
   
        let data = id;
        let find_register = await User.findOne({
          username: data.username,
        });
  
        if (!find_register) {
          throw new Error( "Is Data not Found");
        
        } else {  
        const users = await User.findById(find_register) //.select('firstname lastname id_card email clinic_name license_number objective');       
        return [true, "Success",  users]  
        }         

    } catch (error) {
      throw error;
    }  
  }

  const update_users = async (upload) => {
 
    try {
      let data = upload;
      let find_register = await User.findOne({
        username: data.username,
      });

      if (!find_register) {
        throw new Error( "Is Data not Found");
      
      } else {
      const { firstname, lastname,id_card,email,clinic_name,license_number,objective } = data;
      await User.findOneAndUpdate({username:data.username}, { firstname, lastname,id_card,email,clinic_name,license_number,objective }, { new: true });
      return [true, "Update Success"]       
      }
    } catch (error) {
      throw error;
    }
  }

  const delete_users = async (deload) => {
 
    try {
      let data = deload;
      let find_register = await User.findOne({
        username: data.username,
      });

      if (!find_register) {
        throw new Error( "Is Data not Found");
      
      } else {
      await User.findByIdAndDelete(find_register);
      return [true, "Delete Success"]       
      }
    } catch (error) {
      throw error;
    }
  }



  

  const userService = {
    users,
    get_all,
    update_users,
    delete_users,
    getId_users,
  };
  
  
  module.exports = userService;