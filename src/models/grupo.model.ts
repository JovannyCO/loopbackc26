import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {EstudiantePorGrupo} from './estudiante-por-grupo.model';

@model()
export class Grupo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Usuario, {through: {model: () => EstudiantePorGrupo}})
  usuariosgrupo: Usuario[];

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
