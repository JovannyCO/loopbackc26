import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Grupo, GrupoRelations, Usuario, EstudiantePorGrupo} from '../models';
import {EstudiantePorGrupoRepository} from './estudiante-por-grupo.repository';
import {UsuarioRepository} from './usuario.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly usuariosgrupo: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype.id,
          EstudiantePorGrupo,
          typeof Grupo.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstudiantePorGrupoRepository') protected estudiantePorGrupoRepositoryGetter: Getter<EstudiantePorGrupoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Grupo, dataSource);
    this.usuariosgrupo = this.createHasManyThroughRepositoryFactoryFor('usuariosgrupo', usuarioRepositoryGetter, estudiantePorGrupoRepositoryGetter,);
    this.registerInclusionResolver('usuariosgrupo', this.usuariosgrupo.inclusionResolver);
  }
}
