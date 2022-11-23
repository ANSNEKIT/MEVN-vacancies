import { body } from 'express-validator'

export const vacancyValidation = [
    body('company.name')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 40 })
        .withMessage('Неверный формат'),
    body('company.prefix')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 20 })
        .withMessage('Неверный формат'),
    body('company.src')
        .exists()
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage('Неверный формат'),
    body('name')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 50 })
        .withMessage('Неверный формат'),
    body('cardImg').exists().optional({ checkFalsy: true }).isURL().withMessage('Неверный формат'),
    body('city').exists().optional({ checkFalsy: true }).isString().trim(),
    body('employmentType').exists().isString().trim().notEmpty().withMessage('Неверный формат'),
    body('hasRemote').exists().isBoolean().withMessage('Неверный формат'),
    body('minPrice').exists().isInt().isLength({ max: 6 }).withMessage('Неверный формат'),
    body('maxPrice').exists().isInt().isLength({ max: 6 }).withMessage('Неверный формат'),
    body('description')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 500 })
        .withMessage('Неверный формат'),
    body('dateEnd').exists().trim().notEmpty().isISO8601().withMessage('Неверный формат'),
    body('timeEnd')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .isLength({ min: 5, max: 5 })
        .withMessage('Неверный формат'),
    body('description')
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 500 })
        .withMessage('Неверный формат'),
    body('dateTimeEnd').exists().notEmpty().isISO8601().toDate().withMessage('Неверный формат'),
]
