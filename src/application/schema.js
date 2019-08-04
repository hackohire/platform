import { mergeTypes } from 'merge-graphql-schemas'
import actSchema from 'application/act'
import meditationSchema from 'application/meditation'
import authenticationSchema from 'application/authentication'
import userSchema from 'application/user'

export default mergeTypes(
  [
    actSchema,
    meditationSchema,
    authenticationSchema,
    userSchema
  ],
  { all: true },
)
