import { createStore } from 'vuex'
import { RootState } from './types'
import authModule from './modules/auth';
import coachesModule from './modules/coaches';
import requestsModule from './modules/requests';

export default createStore<RootState>({
  modules: {
    auth: authModule,
    coaches: coachesModule,
    requests: requestsModule
  }
})
