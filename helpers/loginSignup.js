const { collection } = require('../config/connection');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId=mongoose.Types.ObjectId;

module.exports = {
    SignUp: async (values, callback) => {
      const password = await bcrypt.hash(values.pw, 10);
      console.log('bcrypt pass:'+password);
      try {
        // Create a new product instance using the Mongoose model
        const Data = new collection({

      
            firstname: values.firstname,
            lastname: values.lastname,
            pw: password,
            email: values.email,
            phone:values.phone,
        });
  
        // Save the new product to the MongoDB collection
        await Data.save();
  
        // Retrieve the newly saved product with its generated ObjectId
        const savedUser = await collection.findOne({ _id: Data._id }).exec();
        const UserId = savedUser._id.toString();
  
        console.log(UserId);
        callback(null, UserId);
      } catch (error) {
        console.error(error);
        callback(error, null);
      }
    },
  
    Login: async (values,callback) => {
        try {
  
            const check = values.email === process.env.ADMIN_EMAIL
            const pw = await bcrypt.hash(process.env.ADMIN_PASS,10)

            
            if (check) {
              const isUser = await bcrypt.compare(values.pw,pw);
              console.log(isUser);
              if(isUser){
                
                callback(check,null)
                
              }
             else {
              let msg = "Incorrect email or password"
                callback(null,msg)
              }
            }else{
              let msg = "Incorrect email or password"
              callback(null,msg)
            } 
          } catch (error) {
            console.error(error);
            callback(error);
          }
    },


    updateProfile: async (userId, values, callback) => {
      try {
        const updatedData = await collection.updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              photo: values.filename,
            },
          }
        );
    
        if (updatedData) {
          const updatedUser = await collection.findOne({ _id: new ObjectId(userId) }).exec();
          callback(null, updatedUser);
        } else {
          console.error('No matching user found or no modification made');
          callback('No matching user found or no modification made', null);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        callback('Internal server error', null);
      }
    },
    
    
    
  };
  