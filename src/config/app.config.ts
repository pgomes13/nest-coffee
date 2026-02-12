import Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  validationSchema: Joi.object({
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
  }),
}));
