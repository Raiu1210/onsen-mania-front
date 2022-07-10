<template>
  <v-card width="400px" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account-circle"
          v-model="name"
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

export default {
  data() {
    return {
      name:'',
      password: '',
      showPassword : false
    }
  },
  methods: {
    login() {
      console.log(this.name)
      console.log(this.password)
    },
    gotoSignUp() {
      this.$router.push('/signup')
    }
  }
}
</script>
