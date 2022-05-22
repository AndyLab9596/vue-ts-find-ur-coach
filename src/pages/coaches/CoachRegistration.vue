<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script lang='ts'>
import CoachForm from "../../components/coaches/CoachForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    CoachForm,
  },
  methods: {
    saveData(data: {
      first: string;
      last: string;
      desc: string;
      rate: string | number;
      areas: string[];
    }) {
      this.$store.dispatch("coaches/registerCoach", data);
      // this.$router.push('/coaches')
      this.$router.replace("/coaches");
    },
  },
});
</script>

<style scoped></style>
