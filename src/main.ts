import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// components
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);
app.component('base-spinner', BaseSpinner);
app.component('base-badge', BaseBadge);

app.use(store);
app.use(router);


app.mount('#app')
