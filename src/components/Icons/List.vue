<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="33" viewBox="0 0 30.61 38.962">
    <title>Milhas</title>
    <g id="prefix__list" transform="translate(-47.037)">
      <g id="prefix__Grupo_100" data-name="Grupo 100" transform="translate(47.037)">
        <g id="prefix__Grupo_99" data-name="Grupo 99">
          <path
            id="prefix__Caminho_213"
            d="M73.752 5.1h-3.525V3.528c0-.51-.557-.742-1.067-.742h-2.736A4.149 4.149 0 0 0 62.3 0a4.22 4.22 0 0 0-4.128 2.783h-2.69c-.51 0-1.02.232-1.02.742V5.1h-3.529a3.942 3.942 0 0 0-3.9 3.757v26.58a3.732 3.732 0 0 0 3.9 3.525h22.819a3.732 3.732 0 0 0 3.9-3.525V8.862a3.942 3.942 0 0 0-3.9-3.762zm-17.439-.459h2.551a1.021 1.021 0 0 0 .881-.835A2.69 2.69 0 0 1 62.3 1.719a2.643 2.643 0 0 1 2.5 2.087 1.02 1.02 0 0 0 .928.835h2.644v3.71H56.313zm19.479 30.8a1.881 1.881 0 0 1-2.041 1.67H50.933a1.881 1.881 0 0 1-2.041-1.67V8.862a2.087 2.087 0 0 1 2.041-1.9h3.525v2.363a.974.974 0 0 0 1.02.881H69.16a1.02 1.02 0 0 0 1.067-.881V6.96h3.525a2.087 2.087 0 0 1 2.041 1.9v26.577z"
            :fill="color"
            data-name="Caminho 213"
            transform="translate(-47.037)"
          />
          <path
            id="prefix__Caminho_214"
            d="M106.468 230.6a.928.928 0 0 0-1.3-.046l-2.968 2.829-1.252-1.3a.928.928 0 0 0-1.3-.046.974.974 0 0 0 0 1.345l1.9 1.948a.835.835 0 0 0 .649.278.927.927 0 0 0 .649-.278l3.618-3.432a.881.881 0 0 0 .054-1.245q-.018-.027-.05-.053z"
            :fill="color"
            data-name="Caminho 214"
            transform="translate(-94.734 -209.866)"
          />
          <path
            id="prefix__Caminho_215"
            d="M210.143 256.034h-10.667a.928.928 0 1 0 0 1.855h10.667a.928.928 0 1 0 0-1.855z"
            :fill="color"
            data-name="Caminho 215"
            transform="translate(-185.098 -233.305)"
          />
          <path
            id="prefix__Caminho_216"
            d="M106.468 147.009a.928.928 0 0 0-1.3-.046l-2.968 2.829-1.252-1.3a.928.928 0 0 0-1.3-.046.974.974 0 0 0 0 1.345l1.9 1.948a.835.835 0 0 0 .649.278.927.927 0 0 0 .649-.278l3.618-3.432a.881.881 0 0 0 .054-1.245q-.018-.028-.05-.053z"
            :fill="color"
            data-name="Caminho 216"
            transform="translate(-94.734 -133.695)"
          />
          <path
            id="prefix__Caminho_217"
            d="M210.143 172.442h-10.667a.928.928 0 1 0 0 1.855h10.667a.928.928 0 1 0 0-1.855z"
            :fill="color"
            data-name="Caminho 217"
            transform="translate(-185.098 -157.134)"
          />
          <path
            id="prefix__Caminho_218"
            d="M106.468 314.192a.928.928 0 0 0-1.3-.046l-2.968 2.829-1.252-1.3a.928.928 0 0 0-1.3-.046.974.974 0 0 0 0 1.345l1.9 1.948a.835.835 0 0 0 .649.278.928.928 0 0 0 .649-.278l3.618-3.432a.881.881 0 0 0 .054-1.245q-.018-.027-.05-.053z"
            :fill="color"
            data-name="Caminho 218"
            transform="translate(-94.734 -286.037)"
          />
          <path
            id="prefix__Caminho_219"
            d="M210.143 339.626h-10.667a.928.928 0 1 0 0 1.855h10.667a.928.928 0 1 0 0-1.855z"
            :fill="color"
            data-name="Caminho 219"
            transform="translate(-185.098 -309.476)"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "List",
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
