<template lang="pug">
  v-layout(wrap column)
    v-alert(
      style="margin: 0 0; width: 100%;"
      type="info" :value="true"
      )
      |{{ i('FEEDBACK_INFO') }}

    v-container
      v-flex(:class="$style.section")
        h2.headline Mozilla Addons Store
        a(:href="amo.home") Home
        |&nbsp;/&nbsp;
        a(:href="amo.review") Review

      v-flex(:class="$style.section")
        h2.headline Github Repo
        a(:href="github.home") Home
        |&nbsp;/&nbsp;
        a(:href="github.issues") Issues

    v-list(style="padding-bottom: 24px;")
      v-subheader {{ i('FEEDBACK_CONTACT') }}
      v-list-tile
        v-list-tile-content
          v-list-tile-title E-Mail
          v-list-tile-sub-title wallen_weel@outlook.com
      v-list-tile
        v-list-tile-content
          v-list-tile-title Tencent QQ
          v-list-tile-sub-title 252518374
      v-list-tile
        v-list-tile-content
          v-list-tile-title Wechat ID
          v-list-tile-sub-title wallenweel
</template>

<script>
export default {
  name: 'PopupFeedback',
  data () {
    return {
      amo: {
        home: 'https://addons.mozilla.org/zh-CN/firefox/addon/weel-translate/',
        review: 'https://addons.mozilla.org/zh-CN/firefox/addon/weel-translate/reviews/'
      },
      github: {
        home: 'https://github.com/wallenweel/weel-translate',
        issues: 'https://github.com/wallenweel/weel-translate/issues'
      }
    }
  }
}
</script>

<style lang="scss" module>
.section {
  margin-bottom: 12px;
}
</style>

