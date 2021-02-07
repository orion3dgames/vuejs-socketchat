<template>
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div class="container-fluid">
          <a href="/chats" class="navbar-brand">AJK Chat</a>
          <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse collapse" id="navbarCollapse" style="">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item">
                <router-link to="/chats/?active_tab=chats" class="nav-link"><i class="fas fa-comments"></i> Chats</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/meetings" class="nav-link"><i class="fas fa-comments"></i> Meetings</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/activity" class="nav-link">Activity</router-link>
              </li>
            </ul>
            <span>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <img src="http://files.ajkholdings.local/files/aafa2760-89d6-4266-a21e-099a5f9e24de/300/254884-4551313373385-1983794022-n_A58926274C8DF9630431924.jpg?version=0" width="24" height="24" />
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">TEST TEST</a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown03">
                            <li><a href="/login" class="dropdown-item text-dark">Sign Out</a></li>
                        </ul>
                    </li>
                </ul>
            </span>

          </div>
        </div>
      </nav>
    </header>

</template>
<script>

export default {
  name: 'NavBar',
  methods: {

  }
}
</script>