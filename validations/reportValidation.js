const Joi  = require('joi');
const { title } = require('process');

const reportSchema = Joi.object({
    location: Joi.string().required(),
    title: Joi.string().required(),
    reportType:Joi.string().required(false),
    description: Joi.string().required(false),
    severity: Joi.string().required(false),
    duration: Joi.string(false),
    imageUrl: Joi.string().required(false),
    phoneNumber: Joi.string(false),
    additionalComments: Joi.string(),

});
module.exports= reportSchema;