<template>
  <div class="form-sec">
    <div class="row">
      <div class="col-10">
        <h3>Editando SuperMilhas</h3>
      </div>
      <div class="col">
        <button @click="backToDash()" class="btn btn-default">Voltar</button>
      </div>
    </div>
  
    <form name="qryform" id="qryform" method="post" onsubmit="return(validate());" novalidate="novalidate">
      <div class="form-group">
        <label>Nome:</label>
        <input v-model="user.nome" type="text" class="form-control" id="name" name="name" readonly>
      </div>
  
      <div class="form-group">
        <label>Programa:</label>
        <input v-model="user.program" type="text" class="form-control" id="program" name="programa" readonly>
      </div>
  
      <div class="form-group">
        <label>E-mail:</label>
        <input v-model="user.user" type="text" class="form-control" id="email" name="email" readonly>
      </div>
  
      <div class="form-group">
        <label>Milhas:</label>
        <input v-model="user.quantidade" type="number" min="50" max="1000000" class="form-control" id="miles" name="miles">
      </div>
  
      <div class="form-group">
        <label>Data Expiração:</label>
        <input v-model="user.dt_expiracao" type="date" placeholder="" class="form-control" id="dt_expiracao" name="dt_expiracao">
      </div>
  
      <div @click="save()" class="btn btn-primary">Salvar</div>
    </form>
  </div>
</template>

<script>
import DatabaseService from "@/service/DatabaseService";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  props: ["userName", "codUser", "codMile", "codPrograma"],
  components: {
    Datepicker
  },
  data() {
    return {
      user: {
        nome: this.userName,
        program: "",
        user: this.codUser,
        quantidade: 0,
        dt_expiracao: "",
        cod_programa: this.codPrograma,
        cod_milha: this.codMile
      }
    };
  },
  beforeMount() {
    DatabaseService.getMile(this.codUser, this.codMile)
      .then(result => {
        if (result.data) {
          this.user.program = result.data.nomePrograma;
          this.user.quantidade = Number(result.data.quantidade);
          this.user.dt_expiracao = result.data.expiracao;
        }
      })
      .catch(e => console.log(JSON.stringify(e)));
  },
  methods: {
    backToDash() {
      this.$router.push({
        name: "Dash"
      });
    },
    validateFilds() {
      if (this.user.milhas > 1000000) {
        this.user.milhas = 1000000;
      }
    },
    save() {
      this.validateFilds()
      DatabaseService.editMile(this.user)
      .then(result => {
        if (result.data == 'EDITED') {
          const text = `Milhas de ${this.user.user} alteradas com sucesso!`
          this.$dialog.confirm({
            body: text,
            title: 'Salvo com sucesso!',
            },
            {
              okText: 'Voltar ao Dash',
              cancelText: 'Continuar editando'
            }
          ).then(dialog => {
            this.$router.push({name: "Dash"})
          })
          .catch(e => {});
        }
      })
      .catch(e => console.log(JSON.stringify(e)));
    }
  },
  updated() {
    this.validateFilds();
  }
};
</script>

<style scoped>
.form-sec {
  padding: 80px 300px 300px 200px;
  text-align: initial;
}
</style>
