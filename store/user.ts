import { ActionTree, MutationTree, GetterTree } from 'vuex'
import {
  USER_ROLE_GENERAL,
  USER_ROLE_ADMIN,
} from 'peperomia-util/build/domain/user'

export const state = () => ({
  role: USER_ROLE_GENERAL,
})

type State = ReturnType<typeof state>

export const actions: ActionTree<any, State> = {
  setRole({ commit }, { role }) {
    console.log(role)

    commit('SET_ROLE', role)
  },
}

export const getters: GetterTree<any, State> = {
  isAdmin({ role }) {
    return role === USER_ROLE_ADMIN
  },
}

export const mutations: MutationTree<State> = {
  SET_ROLE: (state, role) => {
    state.role = role
  },
}
