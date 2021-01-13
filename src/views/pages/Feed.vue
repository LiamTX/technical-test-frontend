<template>
  <div class="d-flex flex-column">
    <CpmToolbar />
    <h1 class="alg-txt-c mt-7">Listagem de Carros</h1>
    <CpmTableCars />
  </div>
</template>

<script>
import CpmToolbar from "../../components/cpmToolbar.vue";
import CpmTableCars from "../../components/cpmTableCars";

export default {
  components: { CpmToolbar, CpmTableCars },
  data() {
    return {};
  },
};
</script>