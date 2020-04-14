<template>
  <div class="container">
    <h2>SuperMilhas</h2>
    ​
    <div class="row">
      <div class="col-lg-6">
        <div class="input-group">
          <input v-model="searchInput" type="text" class="form-control" placeholder="Pesquisar...">
          <span class="input-group-btn">
            <button @click="search()" class="btn btn-default" type="button">Pesquisar</button>
            <button @click="logout()" class="btn btn-default" type="button">Logout</button>
          </span>
        </div>
      </div>
    </div>
    <br>
    <div class="table-cont">
    <b-table if="b-table" striped hover :items="rows" :fields="fields">
      <template slot="buttons" slot-scope="data">
        <div @click="shouldDelete(data.item)" class="btn btn-danger btn-sm">Excluir</div>
        <div @click="goEdit(data.item)" class="btn btn-primary btn-sm">Editar</div>
      </template>
 </b-table>
    </div>
    <div class="pag-cont">
 <b-pagination align="center" @change="changePage" :limit="totalPages" :aria-controls="'b-table'" :total-rows="count" v-model="currentPage" :per-page="rows.length">
  </b-pagination>
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
      searchInput: "",
      fields: [
        {
          key: "cod_milha",
          label: "Código"
        },
        {
          key: "contaLogin",
          label: "Login"
        },
        {
          key: "programa.nome",
          label: "Programa"
        },
        {
          key: "quantidade",
          label: "Quantidade"
        },
        {
          key: "dt_expiracao",
          label: "Data Expiração"
        },
        {
          key: "usuario.telefone",
          label: "Telefone"
        },
        "buttons"
      ],
      rows: [],
      totalPages: 1,
      currentPage: 1,
      count: 0
    };
  },
  mounted() {
    DatabaseService.getDashInfo()
      .then(result => {
        if (result.data) {
          this.rows = result.data.result;
          this.totalPages = result.data.pages;
          this.count = result.data.count;
        }
      })
      .catch(e => console.log(JSON.stringify(e)));
  },
  methods: {
    logout() {
      this.$router.push({
        name: "Signin"
      });
    },
    goEdit(data) {
      this.$router.push({
        name: "Edit",
        params: {
          userName: data.usuario.nome,
          codUser: data.contaLogin,
          codMile: data.cod_milha
        }
      });
    },
    shouldDelete(data) {
      this.$dialog
        .confirm("Tem certeza que deseja deletar ")
        .then(dialog => {
          this.goDelete(data);
        })
        .catch(err => {
          this.$dialog.alert(
            `Desculpe, algum erro aconteceu!\n${JSON.stringify(err)}`
          );
        });
    },
    goDelete(data) {
      DatabaseService.deleteMile(data.cod_milha, data.contaLogin, data.programa)
        .then(result => {
          this.refreshList();
        })
        .catch(e => console.log(JSON.stringify(e)));
    },
    sort() {},
    refreshList() {
      DatabaseService.getDashInfo()
        .then(result => {
          if (result.data) {
            this.rows = result.data.result;
            this.pages = result.data.pages;
            this.count = result.data.count;
          }
        })
        .catch(e => console.log(JSON.stringify(e)));
    },
    changePage(page) {
      this.search(page);
    },
    search(page = 1) {
      let search = "all";
      if (this.searchInput) {
        search = this.searchInput;
      }
      DatabaseService.getDashInfo(page, search)
        .then(result => {
          if (result.data) {
            this.rows = result.data.result;
            this.pages = result.data.pages;
            this.count = result.data.count;
          }
        })
        .catch(e => console.log(JSON.stringify(e)));
    }
  }
};
</script>

<style scoped>
.container {
  padding: 80px;
}

.dg-btn--ok {
  border-color: #428bca;
}

.dg-btn-loader .dg-circle {
  background-color: #428bca;
}

.table-cont{
  height: 70vh;
}
</style>
