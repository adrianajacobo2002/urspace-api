import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma'; // Asegúrate de importar correctamente el cliente de Prisma
import { jwtSecret, jwtExpiration } from '../config/jwtConfig';

export const login = async (req: Request, res: Response) => {
  const { email, contrasenia } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const isPasswordValid = await bcrypt.compare(contrasenia, usuario.contrasenia);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email }, 
      jwtSecret,
      { expiresIn: jwtExpiration } 
    );

    return res.json({ message: 'Login exitoso', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
};
