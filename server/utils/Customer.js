let Customer = require("../model/Customer");
let moment = require("moment");
let nodemailer = require("nodemailer");

const customerUtils = {
  register: async (data) => {
    try {
      console.log("data", data);
      let { email,name } = data;

      let emailCheck = await Customer.findOne({ email, status: { $ne: 2 } });

      // Check if the email already exists
      if (emailCheck) {
        // Update existing customer information
        emailCheck.name = name; // Replace with the new name variable
        emailCheck.email = email; // Replace with the new email variable
        emailCheck.updated_at = moment().unix(); // Optional: update timestamp
      
        await emailCheck.save();
      
        return { status: true, message: "CUSTOMER_UPDATED", customer: emailCheck };
      } else {
        // Create new customer
        let newObj = {
          email,
          created_at: moment().unix(),
          // Add other fields as necessary
        };
        let CustomerRef = new Customer(newObj);

        // Save the customer data
        let savedData = await CustomerRef.save();
        console.log("savedData", savedData);

        if (savedData) {
          console.log("done");
          let queryObject = { email: { $eq: email } };
          let result = await Customer.findOne(queryObject);

          if (result) {
            console.log(result._id);
            const characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let otp = "";
            const otpLength = 6;
            for (let i = 0; i < otpLength; i++) {
              otp += characters.charAt(
                Math.floor(Math.random() * characters.length)
              );
            }
            console.log("otp", otp);
            let _id = result._id;
            console.log(_id);
            let CustomerData = {
              otp,
              updated_at: moment().unix(),
            };
            let response = await Customer.findByIdAndUpdate(
              _id,
              { $set: CustomerData },
              { new: true }
            );

            if (response) {
              try {
                const transporter = nodemailer.createTransport({
                  host: "mail.capka.co.in",
                  port: 465,
                  secure: true,
                  auth: {
                    user: "info@capka.co.in",
                    pass: "Dinesh@109c",
                  },
                  tls: {
                    rejectUnauthorized: false, // only for testing
                  },
                });

                const mailOptions = {
                  from: "info@capka.co.in",
                  to: email,
                  subject: "Your OTP for registration",
                  text: `Your OTP is: ${otp}`,
                };

                let info = await transporter.sendMail(mailOptions);
                console.log("Email sent:", info.response);
                return {
                  status: true,
                  message: `Email sent to ${email}`,
                  data: savedData,
                };
              } catch (error) {
                console.error("Error sending email:", error);
                return {
                  status: false,
                  message: "Failed to send email",
                  error,
                };
              }
            }
            console.log("data::",savedData)
            return {
              status: true,
              message: `Email sent ${email}`,
              data: savedData,
            };
          }
        }

        return {
          status: true,
          message: "Admin Register Success",
          data: savedData,
        };
      }
    } catch (error) {
      console.error("Error registering admin:", error);
      // Handle errors
      return { status: false, message: "Failed to register admin", error };
    }
  },

  verifyOTp : async(data)=>{
      let { name,phone,text,city,otp,email,_id } = data;
      console.log(data)
      let queryObject = { email: { $eq: email },otp:{$eq:otp} };
      console.log("queryObject",queryObject)
      let result = await Customer.findOne(queryObject);
      // console.log("result-",result)

      if (!result) {
          return {status: false, message:"INVALID_OTP"};
      }

      let saveDataObj ={
          name:name,
          email:email,
          phone:phone,
          message:text,
          city:city
      }
      let response = await Customer.findByIdAndUpdate(_id, { $set: saveDataObj }, { new: true });
      console.log("response",response)
      if(response){
          const transporter = nodemailer.createTransport({
              host: 'mail.capka.co.in',
              port: 465,
              secure: true,
              auth: {
                user: "info@capka.co.in",
                pass: "Dinesh@109c",
              },
              tls: {
                rejectUnauthorized: false // only for testing
              }
            });

          const mailOptions = {
              from: "info@capka.co.in",
              to: "info@capka.co.in",
              subject: "Quick Enquiry",
               html: `<p>Hello Dinesh Sir,
               <ul>
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                City: ${city}
                Message: ${text}
               </ul>
              Best regards,
              ${name}`,
          };

          try {
              let info = await transporter.sendMail(mailOptions);
              console.log('Email sent:', info.response);
              return { status: true, message: 'Thank you for your enquiry. Here are the details we received. We will get back to you shortly.', data: data }
          } catch (error) {
              console.error('Error sending email:', error);
              return { status: false, message: 'Failed to send email', error };
          }
      }
      else{
          return { status: false, message: 'Not Send Your Enquiry', data: data }
      }

  },

 contactUs: async (data) => {
    let { name, phone, email, message } = data;
  
    let newObj = {
      name,
      email,
      phone,
      message,
      created_at: moment().unix(),
    };
  
    let CustomerRef = new Customer(newObj);
  
    try {
      let savedData = await CustomerRef.save();
      console.log("savedData", savedData);
  
      if (savedData) {
        const transporter = nodemailer.createTransport({
          host: 'mail.capka.co.in',
          port: 465,
          secure: true,
          auth: {
            user: "info@capka.co.in",
            pass: "Dinesh@109c",
          },
          tls: {
            rejectUnauthorized: false // only for testing
          }
        });
  
        const mailOptions = {
          from: "info@capka.co.in",
          to: "info@capka.co.in",
          subject: "Contact Us Enquiry",
          html: `<p>Hello Dinesh Sir,</p>
                 <ul>
                   <li>Name: ${name}</li>
                   <li>Email: ${email}</li>
                   <li>Phone: ${phone}</li>
                   <li>Message: ${message}</li>
                 </ul>
                 <p>Best regards,<br>${name}</p>`,
        };
        console.log("mailOptions",mailOptions)
  
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
  
        return {
          status: true,
          message: 'Thank you for your enquiry. Here are the details we received. We will get back to you shortly.',
          data: savedData
        };
      }
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response) {
        console.error('Error sending email:', error.response);
      }
  
      return {
        status: false,
        message: 'Failed to send email or save data',
        error: error.message
      };
    }
  }
};

module.exports = { ...customerUtils };
