import { Request, Response } from 'express';
import Tour from '../models/Tour';

// Obtener todos los tours
export const getTours = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tours', error });
  }
};

// Obtener un tour por ID
export const getTourById = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour no encontrado' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el tour', error });
  }
};

// Crear un nuevo tour
export const createTour = async (req: Request, res: Response) => {
  try {
    const tour = new Tour(req.body);
    await tour.save();
    res.status(201).json({ message: 'Tour registrado', tour });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tour', error });
  }
};

// Actualizar un tour
export const updateTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tour) {
      return res.status(404).json({ message: 'Tour no encontrado' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tour', error });
  }
};

// Eliminar un tour
export const deleteTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour no encontrado' });
    }
    res.json({ message: 'Tour eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tour', error });
  }
};