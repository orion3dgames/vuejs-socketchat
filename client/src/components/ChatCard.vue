<template>
  <div>
    <img src="http://files.ajkholdings.local/files/db9c3587-a116-451c-9f00-2ab83565f026/40x40/0-0-annalin-pp-photos-2017(1).jpg?version=0" width="28" height="28" class="rounded-circle me-1">
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