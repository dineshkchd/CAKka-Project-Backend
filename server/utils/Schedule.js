let Schedule = require("../model/Schedule");
let Customer = require("../model/Customer"); // Assuming Customer is your Mongoose model for customers
let moment = require('moment')
const nodemailer = require("nodemailer");
require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid,authToken);




const scheduleUtils ={
    bookSlot: async (data) => {
        try {
          const { date, time, email, name, phone } = data;
          console.log("bookSlot", date, time, email, name, phone);
    
          // Parse the date to ensure it is in the correct format
          const parsedDate = new Date(date);
          if (isNaN(parsedDate)) {
            throw new Error("Invalid date format");
          }
    
          // Find or create customer
          let customer = await Customer.findOne({ email });
          if (!customer) {
            customer = new Customer({ email, name, phone, created_at: moment().unix() });
            await customer.save();
          } else {
            // Update customer email if necessary (this example assumes email is primary key and doesn't change)
            customer.email = email;
            await customer.save();
          }
    
          let slot = await Schedule.findOne({ date: parsedDate, time });
          console.log("slot", slot);
    
          if (slot && slot) {
            return { status: 400, message: "Slot already booked" };
          }
    
          if (!slot) {
            slot = new Schedule({ date: parsedDate, time, isBooked: true });
          } else {
            slot.isBooked = true;
          }
          await slot.save();
                
          
          const adminText = `Booking Confirmation for ${customer.name} (${customer.email}) ${customer.phone} slot on ${date} at ${time} has been booked successfully.`;
          let isWhatsAppRegistered = false;
    
    
          if (phone) {
            try {
              const formattedPhone = `+91 6290658874`; // Ensure the phone number is correctly formatted
              const result = await twilioClient.lookups.v1.phoneNumbers(formattedPhone).fetch({ type: 'carrier' });
              console.log("result", result);
              isWhatsAppRegistered = result.carrier.type === 'mobile';
            } catch (error) {
              console.error("Error checking WhatsApp registration:", error);
            }
          } else {
            console.error("Phone number is missing");
          }
    
    
          if (isWhatsAppRegistered) {
            // Send WhatsApp message
            twilioClient.messages
              .create({
                body: adminText,
                from: "whatsapp:+14155238886",
                to: `whatsapp:+916290658874`, // Ensure the number is correctly formatted
              })
              .then((message) => console.log("WhatsApp message sent:", message.sid))
              .catch((err) => console.error("Error sending WhatsApp message:", err));
          } else {
            // Send SMS invitation to register for WhatsApp messages
            const twilioSmsNumber = '+yourTwilioNumber'; // Replace with your actual Twilio SMS-enabled number
            twilioClient.messages
              .create({
                body: `Hello ${name}, you have a booking on ${date} at ${time}. Please reply to this message to opt-in for WhatsApp notifications.`,
                from: twilioSmsNumber,
               
                
                to: `+91${phone}` // Ensure the number is correctly formatted
              })
              .then((message) => console.log("SMS invitation sent:", message.sid))
              .catch((err) => console.error("Error sending SMS invitation:", err));
          }
    
    
    
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
            to: customer.email,
            subject: "Booking Confirmation",
            text: `Your slot on ${date} at ${time} has been booked successfully.`,
          };
          let info = await transporter.sendMail(customerMailOptions);
          console.log("Email sent:", info.response);
          console.log("customer.email,",customer.email,)
    
          const adminMailOptions = {
            from: "info@capka.co.in",
            to: "info@capka.co.in", // Admin's email
            subject: "Booking Confirmation",
            text: adminText,
          };
          let Admininfo = await transporter.sendMail(adminMailOptions);
          console.log("Email sent:", Admininfo.response);
    
          return { status: 200, message: "Slot booked successfully" };
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },
}

module.exports ={...scheduleUtils}