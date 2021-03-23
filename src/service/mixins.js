export const toPlay = {
    // 富媒体课程 RichCourse
    // 单视频课程 SingleCourse
    // 图文课程 H5Course
    // 三分屏课程 ThreeScreenCourse
    // 音频视频 AudioCourse
    // 微课课程 MicroCourse
    // 电子书课程 OfficeCourse
    // 实景课程 VRCourse
    methods: {
      toPlay: function (type, id) {
        if (type == 'RichCourse' || type == '富媒体课程') {
          let jumpUrl = this.$router.resolve({ path: '/playRC', query: { id } })
          window.open(jumpUrl.href, '_blank')
        } else if (type == 'SingleCourse' || type == '单视频课程') {
          // 政府基准的单视频是MP4和flv的 也使用jwplayer播放
          let jumpUrl = this.$router.resolve({ path: '/playSC', query: { id } })
          window.open(jumpUrl.href, '_blank')
        } else if (type == 'H5Course' || type == '图文课程') {
          let jumpUrl = this.$router.resolve({ path: '/playH5C', query: { id } })
          window.open(jumpUrl.href, '_blank')
        } else if (type == 'ThreeScreenCourse' || type == '三分屏课程') {
          // 三分屏课程就是精英课程
          let jumpUrl = this.$router.resolve({ path: '/playTSC', query: { id } })
          window.open(jumpUrl.href, '_blank')
        } else if (type == 'AudioCourse' || type == '音频课程') {
          let jumpUrl = this.$router.resolve({ path: '/playAC', query: { id } })
          window.open(jumpUrl.href, '_blank')
        } else if (type == 'MicroCourse' || type == '微课课程') {
          let jumpUrl = this.$router.resolve({ path: '/playMC', query: { id } })
          window.open(jumpUrl.href, '_blank')
        } else if (type == 'VRCourse' || type == '实景课程') {
          let jumpUrl = this.$router.resolve({ path: '/playVRC', query: { id } })
          window.open(jumpUrl.href, '_blank')
        } else if (type == 'OfficeCourse' || type == '电子书课程') {
          let jumpUrl = this.$router.resolve({ path: '/playOC', query: { id } })
          window.open(jumpUrl.href, '_blank')
        }
      }
    }
  }
