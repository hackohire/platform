import { MongoClient } from 'mongodb'
import Act from 'model/act'
import Meditation from 'model/meditation'
import actFactory from 'model/act/factory'
import meditationFactory from 'model/meditation/factory'
import { createLoaders } from 'application'
import actResolvers from 'application/act/resolvers'

describe('ActResolvers', () => {
  let connection
  let db
  let loaders
  let actCollection
  let meditationCollection
  const _ = undefined

  beforeAll(async () => {
    connection = await MongoClient.connect(global.MONGO_URI, { useNewUrlParser: true })
    db = await connection.db(global.MONGO_DB_NAME)
    loaders = createLoaders(db)
    actCollection = db.collection(Act.name.toLowerCase())
    meditationCollection = db.collection(Meditation.name.toLowerCase())
  })

  beforeEach(async () => {
    await actCollection.removeMany()
    await meditationCollection.removeMany()
  })

  afterAll(async () => {
    await connection.close()
    await db.close()
  })

  it('should return an Act domain object id', async () => {
    const mockAct = actFactory()
    const resolvedActId = actResolvers.id(mockAct)
    expect(resolvedActId).toEqual(mockAct._id)
  })

  it('should return one Meditation domain object given and Act domain object', async () => {
    const mockAct = actFactory(1, { meditationId: 'foo' })
    const mockMeditation = meditationFactory(1, { id: 'foo' })
    await actCollection.insertOne(mockAct.toJSON())
    await meditationCollection.insertOne(mockMeditation.toJSON())
    const loadedMeditation = await actResolvers.meditation(mockAct, _, { db, loaders })
    expect(loadedMeditation)
      .toEqual(expect.objectContaining(mockMeditation.toJSON()))
  })
})
