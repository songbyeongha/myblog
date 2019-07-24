<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Config</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field disabled label="User Email"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-autocomplete
                  :items="ranks"
                  v-model="editedItem.rank"
                  label="Select"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">취소</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">확인</v-btn>
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
        <td>{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.rank }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
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
      { text: "E-mail", value: "email" },
      { text: "Permission", value: "rank" },
      { text: "Actions", value: "name", sortable: false }
    ],
    users: [],
    ranks: ["admin", "team", "visitor"],
    editedIndex: -1,
    editedItem: {
      id: "",
      rank: "",
      email: ""
    },
    defaultItem: {
      id: "",
      rank: "",
      email: ""
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
      this.editedIndex = this.desserts.indexOf(item);
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
      Object.assign(this.desserts[this.editedIndex], this.editedItem);

      this.close();
    }
  }
};
</script>

<style></style>
