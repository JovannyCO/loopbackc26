import {Entity, model, property} from '@loopback/repository';

class Nota {
  orden: number;
  valor: number;
}

@model()
export class EstudiantePorGrupo extends Entity {
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
  grupoId: string;

  @property({
    type: 'string',
    required: true,
  })
  usuarioId: string;

  @property({
    type: 'array',
    required: true,
    itemType: 'object',
  })
  calificacion: Nota[];


  constructor(data?: Partial<EstudiantePorGrupo>) {
    super(data);
  }
}

export interface EstudiantePorGrupoRelations {
  // describe navigational properties here
}

export type EstudiantePorGrupoWithRelations = EstudiantePorGrupo & EstudiantePorGrupoRelations;
