<template>
  <div id="app">
    <img alt="WRFL logo" src="./assets/wrfl-logo.png">
    <div v-if="protocol == 'http'">
        <div v-for="show in radio.currentShow" :key="show.name">
          <h2>{{ decodeHtml(show.name) }}</h2>
        </div>
        <h3>Current Track:</h3>
        <p>{{ radio.current.name }}
          <br/><span v-if="metadata.artist_name.length"> by {{ decodeHtml(metadata.artist_name) }}</span>
          <br/>
          <em v-if="metadata.album_title.length">({{ decodeHtml(metadata.album_title) }})</em></p>
      <p>
      <!-- <audio controls src="http://wrfl.ddns.net:8000/_a"></audio> -->
      <audio width="300" height="32" controls="controls">
        <source src="http://wrfl.ddns.net:8000/_a" type="audio/mpeg" />
        <source src="http://wrfl.ddns.net:8000/_b" type="audio/ogg" />
      </audio>
      </p>
    </div>
    <div v-else>
      <h1>Oops!</h1>
      <p>Radio Free Lambertville isn't sending anything secure over the interwebs, so we are only broadcasting from HTTP (not HTTPS).</p>
      <p>Just click here and you'll be good: <a href="http://radiofreelambertville.com">http://radiofreelambertville.com</a></p>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data: function() {
    return {
      radio: {
        currentShow:[{name:'loading...'}],
        current: {
          metadata: { artist_name: '', album_title: '' }
        }
      }
    }
  },
  computed: {
    // a computed getter
    metadata: function () {
      // `this` points to the vm instance
      return ( typeof(this.radio.current.metadata) != "undefined" ) ? this.radio.current.metadata : { artist_name: '', album_title: '' };
    },
    protocol: function () {
      // check the protocol and set appropriately
      var url = window.location.href
      var arr = url.split(":")
      return arr[0]
    }
  },
  methods: {
    decodeHtml: function (html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  },
  mounted: function () {
    //Initial Load
    //Run every 5 seconds
    var that = this
    var loadData = function(){
        fetch("http://wrfl.ddns.net/api/live-info")
        .then(response => response.json())
        .then(radio => (
          that.radio = radio
        ));
        // Do stuff
        setTimeout(loadData, 5000);
    };
    setTimeout(loadData, 1000);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app img {
  max-width: 100%;
  height: auto;
}
</style>
