import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EstudiantePorGrupo} from '../models';
import {EstudiantePorGrupoRepository} from '../repositories';

export class UsuarioPorGrupoController {
  constructor(
    @repository(EstudiantePorGrupoRepository)
    public estudiantePorGrupoRepository : EstudiantePorGrupoRepository,
  ) {}

  @post('/estudiante-por-grupos')
  @response(200, {
    description: 'EstudiantePorGrupo model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstudiantePorGrupo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstudiantePorGrupo, {
            title: 'NewEstudiantePorGrupo',
            exclude: ['id'],
          }),
        },
      },
    })
    estudiantePorGrupo: Omit<EstudiantePorGrupo, 'id'>,
  ): Promise<EstudiantePorGrupo> {
    return this.estudiantePorGrupoRepository.create(estudiantePorGrupo);
  }

  @get('/estudiante-por-grupos/count')
  @response(200, {
    description: 'EstudiantePorGrupo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstudiantePorGrupo) where?: Where<EstudiantePorGrupo>,
  ): Promise<Count> {
    return this.estudiantePorGrupoRepository.count(where);
  }

  @get('/estudiante-por-grupos')
  @response(200, {
    description: 'Array of EstudiantePorGrupo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstudiantePorGrupo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstudiantePorGrupo) filter?: Filter<EstudiantePorGrupo>,
  ): Promise<EstudiantePorGrupo[]> {
    return this.estudiantePorGrupoRepository.find(filter);
  }

  @patch('/estudiante-por-grupos')
  @response(200, {
    description: 'EstudiantePorGrupo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstudiantePorGrupo, {partial: true}),
        },
      },
    })
    estudiantePorGrupo: EstudiantePorGrupo,
    @param.where(EstudiantePorGrupo) where?: Where<EstudiantePorGrupo>,
  ): Promise<Count> {
    return this.estudiantePorGrupoRepository.updateAll(estudiantePorGrupo, where);
  }

  @get('/estudiante-por-grupos/{id}')
  @response(200, {
    description: 'EstudiantePorGrupo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstudiantePorGrupo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EstudiantePorGrupo, {exclude: 'where'}) filter?: FilterExcludingWhere<EstudiantePorGrupo>
  ): Promise<EstudiantePorGrupo> {
    return this.estudiantePorGrupoRepository.findById(id, filter);
  }

  @patch('/estudiante-por-grupos/{id}')
  @response(204, {
    description: 'EstudiantePorGrupo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstudiantePorGrupo, {partial: true}),
        },
      },
    })
    estudiantePorGrupo: EstudiantePorGrupo,
  ): Promise<void> {
    await this.estudiantePorGrupoRepository.updateById(id, estudiantePorGrupo);
  }

  @put('/estudiante-por-grupos/{id}')
  @response(204, {
    description: 'EstudiantePorGrupo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estudiantePorGrupo: EstudiantePorGrupo,
  ): Promise<void> {
    await this.estudiantePorGrupoRepository.replaceById(id, estudiantePorGrupo);
  }

  @del('/estudiante-por-grupos/{id}')
  @response(204, {
    description: 'EstudiantePorGrupo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estudiantePorGrupoRepository.deleteById(id);
  }
}
