const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const login = async (username, password) => {
  try {
    if (username) {
      const existUser = await User.findOne({
        username,
      });
      const matched = bcrypt.compareSync(password, existUser.password);
      if (existUser && matched) {
        const token = jwt.sign(
          {
            userId: existUser.userId,
         
          },
          // "jwt-secret",
          process.env.JWT_SECRET,
          {
            expiresIn: "5d",
          }
        );
        return {
          message: "login success",
          id: existUser.userId,
          token,
        };
      } else {
        throw new Error("Invalid username or password");
      }
    } else {
      throw new Error("Invalid Username");
    }
  } catch (error) {
    throw error;
  }
};


  const create_login = async (username, password) => {
    try {
      console.log('username', username)
      console.log('password', password)
      if (!(username && password)) {
        throw new Error("Please complete your code")
      }
  
      let oldLogin = await User.findOne({
        username : username,
      });
  
      if(oldLogin){
        throw new Error("username มีในระบบแล้ว")
      }
      
      if (usernameIsValids(username) == false) {
         throw new Error("username ต้องมีความยาวอย่างน้อย 5 ตัวอักษร มีตัวอักษรตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ไม่มีช่องว่างหรืออักขระพิเศษ")
      }
        if (passwordIsValids(password) == false) {
          throw new Error("password ต้องมีความยาวอย่างน้อย 10 ตัวอักษร มีตัวอักษรตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ไม่มีช่องว่างหรืออักขระพิเศษ และตัวเลขอย่างน้อย 1 ตัวอักษรขึ้นไป")
      }
  
      encryptedPassword = await bcrypt.hash(password, 10);
      let user = new User();
      user.username = username;
      user.password = encryptedPassword;
  
      await user.save();
    

      return "Creat Admin Success"
      // เป็นตัวอย่างฟังก์ชันสำหรับตรวจสอบ password
      function passwordIsValids(password) {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
       // เช็คว่า password ไม่มีช่องว่างหรืออักขระพิเศษ
        const hasWhitespace = /\s/.test(password);
        const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return  hasUppercase == true && hasLowercase == true && hasNumber == true && !hasWhitespace && !hasSpecialCharacters;
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
  
  
    } catch (error) {
      throw new Error("Create Admin Failed")
    }
  };


const authService = {
  login,
  create_login,
};


module.exports = authService;