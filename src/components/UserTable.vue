<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Permission Config</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  :value="editedItem.email"
                  label="email"
                  outline
                  readonly
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-autocomplete
                  :items="ranks"
                  v-model="editedItem.rank"
                  label="Permission"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="save">확인</v-btn>
          <v-btn color="blue darken-1" flat @click.native="close">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="users"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.rank }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import fbservice from "@/services/FirebaseService.js";

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Users",
        align: "left",
        sortable: false,
        value: "users"
      },
      { text: "Display Name", value: "display_name" },
      { text: "Permission", value: "rank" },
      { text: "Edit", value: "name", sortable: false }
    ],
    users: [],
    ranks: ["admin", "team", "visitor"],
    editedIndex: -1,
    editedItem: {
      id: "",
      rank: "",
      email: "",
      name: ""
    },
    defaultItem: {
      id: "",
      rank: "",
      email: "",
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  mounted() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.users = await fbservice.getAllusers();
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      Object.assign(this.users[this.editedIndex], this.editedItem);
      fbservice.updatePermission(this.editedItem.id, this.editedItem.rank);
      this.close();
      window.location.reload();
    }
  }
};
</script>

<style></style>
