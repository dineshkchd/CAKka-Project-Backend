let Manager = require("../model/Manager");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const nodemailer = require("nodemailer");




const managerUtils = {
  ManagerRegister: async (data) => {
    let { name, email, phone, password } = data;

    if (!data) {
      return { status: false, message: "No Data" };
    }

    try {
      let managerRef = new Manager({
        name,
        email,
        phone,
        password: md5(password),
      });

      let saveData = await managerRef.save();
      if(saveData){
        const transporter = nodemailer.createTransport({
            host: 'mail.capka.co.in',
            port: 465,
            secure: true,
            auth: {
              user: "info@capka.co.in",
              pass: "Dinesh@109c",
            },
            tls: {
              rejectUnauthorized: false, // ignore unauthorized certificates (for testing)
            },
          });
          const customerMailOptions = {
            from: "info@capka.co.in",
            to: email,
            subject: "Manager Register Success",
            text: `Hello ${name},\n\nYour registration is successful.\n\nUsername: ${email}\nPassword: ${password}\n\nThank you!`, // Plain text body
            html: `<p>Hello ${name},</p><p>Your registration is successful.</p><p><strong>Username:</strong> ${email}</p><p><strong>Password:</strong> ${password}</p><p>Thank you!</p>` // HTML body
          };
          let info = await transporter.sendMail(customerMailOptions);
          console.log("Email sent:", info.response)
      }
      
      return {
        status: true,
        message: "Manager Register Success",
        data: saveData,
      };
    } catch (err) {
      return {
        status: false,
        message: "Error registering manager",
        error: err,
      };
    }
  },

  ManagerLogin: async (data) => {
    let { email, password } = data;

    try {
      let response = await Manager.findOne({
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

  ChangePassword: async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { oldPassword, NewPassword, _id } = data;

            // Check if inputs are valid
            if (!oldPassword || !NewPassword || !_id) {
                return resolve({ status: false, message: "Invalid input parameters" });
            }

            // Create the query object
            let queryObject = { _id: _id, password: md5(oldPassword) };

            // Find the manager by old password
            let result = await Manager.findOne(queryObject);

            if (!result) {
                return resolve({ status: false, message: "Invalid old password" });
            }

            // Create the update object
            let saveDataObj = {
                password: md5(NewPassword),
            };

            // Update the manager's password
            let updateResult = await Manager.findByIdAndUpdate({ _id: _id }, { $set: saveDataObj });

            if (!updateResult) {
                return resolve({ status: false, message: "Password not changed" });
            } else {
                return resolve({ status: true, message: "Password changed successfully" });
            }

        } catch (error) {
            console.error("Error occurred:", error);
            return reject({ status: false, message: "Error: password not changed" });
        }
    });
}

}

module.exports = { ...managerUtils };
