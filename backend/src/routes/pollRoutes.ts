import { Router } from 'express'
import { createPoll, getPolls, getPollById, vote } from '../controllers/pollController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.get('/', getPolls)
router.get('/:id', getPollById)
router.post('/', authenticateToken, createPoll)
router.post('/:id/vote', authenticateToken, vote)

export default router
