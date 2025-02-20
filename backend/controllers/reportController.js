const Report = require('../models/report.js');
const reportSchema = require('../validations/reportValidation.js');


const createReport = async(req,res) => {
    const{location,title,reportType,description,severity,duration,imageUrl,phoneNumber,additionalComments} = req.body;
    try {
        const {error} = reportSchema.validate(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
        const report = new Report({
            location,
            title,
            reportType,
            description,
            severity,
            duration,
            imageUrl,
            phoneNumber,
            additionalComments
        })
        await report.save();
        return res.status(201).json({message:"Report successfully created"});
    } catch (error) {
        console.log("Error creating product :",error);
        return res.status(500).json({message: 'Error creating report'});
    }
}

const getReports = async(req,res)=>{
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

const getReportsBySeverity = async (req, res) => {
    try {
        let { severity } = req.query;

        if (!severity) {
            return res.status(400).json({ message: "Severity parameter is required" });
        }

        severity = severity.trim(); 
        const validSeverities = ["Minor", "Moderate", "Severe"];
        if (!validSeverities.includes(severity)) {
            return res.status(400).json({ message: "Invalid severity value" });
        }
        const reports = await Report.find({
            severity: { $regex: new RegExp(`^${severity}$`, 'i') }
        });
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching reports by severity:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const updateReport = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body; 
        const updatedReport = await Report.findByIdAndUpdate(id, updateData, {
            new: true, 
            runValidators: true 
        });

        if (!updatedReport) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json({ message: "Report updated successfully", updatedReport });
    } catch (error) {
        console.error("Error updating report:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteReport = async (req, res) => {
    try {
        const { id } = req.params; 

        
        const deletedReport = await Report.findByIdAndDelete(id);

        if (!deletedReport) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {createReport,getReports,getReportsBySeverity,updateReport,deleteReport};