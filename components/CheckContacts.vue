<template>
  <v-container>
    <v-switch
      v-model="showChecked"
      label="Show All Contacts"
    ></v-switch>
    <v-data-table
      :headers="headers"
      :items="filteredContacts"
      class="elevation-1"
      item-key="id"
    >
      <template v-slot:item.created_at="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          v-if="!item.checked || showChecked"
          :disabled="item.checked"
          color="primary"
          @click="item.checked ? null : checkContact(item.id)"
        >
          {{ item.checked ? 'Checked' : 'Check' }}
        </v-btn>

        <v-btn
          v-if="showChecked"
          color="red"
          @click="deleteContact(item.id)"
        >
          削除
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {createInstanceWithJWT} from '~/myModules/api'

export default {
  data() {
    return {
      contacts: [],
      showChecked: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'User ID', value: 'user_id' },
        { text: 'User Name', value: 'user_name' },
        { text: 'Created At', value: 'created_at' },
        { text: 'Content', value: 'content' },
        { text: 'Checked', value: 'checked' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
    };
  },
  computed: {
    filteredContacts() {
      if (this.showChecked) {
        return this.contacts;
      }
      return this.contacts.filter(contact => !contact.checked);
    },
  },
  async created() {
    const apiInstance = createInstanceWithJWT(this.$cookies.get("jwt-token"))
    const res = await apiInstance.get('/contacts/get_contacts');
    this.contacts = res.data.contacts
  },
  methods: {
    async checkContact(contactId) {
      if (confirm('この問い合わせをチェック済にしますか？')) {
        try {
          const apiInstance = createInstanceWithJWT(this.$cookies.get("jwt-token"));
          await apiInstance.post('/contacts/check_contact', { contact_id: contactId });
          this.contacts = this.contacts.map(contact => {
            if (contact.id === contactId) {
              return { ...contact, checked: true };
            }
            return contact;
          });
        } catch (error) {
          console.error('Error checking contact:', error);
          // エラーハンドリング
        }
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
      return new Intl.DateTimeFormat('ja-JP', options).format(new Date(dateString));
    },
    async deleteContact(contactId) {
      if (confirm('この問い合わせを削除してもよろしいですか？')) {
        try {
          const apiInstance = createInstanceWithJWT(this.$cookies.get("jwt-token"));
          await apiInstance.post('/contacts/delete_contact', { contact_id: contactId });
          this.contacts = this.contacts.filter(contact => contact.id !== contactId);
        } catch (error) {
          console.error('Error deleting contact:', error);
          // エラーハンドリング
        }
      }
    },
  },
};
</script>

