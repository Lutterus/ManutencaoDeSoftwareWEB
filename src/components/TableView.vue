<template>
  <transition name="fade">
    <md-table v-model="items" md-sort="dt_expiracao" md-sort-order="asc" class="custom-table">
      <md-table-row slot="md-table-row" slot-scope="{ item }" style="text-align: left;">
        <md-table-cell
          md-label="Nome"
          class="capitalized"
          md-sort-by="usuario.nome"
        >{{ item.usuario.nome }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="contaLogin">{{ item.contaLogin }}</md-table-cell>
        <md-table-cell
          md-label="Telefone"
          md-sort-by="usuario.telefone"
        >{{ formatPhone(item.usuario.telefone) }}</md-table-cell>
        <md-table-cell md-label="Programa" md-sort-by="programa.nome">
          <img class="program-image" :src="getImage(item.programa.nome)" />
        </md-table-cell>
        <md-table-cell
          md-label="Expiração"
          md-sort-by="dt_expiracao"
        >{{ formatDate(item.dt_expiracao) }}</md-table-cell>
        <md-table-cell
          md-label="Milhas"
          md-sort-by="quantidade"
          class="featured-miles"
        >{{ item.quantidade }}</md-table-cell>
        <md-table-cell md-label md-sort-by class="delete-icon">
          <div @click="shouldDelete(item)">
            <md-icon title="Deletar" class="delete-icon-svg">delete</md-icon>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </transition>
</template>

<script>
export default {
  name: "TableView",
  props: ["items", "shouldDelete"],
  methods: {
    getImage(program) {
      if (program === "Livelo") {
        return "https://i.ibb.co/yp8x3sX/livelooo-removebg-preview.png";
      } else if (program === "Smiles") {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Gol_Smiles_logo.svg/1200px-Gol_Smiles_logo.svg.png";
      } else if (program === "Azul")
        return "https://i.ibb.co/F3n1t2g/Webp-net-resizeimage.png";
    },
    formatPhone(phone) {
      let textoAjustado;
      const isCelular = phone.length === 9;
      if (isCelular) {
        const parte1 = phone.slice(0, 5);
        const parte2 = phone.slice(5, 9);
        textoAjustado = `${parte1}-${parte2}`;
      } else {
        const parte1 = phone.slice(0, 4);
        const parte2 = phone.slice(4, 8);
        textoAjustado = `${parte1}-${parte2}`;
      }

      return textoAjustado;
    },
    formatDate(date) {
      const currDate = new Date(date);
      return `${this.pad(
        currDate.getMonth() + 1,
        2
      )} / ${currDate.getFullYear()}`;
    },
    pad(number, length) {
      var my_string = "" + number;
      while (my_string.length < length) {
        my_string = "0" + my_string;
      }

      return my_string;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-table {
  padding: 0px 45px;
}

.program-image {
  height: 30px;
}

.capitalized {
  text-transform: capitalize;
}

.featured-miles {
  color: #003e6c;
  font-weight: bold;
  font-size: 16px;
}

.delete-icon {
  text-align: center;
  cursor: pointer;
}

.delete-icon-svg {
  color: gray !important;
}
</style>
