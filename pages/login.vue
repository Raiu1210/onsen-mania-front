<template>
  <v-card width="400px" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account-circle"
          v-model="username"
          label="ユーザ名"
        />

        <v-text-field
          v-bind:type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          prepend-icon="mdi-lock"
          append-icon="mdi-eye-off"
          v-model="password"
          label="パスワード"
        />

        <v-row justify="center" class="my-2">
          <v-card-actions>
            <v-btn class="primary" @click="login">ログイン</v-btn>
          </v-card-actions>
        </v-row>

      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-row justify="center" class="my-2">
      <v-card-actions>
        <v-btn class="accent" @click="gotoSignUp">新規登録</v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>


<script>
import {axiosInstance as Api} from '~/myModules/api'
import $cookies from "cookie-universal-nuxt";

export default {
  data() {
    return {
      username:'',
      password: '',
      showPassword : false,
    }
  },
  methods: {
    async login() {
      let formData = new FormData()
      formData.append("username", this.username)
      formData.append("password", this.password)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        }
      };
      const res = await Api.post("/users/login", formData, config)
      this.$cookies.set("jwt-token", res['data']['access_token'])
      this.$router.push('/')
    },
    gotoSignUp() {
      this.$router.push('/signup')
    }
  }
}
</script>
