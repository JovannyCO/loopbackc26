import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EstudiantePorGrupo, EstudiantePorGrupoRelations} from '../models';

export class EstudiantePorGrupoRepository extends DefaultCrudRepository<
  EstudiantePorGrupo,
  typeof EstudiantePorGrupo.prototype.id,
  EstudiantePorGrupoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(EstudiantePorGrupo, dataSource);
  }
}
