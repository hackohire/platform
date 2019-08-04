import { ApolloError } from 'apollo-server'
import { head } from 'ramda'
import User from 'model/user'

export default class UserRepository {
  constructor(db) {
    this.user_collection = db.collection(User.name.toLowerCase())
  }

  async add(act) {
    const insertedDocument = await this.user_collection
      .insertOne(act.toJSON())
      .then(res => head(res.ops))
    return new User(insertedDocument)
  }

  async addMany(acts) {
    const insertedDocuments = await this.user_collection
      .insertMany(acts.map(act => act.toJSON()))
      .then(res => res.ops)
    return insertedDocuments.map(insertedDocument => new User(insertedDocument))
  }

  async load(id) {
    const loadedDocument = await this.user_collection
      .findOne({ _id: id })
    if (!loadedDocument) {
      throw new ApolloError('User not found', 'NOT_FOUND')
    } else {
      return new User(loadedDocument)
    }
  }

  async loadByIds(ids) {
    const loadedDocuments = await this.user_collection
      .find({ _id: { $in: ids } })
      .toArray()
    return loadedDocuments.map(loadedDocument => new User(loadedDocument))
  }

  async loadByMeditationsIds(meditationIds) {
    const loadedUsers = await this.user_collection
      .find({ meditationId: { $in: meditationIds } })
      .toArray()
    return loadedUsers.map(act => new User(act))
  }

  async replace(act) {
    const replacedDocument = await this.user_collection
      .replaceOne({ _id: act._id }, act)
      .then((res) => {
        if (res.matchedCount !== 1) {
          throw new ApolloError('User not found', 'NOT_FOUND')
        } else {
          return head(res.ops)
        }
      })
    return new User(replacedDocument)
  }

  async delete(id) {
    await this.user_collection
      .deleteOne({ _id: id })
      .then((res) => {
        if (res.deletedCount !== 1) {
          throw new ApolloError('User not found', 'NOT_FOUND')
        }
      })
  }

  async deleteMany(ids) {
    await this.user_collection
      .deleteMany({ _id: { $in: ids } })
      .then((res) => {
        if (res.deletedCount < 1) {
          throw new ApolloError('Users not found', 'NOT_FOUND')
        } return res
      })
  }
}
