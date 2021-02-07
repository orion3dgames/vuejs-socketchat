<template>
    <div>
      <div v-if="isLoading"><font-awesome-icon :icon="['fas', 'spinner']" size="2x" spin /></div>
      <ul class="sidebar-menu" v-if="!isLoading">
        <li v-for="chat in chats" :chat="chat" :key="chat.id">
          <router-link :to="`/chat/${chat.id}/?active_tab=${active_tab}`">
            <ChatCard :chat="chat" />
          </router-link>
        </li>
      </ul>
    </div>
</template>
<script>
import ChatCard from "@/components/ChatCard";
import ChatService from '@/services/ChatService.js';
export default {
  name: "ChatsList",
  components: {
    ChatCard
  },
  data() {
    return {
      chat: {},
      chats: [],
      isLoading: false,
    };
  },
  props: {
    active_tab: {
      type: String,
      default: 'chats'
    }
  },
  watch:{
    active_tab: function(newVal, oldVal) { // watch change of route
      this.getEventsData(newVal);
    }
  },
  created() {
    this.getEventsData(this.active_tab); // call getEventData() when the instance is created
  },
  methods: {
    async getEventsData(active_tab) {
      this.isLoading = true;
      // Use the eventService to call the getEvents() method
      ChatService.getChats(active_tab)
      .then(
        (chats => {
          this.isLoading = false;
          this.$set(this, "chats", chats);
        }).bind(this)
      );
    }
  }
};
</script>
