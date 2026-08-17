import { Request, Response } from "express";
import Empresa from "../models/Empresa.js";
import { ObjectId } from "mongoose";

// Listar todas (Reto: find())
export const obtenerEmpresas = async (req: Request, res: Response) => {
  try {
    const empresas = await Empresa.find();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener empresas" });
  }
};

// Buscar una por ID (Reto: findOne())
export const obtenerEmpresa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findById(id);
    if (!empresa) return res.status(404).json({ mensaje: "No encontrada" });
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar empresa" });
  }
};

// Registrar (Reto: insertOne())
export const crearEmpresa = async (req: Request, res: Response) => {
  try {
    const nuevaEmpresa = new Empresa(req.body);
    await nuevaEmpresa.save();
    res.status(201).json({ mensaje: "Empresa registrada", empresa: nuevaEmpresa });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar" });
  }
};

// Actualizar (Reto: updateOne + $set)
export const actualizarEmpresa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const actualizada = await Empresa.findByIdAndUpdate(id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ mensaje: "No encontrada" });
    res.json({ mensaje: "Actualizada", empresa: actualizada });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar" });
  }
};

// Eliminar (Reto: deleteOne())
export const eliminarEmpresa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Empresa.findByIdAndDelete(id);
    res.json({ mensaje: "Eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};

// RETO 2: Búsqueda parcial con $regex (Obligatorio)
export const buscarEmpresas = async (req: Request, res: Response) => {
  try {
    const { texto } = req.query;
    if (!texto) return res.json([]);
    
    const empresas = await Empresa.find({
      nombre: { $regex: texto as string, $options: "i" } // i = insensible a mayúsculas
    });
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: "Error en búsqueda" });
  }
};

// RETO 1: Filtrar por vacantes > 0 (Obligatorio)
export const obtenerConVacantes = async (req: Request, res: Response) => {
  try {
    const empresas = await Empresa.find({ vacantes: { $gt: 0 } });
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: "Error al filtrar vacantes" });
  }
};