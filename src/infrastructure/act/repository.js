import { ApolloError } from 'apollo-server'
import { head } from 'ramda'
import Act from 'model/act'

export default class ActRepository {
  constructor(db) {
    this.act_collection = db.collection(Act.name.toLowerCase())
  }

  async add(act) {
    const insertedDocument = await this.act_collection
      .insertOne(act.toJSON())
      .then(res => head(res.ops))
    return new Act(insertedDocument)
  }

  async addMany(acts) {
    const insertedDocuments = await this.act_collection
      .insertMany(acts.map(act => act.toJSON()))
      .then(res => res.ops)
    return insertedDocuments.map(insertedDocument => new Act(insertedDocument))
  }

  async load(id) {
    const loadedDocument = await this.act_collection
      .findOne({ _id: id })
    if (!loadedDocument) {
      throw new ApolloError('Act not found', 'NOT_FOUND')
    } else {
      return new Act(loadedDocument)
    }
  }

  async loadByIds(ids) {
    const loadedDocuments = await this.act_collection
      .find({ _id: { $in: ids } })
      .toArray()
    return loadedDocuments.map(loadedDocument => new Act(loadedDocument))
  }

  async loadByMeditationsIds(meditationIds) {
    const loadedActs = await this.act_collection
      .find({ meditationId: { $in: meditationIds } })
      .toArray()
    return loadedActs.map(act => new Act(act))
  }

  async replace(act) {
    const replacedDocument = await this.act_collection
      .replaceOne({ _id: act._id }, act)
      .then((res) => {
        if (res.matchedCount !== 1) {
          throw new ApolloError('Act not found', 'NOT_FOUND')
        } else {
          return head(res.ops)
        }
      })
    return new Act(replacedDocument)
  }

  async delete(id) {
    await this.act_collection
      .deleteOne({ _id: id })
      .then((res) => {
        if (res.deletedCount !== 1) {
          throw new ApolloError('Act not found', 'NOT_FOUND')
        }
      })
  }

  async deleteMany(ids) {
    await this.act_collection
      .deleteMany({ _id: { $in: ids } })
      .then((res) => {
        if (res.deletedCount < 1) {
          throw new ApolloError('Acts not found', 'NOT_FOUND')
        } return res
      })
  }
}
