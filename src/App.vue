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
        <br/> by {{ radio.current.metadata.artist_name }}
        <br/>
        <em>({{ radio.current.metadata.album_title }})</em></p>
    <p>
    <audio controls src="http://wrfl.ddns.net:8000/_a"></audio>
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
  methods: {
  },
  mounted: function () {
    //Initial Load
    // this.loadData();
    //Run every 30 seconds
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
    setTimeout(loadData,5000);
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
</style>
