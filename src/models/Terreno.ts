import { PrismaClient, tipo_terreno } from '@prisma/client'; 
const prisma = new PrismaClient();

export default class Terreno {
  static async getAllTerrenos() {
    return await prisma.terreno.findMany({
      include: {
        imagenterreno: true, 
        valoracion: true,   
        reservacion: true, 
      },
    });
  }


  static async getTerrenoById(id: number) {
    return await prisma.terreno.findUnique({
      where: {
        id_terreno: id,
      },
      include: {
        imagenterreno: true,
        valoracion: true,
        reservacion: true,
      },
    });
  }

  static async createTerreno(
    ubicacion: string,
    latitud: number | null,
    longitud: number | null,
    capacidad: number,
    precio: number,
    tipo_terreno: tipo_terreno, 
    descripcion: string | null,
    publicado: boolean = true
  ) {
    return await prisma.terreno.create({
      data: {
        ubicacion,
        latitud,
        longitud,
        capacidad,
        precio,
        tipo_terreno,  
        descripcion,
        publicado,
        fecha_publicacion: new Date(), 
      },
    });
  }

  static async updateTerreno(
    id: number,
    data: Partial<{
      precio: number;
      capacidad: number;
      publicado: boolean;
      tipo_terreno: tipo_terreno; 
    }>
  ) {
    console.log('ID del terreno a actualizar:', id);
    console.log('Datos de actualización:', data);
    return await prisma.terreno.update({
      where: { id_terreno: id },
      data,
    });
  }


  static async deleteTerreno(id: number) {
    try {
      await prisma.terreno.delete({
        where: {
          id_terreno: id,
        },
      });
      return true;
    } catch (error) {
      console.error('Error eliminando terreno:', error);
      return false;
    }
  }
}
