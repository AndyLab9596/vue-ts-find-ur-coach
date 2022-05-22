import { createStore } from 'vuex'
import { RootState } from './types'
import authModule from './modules/auth';

export default createStore<RootState>({
  modules: {
    auth: authModule
  }
})
