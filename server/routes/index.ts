import { Request, Response, Router } from 'express'
import { validationResult } from 'express-validator'
import VacancyModel from '../models/Vacancy'
import { vacancyValidation } from '../validations/vacancy'
const router = Router()

router.get('/vacancies', async (req: Request, res: Response) => {
    const vacancies = await VacancyModel.find()

    res.json(vacancies)
})
router.post('/vacancies', vacancyValidation, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const createdAt = new Date()

        const vacancy = new VacancyModel({ ...req.body, createdAt })

        await vacancy.save()

        res.json(vacancy)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Не удалось добавить вакансию' })
    }
})
router.get('/vacancies/:id', async (req: Request, res: Response) => {
    try {
        const vacancy = await VacancyModel.findById(req.params.id)

        if (!vacancy) {
            res.status(404).json({ message: 'Вакансия не найдена' })
        }
        res.send(vacancy)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.delete('/vacancies/:id', async (req: Request, res: Response) => {
    try {
        const vacancy = await VacancyModel.findByIdAndDelete(req.params.id)

        if (!vacancy) {
            res.status(404).json({ message: 'Вакансия не найдена' })
        }

        res.json(vacancy)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.put('/vacancies/:id', vacancyValidation, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const updatedVacancy = await VacancyModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        if (!updatedVacancy) {
            res.status(404).json({ message: 'Вакансия не найдена' })
        }

        res.json(updatedVacancy)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router
