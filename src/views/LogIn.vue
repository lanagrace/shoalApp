<template>
    <div class="container">
        <form>
            <div class="row">
                <div class="twelve columns">
                    <img id="logoImg" src="/assets/logo.png" alt="Logo">
                    <h1 id="name">Shoal</h1>
                </div>
            </div>
            <div class="row">
            
            <div class="six columns">
                <label for="exampleEmailInput">Your email</label>
                <input class="u-full-width" type="email" placeholder="test@mailbox.com" id="exampleEmailInput">
            </div>
            </div>
            <div class="row">
            <div class="six columns">
                <label for="exampleEmailInput">Your password</label>
                <input class="u-full-width" type="password" placeholder="password" id="examplePasswordInput">
            </div>
            </div>
            
            <a href="/mainPage.html"><input class="button-primary" type="button" value="Login"> </a> 
            <a href="/signUp.html"><input class="button-primary" type="button" value="Sign Up"> </a> 

        </form>
    </div>
      
</template>

<script>
export default {

}
</script>

<style>

    #logoImg{
        margin-bottom: 5vh;
        width: 60%;
        justify-content: center;
        align-items: center;
    }

    #name{
        justify-content: center;
        align-items: center;
    }

    #map{
        height: 70vh;
    }

</style>