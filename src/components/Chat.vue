<template>
    <div id="frogue-container" class="position-right-bottom"
      data-chatbot="a82d9cfa-e98b-4c7b-ba58-25d92aabe926"
      data-user="azsw7797@gmail.com"
      data-init-key="value"
      ></div>
</template>

<script>
export default {
    created(){
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https:\/\/danbee.ai/js/plugins/frogue-embed/frogue-embed.min.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'frogue-embed'));
    }
}
</script>

<style>

</style>
