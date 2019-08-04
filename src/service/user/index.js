

import { ApolloError } from 'apollo-server'
import { indexBy, groupBy, prop } from 'ramda'
import UserRepository from 'infrastructure/user/repository'
import { createDomainInputError } from 'service/domainFunctions'
import User from 'model/user'

export default class UserService {
    
  constructor(userRepository) {
    this.userRepository = userRepository
    // this.loaders = loaders
  }

  static build(db, loaders) {
    return new UserService(
      new UserRepository(db),
    //   loaders,
    )
  }

  async create(createInput) {
    const act = new User(createInput)

    const actValidation = act.validate()
    if (!actValidation.valid) {
      throw createDomainInputError(actValidation.errors)
    }

    const addedUser = await this.userRepository.add(act)
    // this.loaders.actLoader.clear(act._id)
    return addedUser.toJSON()
  }

  async loadByIds(ids) {
    const loadedUsers = await this.userRepository.loadByIds(ids)
    const actsById = indexBy(prop('_id'), loadedUsers.map(act => act.toJSON()))
    return ids.map(actId => actsById[actId])
  }

  async loadByMeditationsIds(meditationIds) {
    const loadedUsers = await this.userRepository.loadByMeditationsIds(meditationIds)
    const actsByMeditationId = groupBy(prop('meditationId'), loadedUsers.map(act => act.toJSON()))
    return meditationIds.map(meditationId => actsByMeditationId[meditationId])
  }

  async update(updateInput) {
    const { id, ...propertiesToUpdate } = updateInput
    const loadedUser = await this.userRepository.load(id)

    for (const propertyKey of Object.keys(propertiesToUpdate)) { // eslint-disable-line no-restricted-syntax
      loadedUser[propertyKey] = propertiesToUpdate[propertyKey]
    }

    const actValidation = loadedUser.validate()
    if (actValidation.valid) {
      const replacedDocument = await this.userRepository.replace(loadedUser)
    //   this.loaders.actLoader.clear(loadedUser._id)
      return replacedDocument.toJSON()
    } else {
      throw createDomainInputError(actValidation.errors)
    }
  }

  async delete(id) {
    const act = await this.userRepository.load(id)

    if (act) {
      const actsInMeditation = await this.userRepository.loadByMeditationsIds([act.meditationId])
      if (actsInMeditation.length > 1) {
        await this.userRepository.delete(id)
        // this.loaders.actLoader.clear(id)
        // this.loaders.meditationUsersLoader.clear(act.meditationId)
      } else {
        throw new ApolloError('Meditation must have at least one User', 'BAD_USER_INPUT')
      }
    } else {
      throw new ApolloError('User not found', 'NOT_FOUND')
    }
  }
}
