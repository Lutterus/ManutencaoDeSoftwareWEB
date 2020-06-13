<template>
  <div>
    <header>
      <div class="header-container">
        <!-- <Link href="/">
          <s.Logo src={logo} alt="Logo Unbox" title="Logo Unbox" />
        </Link>-->
        <img
          src="https://i.ibb.co/89xJRGc/super-Milhas-removebg-preview.png"
          alt="Avatar"
          class="avatar"
          title="Super Milhas"
        />

        <!-- <LogoutIcon title="Logout" /> -->
        <!-- logout11111  class="btn btn-default" type="button" -->
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
          <span>Exemplo</span>
        </section>
      </main>
    </div>
  </div>
</template>


<script>
import DatabaseService from "@/service/DatabaseService";
import Logout from "../components/Icons/Logout.vue";
import List from "../components/Icons/List.vue";
import Sync from "../components/Icons/Sync.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  components: {
    Logout,
    List,
    Sync
  },
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
.header-container {
  height: 75px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
  padding: 0px 50px 0px 100px;
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
  width: calc(100% - 75px);
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
</style>
