<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="!!isLoading" title="Authenticating..." fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model.trim="email" />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password" />
                </div>
                <p v-if="!isFormValid">
                    Please enter a valid email and password (must be at least 6
                    characters)
                </p>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">
                    {{ switchModeButtonCaption }}
                </base-button>
            </form>
        </base-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            email: "" as string,
            password: "" as string,
            isFormValid: true as boolean,
            error: null as string | null,
            isLoading: false as boolean,
            mode: "login" as 'login' | 'signup',
        };
    },
    computed: {
        submitButtonCaption() {
            if (this.mode === "login") {
                return "Login";
            } else {
                return "Signup";
            }
        },
        switchModeButtonCaption() {
            if (this.mode === "login") {
                return "Signup instead";
            } else {
                return "Login instead";
            }
        },
    },
    methods: {
        switchAuthMode() {
            if (this.mode === "login") {
                this.mode = "signup";
            } else {
                this.mode = "login";
            }
        },
        async submitForm() {
            this.isFormValid = true;
            if (
                !this.email.includes("@") ||
                this.email === "" ||
                this.password.length < 6
            ) {
                this.isFormValid = false;
                return;
            }
            this.isLoading = true;
            const actionPayload = {
                email: this.email,
                password: this.password,
            };

            try {
                await this.$store.dispatch(this.mode, actionPayload);
                // navigate to other page
                const redirectUrl = "/" + (this.$route.query.redirect || "coaches");
                this.$router.replace(redirectUrl);
            } catch (e) {
                if (e instanceof Error) {
                    this.error = e.message || "Failed to authenticate, Check your login data";
                } else {
                    // eslint-disable-next-line no-console
                    console.log(e);
                }
            }
            this.isLoading = false;
        },

        handleError() {
            this.error = null;
        },
    },
});
</script>

<style lang="scss" scoped>
form {
    margin: 1rem;
    padding: 1rem;

    .form-control {
        margin: 0.5rem 0;

        label {
            font-weight: bold;
            margin-bottom: 0.5rem;
            display: block;
        }

        input {
            display: block;
            width: 100%;
            border: 1px solid #ccc;
            padding: 0.15rem;
            font: inherit;

            &:focus {
                border-color: #3d008d;
                background-color: #faf6ff;
                outline: none;
            }
        }
    }
}
</style>
