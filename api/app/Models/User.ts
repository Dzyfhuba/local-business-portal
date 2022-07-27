import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, computed, HasOne } from '@ioc:Adonis/Lucid/Orm'
import UserHasRole from './UserHasRole'
import Role from './Role'
import Database from '@ioc:Adonis/Lucid/Database'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasOne(() => UserHasRole)
  public userHasRole: HasOne<typeof UserHasRole>

  @hasOne(() => Role)
  public role: HasOne<typeof Role>

  @computed()
  public async getRole () {
    const role = await Database.from('user_has_roles')
      .join('roles', 'user_has_roles.role_id', '=', 'roles.id')
      .where('user_has_roles.user_id', this.id)
      .select('roles.role').first()
    return role.role
  }

  public async setRole (role: string) {
    const rolesOne = await Database.from('roles').where('role', role).first()
    const result = await UserHasRole.firstOrCreate(
      {
        user_id: this.id,
      },
      {
        role_id:  rolesOne.id,
      }
    )
    return result
  }
}

