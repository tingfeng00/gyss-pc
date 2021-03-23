/* 路由 */
import App from '../App.vue'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/plugins/import.' + process.env.NODE_ENV)
const Home = _import('home.vue')
const UserLogin = _import('userLogin.vue')
const ExamCenter = _import('examCenter.vue')
const EBook = _import('eBook.vue')
const EBookDetail = _import('eBookDetail.vue')
const CourseCenter = _import('courseCenter.vue')
const CourseDetail = _import('courseDetail.vue')
const ArticleCenter = _import('articleCenter.vue')
const ArticleDetail = _import('articleDetail.vue')
const NoticeCenter = _import('noticeCenter.vue')
const NoticeDetail = _import('noticeDetail.vue')
const Register = _import('register.vue')
const PersonalCenter = _import('personalCenter.vue')
const BookChapterContent = _import('bookChapterContent.vue')
const PlaySC = _import('playSC.vue')
const ClueReport = _import('clueReport.vue')
const NnDoClue = _import('unDoneClue.vue')
const AssessClue = _import('assessClue.vue')
const MartCenter = _import('martCenter.vue')
const MartResult = _import('martResult.vue')
const MartRecord = _import('martRecord.vue')
const MartProductInfor = _import('martProductInfor.vue')
const ExamInfor = _import('examInfor.vue')
const ExamResult = _import('examResult.vue')
const StudyCircleCenter = _import('studyCircleCenter.vue')
const StudyCircleDetail = _import('studyCircleDetail.vue')
const StudyCircleStage = _import('studyCircleStage.vue')
const TrainClass = _import('trainClass.vue')
const TrainClass2 = _import('trainClass2.vue')
const TrainClassDetail = _import('trainClassDetail.vue')
const Error = _import('error.vue')
const UserAgreement = _import('userAgreement')
const TryPlay = _import('tryplay.vue')
const ForgetPassword = _import('forgetPassword.vue')
const ClueResult = _import('clueResult.vue')
const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/home',
        meta: { title: '首页', isSkip: true }// isSkip配置为不检查登录状态
      },
      // 首页
      {
        name: 'home',
        path: '/home',
        component: Home,
        meta: { title: '首页', isSkip: true }
      },
      {
        name: 'userLogin',
        path: '/userLogin',
        component: UserLogin,
        meta: { title: '登陆', isSkip: true }
      },
      {
        name: 'examCenter',
        path: '/examCenter',
        component: ExamCenter,
        meta: { title: '考试中心' }
      },
      {
        name: 'eBook',
        path: '/eBook',
        component: EBook,
        meta: { title: '电子书' }
      },
      {
        name: 'eBookDetail',
        path: '/eBookDetail',
        component: EBookDetail,
        meta: { title: '电子书详情' }
      },
      {
        name: 'courseCenter',
        path: '/courseCenter',
        component: CourseCenter,
        meta: { title: '课程中心' }
      },
      {
        name: 'courseDetail',
        path: '/courseDetail',
        component: CourseDetail,
        meta: { title: '课程详情' }
      },
      {
        name: 'articleCenter',
        path: '/articleCenter',
        component: ArticleCenter,
        meta: { title: '文章中心' }
      },
      {
        name: 'articleDetail',
        path: '/articleDetail',
        component: ArticleDetail,
        meta: { title: '文章详情' }
      },
      {
        name: 'noticeCenter',
        path: '/noticeCenter',
        component: NoticeCenter,
        meta: { title: '通知公告中心' }
      },
      {
        name: 'noticeDetail',
        path: '/noticeDetail',
        component: NoticeDetail,
        meta: { title: '通知公告详情' }
      },
      {
        name: 'register',
        path: '/register',
        component: Register,
        meta: { title: '注册', isSkip: true }
      },
      {
        name: 'assessClue',
        path: '/assessClue',
        component: AssessClue,
        meta: { title: '线索评估', isSkip: true }
      },
      {
        name: 'personalCenter',
        path: '/personalCenter',
        component: PersonalCenter,
        redirect: '/personalCenter/clueReport',
        meta: { title: '个人中心' },
        children: [
          {
            name: 'clueReport',
            path: 'clueReport',
            meta: { title: '线索提报' },
            component: ClueReport
          },
          {
            name: 'unDoneClue',
            path: 'unDoneClue',
            meta: { title: '待评估线索' },
            component: NnDoClue
          }
        ]
      },
      {
        name: 'bookChapterContent',
        path: '/bookChapterContent',
        component: BookChapterContent,
        meta: { title: '电子书阅读页面' }
      },
      {
        name: 'playSC',
        path: '/playSC',
        component: PlaySC,
        meta: { title: '单视频课程播放页面' }
      },
      {
        name: 'martCenter',
        path: '/martcenter',
        meta: { title: '积分商城' },
        component: MartCenter
      },
      {
        name: 'martResult',
        path: '/martresult',
        meta: { title: '商城结果' },
        component: MartResult
      },
      {
        name: 'martProductInfor',
        path: '/martproductinfor',
        meta: { title: '商城信息' },
        component: MartProductInfor
      },
      {
        name: 'martRecord',
        path: '/martRecord',
        meta: { title: '兑换记录' },
        component: MartRecord
      },
      {
        name: 'examInfor',
        meta: { title: '考试信息' },
        path: '/examInfor',
        component: ExamInfor
      },
      {
        name: 'examResult',
        meta: { title: '考试结果' },
        path: '/examResult',
        component: ExamResult
      },
      {
        name: 'studyCircleCenter',
        meta: { title: '学习圈中心' },
        path: '/studyCircleCenter',
        component: StudyCircleCenter
      },
      {
        name: 'studyCircleDetail',
        meta: { title: '学习圈详情' },
        path: '/studyCircleDetail',
        component: StudyCircleDetail
      },
      {
        name: 'studyCircleStage',
        meta: { title: '学习圈分类' },
        path: '/studyCircleStage',
        component: StudyCircleStage
      },
      {
        name: 'trainClass',
        meta: { title: '培训班' },
        path: '/trainClass',
        component: TrainClass
      },
      {
        name: 'trainClass2',
        meta: { title: '培训班' },
        path: '/trainClass2',
        component: TrainClass2
      },
      {
        name: 'trainClassDetail',
        meta: { title: '培训班详情' },
        path: '/trainClassDetail',
        component: TrainClassDetail
      },
      {
        name: 'userAgreement',
        meta: { title: '用户协议', isSkip: true },
        path: '/userAgreement',
        component: UserAgreement
      },
      {
        name: 'play',
        path: '/play/tryplay',
        component: TryPlay
      },
      {
        name: 'forgetPassword',
        meta: { title: '找回密码', isSkip: true },
        path: '/forgetPassword',
        component: ForgetPassword
      },
      {
        name: 'clueResult',
        meta: { title: '评估结果', isSkip: true },
        path: '/clueResult',
        component: ClueResult
      },
      // error
      {
        name: 'error',
        path: '/error',
        component: Error,
        meta: { title: 'error' }
      }
    ]
  },
  { path: '*', redirect: '/error' }
]
export default routes
