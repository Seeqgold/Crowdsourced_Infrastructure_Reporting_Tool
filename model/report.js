const { required } = require('joi');
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    location:{type:String, required: true},
    title: {type : String, required: true},
    reportType:{type:String, required:false,default:"Porthole",enum:["Porthole","Streelight","Others"]},
    description:{type:String, required: false},
    severity:{type: String, default: "Minor", enum: ["Minor", "Moderate", "Severe"], required:false},
    duration:{type:String, default:"LessThanAWeek", enum: ["LessThanAWeek","OneToFourWeeks","OverAMonth"]},
    imageUrl: { type: String, required: false },
    phoneNumber:{type:String,required:false},
    additionalComments:{type:String,required:false}
});
const Report = mongoose.model('Report',reportSchema);
module.exports = Report;