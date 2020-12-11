const Joi = require('joi');

const authSchema = Joi.object({
  category: Joi.string().pattern(
    new RegExp('Furniture' | 'Electronics' | 'Grocery')
  ),
});

module.export = authSchema;
