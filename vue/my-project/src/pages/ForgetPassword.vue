<template>
  <div class="container">
    <h3>Recuperar Senha</h3>
    <div class="form-sec">
      <form class="form" id="qryform" name="form" method="post">
        <div class="form-group">
          <label>E-mail:</label>
          <input v-model="email" type="email" class="form-control" id="email" name="email">
        </div>
        <div class="row">
          <div v-if="isLoading" class="col">
            <div class="btn btn-secondary" @click="validateEmail()" disabled>{{saveBtn}}</div>
          </div>
          <div v-if="!isLoading" class="col">
            <div class="btn btn-primary" @click="validateEmail()">{{saveBtn}}</div>
          </div>
          <div class="col-9">
            <button @click="goBack()" type="submit" class="btn btn-default">Voltar</button>
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
        email: "",
        saveBtn: "Salvar",
        isLoading: false
      };
    },
    methods: {
      resetPassword(){
        if (this.isLoading) return

        this.saveBtn = 'Enviando...'
        this.isLoading = true
        DatabaseService.resetPassword(this.email)
          .then(result => {
            this.saveBtn = 'Salvar'
            this.isLoading = false
            this.$dialog.confirm({
              body: '',
              title: 'Email enviado!',
              },
              {
                okText: 'Voltar para o login',
                cancelText: ' Cancelar'
              }
            ).then(dialog => {
              this.$router.push({name: "Signin"})
            })
            .catch(e => {});
          })
          .catch(e => {})
      },
      validateEmail() 
      {
        const re = /\S+@\S+\.\S+/;
        if (re.test(this.email)) return this.resetPassword()
        else alert('Email inválido!')
      },
      handleError(){
        alert('Ops, estamos com problemas no nosso servidor, tente novamente mais tarde!')
      },
      goBack() {
        this.$router.push({
          name: 'Signin'
        })
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
