// data-helpers.js
const { AdminCollection } = require("../config/connection");
const bcrypt = require("bcrypt");

module.exports = {
  addFile: async (data, filedata, department, callback) => {
    try {
      const newData = new AdminCollection({
        name: data.name,
        file: filedata.filename,
        sem: data.sem,
        content: data.content,
        department: department,
      });

      await newData.save();

      const savedData = await AdminCollection.findOne({
        _id: newData._id,
      }).exec();
      const DataId = savedData._id.toString();

      console.log(DataId);
      callback(null, DataId);
    } catch (error) {
      console.error(error);
      callback(error, null);
    }
  },

  getFile: async (department, callback) => {
    try {
      const notes = await AdminCollection.find({ department: department });
      console.log(notes);
      callback(null, notes);
    } catch (error) {
      console.error(error);
      callback(error, null);
    }
  },

  deleteAdminById: async (adminId) => {
    try {
      const result = await AdminCollection.deleteOne({ _id: adminId });
      console.log(`Deleted ${result.deletedCount} document`);
    } catch (error) {
      console.error("Error deleting admin document:", error);
    }
  },

  getFilesBySubject: async (subject, callback) => {
    try {
      const files = await AdminCollection.find({ name: subject }).exec();
      callback(null, files);
    } catch (error) {
      console.error(error);
      callback(error, null);
    }
  },

  getFileDetails: async (fileId, callback) => {
    const File = await AdminCollection.findOne({ _id: fileId });

    callback(File);
  },

  editProducts: async (fileId, data, newFile, callback) => {
    try {
      let updateObject = {
        name: data.name,

        year: data.year,
        sem: data.sem,
        content: data.content,
      };
      if (newFile) {
        updateObject.file = newFile.filename;
      }

      const updatedProduct = await AdminCollection.findByIdAndUpdate(
        { _id: fileId },
        {
          $set: updateObject,
        },
        { returnOriginal: false }
      );

      console.log(updatedProduct);
      callback(updatedProduct);
    } catch (error) {
      console.error("Error updating product details:", error);
      callback(error, null);
    }
  },

  checkAdmin: async (values, callback) => {
    try {
      const email = process.env.ADMIN_EMAIL;
      const check = values.email === email;
      const pw = await bcrypt.hash(process.env.ADMIN_PASS, 10);

      if (check) {
        const isUser = await bcrypt.compare(values.pw, pw);
        console.log(isUser);
        if (isUser) {
          callback({ email: email }, null);
        } else {
          let msg = "Incorrect email or password";
          callback(null, msg);
        }
      } else {
        let msg = "Incorrect email or password";
        callback(null, msg);
      }
    } catch (error) {
      console.error(error);
      callback(error);
    }
  },
};
