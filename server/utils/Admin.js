let Admin = require("../model/Admin");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");
let md5 = require("md5");

const adminUtils = {
  register: async (data) => {
    let { name, email, password } = data;

    if (!data) {
      return { status: false, message: "no data" };
    }

    try {
      let adminRef = new Admin({
        name,
        email,
        password: md5(password),
      });

      let saveData = await adminRef.save();
      return {
        status: true,
        message: "Admin Register Success",
        data: saveData,
      };
    } catch (err) {
      return { status: false, message: "Error registering admin", error: err };
    }
  },

  login: async (data) => {
    let { email, password } = data;

    try {
      let response = await Admin.findOne({
        email: email,
        password: md5(password),
      }).exec();
      if (!response) {
        return { status: false, message: "Invalid Credentials" };
      }
      let token = jwt.sign(
        { admin_id: response._id, is_admin: "1" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );
      return { status: true, message: "Login successful", token: token };
    } catch (err) {
      return { status: false, message: "Error logging in", error: err };
    }
  },
};

module.exports = { ...adminUtils };
