<template>
  <div class="container">
    <h3>Recuperar Senha</h3>
    <div class="form-sec">
      <form class="form" id="qryform" name="form" method="post">
        <div class="form-group">
          <label>Nova Senha:</label>
          <input
            v-model="senha"
            type="password"
            class="form-control"
            id="senha"
            name="senha"
            placeholder
            required
          >
        </div>
        <div class="form-group">
          <label>Repetir Nova Senha:</label>
          <input
            v-model="confirmaSenha"
            type="password"
            class="form-control"
            id="novaSenha"
            name="novaSenha"
            placeholder
            required
          >
        </div>
        <div class="row">
          <div class="col">
            <div class="btn btn-primary" @click="validarSenha()">Salvar</div>
          </div>
          <div class="col-9">
            <button @click="goBack()" class="btn btn-default">Voltar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import DatabaseService from "@/service/DatabaseService";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  data() {
    return {
      senha: "",
      confirmaSenha: "",
      token: this.$route.params.token,
      esqueciSenha: {
        idesqueci_senha: 0,
        email: "",
        token: "",
        dt_criacao: ""
      }
    };
  },
  beforeMount() {
    DatabaseService.getNewPasswordToken(this.token)
    .then(result => {
      console.log('token: '+this.token)
      console.log('data: '+result.data)
      this.esqueciSenha = result.data;
      
    }).catch(e => {});
  },
  methods: {
    setNewPassword(){
      DatabaseService.setNewPassword(
        this.esqueciSenha.email,
        this.confirmaSenha,
        this.esqueciSenha.idesqueci_senha
      )
      .then(result => {
        this.$dialog.alert('Nova Senha cadastrada com sucesso!')
          .then(this.goBack)
          .catch(e => {});
      }).catch(e => {});
    },
    validarSenha() {
      if (this.senha != this.confirmaSenha) {
        alert("Erro! Senhas diferentes.");
      } else if (this.senha.length < 6) {
        alert("Erro! Senha inválida!");
      } else {
        this.setNewPassword()
      }

    },
    goBack() {
      this.$router.push({
        name: "Signin"
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding: 200px 300px 300px 300px;
  text-align: initial;
}

.container h3 {
  text-align: center;
}
</style>
