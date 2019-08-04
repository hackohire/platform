import UserService from 'service/user'

export default {
  createUser: (_, args, context) => {
    const userService = UserService.build(context.db, context.loaders)
    return userService.create(args.user)
  }
}