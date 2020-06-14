<template>
  <div>
    <header>
      <div class="header-container">
        <img
          src="https://i.ibb.co/89xJRGc/super-Milhas-removebg-preview.png"
          alt="Avatar"
          class="avatar"
          title="Super Milhas"
        />

        <button @click="logout()" class="btn btn-logout" type="button" title="Logout">
          <Logout />
        </button>
      </div>
    </header>
    <div class="flex-content">
      <nav class="navigation">
        <ul class="navigation-list">
          <li
            class="navigation-list-item"
            v-bind:class="{ 'active-item': $route.path == '/dashboard' }"
            @click="goDash()"
          >
            <List />
          </li>
          <li
            class="navigation-list-item"
            v-bind:class="{ 'active-item': $route.path == '/example' }"
            @click="goSync()"
          >
            <Sync />
          </li>
        </ul>
      </nav>
      <main class="main">
        <section class="layout-section">
          <div class="filters-container">
            <autocomplete :search="search" placeholder="Buscar..." aria-label="Buscar..."></autocomplete>
          </div>
          <div class="view-mode">
            <button v-if="listMode" @click="toggleView()" class="btn-toggle">
              <CardViewIcon />
            </button>
            <button v-else @click="toggleView()" class="btn-toggle">
              <ListViewIcon />
            </button>
          </div>

          <div v-if="loading" class="loading-state">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
          </div>
          <div v-else>
            <transition name="fade" v-if="!rows.length || (filtering && !filteredRows.length)">
              <div class="empty-state">
                <md-icon class="empty-icon">search_off</md-icon>
                <span class="empty-state-message">Nenhum registro encontrado...</span>
              </div>
            </transition>
            <div v-else>
              <table-view
                v-if="listMode"
                :items="filtering ? filteredRows : rows"
                :shouldDelete="shouldDelete"
              />
              <card-view
                v-else
                :items="filtering ? filteredRows : rows"
                :shouldDelete="shouldDelete"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
  <!-- <div class="container">
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
  </div>-->
</template>


<script>
import DatabaseService from "@/service/DatabaseService";
import Logout from "../components/Icons/Logout.vue";
import List from "../components/Icons/List.vue";
import Sync from "../components/Icons/Sync.vue";
import CardViewIcon from "../components/Icons/CardViewIcon.vue";
import ListViewIcon from "../components/Icons/ListViewIcon.vue";
import TableView from "../components/TableView.vue";
import CardView from "../components/CardView.vue";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  components: {
    Logout,
    List,
    Sync,
    Autocomplete,
    TableView,
    CardView,
    CardViewIcon,
    ListViewIcon
  },
  data() {
    return {
      searchInput: "",
      listMode: true,
      rows: [],
      filteredRows: [],
      filtering: false,
      totalPages: 1,
      currentPage: 1,
      count: 0,
      loading: true
    };
  },
  mounted() {
    DatabaseService.getDashInfo()
      .then(result => {
        if (result.data) {
          this.rows = result.data.result;
          this.totalPages = result.data.pages;
          this.count = result.data.count;
          this.loading = false;
        }
      })
      .catch(e => {
        console.log(JSON.stringify(e));
        this.loading = false;
      });
  },
  methods: {
    toggleView() {
      this.listMode = !this.listMode;
    },
    logout() {
      this.$router.push({
        name: "Signin"
      });
    },
    goDash() {
      this.$router.push({
        name: "Dash"
      });
    },
    goSync() {
      this.$router.push({
        name: "Sync"
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
        .confirm("Tem certeza que deseja deletar ?")
        .then(dialog => {
          this.goDelete(data);
        })
        .catch(err => {
          console.error(err);
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
    searchOLD(page = 1) {
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
    },
    search(input) {
      if (input.length < 1) {
        this.filtering = false;
        return this.rows;
      }

      this.filtering = true;
      this.filteredRows = this.rows.filter(row => {
        return (
          row.contaLogin
            .toString()
            .toLowerCase()
            .startsWith(input.toLowerCase()) ||
          row.quantidade
            .toString()
            .toLowerCase()
            .startsWith(input.toLowerCase()) ||
          row.programa.nome
            .toString()
            .toLowerCase()
            .startsWith(input.toLowerCase())
        );
      });

      // return filteredRows.map(item => item.contaLogin);
    }
  }
};
</script>

<style scoped>
.header-container {
  height: 75px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
  padding: 0px 50px 0px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar {
  height: 120px;
  cursor: pointer;
}

.logo {
  height: 85px;
  width: auto;
  cursor: pointer;
}

.btn-logout {
  background: none;
}

.flex-content {
  display: flex;
  height: 100%;
}

.main {
  width: calc(100% - 60px);
  height: auto;
}

.layout-section {
  width: auto;
  height: calc(100vh - 75px);
  overflow: scroll;
  overflow-x: scroll;
}

.navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 60px;
  background-color: #003e6c;
}

.navigation-list {
  margin: 55px 0px;
  padding: 0px;
  list-style: none;
  width: 100%;
}

.navigation-list-item {
  height: 70px;
  width: auto;
  cursor: pointer;
  border-left: 0px solid transparent;
  transition: border-left 0.2s, background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.navigation-list-item:hover {
  background-color: #ffffff;
}

.navigation-list-item > svg {
  fill: #ffffff;
}

.navigation-list-item:hover > svg {
  fill: #003e6c;
}

.active-item {
  border-left: 5px solid #60e6f8;
  background-color: #ffffff;
}

.active-item > svg {
  fill: #003e6c;
}

.filters-container {
  width: auto;
  height: 100px;
  background-color: rgba(162, 102, 247, 0.05);
  display: flex;
  justify-content: flex-end;
  padding: 0px 25px;
  align-items: center;
}

.view-mode {
  height: auto;
  justify-content: flex-end;
  display: flex;
  padding: 10px 22px 0px;
}

.btn-toggle {
  border: none;
  background: none;
}

.empty-state {
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.empty-icon {
  font-size: 70px !important;
  color: gray !important;
  margin-bottom: 40px;
}

.empty-state-message {
  color: gray !important;
  font-size: 22px;
}

.loading-state {
  padding-top: 80px;
}
</style>
