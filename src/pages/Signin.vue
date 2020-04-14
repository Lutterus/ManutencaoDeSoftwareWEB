<template>
<div class="containerA">
  <div class="imgcontainerb">
    <img src="https://s3-sa-east-1.amazonaws.com/projetos-artes/thumb%2F2018%2F07%2F12%2F13%2FLogo-244574_386583_130149500_1164078634.jpg" alt="Avatar" class="avatar">
  </div>
  <div class="container login-container" align="center">
    <div class="row">
    </div>
    <div class="col-md-6 login-form-2">
        <h3>Super Milhas</h3>
        <form>
            <div class="form-group">
                <input v-model='username' type="text" class="form-control" placeholder="Seu Login" />
            </div>
            <div class="form-group">
                <input v-model='password' type="password" class="form-control" placeholder="Sua Senha" />
                <p v-if="erroLogin" class="text-sm text-danger"><small> Email ou senha incorretos, tente novamente!</small></p>
            </div>
            <div class="form-group">
                <input  @click='logar()' type="submit" class="btnSubmit" value="Login" />
            </div>
            <div class="form-group blue">
                ​
                <a @click="forgetPassword()" class="blue ForgetPwd " value="Login">Esqueceu sua senha?</a>
            </div>
        </form>
    </div>
    </div>
</div>

</template>

<script>
import DatabaseService from "@/service/DatabaseService";

export default {
  data() {
    return {
      username: "",
      password: "",
      erroLogin: false
    };
  },
  methods: {
    logar() {
      DatabaseService.signIn(this.username, this.password)
        .then(result => {
          console.log(result)
          this.$router.push("dashboard");
        })
        .catch(e => {
          this.erroLogin = true
          console.log(JSON.stringify(e))
        });
    },
    forgetPassword() {
      this.$router.push("forgetPassword");
    }
  }
};
</script>

<style scoped>
​ .login-form-2 {
  padding: 5%;
  background: #0a3158;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}

.login-form-2 h3 {
  text-align: center;
  color: #fff;
}

.login-container form {
  padding: 10%;
}

.btnSubmit {
  width: 50%;
  border-radius: 1rem;
  padding: 1.5%;
  border: none;
  cursor: pointer;
}

.login-form-2 .btnSubmit {
  font-weight: 600;
  color: #0a3158;
  background-color: #fff;
}

.login-form-2 {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}

.blue {
  color: #0a3158;
  font-weight: 600;
  text-decoration: none;
}
.ForgetPwd {
  cursor: pointer;
}
.containerA {
  margin-top: 60px;
  height: 100vh;
  background-color: #dbdbdb;
  padding: 60px;
}
</style>
