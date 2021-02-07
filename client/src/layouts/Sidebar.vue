<template>
  <div>
    <nav-bar />
    <div class="chatbox with-video" id="chatbox">
      <div class="chatbox-sidebar">
        <div class="p-1 border-bottom">
          <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
              <router-link v-bind:class="[active_tab == 'chats' ? 'active': '']" class="nav-link border" to="/chats/?active_tab=chats">
                <font-awesome-icon :icon="['fas', 'users']" /> Private
              </router-link>
            </li>
            <li class="nav-item">
              <router-link v-bind:class="[active_tab == 'projects' ? 'active': '']" class="nav-link border" to="/chats/?active_tab=projects">
                <font-awesome-icon :icon="['fas', 'hotel']" /> Projects
              </router-link>
            </li>
            <li class="nav-item">
              <router-link v-bind:class="[active_tab == 'groups' ? 'active': '']" class="nav-link border" to="/chats/?active_tab=groups">
                <font-awesome-icon :icon="['fas', 'comments']" /> Groups
              </router-link>
            </li>
          </ul>
        </div>
        <ChatsList v-bind:active_tab="active_tab"  />
      </div>
      <div class="chatbox-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/partials/NavBar";
import ChatsList from "@/components/ChatsList";
export default {
  components: {
    NavBar,
    ChatsList
  },
  data: function () {
    return {
      active_tab: this.$route.query.active_tab ? this.$route.query.active_tab : 'chats'
    }
  },
  watch:{
    $route (to, from){
      this.active_tab = this.$route.query.active_tab
    }
  },
}
</script>