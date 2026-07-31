import { Router } from 'express';
import { getTours, getTourById, createTour, updateTour, deleteTour } from '../controllers/tourController';

const router = Router();

router.get('/', getTours);
router.get('/:id', getTourById);
router.post('/', createTour);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);

export default router;