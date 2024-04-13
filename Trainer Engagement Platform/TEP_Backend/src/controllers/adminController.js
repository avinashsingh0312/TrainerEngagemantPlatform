const Trainer = require("../models/trainerModel"); // Assuming you have Trainer model
const Company = require("../models/companyModel"); // Assuming you have Company model
const PurchaseOrder = require("../models/purchaseOrdersModel"); // Assuming you have PurchaseOrder model
const BusinessRequest = require("../models/businessRequestModel"); // Assuming you have BusinessRequest model
const BusinessInvoice = require("../models/businessInvoiceModel"); // Assuming you have BusinessInvoice model
const TrainerInvoice = require("../models/trainerInvoiceModel"); // Assuming you have TrainerInvoice model
const Interview = require("../models/interviewModel"); // Assuming you have Interview model
const nodemailer = require('nodemailer');
 
const getAdminDashboard = (req, res) => {
  res.send("Welcome to the Admin Dashboard");
};
 
const getTrainerDashboard = (req, res) => {
  res.send("Welcome to the Trainer Dashboard");
};
 
const getBusinessDashboard = (req, res) => {
  res.send("Welcome to the Business Dashboard");
};
 
const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
const updateTrainer = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedTrainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.status(200).json(updatedTrainer);
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
const deleteTrainer = async (req, res) => {
  const { id } = req.params;
  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
 
    // Check if the trainer has any active purchase orders
    const activePurchaseOrders = await PurchaseOrder.find({
      trainerEmail: trainer.email,
      endDate: { $gte: new Date() }, // End date is in the future
      startDate: { $lte: new Date() }, // Start date is in the past
    });
 
    if (activePurchaseOrders.length > 0) {
      return res
        .status(400)
        .json({ message: "Trainer has active purchase orders" });
    }
 
    await Trainer.findByIdAndDelete(id);
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
module.exports = {
  deleteTrainer,
};
 
const updateCompany = async (req, res) => {
  const companyId = req.params.id;
  const updatedCompanyData = req.body;
  try {
    const company = await Company.findByIdAndUpdate(
      companyId,
      updatedCompanyData,
      { new: true }
    );
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Error updating company details", error });
  }
};
 
const deleteCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    await Company.findByIdAndDelete(companyId);
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error });
  }
};
 

 
const getBusinessRequests = async (req, res) => {
  try {
    const data = await BusinessRequest.aggregate([
      {
        $lookup: {
          from: "purchaseorders", // Collection name of purchase order
          localField: "_id",
          foreignField: "businessRequestId",
          as: "purchaseOrders",
        },
      },
      {
        $match: {
          purchaseOrders: { $size: 0 }, // Filter out business requests without linked purchase orders
        },
      },
      {
        $lookup: {
          from: "companies", // Collection name of company
          localField: "uniqueId",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $addFields: {
          company: { $arrayElemAt: ["$company.companyName", 0] },
        },
      },
    ]);
 
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 
const getPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find();
    res.status(200).json(purchaseOrders);
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 



const createInterview = async (req, res) => {
  const { businessRequestId, trainerEmail, interviewDate, interviewTime, trainingBudget } = req.body;
  try {
    const trainer = await Trainer.findOne({ email: trainerEmail });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    const businessRequest = await BusinessRequest.findById(businessRequestId);
    const skill = businessRequest.technology;
    const company = await Company.findById(businessRequest.uniqueId);
    const companyName = company.companyName;
    const newInterview = new Interview({
      businessRequestId,
      trainer: trainer._id,
      companyName,
      trainerEmail,
      interviewDate,
      skill,
      amount: trainingBudget,
      interviewTime,
      interviewStatus: "Pending",
    });
    const savedInterview = await newInterview.save();

    // Send email to trainer
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'citlalli58@ethereal.email',
          pass: 'zTcWbFxjXX6NcCBEff'
      }
    });

    const mailOptions = {
      from: 'trainerEngagementPlatform@gmail.com',
      to: trainerEmail,
      subject: 'Interview Scheduled',
      text: `Dear ${trainer.name},\n\nYour interview for ${companyName} has been scheduled on ${interviewDate} at ${interviewTime}.\n\nRegards,\nTrainer Engagement Platform`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json(savedInterview);
  } catch (error) {
    console.error("Error creating interview:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const createPurchaseOrder = async (req, res) => {
  const {
    businessRequestId,
    trainerEmail,
    amount,
    status,
    startDate,
    endDate,
  } = req.body;
  try {
    const trainer = await Trainer.findOne({ email: trainerEmail });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    const newPurchaseOrder = new PurchaseOrder({
      businessRequestId,
      trainer: trainer._id,
      trainerEmail,
      amount,
      status,
      startDate,
      endDate,
    });
    const savedPurchaseOrder = await newPurchaseOrder.save();
    res.status(201).json(savedPurchaseOrder);
  } catch (error) {
    console.error("Error creating purchase order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 


const deleteBusinessRequest = async (req, res) => {
  const requestId = req.params.id;
  try {
    const deletedRequest = await BusinessRequest.findByIdAndDelete(requestId);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Business request not found" });
    }

    const businessId = deletedRequest.uniqueId;
    const company = await Company.findById(businessId);
    const companyEmail = company.email;
    
    // Send email notification to the company
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'citlalli58@ethereal.email',
          pass: 'zTcWbFxjXX6NcCBEff'
      }
    });

    const mailOptions = {
      from: 'traineEngagementPlatform@gmail.com',
      to: companyEmail,
      subject: 'Business Request Rejected',
      text: `Dear ${company.companyName},\n\nYour business request has been rejected.\n\nRegards,\nThe Admin Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ message: "Business request deleted successfully" });
  } catch (error) {
    console.error("Error deleting business request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

 
const getPurchaseOrderDetails = async (req, res) => {
  try {
    const purchaseOrdersDetails = await PurchaseOrder.aggregate([
      {
        $lookup: {
          from: "trainers",
          localField: "trainer",
          foreignField: "_id",
          as: "trainerDetails",
        },
      },
      {
        $unwind: "$trainerDetails",
      },
      {
        $lookup: {
          from: "businessrequests",
          localField: "businessRequestId",
          foreignField: "_id",
          as: "businessRequestDetails",
        },
      },
      {
        $unwind: "$businessRequestDetails",
      },
      {
        $lookup: {
          from: "companies",
          localField: "businessRequestDetails.uniqueId",
          foreignField: "_id",
          as: "companyDetails",
        },
      },
      {
        $unwind: "$companyDetails",
      },
      {
        $project: {
          trainerName: "$trainerDetails.name",
          trainerEmail: "$trainerDetails.email",
          skills: "$trainerDetails.skills",
          chargePerDay: "$trainerDetails.chargePerDay",
          companyName: "$companyDetails.companyName",
          location: "$companyDetails.location",
          companyEmail: "$companyDetails.email",
          companyPhone: "$companyDetails.phone",
        },
      },
    ]);
    if (!purchaseOrdersDetails) {
      return res.status(404).json({ message: "No purchase orders found" });
    }
    res.status(200).json(purchaseOrdersDetails);
  } catch (error) {
    console.error("Error fetching purchase orders details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 
const getTrainerInvoices = async (req, res) => {
  try {
    const trainerInvoices = await TrainerInvoice.find();
    res.json(trainerInvoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
const createBusinessInvoice = async (req, res) => {
  try {
    const {
      invoiceId,
      poId,
      businessId,
      totalAmount,
      batches,
      startDate,
      endDate,
      technologies,
      paymentStatus,
    } = req.body;
 
    await TrainerInvoice.updateMany(
      { _id: invoiceId },
      { $set: { paymentStatus: true } }
    );
    const purchaseOrder = await PurchaseOrder.findById(poId);
    const businessRequest = await BusinessRequest.findById(
      purchaseOrder.businessRequestId
    );
    const company = await Company.findById(businessRequest.uniqueId);
 
    const companyName = company.companyName;
    const amount = businessRequest.trainingBudget;
    const businessEmail = company.email;
    const newInvoice = new BusinessInvoice({
      poId,
      businessId,
      companyName,
      amount,
      batches,
      startDate,
      endDate,
      technologies,
      paymentStatus,
      businessEmail,
    });
    console.log(newInvoice);
 
    await newInvoice.save();
 
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
 
const getTechnologySell = async (req, res) => {
  try {
    const technologyData = await BusinessRequest.aggregate([
      {
        $group: {
          _id: { $toLower: { $ifNull: ["$technology", ""] } },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    const formattedData = technologyData.map((item) => ({
      technology: item._id,
      count: item.count,
    }));
    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 
const getBusinessRequestsGraph = async (req, res) => {
  try {
    const businessRequests = await BusinessRequest.find();
    const quarterlyRevenue = businessRequests.reduce((acc, request) => {
      const quarter = Math.floor((request.startDate.getMonth() + 3) / 3);
      acc[quarter - 1] = (acc[quarter - 1] || 0) + request.trainingBudget;
      return acc;
    }, Array(4).fill(0));
    res.json(quarterlyRevenue);
  } catch (error) {
    console.error("Error fetching quarterly revenue:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 
const checkPurchaseOrders = async (req, res) => {
  const { email } = req.params;
  try {
    // Check if there are any active purchase orders for the given email
    const activePurchaseOrders = await PurchaseOrder.find({
      trainerEmail: email,
      endDate: { $gte: new Date() }, // End date is in the future
      startDate: { $lte: new Date() }, // Start date is in the past
    });
 
    res.status(200).json({ hasActiveOrders: activePurchaseOrders.length > 0 });
  } catch (error) {
    console.error("Error checking purchase orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
const getCompaniesWithDeletionRequest = async (req, res) => {
  try {
    const companies = await Company.find({ deletionRequest: true });
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies with deletion request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
 
const deleteAdminCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    await Company.findByIdAndDelete(companyId);
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
 
const getDeleteTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({ requestDeletion: true });
    res.status(200).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
const deleteAdminTrainer = async (req, res) => {
  const trainerId = req.params.id;
  try {
    await Trainer.findByIdAndDelete(trainerId);
    res.json({ message: "Trainer deleted successfully" });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getInterview = async (req, res) => {
  try {
    const interview = await Interview.find();
    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const acceptInterview = async (req, res) => {
  const interviewId = req.params.id;
  try {
    // Find the interview by ID and update its status
    const interview = await Interview.findByIdAndUpdate(interviewId, { interviewStatus: 'Accepted' }, { new: true });
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    const businessRequest = await BusinessRequest.findById(interview.businessRequestId);
    const trainer = await Trainer.findById(interview.trainer);
    // Respond with the updated interview

    const brId = interview.businessRequestId ;
    const trId = interview.trainer;

    const purchaseOrder =new PurchaseOrder({
       businessRequestId : brId,
       trainer : trId,
       trainerEmail : trainer.email,
       amount : interview.amount , 
       status : false , 
       endDate : businessRequest.endDate,
       startDate : businessRequest.startDate,
    });

    const savedPurchaseOrder = await purchaseOrder.save();

    res.json(interview);
  } catch (error) {
    console.error('Error accepting interview:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Method to reject an interview
const rejectInterview = async (req, res) => {
  const interviewId = req.params.id;
  try {
    // Find the interview by ID and update its status
    const interview = await Interview.findByIdAndUpdate(interviewId, { interviewStatus: 'Rejected' }, { new: true });
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }
    // Respond with the updated interview
    res.json(interview);
  } catch (error) {
    console.error('Error rejecting interview:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
 
module.exports = {
  getAdminDashboard,
  getTrainerDashboard,
  getBusinessDashboard,
  getTrainers,
  getCompanies,
  updateTrainer,
  deleteTrainer,
  updateCompany,
  deleteCompany,
  getBusinessRequests,
  getPurchaseOrders,
  createPurchaseOrder,
  deleteBusinessRequest,
  getPurchaseOrderDetails,
  getTrainerInvoices,
  createBusinessInvoice,
  getTechnologySell,
  getBusinessRequestsGraph,
  checkPurchaseOrders,
  getCompaniesWithDeletionRequest,
  deleteAdminCompany,
  getDeleteTrainers,
  deleteAdminTrainer,
  createInterview,
  getInterview,
  acceptInterview,
  rejectInterview
};
 