// Packages
import express from 'express';

// Middlewares
import protect from '../middlewares/protect';

// Controllers
import { predictController } from '../controllers/index';

const { getAllPredicts, getPredict, addPredict, analysisPredict } =
  predictController;

// Router Initialization
const router = express.Router({ mergeParams: true });
router.use(protect);
// Get All Reviews Route
router.get('/', getAllPredicts);

// Get Review Route
router.get('/:idPredict', getPredict);

router.post('/analysis-predict', analysisPredict);
router.post('/', addPredict);

export default router;
