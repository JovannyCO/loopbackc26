// Uncomment these imports to begin using these cool features!

import { service } from "@loopback/core";
import { HttpErrors, post, requestBody } from "@loopback/rest";
import { Credenciales } from "../models";
import { SeguridadService } from "../services";

// import {inject} from '@loopback/core';


export class LoginController {
  
  constructor(
    @service(SeguridadService)
    public servicioSeguridad: SeguridadService
  ) {}


    
  @post('/autenticar', {
    responses: {
      '200': {
        description: 'Login ok'
      }
    }
  })
  async login(
    @requestBody() credenciales: Credenciales
  ) {
    
    try {
      const usuarioEncontrado = await this.servicioSeguridad.ValidarUsuario(credenciales);

      if (usuarioEncontrado) {
        // Generar token
        const token = await this.servicioSeguridad.GenerarToken(usuarioEncontrado);
        console.log(token);
        return {
          tk: token,
          data: usuarioEncontrado
        };
      } else {
        throw new HttpErrors[401]('Datos no inválidos');
      }
    } catch (error) {
      throw new HttpErrors[401]('Datos no inválidos');
    }
  }


}
