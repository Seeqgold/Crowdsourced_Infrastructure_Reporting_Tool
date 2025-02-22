const Joi  = require('joi');

const reportSchema = Joi.object({
    location: Joi.string().required(),
    title: Joi.string().required(),
    reportType:Joi.string(),
    description: Joi.string(),
    severity: Joi.string(),
    duration: Joi.string(),
    imageUrl: Joi.string(),
    phoneNumber: Joi.string(),
    additionalComments: Joi.string(),

});
module.exports= reportSchema;