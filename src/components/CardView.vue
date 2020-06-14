<template>
  <div name="fade">
    <md-card v-for="item in items" :key="item.codigo">
      <div class="card-header">
        <div class="capitalized">{{item.usuario.nome}}</div>
        <span class="milhas-valor">{{item.quantidade}}</span>
      </div>

      <div class="card-body">
        <div class="left-content">
          <span>{{ item.contaLogin }}</span>
          <span class="expiration-date">{{ formatDate(item.dt_expiracao) }}</span>
        </div>
        <div class="right-content">
          <img class="program-image" :src="getImage(item.programa.nome)" />
        </div>
      </div>
      <md-card-actions>
        <md-button class="md-icon-button md-raised" @click="shouldDelete(item)">
          <md-icon>delete</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "CardView",
  props: ["items", "shouldDelete"],
  data: () => ({}),
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
.program-image {
  height: 40px;
}

.md-card {
  color: #4a4a4a;
  width: 320px;
  margin: 30px;
  display: inline-block;
  vertical-align: top;
  border: 2px solid transparent;
  cursor: pointer;
  background-color: #fafafa;
  transition: 0ms all;
}

.md-card:hover {
  border: 2px solid #60e6f8;
  background-color: #f1fdff;
}

.md-card:hover > .card-header {
  background-color: #f1fdff;
}

.capitalized {
  text-transform: capitalize;
  color: #003e6c;
  font-size: 18px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  background-color: #fafafa;
  border-bottom: none;
}

.card-body {
  display: flex;
  justify-content: space-between;
}

.left-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.right-content {
  display: flex;
  flex-direction: column;
}

.milhas-valor {
  color: #003e6c;
  font-weight: bold;
  font-size: 22px;
}

.expiration-date {
  margin-top: 10px;
}

.custom-style-button {
  background-color: transparent !important;
}

.custom-style-button > .md-icon-font {
  color: grey !important;
}
</style>
