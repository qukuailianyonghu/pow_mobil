<template>
  <div id="app">
    <div v-if="haveNavigation">
      <!-- <top-navigation :haveColor="bgColor" :activePath="activePath" class="top-navigation"></top-navigation> -->
      <top-navigation :haveColor="bgColor" :haveNotice="haveNotice" :activePath="activePath" class="top-navigation" :isFixed="isFixed"></top-navigation>
    </div>
    <router-view/>
    <pool-footer class="pool-footer" v-if="haveFooter"></pool-footer>
  </div>
</template>

<script>
import TopNavigation from '@/components/topNavigation/index'
import PoolFooter from '@/components/footer/index'
export default {
  name: 'App',
  data() {
    return {
      isFixed: false
    }
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // var offsetTop = document.querySelector('#searchBar').offsetTop
      if (scrollTop > 41) {
        this.isFixed = true;
        // return true
      } else {
        this.isFixed = false;
        // return false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    if (this._isMobile()) {
      this.$store.state.base.isPC = false;
      // alert("手机端");
    } else {
      this.$store.state.base.isPC = true;
      // alert("pc端");
    }
  },
  computed: {
    haveNavigation() {
      if(this.$route.path == '/signin' || this.$route.path == '/signup') {
        return false;
      } else {
        return true;
      }
    },
    bgColor() {
      if(this.$route.path == '/' || this.$route.path == '/help' || this.$route.path == '/form') {
        if(this.$route.path == '/help' && this._isMobile()) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    activePath() {
      return this.$route.path;
    },
    haveFooter() {
      if(this.$route.path == '/signin' || this.$route.path == '/signup') {
        return false;
      } else {
        return true;
      }
    },
    haveNotice() {
      if(this.$route.path == '/signin' || this.$route.path == '/signup') {
        return false;
      } else {
        return true;
      }
    }
  },
  components: {
    topNavigation: TopNavigation,
    poolFooter: PoolFooter
  }
}
</script>

<style>
  #app {
    position: relative;
  }

  .top-navigation {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .pool-footer {
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>

