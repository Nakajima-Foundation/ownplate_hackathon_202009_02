<template>
  <div class="balloon6">
    <div class="faceicon">
      <img
        src="https://ca.slack-edge.com/T58H86BPW-UN430CWGL-cc3ae3355712-512"
        class="w-64 h-64 r-64 cover"
      />
    </div>
    <div class="chatting">
      <div class="says">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "..."
    }
  }
};
</script>
