const Joi  = require('joi');
const { title } = require('process');

const reportSchema = Joi.object({
    location: Joi.string().required(),
    title: Joi.string().required(),
    reportType:Joi.string().required(),
    description: Joi.string().required(),
    severity: Joi.string().required(),
    duration: Joi.string(),
    imageUrl: Joi.string().required(),
    phoneNumber: Joi.string(),
    additionalComments: Joi.string(),

});
module.exports= reportSchema;