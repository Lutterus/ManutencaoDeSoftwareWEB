<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <img src="https://i.ibb.co/1zz1wtR/super-Milhas.png" alt="Avatar" class="avatar" />
      </div>

      <div class="form">
        <md-field>
          <label>E-mail</label>
          <md-input v-model="username" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Senha</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <a @click="forgetPassword()" class="blue ForgetPwd" value="Login">Esqueceu sua senha?</a>
        <md-button class="md-raised md-primary" @click="logar()" type="submit">Entrar</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import DatabaseService from "@/service/DatabaseService";
import Vue from "vue";

export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false
    };
  },
  methods: {
    logar() {
      this.loading = true;
      setTimeout(() => {
        DatabaseService.signIn(this.username, this.password)
          .then(result => {
            console.log(result);
            this.$router.push("dashboard");
          })
          .catch(e => {
            this.$toasted.show("E-mail ou senha incorretos", {
              type: "error",
              icon: "error_outline",
              position: "top-center",
              duration: 3000
            });
            this.loading = false;
            console.log(JSON.stringify(e));
          });
      }, 2000);
    },
    forgetPassword() {
      this.$router.push("forgetPassword");
    }
  }
};
</script>

<style scoped>
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 110vh;
}
.title {
  text-align: center;
}

.title > img {
  margin-bottom: 16px;
  height: 150px;
  width: auto;
}

.error-message {
  position: absolute;
  margin-top: -40px;
}

.actions > .md-button {
  margin: 0;
}

.actions > a {
  cursor: pointer;
}

.form {
  margin-bottom: 60px;
}

.background {
  background: #e3e3e3;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 0;
}

.md-content {
  z-index: 1;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
  background: #f7f7f7;
  border-radius: 5px;
}

.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
