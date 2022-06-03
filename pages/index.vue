<template>
  <Translation/>
</template>

<script>
import { mapGetters }  from 'vuex'
import Translation from '~/components/Translation'
export default {
  name: 'IndexPage',
  
  components: {
    Translation
  },

  created(){
    this.$store.dispatch('lang/getLang')
  },
}
</script>
