const Task = require("../model/Task");

const taskUtils = {
  AddTask: (data) => {
    return new Promise((resolve, reject) => {
      const { task, employee_id, task_status } = data;
      if (!data) {
        return resolve({ status: false, message: "no data" });
      }

      const taskRef = new Task({ task, employee_id, task_status });

      taskRef
        .save()
        .then((savedData) => {
          resolve({
            status: true,
            message: "Task added successfully",
            data: savedData,
          });
        })
        .catch((err) => {
          resolve({
            status: false,
            message: "Task addition failed",
            error: err,
          });
        });
    });
  },

  getTasks: (task_id) => {
    return new Promise((resolve, reject) => {
      let query = { _id: { $eq: task_id } };
      let populate = [
        {
          path: "employee_id",
          select: "name phone",
        },
      ];

      Task.find(query)
        .populate(populate)
        .exec()
        .then((data) => {
          if (!data || data.length === 0) {
            resolve({ status: false, message: "No data found" });
          } else {
            resolve({ status: true, data });
          }
        })
        .catch((err) => {
          reject({ status: false, data: err, message: "An error occurred" });
        });
    });
  },

  AllGetTasks: () => {
    return new Promise((resolve, reject) => {
      Task.find({})
        .exec()
        .then((data) => {
          if (!data || data.length === 0) {
            return reject(new Error("No tasks found"));
          }
          return resolve(data);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  TaskStatusChange: (data) => {
    return new Promise(async (resolve, reject) => {
      let { task_status, task_id } = data;
      let query = { _id: { $eq: task_id } };
      let result = await Task.findOne(query);

      if (!result) {
        return reject(new Error("Task not found"));
      }
      let saveDataObj = {
        task_status: task_status,
      };

      let updateResult = await Task.findByIdAndUpdate(
        { _id: task_id },
        { $set: saveDataObj }
      );

      if (!updateResult) {
        return resolve({ status: false, message: "Task Status Not Change" });
      } else {
        return resolve({
          status: true,
          message: "Task Status Change",
        });
      }
    });
  },
  





};

module.exports = { ...taskUtils };
