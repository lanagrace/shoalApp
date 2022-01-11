<template>
<!-- this page opens first -->
  <div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card">
            <div class="card-content">
              <span class="card-title">Welcome to Shoal</span>
              <p>Please register or login to start</p>
            </div>
            <div class="card-action">
              <router-link  to="/login">Login</router-link>
              <router-link  to="/register">Register</router-link>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style>

.starth4{
  padding: 20px;
  text-align: center;
  background: #274c77;
  color: white;
}
.card{
    background-color: #274c77 !important;
}

.card-title{
    color: white !important;
}

.card-content{
    color: white !important;
}

a{
    color:white !important; 
}
</style>