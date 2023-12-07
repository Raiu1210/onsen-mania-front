<template>
<div>
  <v-card class="d-flex flex-column my-6 mx-auto" width="374" color="#fff">
    <v-form ref="form" v-model="valid">
      <v-card-title class="d-flex justify-center pa-0 mt-6 mb-3"
        >新規登録</v-card-title
      >
      <v-card-text class="d-flex justify-center flex-column">
        <div class="mx-9">
          <v-text-field
            label="ユーザー名"
            placeholder="15文字以内"
            outlined
            dense
            :rules="nameRules"
            v-model="username"
          ></v-text-field>
          <v-text-field
            label="メールアドレス"
            placeholder="mail@example.com"
            outlined
            dense
            :rules="mailRules"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="パスワード"
            placeholder="8文字以上の半角英数記号"
            outlined
            dense
            :rules="pwRules"
            v-model="password"
          ></v-text-field>
        </div>
        <div class="text-center">
          <v-btn class="primary" :disabled="!valid" @click="signup">登録</v-btn>
        </div>

      </v-card-text>
    </v-form>
  </v-card>

  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          登録完了!
        </v-card-title>

        <v-card-text class="mt-5">
          温泉マニアの世界へようこそ!
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="gotoMain"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</div>
</template>

<script>
import {axiosInstance as Api} from '~/myModules/api'
import $cookies from "cookie-universal-nuxt";

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      valid: false,
      dialog: false,
      nameRules: [
        (v) => !!v || "user name is required",
        (v) => (v && v.length <= 15) || "最大15文字です。",
      ],
      mailRules: [
        (v) => !!v || "mail is required",
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
      pwRules: [(v) => !!v || "password is required"],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async signup() {
      const postObj = {
        username: this.username,
        email: this.email,
        password: this.password
      }

      const res = await Api.post('/users/register', postObj)
      console.log(res)

      if(res['data']['status'] == 0) {
        this.dialog = true
      } else if(res['data']['status'] == 1) {
        alert("メールアドレスが正しくなさそうだよ")
      } else if(res['data']['status'] == 2) {
        alert("すでに登録されてるユーザ名だよ")
      }
    },
    async gotoMain() {
      this.dialog = false

      let formData = new FormData()
      formData.append("username", this.username)
      formData.append("password", this.password)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        }
      };
      const res = await Api.post("/users/login", formData, config)
      console.log(res)

      this.$cookies.set("jwt-token", res['data']['access_token'])
      this.$router.push('/home')
    }
  },
};
</script>
