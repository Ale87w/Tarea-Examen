import { Request, Response } from 'express';
import { Empresa } from '../models/Empresa.js';

// 1. Obtener todas las empresas (con filtro opcional de vacantes)
export const obtenerEmpresas = async (req: Request, res: Response) => {
  try {
    const { conVacantes } = req.query;
    
    let filtro: any = {};
    if (conVacantes === 'true') {
      filtro.vacantes = { $gt: 0 };
    }

    const empresas = await Empresa.find(filtro);
    res.json(empresas);
  } catch (error: any) {
    console.error("Error en obtenerEmpresas:", error);
    res.status(500).json({ message: 'Error al obtener empresas', error: error.message });
  }
};

// 2. Obtener una empresa por ID
export const obtenerEmpresa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findById(id);
    
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    
    res.json(empresa);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener la empresa', error: error.message });
  }
};

// 3. Crear nueva empresa
export const crearEmpresa = async (req: Request, res: Response) => {
  try {
    const nuevaEmpresa = new Empresa(req.body);
    await nuevaEmpresa.save();
    res.status(201).json({ message: 'Empresa registrada', empresa: nuevaEmpresa });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al registrar empresa', error: error.message });
  }
};

// 4. Actualizar empresa
export const actualizarEmpresa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const empresaActualizada = await Empresa.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!empresaActualizada) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    
    res.json({ message: 'Empresa actualizada', empresa: empresaActualizada });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar empresa', error: error.message });
  }
};

// 5. Eliminar empresa
export const eliminarEmpresa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resultado = await Empresa.findByIdAndDelete(id);
    
    if (!resultado) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    
    res.json({ message: 'Empresa eliminada' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar empresa', error: error.message });
  }
};

// 6. Buscar empresas por nombre (Reto 2: Búsqueda parcial)
export const buscarEmpresas = async (req: Request, res: Response) => {
  try {
    const { texto } = req.query;
    
    if (!texto) {
      return res.json([]);
    }

    // Búsqueda insensible a mayúsculas/minúsculas con Regex
    const empresas = await Empresa.find({
      nombre: { $regex: texto, $options: 'i' }
    });
    
    res.json(empresas);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al buscar empresas', error: error.message });
  }
};