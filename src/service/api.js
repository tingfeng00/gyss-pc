
/**
 * 页面接口api
 */
const API_URL = '/api'
const Platform = '/info'
const Platform1 = '/article'
const User = '/User'
const Pages = '/pages'
const Book = '/book'
const Exam = '/Exam'
const Portal = '/portal'
const Course = '/Course'
const Common = '/Common'
const Production = '/production'
const CourseInfo = '/courseinfo'
const Commment = '/comment'
const PcPlay = '/PcPlay'
const product = '/product'
const circle = '/circle'
const File = '/File'
const Training = '/Training'
const Guid = '/guid'
const Page = '/Page'
const Info = '/Info'
// const Collection = '/Collection'
export default {
// 判断用户是否在线
  CheckUserIsExit: {
    url: API_URL + Platform + '/CheckAccountExit',
    data: { Account: '' }
  },
  // 保持用户在线状态
  KeepOnline: {
    url: API_URL + User + '/KeepOnline',
    data: {}
  },
  // 检查用户登录状态
  Authorization: {
    url: API_URL + Pages + '/Authorization',
    data: {}
  },
  // 获取用户信息-登录-个人中心都用
  GetUerInfo: {
    url: API_URL + Page + '/LoginShort',
    data: {}
  },
  // 验证短信验证码
  CheckValidateCode: {
    url: API_URL + Platform + '/CheckValidateCode',
    data: {}
  },
  // 验证码登录
  LoginCode: {
    url: API_URL + Page + '/LoginCode',
    data: {}
  },
  // 退出登录
  LoginOut: {
    url: API_URL + User + '/LoginOut',
    data: {}
  },
  // 踢出其他地方登录
  KickOut: {
    url: API_URL + User + '/KickOut',
    data: {}
  },
  // 登录获取验证码
  SendMsg: {
    url: API_URL + Info + '/SendMsg',
    data: {}
  },
  // 学员排行
  RankUserList: {
    url: API_URL + User + '/RankUserList',
    data: {}
  },
  // 首页街道排行
  RankGroupList: {
    url: API_URL + User + '/RankGroupList',
    data: {}
  },
  // 找回密码
  FindPasswordEmail: {
    url: API_URL + '/user' + '/FindPasswordEmail',
    data: {}
  },
  // 课程点击排行
  CourseClickRank: {
    url: API_URL + Course + '/CourseClickRank',
    data: {}
  },
  // 文章排行
  GetArticleRank: {
    url: API_URL + Platform1 + '/GetArticleRank',
    data: {}
  },
  // 修改密码
  UpdatePwd: {
    url: API_URL + User + '/UpdatePwd',
    data: {}
  },
  // 首页banner轮播图
  GetLink: {
    url: API_URL + Portal + '/GetLink',
    data: {}
  },
  // 首页新闻推荐
  ArticleList: {
    url: API_URL + Page + '/ArticleList',
    data: {}
  },
  // 首页实时数据
  LeftRealTimeData: {
    url: API_URL + Portal + '/LeftRealTimeData',
    data: {}
  },
  // 首页通知公告-通知公告中心右侧列表
  NoticeList: {
    url: API_URL + Platform1 + '/NoticeList',
    data: {}
  },
  // 首页新闻轮播-学习展示-地方动态
  GetArticleInfoList: {
    url: API_URL + Platform1 + '/GetArticleInfoList',
    data: {}
  },
  // 首页-课程
  CourseList: {
    url: API_URL + Course + '/CourseTypeIndex',
    data: {}
  },
  // 首页-课程
  StudentStyle: {
    url: API_URL + Page + '/StudentStyle',
    data: {}
  },
  // 未读消息
  UnReadNotice: {
    url: API_URL + User + '/UnReadNotice',
    data: {}
  },
  // 获取文章频道列表信息
  GetArticleChannelInfoList: {
    url: API_URL + Platform1 + '/GetArticleChannelInfoList',
    data: {}
  },
   // 获取文章频道列表信息
   NoticeCategory: {
    url: API_URL + Platform1 + '/NoticeCategory',
    data: {}
  },
  // 获取文章内容
  ArticleContent: {
    url: API_URL + Platform1 + '/ArticleContent',
    data: {}
  },
  // 获取文章点赞
  AddUserAssist: {
    url: API_URL + Platform1 + '/AddUserAssist',
    data: {}
  },
  // 删除文章点赞
  DelUserAssist: {
    url: API_URL + Platform1 + '/DelUserAssist',
    data: {}
  },
  // 添加收藏
  FavoriteAdd: {
    url: API_URL + User + '/FavoriteAdd',
    data: {}
  },
  // 取消收藏
  FavoriteDelete: {
    url: API_URL + User + '/FavoriteDelete',
    data: {}
  },
  // 记录已读 给积分
  SetArticleRed: {
    url: API_URL + Platform1 + '/SetArticleRed',
    data: {}
  },
  // 电子书频道
  BookCategory: {
      url: API_URL + Book + '/BookCategory',
      data: {}
  },
  // 首页 电子书列表
  BookList: {
      url: API_URL + Book + '/BookList',
      data: {}
  },
  // 电子书内容
  BookContent: {
      url: API_URL + Book + '/BookContent',
      data: {}
  },
  // 章节列表
  BookChapterList: {
      url: API_URL + Book + '/BookChapterList',
      data: {}
  },
  // 章节详情
  BookChapterContent: {
      url: API_URL + Book + '/BookChapterContent',
      data: {}
  },
  // 我的课程
  MyCenter: {
      url: API_URL + Course + '/MyCenter',
      data: {}
  },
  // 删除我的课程删除学习中的课程
  DelUserCourseReg: {
      url: API_URL + Course + '/DelUserCourseReg',
      data: {}
  },
  // 我的课程收藏
  MyCourseCollect: {
     url: API_URL + User + '/MyCourseFavorite',
     data: { Rows: 5 }
  },
  // 我的文章收藏
  MyEssayCollect: {
     url: API_URL + User + '/MyArticleFavorite',
     data: { Rows: 6 }
  },
  // 修改用户信息
  UpdateUserInfo: {
     url: API_URL + User + '/UpdateUserInfo',
     data: {}
  },
  // 我的作品收藏
  MyProductCollect: {
     url: API_URL + User + '/MyProductionFavorite',
     data: { Rows: 9 }
  },
  // 查看收藏
  FavoriteExist: {
    url: API_URL + User + '/FavoriteExist',
    data: { }
  },
  // 电子书收藏
  MyBookFavorite: {
    url: API_URL + User + '/MyBookFavorite',
    data: {}
  },
  // 删除收藏
  CollectDelete: {
     url: API_URL + User + '/FavoriteDelete',
     data: {}
  },
  // 个人学习档案
  StudyStatistics: {
     url: API_URL + User + '/StudyStatistics',
     data: {}
  },
  // 考试中心
  ExamCenter: {
     url: API_URL + Exam + '/ExamList',
     data: { Rows: 20 }
  },
  // 考试详细信息
  GetExamInfo: {
    url: API_URL + Exam + '/GetExamInfo',
    data: {}
  },
  // 考试种类获取
  GetExamType: {
    url: API_URL + Exam + '/GetExamType',
    data: {}
  },
  // 考试结果提交
  PostExam: {
    url: API_URL + Exam + '/PostExam',
    data: {}
  },
  // 考试结果获取
  GetExamReviewInfo: {
    url: API_URL + Exam + '/GetExamReviewInfo',
    data: {}
  },
  // 考试列表页
  ExamListItem: {
    url: API_URL + Exam + '/ExamListItem',
    data: { Rows: 20 }
  },
  // 注册页面获取镇区列表
  GetAllGroupList: {
    url: API_URL + Common + '/GetGroupList',
    data: {}
  },
  // 登录注册页验证码获取
  GetLoginVC: {
    url: API_URL + Common + '/GetLoginVC',
    data: {}
  },
  // 注册接口
  Register: {
    url: API_URL + User + '/Register',
    data: {}
  },  
  // 获取网上展厅的分类
  ProductionCategoryInfoList: {
    url: API_URL + Production + '/ProductionCategoryInfoList',
    data: {}
  },
  // 获取网上展厅列表内容
  ProductionInfoList: {
    url: API_URL + Production + '/ProductionInfoList',
    data: { Rows: 9 }
  },
  // 获取网上展厅详细内容
  ProductionDetail: {
    url: API_URL + Production + '/ProductionDetail',
    data: {}
  },
  // 获取网上展厅随机内容
  ProductionListTask: {
    url: API_URL + Production + '/ProductionListTask',
    data: {}
  },
  // 下载网上展厅数据
  DownLoadImages: {
    url: API_URL + Production + '/DownLoadImages',
    data: {}
  },
  // 课程分类
  CourseCategory: {
    url: API_URL + Page + '/CourseCategory',
    data: {}
  },
  // 获取课程类型
  GetCourseType: {
    url: API_URL + CourseInfo + '/GetCourseType',
    data: {}
  },
  // 课程中心课程列表
  CourseList2: {
    url: API_URL + Page + '/CourseList',
    data: {}
  },
  // 课程内容
  CourseContent: {
    url: API_URL + Course + '/CourseContent',
    data: {}
  },
  // 课程内容课程评论
  CourseComment: {
    url: API_URL + '/Comment' + '/CourseComment',
    data: {}
  },
  // 添加电子书-课程评论
  AddComment: {
    url: API_URL + Commment + '/AddComment',
    data: {}
  },
  // 评论列表 评论类型 All 全部， Course 课程，Knowledge 知识点，Series 专题， Message 留言板， Book 电子书，Article 文章，Production 展厅
  CommentList: {
    url: API_URL + Commment + '/CommentList',
    data: {}
  },
  // 获取课程视频的内容
  Play: {
    url: API_URL + PcPlay + '/Play',
    data: {}
  },
  // 获取MP4视频数据
  PlayJwplay: {
    url: API_URL + PcPlay + '/PlayJwplay',
    data: {}
  },
  // 防止播放多个视频
  ClearPlayingCourse: {
    url: API_URL + '/Common' + '/ClearPlayingCourse',
    data: {}
  },
  // Refresh接口
  Refresh: {
    url: API_URL + '/CourseProcess' + '/Refresh',
    data: {}
  },
  // 积分商城类别查询
  ShopCenter: {
    url: API_URL + product + '/ProductTypeList',
    data: {}
  },
  // 积分商城商品列表查询
  ProductList: {
    url: API_URL + product + '/ProductList',
    data: {}
  },
  // 积分商城商品详细信息
  ProductDetail: {
    url: API_URL + product + '/ProductDetail',
    data: {}
  },
  // 积分商城商品兑换
  SendRecord: {
    url: API_URL + product + '/SendRecord',
    data: {}
  },
  // 积分商城获取热门商品
  ProductHotList: {
    url: API_URL + product + '/ProductHotList',
    data: {}
  },
  // 记录mp4视频进度
  SingleProcess: {
    url: API_URL + '/CourseProcess' + '/SingleProcess',
    data: {}
  },
  // 课程播放页评论
  CourseComment2: {
    url: API_URL + Commment + '/CourseComment',
    data: {}
  },
  // 防伪造请求
  AntiForgeryToken: {
    url: API_URL + '/Pages' + '/AntiForgeryToken',
    data: {}
  },
  // 课程播放页添加笔记
  AddNote: {
    url: API_URL + '/Course' + '/AddNote',
    data: {}
  },
  // 课程播放页删除笔记
  DelNote: {
    url: API_URL + Course + '/DelNote',
    data: {}
  },
  // 课程播放页添加评论
  CourseCommentAdd: {
    url: API_URL + '/Comment' + '/CourseCommentAdd',
    data: {}
  },
  // 获取精英课程-三分屏课程的信息
  PlayJY: {
    url: API_URL + PcPlay + '/PlayJY',
    data: {}
  },

  // 学习圈类型
  CircleTypeInfoList: {
    url: API_URL + circle + '/CircleTypeInfoList',
    data: {}
  },
  // 学习圈列表
  CircleInfoList: {
    url: API_URL + circle + '/CircleInfoList',
    data: {}
  },
  // 热门学习圈
  CircleHotInfoList: {
    url: API_URL + circle + '/CircleHotInfoList',
    data: {}
  },
  // 学习圈文章列表
  CircleArticleList: {
    url: API_URL + circle + '/CircleArticleList',
    data: {}
  },
  // 上传学习圈
  CircleCreate: {
    url: API_URL + circle + '/CircleCreate',
    data: {}
  },
  // 圈内达人
  CircleArticleHotModel: {
    url: API_URL + circle + '/CircleArticleHotModel',
    data: {}
  },
  // 学习圈详情
  CircleDetail: {
    url: API_URL + circle + '/CircleDetail',
    data: {}
  },
  // 上传学习圈文章
  CircleArticleCreate: {
    url: API_URL + circle + '/CircleArticleCreate',
    data: {}
  },
  // 获取课程计划
  StudyPlanGet: {
    url: API_URL + Course + '/StudyPlanGet',
    data: {}
  },
  // 上传计划修改
  StudyPlanUpdate: {
    url: API_URL + Course + '/StudyPlanUpdate',
    data: {}
  },
  // 添加新的修改计划
  StudyPlanAdd: {
    url: API_URL + Course + '/StudyPlanAdd',
    data: {}
  },
  // 我的学习计划
  MyStudyPlan: {
    url: API_URL + User + '/MyStudyPlan',
    data: {}
  },
  // 删除学习计划
  DelStudyPlan: {
    url: API_URL + Course + '/DelStudyPlan',
    data: {}
  },
  //  附件上传
  UploadAttachment: {
    url: API_URL + File + '/UploadAttachment',
    data: {}
  },
  // 培训班
  TrainingClass: {
    url: API_URL + Training + '/TrainingClass',
    data: {}
  },
  // 培训班类型列表
  GetTrainingClassTypeList: {
    url: API_URL + Training + '/GetTrainingClassTypeList',
    data: {}
  },
  // 学校列表
  GetTrainingSchoolList: {
    url: API_URL + Training + '/GetTrainingSchoolList',
    data: {}
  },
  // 培训班详情页
  GetTrainingById: {
    url: API_URL + Training + '/GetTrainingById',
    data: {}
  },
  // 培训班报名(带批量)
  TrainingSign: {
    url: API_URL + Training + '/TrainingSign',
    data: {}
  },
  // 获取课程笔记
  CourseNoteList: {
    url: API_URL + Course + '/CourseNoteList',
    data: {}
  },
  // 获取笔记信息
  NoteUpdate: {
    url: API_URL + Course + '/NoteUpdate',
    data: {}
  },
  // 获取评论种类
  GetCommentType: {
    url: API_URL + Commment + '/GetCommentType',
    data: {}
  },
  // 获取我的评论
  MyCommentList: {
    url: API_URL + Commment + '/MyCommentList',
    data: {}
  },
  // 获取我的考试信息
  MyExamStat: {
    url: API_URL + Exam + '/MyExamStat',
    data: {}
  },
  // 上传用户图片
  SetUserPhoto: {
    url: API_URL + User + '/SetUserPhoto'
  },
  // 课程推荐
  RecommendCourse: {
    url: API_URL + Guid + '/RecommendCourse'
  },
  AddQualityResources: {
    url: API_URL + CourseInfo + '/AddQualityResources'
  },
  MyProductRecordList: {
    url: API_URL + product + '/MyProductRecordList'
  },
  // 获取领域信息
  GetIndustryList: {
    url: API_URL + Page + '/GetIndustryList',
    data: {}
  },
  // 提交线索
  AddClub: {
    url: API_URL + Page + '/AddClub',
    data: {}
  },
  // 提交线索上传图片
  ToLead: {
    url: '/upload/api/admin/Common' + '/ToLead',
    data: {}
  },
  // 志愿者线索待评分列表
  GetUnfinshClubList: {
    url: API_URL + Page + '/GetUnfinshClubList',
    data: {}
  },
  // 志愿者线索详情列表
  GetClubDetail: {
    url: API_URL + Page + '/GetClubDetail',
    data: {}
  }
}
