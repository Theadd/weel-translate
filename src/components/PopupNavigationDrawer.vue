<template lang="pug">
  v-navigation-drawer(
    app
    temporary
    absolute
    width="220"
    v-model="toggle"
    )
    v-toolbar(flat)
      blockquote.blockquote.subheading {{ i('EXTENSION_NAME') }}

    v-list
      v-list-tile(
        ripple
        v-for="item in items"
        :key="item.title"
        :to="item.path"
        )
        v-list-tile-action
          v-icon
            |{{ item.icon }}
        v-list-tile-content
          v-list-tile-title
            |{{ i18n.getMessage(item.title.toUpperCase()) }}

    //- v-footer(
      class="pa-3"
      style="height: 24px; white-space: nowrap; color: #666;"
      fixed
      )
      v-spacer
      div © {{ new Date().getFullYear() }} Weel Translate
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PopupNavigationDrawer',
  data () {
    return {
      toggle: false,
      items: [
        { title: 'Translation', icon: 'translate', path: '/home' },
        { title: 'Preference', icon: 'tune', path: '/preference' },
        { title: 'Setting', icon: 'settings', path: '/setting' },
        { title: 'Feedback', icon: 'feedback', path: '/feedback' },
        { title: 'Donate', icon: 'favorite', path: '/about' }
      ]
    }
  },
  computed: {
    ...mapState(['drawerNavigationToggle'])
  },
  watch: {
    drawerNavigationToggle () {
      this.toggle = !this.toggle
    }
  },
  methods: {}
}
</script>
