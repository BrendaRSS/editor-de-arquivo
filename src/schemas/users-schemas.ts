import { UserType } from "../types";
import Joi from "joi";

export const userSchema = Joi.object<UserType>({
    nome: Joi.string().min(2).required().messages({
        'string.min': 'O nome deve ter pelo menos 3 caracteres',
        'any.required': 'O nome é obrigatório'
    }),
    idade: Joi.number().integer().min(0).required().messages({
        'number.base': 'A idade deve ser um número',
        'number.min': 'A idade não pode ser negativa',
        'any.required': 'A idade é obrigatória'
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.email': 'O e-mail deve ser válido',
        'string.email.minDomainSegments': 'O domínio do e-mail deve ter pelo menos 2 partes (ex.: example.com)',
        'string.email.tlds': 'O domínio do e-mail deve terminar em .com ou .net',
        'any.required': 'O e-mail é obrigatório'
    }),
})