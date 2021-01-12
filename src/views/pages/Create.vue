<template>
  <div class="d-flex flex-column">
    <CpmToolbar />
    <h1 class="alg-txt-c mt-7">Cadastro de Carros</h1>
    <v-card flat class="p10 ac mt-5">
      <v-card
        flat
        class="ac align-center p15 card-style-1"
        style="width: 500px"
      >
        <div class="card-style-1 p20">
          <v-text-field
            class="mx-5"
            label="Marca do carro"
            color="deep-purple"
            aria-autocomplete="false"
            v-model="car.brand"
          ></v-text-field>

          <v-text-field
            color="deep-purple"
            class="mx-5"
            name="input-7-4"
            label="Modelo do carro"
            aria-autocomplete="false"
            v-model="car.model"
          >
          </v-text-field>

          <v-text-field
            class="mx-5"
            label="Nome do carro"
            color="deep-purple"
            aria-autocomplete="false"
            v-model="car.name"
          ></v-text-field>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="mx-5"
                v-model="date"
                label="Data de fabricação do carro"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" type="month" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>

          <v-text-field
            value="10.00"
            prefix="$"
            aria-autocomplete="false"
            class="mx-5"
            label="Preço do carro"
            color="deep-purple"
            v-model="car.price"
          ></v-text-field>

          <v-text-field
            class="mx-5"
            label="Cor do carro"
            color="deep-purple"
            aria-autocomplete="false"
            v-model="car.color"
          ></v-text-field>

          <div align="center">
            <v-btn
              class="ac mt-4"
              color="deep-purple"
              rounded
              @click="sendForm()"
              dark
              :loading="carApiLoading"
              >Cadastrar carro</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import CpmToolbar from "../../components/cpmToolbar.vue";

import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  components: { CpmToolbar },
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,

      car: {
        brand: "",
        model: "",
        name: "",
        fabrication_date: "",
        price: "",
        color: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      carApiLoading: "CarVuex/carApiLoading",
    }),
  },
  methods: {
    ...mapMutations({
      setCarApiLoading: "CarVuex/setCarApiLoading",
    }),
    ...mapActions({
      register: "CarVuex/register",
    }),
    async sendForm() {
      try {
        this.setCarApiLoading(true);

        this.car.fabrication_date = this.date;

        if (
          this.car.brand == "" ||
          this.car.model == "" ||
          this.car.name == "" ||
          this.car.fabrication_date == "" ||
          this.car.price == "" ||
          this.car.color == ""
        ) {
          this.$toast.error("Preencha todos os campos", "Ops!", {
            position: "topCenter",
          });

          this.setCarApiLoading(false);

          return;
        }

        await this.register(this.car);

        this.$toast.success("Carro cadastrado com sucesso", "Hey", {
          position: "topCenter",
        });

        this.$router.push("/Feed");

        this.setCarApiLoading(false);
      } catch (error) {
        this.setCarApiLoading(false);

        this.car.brand == "";
        this.car.model == "";
        this.car.name == "";
        this.car.fabrication_date == "";
        this.car.price == "";
        this.car.color == "";

        this.$toast.error("Erro interno do servido, tente novamente", "Ops!", {
          position: "topCenter",
        });
      }
    },
  },
};
</script>