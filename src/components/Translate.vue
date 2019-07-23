<template>
    <div>
        <!-- <v-btn
          fab
          dark
          small
          color="blue"
          @click="Transmodal"
        >
          <v-icon>g_translate</v-icon>
        </v-btn>
        <Modal v-if="translateModal" @close="translateModal=false">
          <h3 slot="header">
          번역
          <i class="closeBtn fas fa-times" @click="translateModal = false"></i>
          </h3>
          <div slot='body'> -->
            <div id="google_translate_element"></div>
          <!-- </div>
        </Modal> -->
    </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
    name : "Translate",
    components:{
        Modal
    },
    data(){
        return {
            translateModal : false
        }
    },
    beforeMount(){
        (function(){
            var gtConstEvalStartTime = new Date();
            function d(b){
                var a=document.getElementsByTagName("head")[0];
                a||(a=document.body.parentNode.appendChild(document.createElement("head")));
                a.appendChild(b)
            }
            function _loadJs(b){
                var a=document.createElement("script");
                a.type="text/javascript";
                a.charset="UTF-8";a.src=b;
                d(a)
            }
            function _loadCss(b){
                var a=document.createElement("link");
                a.type="text/css";
                a.rel="stylesheet";
                a.charset="UTF-8";
                a.href=b;
                d(a)
            }
            function _isNS(b){
                b=b.split(".");
                for(var a=window,c=0;c<b.length;++c)
                    if(!(a=a[b[c]]))return!1;
                return!0
            }
            function _setupNS(b){
                b=b.split(".");
                for(var a=window,c=0;c<b.length;++c)
                a.hasOwnProperty?a.hasOwnProperty(b[c])?a=a[b[c]]:a=a[b[c]]={}:a=a[b[c]]||(a[b[c]]={});
                return a
            }
            window.addEventListener&&"undefined"==typeof document.readyState&&window.addEventListener("DOMContentLoaded",function(){document.readyState="complete"},!1);
            if (_isNS('google.translate.Element')){return}
            (function(){
                var c=_setupNS('google.translate._const');
                c._cest = gtConstEvalStartTime;
                gtConstEvalStartTime = undefined;
                c._cl='ko';
                c._cuc='googleTranslateElementInit';
                c._cac='';
                c._cam='';
                c._ctkk='434280.2826268560';
                var h='translate.googleapis.com';
                var s=(true?'https':window.location.protocol=='https:'?'https':'http')+'://';
                var b=s+h;
                c._pah=h;c._pas=s;c._pbi=b+'/translate_static/img/te_bk.gif';
                c._pci=b+'/translate_static/img/te_ctrl3.gif';
                c._pli=b+'/translate_static/img/loading.gif';
                c._plla=h+'/translate_a/l';
                c._pmi=b+'/translate_static/img/mini_google.png';
                c._ps=b+'/translate_static/css/translateelement.css';
                c._puh='translate.google.com';
                _loadCss(c._ps);
                _loadJs(b+'/translate_static/js/element/main_ko.js');
            })();
        })();
    },
    mounted: function()
    {
        this.$nextTick(() => {
            this.googleTranslateInit();
        });
    },
    methods: {
        googleTranslateInit: function() {
            let checkIfGoogleLoaded = setInterval(() => {
                if (google.translate.TranslateElement != null) {
                    clearInterval(checkIfGoogleLoaded);
                    this.googleTranslateElement('google_translate_element');
                }
            }, 100);
        },
        googleTranslateElement: function(id) {
            new google.translate.TranslateElement({pageLanguage: 'ko', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, id);
        }
    },
}
</script>

<style>
#google_translate_element {
    position: absolute;
    bottom: 100px;
    right: 16px;
}
.goog-te-gadget {
    font-family: Roboto, 'Open Sans', sans-serif;
    text-transform: uppercase;
}
.goog-te-gadget-simple  {
    background-color: rgba(255,255,255,0.20);
    border: 1px solid rgba(255,255,255,0.50);
    padding: 8px;
    border-radius: 4px;
    font-size: 1rem;
    line-height:2rem;
    display: inline-block;
    cursor: pointer;
    zoom: 1;
}
.goog-te-menu-value span:nth-child(3) {
    border:none;
    font-family: 'Material Icons';
}

.goog-te-gadget-icon {
    display: none;
}
.goog-te-banner-frame.skiptranslate {display: block;} 
  @media screen and (max-width: 600px) {
        #google_translate_element {
            bottom: 150px;
      }
  }
</style>
