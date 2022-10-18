const getters = {
  userId: state => state.user.id,
  name: state => state.user.name,
  token: state => state.user.token,
  type: state => state.user.type,
  team: state => state.user.team
}
export default getters