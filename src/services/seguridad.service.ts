import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { Credenciales, Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
const jwt = require('jsonwebtoken');

@injectable({ scope: BindingScope.TRANSIENT })
export class SeguridadService {


  claveSecreta = '%$%%$hjsdhssd@#';

  constructor(
    @repository(UsuarioRepository) public usuarioRepositorio: UsuarioRepository
  ) { }

  // Validar que un usuario que exista
  // Generar un token
  // Validar token


  async ValidarUsuario(credenciales: Credenciales) {

    try {

      const usuarioEncontrado = await this.usuarioRepositorio.findOne(
        {
          where: {
            email: credenciales.email,
            contrasenia: credenciales.contrasenia
          }
        }
      );

      if (usuarioEncontrado) {
        return usuarioEncontrado;
      } else {
        return false;
      }

    } catch (error) {
      console.log(error.message);
      return false;
    }

  }


  async GenerarToken(usuario: Usuario) {
    const token = jwt.sign({
      data: {
        nombre: usuario.nombre,
        email: usuario.email
      }
    }, this.claveSecreta);

    return token;

  }


  ValidarToken(token: string) {
    try {
      const datos = jwt.verify(token, this.claveSecreta);
      if (datos) {
        return datos;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }


  /*
   * Add service methods here
   */
}
