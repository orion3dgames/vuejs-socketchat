<template>

  <div style="display: flex;flex-direction: column;height: 100%;">

    <div class="chatbox-content-header" v-if="!isLoading">
      <span class="float-end">
          <a href="#" data-id="RANDOM_JITSI_TOKEN" class="btn btn-sm btn-primary doJoinJitsiMeeting" data-target="#meeting" title="Video Chat">
            <font-awesome-icon :icon="['fas', 'video']" />
          </a>
      </span>
        <a href="/chats/?active_tab=chats" class="btn btn-sm btn-primary" title="Back">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </a>
        <b>#{{chat.id}} - {{chat.name}}</b>
    </div>
    <div class="chatbox-content-body" id="chat-container" data-href="/ajax/loadMoreMessages/188/" data-l="2">
      <div v-if="isLoading"><font-awesome-icon :icon="['fas', 'spinner']" size="2x" spin /></div>
      <div class="chatbox-messages chatbox-messages-188" v-if="!isLoading">
        <infinite-loading @infinite="infiniteHandler" direction="top">
          <div slot="error" slot-scope="{ trigger }">
            Error message, click <a href="javascript:;" @click="trigger">here</a> to retry
          </div>
        </infinite-loading>
        <div class="card float-end text-right mb-2 clearfix"
             id="msg-4056"
             style="word-break: break-word; width: 90%; background: #f0f9ff;"
             v-for="msg in chat.messages" :msg="msg" :key="msg.id">
              <div class="card-body p-2">
                <img v-bind:src="msg.avatar" title="Orion Gunning" width="24" height="24" class="float-end ml-1 rounded-circle">
                <h6 class="mb-0"><small><Timeago :datetime="msg.date"></Timeago> | {{msg.date|formatDate}}</small> - Orion Gunning</h6>
                <p class="mb-0">
                  {{msg.message}}
                </p>
              </div>
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>
    <div class="chatbox-content-footer" v-if="!isLoading">
      <div class="chatbox-content-footer-loading" style="display: none;"><img src="/assets/images/loading-bars.svg"></div>
      <form class="chatbox-form" @submit.prevent="handleSubmit">
        <div class="input-group">
          <input type="text" class="form-control form-message" v-model="message" placeholder="Type a new message" />
          <button class="btn btn-outline-secondary doSelectFile"><font-awesome-icon :icon="['fas', 'paperclip']" /></button>
          <button class="btn btn-primary" type="submit"><font-awesome-icon :icon="['fas', 'paper-plane']" /></button>
        </div>
        <input type="file" id="document_attachment_doc" name="files[]" multiple="" style="display: none;" accept="image/*" />
      </form>
      <div class="previewImages"></div>
      <div id="meeting" class="chatbox-jitsi"></div>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import ChatService from '@/services/ChatService.js';
export default {
  name: 'Chat',
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      page: 1,
      chat: {},
      message: '',
      isLoading: false,
    }
  },
  watch:{
    $route (to, from){
      this.page = 1;
      this.getChatData();
      this.toggleOpenClass();
    }
  },
  created() {
    this.getChatData();
    this.toggleOpenClass();

  },
  updated() {
    //this.$nextTick(() => this.scrollToBottom());
  },
  methods: {
    infiniteHandler($state) {
      this.page += 1;
      ChatService.loadMessages(this.$route.params.id, this.page)
          .then(
              (messages => {
                if (messages && messages.length > 0) {
                  this.chat.messages.unshift(...messages.reverse());
                  $state.loaded();
                } else {
                  $state.complete();
                }
                this.isLoading = false;
              }).bind(this)
          );
    },
    handleSubmit:function(){
      //this.$socket.emit('message', this.message);
    },
    scrollToBottom() {
      var elem = this.$el.querySelector("#chat-container");
      elem.scrollTop = elem.scrollHeight;
    },
    toggleOpenClass() {
      let el = document.querySelector("#chatbox");
      if(el){
        el.classList.add('opened');
      }
    },
    async getChatData() {
      this.isLoading = true;
      ChatService.getChat(this.$route.params.id, this.page)
          .then(
              (chat => {
                this.isLoading = false;
                this.chat = chat;
                this.toggleOpenClass();
              }).bind(this)
          );
    }
  }
}
</script>