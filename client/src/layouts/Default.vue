<script>
import NavBar from "@/components/partials/NavBar";
import FooterBar from "@/components/partials/FooterBar";
export default {
  components: {
    NavBar,
    FooterBar
  }
};

export class Default {
}
</script>

<template>
  <div>
    <div class="container-fluid pt-3">
      <nav-bar />
      <slot />
      <footer-bar />
    </div>
  </div>
</template>

© 2021 GitHub, Inc.