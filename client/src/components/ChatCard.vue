<template>
  <div>
    <img v-bind:src="chat.avatar" width="28" height="28" class="rounded-circle me-1" v-if="chat.avatar">
    <span class="flex-fill">
        <span class="badge bg-danger float-end" style="display: none">0</span>
        <span class="title">{{ chat.name }}</span>
        <br><small v-if="chat.date_updated"><Timeago :datetime="chat.date_updated"></Timeago> - {{ chat.last_message }}</small>
    </span>
  </div>
</template>
<script>
export default {
  props: ["chat"]
};
</script>