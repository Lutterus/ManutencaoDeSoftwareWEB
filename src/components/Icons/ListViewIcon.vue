<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 36 36">
    <title>Visualização em Lista</title>
    <g id="Grupo_98" data-name="Grupo 98" transform="translate(-1535 -296)">
      <rect
        id="Retângulo_198"
        data-name="Retângulo 198"
        width="36"
        height="10"
        rx="2"
        transform="translate(1535 296)"
        fill="#bbb"
      />
      <rect
        id="Retângulo_199"
        data-name="Retângulo 199"
        width="23"
        height="10"
        rx="2"
        transform="translate(1535 309)"
        fill="#bbb"
      />
      <rect
        id="Retângulo_204"
        data-name="Retângulo 204"
        width="36"
        height="10"
        rx="2"
        transform="translate(1535 322)"
        fill="#bbb"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "ListViewIcon",
  props: {
    color: {
      type: String
    }
  },
  data() {
    return {
      hue: "#a266f7"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg {
  cursor: pointer;
}

svg:hover {
  fill: red;
}
</style>
