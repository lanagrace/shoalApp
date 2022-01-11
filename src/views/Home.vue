<template>
<!-- this page opens first -->
  <div>
    <div class="cont">
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

    <div class="alert">
      <h1 class="starth1">
        This app only works on mobile screen sizes, please resize your screen or
        open on a mobile device
      </h1>
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


.starth1{
  text-align: center;
  background: white;
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

@media only screen and (max-width: 600px) {
  .cont {
    display: block;
  }
  .alert {
    display: none;
  }
}

@media only screen and (min-width: 600px) {

  /* users that are using a screen larger than 600px will get the 
  alert to resize their scrren size so they could use the web app */
  .alert {
    display: block;
  }
  .cont {
    display: none;
  }
}
</style>