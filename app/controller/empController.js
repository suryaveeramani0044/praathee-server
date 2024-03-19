const EmpModel = require("../model/empModel");
exports.allEmp = async (req, res, next) => {
  try {
    const empModel = await EmpModel.find();
    return res.status(200).json({
      success: true,
      message: "All employees data retrieved successfully",
      data: empModel,
    });
  } catch (e) {
    next(e);
  }
};

exports.addEmp = async (req, res, next) => {
  try {
    let empModel = new EmpModel(req.body);
    empModel = await empModel.save();
    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: empModel,
    });
  } catch (e) {
    next(e);
  }
};

exports.updateEmp = async (req, res, next) => {
  try {
    let empModel = await EmpModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!empModel) {
      return res.status(404).json({
        success: false,
        message: "employee not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "employee details updated succesfully",
      data: empModel,
    });
  } catch (e) {
    next(e);
  }
};

exports.deleteEmp = async (req, res, next) => {
  try {
    const empModel = await EmpModel.deleteOne({ _id: req.params.id });
    return res.status(empModel.deletedCount === 1 ? 200 : 400).json({
      success: empModel.deletedCount === 1 ? true : false,
      message:
        empModel.deletedCount === 1
          ? "employee deleted succesfully"
          : "employee not found",
      count: empModel.deletedCount,
    });
  } catch (e) {
    next(e);
  }
};
