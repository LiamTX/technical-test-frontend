<!-- Componente de listagem, edição e exclusão de carros -->

<template>
  <div>
    <div>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="ac"
        style="width: 800px"
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        class="elevation-1 ac mt-6"
        style="width: 800px"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.brand"
                          label="Marca"
                          color="deep-purple"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.model"
                          label="Modelo"
                          color="deep-purple"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nome"
                          color="deep-purple"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.fabrication_date"
                          label="Data de fabricação"
                          color="deep-purple"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          prefix="$"
                          v-model="editedItem.price"
                          label="Preço"
                          color="deep-purple"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.color"
                          label="Cor"
                          color="deep-purple"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="deep-purple" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="deep-purple"
                    text
                    @click="save"
                    :loading="carApiLoading"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="deep-purple" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="deep-purple"
                    text
                    @click="deleteItemConfirm"
                    :loading="carApiLoading"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="deep-purple" to="/Create"> Cadastre um carro </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false,

    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Marca",
        align: "start",
        value: "brand",
      },
      { text: "Modelo", value: "model" },
      { text: "Nome", value: "name" },
      { text: "Ano de fabricação", value: "fabrication_date" },
      { text: "Preço", value: "price" },
      { text: "Cor", value: "color" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      brand: "",
      model: 0,
      name: 0,
      fabrication_date: 0,
      price: 0,
      color: 0,
    },
    defaultItem: {
      brand: "",
      model: 0,
      name: 0,
      fabrication_date: 0,
      price: 0,
      color: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters({
      cars: "CarVuex/cars",
      carApiLoading: "CarVuex/carApiLoading",
    }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    await this.index();
    this.initialize();
  },

  methods: {
    ...mapMutations({
      setCarApiLoading: "CarVuex/setCarApiLoading",
    }),
    ...mapActions({
      getCars: "CarVuex/getCars",
      delete: "CarVuex/delete",
      edit: "CarVuex/edit",
    }),
    async index() {
      try {
        this.setCarApiLoading(true);

        await this.getCars();

        this.setCarApiLoading(false);
      } catch (error) {}
    },
    initialize() {
      this.desserts = this.cars;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        this.setCarApiLoading(true);

        this.desserts.splice(this.editedIndex, 1);
        await this.delete(this.editedItem.id);
        this.closeDelete();
        this.$toast.success("Carro deletado com sucesso", "Hey", {
          position: "topCenter",
        });

        this.setCarApiLoading(false);
      } catch (error) {
        this.setCarApiLoading(false);
        this.$toast.error("Houve um erro ao tentar deletar o carro", "Ops", {
          position: "topCenter",
        });
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      try {
        this.setCarApiLoading(true);

        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
          
          await this.edit(this.editedItem);

          this.$toast.success("Carro editado com sucesso", "Hey", {
            position: "topCenter",
          });
        } else {
          console.log("aqui");
          this.desserts.push(this.editedItem);
        }
        this.close();

        this.setCarApiLoading(false);
      } catch (error) {
        this.setCarApiLoading(false);

        this.$toast.error(
          "Acontece um erro ao editar o carro, tente novamente",
          "Ops",
          {
            position: "topCenter",
          }
        );
      }
    },
  },
};
</script>