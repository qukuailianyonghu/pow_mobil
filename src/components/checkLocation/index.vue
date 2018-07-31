<style src="./index.css">
 @import "../../../assets/icon/iconfont.css";
</style>

<template src="./index.html"></template>

<script>
import domain from '@/utils/domain.js'
import utils from '@/utils/utils.js'

export default {
    data() {
        return {
            http: '',
            locationHref: ''
        }
    },
    components: {
        
    },
    methods: {
        toRightHref() {
            window.location.href = 'www.baidu.com';
        }
    },
    computed: {
        isSafe() {
            return utils.getLocation();
        }
    },
    mounted() {
        this.http = window.location.href.split('//')[0];
        if(window.location.href.indexOf('/#') > 0) {
            this.locationHref = window.location.href.split('/#')[0].split('http:')[1];
        } else {
            this.locationHref = window.location.href.split('http:')[1];
        }
    }
}
</script>
