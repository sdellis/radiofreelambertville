<template>
  <div id="app">
    <img alt="WRFL logo" src="./assets/wrfl-logo.png">
    <!-- <vue-audio
      audio-source="http://wrfl.ddns.net:8000/_a"
    ></vue-audio> -->

      <div v-for="show in radio.currentShow" :key="show.name">
        <h2>{{ show.name }}</h2>
      </div>
      <h3>Current Track:</h3>
      <p>{{ radio.current.name }}
        <br/><span v-if="metadata.artist_name.length"> by {{ metadata.artist_name }}</span>
        <br/>
        <em v-if="metadata.album_title.length">({{ metadata.album_title }})</em></p>
    <p>
    <!-- <audio controls src="http://wrfl.ddns.net:8000/_a"></audio> -->
    <audio width="300" height="32" controls="controls">
      <source src="http://wrfl.ddns.net:8000/_b" type="audio/mpeg" />
      <source src="http://wrfl.ddns.net:8000/_a" type="audio/ogg" />
    </audio>
    </p>
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
    }
  },
  methods: {

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
