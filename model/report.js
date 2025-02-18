const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    location:{type:String, required: true},
    title: {type : String, required: true},
    reportType:{type:String, required:true,default:"Porthole",enum:["Porthole","Streelight","Others"]},
    description:{type:String, required: true},
    severity:{type: String, default: "Minor", enum: ["Minor", "Moderate", "Severe"]},
    duration:{type:String, default:"LessThanAWeek", enum: ["LessThanAWeek","OneToFourWeeks","OverAMonth"]},
    imageUrl: { type: String, required: true },
    phoneNumber:{type:String,required:true},
    additionalComments:{type:String,required:false}
});
const Report = mongoose.model('Report',reportSchema);
module.exports = Report;