const Employee = require('../model/Empoylee'); // Assuming this is the correct import path
const nodemailer = require("nodemailer");
const md5 = require("md5"); // Assuming md5 is correctly defined or imported
const jwt = require("jsonwebtoken");




const employeeUtils = {
    EmployeeRegister: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let { name, email, phone, password } = data;

                if (!data) {
                    return resolve({ status: false, message: "No Data" });
                }

                let employeeRef = new Employee({
                    name,
                    email,
                    phone,
                    password: md5(password),
                });

                let saveData = await employeeRef.save();

                if (saveData) {
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
                        subject: "Employee Register Success",
                        text: `Hello ${name},\n\nYour registration is successful.\n\nUsername: ${email}\nPassword: ${password}\n\nThank you!`, // Plain text body
                        html: `<p>Hello ${name},</p><p>Your registration is successful.</p><p><strong>Username:</strong> ${email}</p><p><strong>Password:</strong> ${password}</p><p>Thank you!</p>` // HTML body
                    };

                    let info = await transporter.sendMail(customerMailOptions);
                    console.log("Email sent:", info.response);
                }

                resolve({
                    status: true,
                    message: "Employee Register Success",
                    data: saveData,
                });
            } catch (err) {
                console.error("Error registering employee:", err);
                reject({
                    status: false,
                    message: "Error registering employee",
                    error: err,
                });
            }
        });
    },



    EmployeeLogin: async (data) => {
        let { email, password } = data;
    
        try {
          let response = await Employee.findOne({
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


       EmployeeAllList: async () => {
        try {
            const data = await Employee.find({}).exec();
            if (!data || data.length === 0) {
                throw new Error('No data found');
            }
            return data;
        } catch (err) {
            return err;
        }
    }
};



module.exports = { ...employeeUtils };
