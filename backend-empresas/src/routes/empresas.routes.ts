import { Router } from 'express';
import { 
  obtenerEmpresas, 
  obtenerEmpresa, 
  crearEmpresa, 
  actualizarEmpresa, 
  eliminarEmpresa, 
  buscarEmpresas 
} from '../controllers/empresas.controller.js';

const router = Router();

router.get('/', obtenerEmpresas);
router.get('/buscar', buscarEmpresas); // Ruta especial para búsqueda parcial
router.get('/:id', obtenerEmpresa);
router.post('/', crearEmpresa);
router.put('/:id', actualizarEmpresa);
router.delete('/:id', eliminarEmpresa);

export default router;