<template lang="pug">
  v-navigation-drawer(
    app
    width=260
    permanent absolute stateless
    :mini-variant.sync="mini"
    v-model="drawer"
    )
    v-toolbar(flat class="transparent")
      v-list(class="pa-0")
        v-list-tile
          v-list-tile-action
            v-btn(icon @click.native.stop="mini = !mini")
              v-icon {{ arrowIcon }}
          v-list-tile-content
            v-list-tile-title Advance Settings 
    v-divider
    v-list(class="pt-0" dense)
      v-list-tile(
        ripple
        v-for="item in items" :key="item.title"
        :to="item.path"
        @click=""
        )
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title {{ item.title }}
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Q&A', icon: 'question_answer', path: '/home' },
        { title: 'Service Source API', icon: 'settings_input_composite', path: '/service-source-api' },
        { title: 'Template & Styles', icon: 'style', path: '/templates' }
      ],
      mini: true,
      right: null
    }
  },
  computed: {
    arrowIcon () {
      return `chevron_${this.mini ? 'right' : 'left'}`
    }
  }
}
</script>