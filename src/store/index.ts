import { createStore } from 'vuex'
import { RootState } from './types'
import authModule from './modules/auth';
import coachesModule from './modules/coaches';

export default createStore<RootState>({
  modules: {
    auth: authModule,
    coaches: coachesModule
  }
})
