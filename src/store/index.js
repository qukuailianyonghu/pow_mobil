import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import base_store from './modules/base_store.js'

export default new Vuex.Store({
    modules: {
        base: base_store
    }
})