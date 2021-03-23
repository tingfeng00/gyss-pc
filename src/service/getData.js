import Api from './api'
import fetch from './fetch'

/**
 * 判断用户是否存在KeepOnline
 */
export const CheckUserIsExit = (data) => fetch.get(Api.CheckAccountExit.url,
  { ...Api.CheckAccountExit.data, ...data })
/**
 * 检查用户登录
 */
export const Authorization = (data) => fetch.post(Api.Authorization.url,
  { ...Api.Authorization.data, ...data })
/**
 * 保持用户在线
 */
export const KeepOnline = (data) => fetch.post(Api.KeepOnline.url,
  { ...Api.KeepOnline.data, ...data })
/**
 * 获取用户信息 
 */
export const GetUserInfo = (data) => fetch.post(Api.GetUerInfo.url,
  { ...Api.GetUerInfo.data, ...data })
/**
 * 获取用户信息
 */
export const LoginShort = (data) => fetch.post(Api.LoginShort.url,
  { ...Api.LoginShort.data, ...data })
/**
 * 登录获取去手机验证码
 */
export const SendMsg = (data) => fetch.post(Api.SendMsg.url,
  { ...Api.SendMsg.data, ...data })
/**
 * 首页志愿者风采
 */
export const StudentStyle = (data) => fetch.post(Api.StudentStyle.url,
  { ...Api.StudentStyle.data, ...data })
/**
 * 获取文章频道列表信息 parentId
 */
export const GetArticleChannelInfoList = (data) => fetch.post(Api.GetArticleChannelInfoList.url,
  { ...Api.GetArticleChannelInfoList.data, ...data })
/**
 * 添加评论
 */
export const AddComment = (data) => fetch.post(Api.AddComment.url,
  { ...Api.AddComment.data, ...data })
/**
 *文章内容
 */
export const ArticleContent = (data) => fetch.post(Api.ArticleContent.url,
  { ...Api.ArticleContent.data, ...data })
/**
 *生成验证码
 */
export const GenerateCode = (data) => fetch.post(Api.GenerateCode.url,
  { ...Api.GenerateCode.data, ...data })
/**
 *首页新闻推荐
 */
export const ArticleList = (data) => fetch.post(Api.ArticleList.url,
  { ...Api.ArticleList.data, ...data })
/**
 *验证验证码
 */
export const CheckValidateCode = (data) => fetch.post(Api.CheckValidateCode.url,
  { ...Api.CheckValidateCode.data, ...data })
/**
 *验证码登录
 */
export const LoginCode = (data) => fetch.post(Api.LoginCode.url,
  { ...Api.LoginCode.data, ...data })
/**
 *退出登录
 */
export const LoginOut = (data) => fetch.post(Api.LoginOut.url,
  { ...Api.LoginOut.data, ...data })
/**
 *踢出其他地方登录
 */
export const KickOut = (data) => fetch.post(Api.KickOut.url,
  { ...Api.KickOut.data, ...data })
/**
 *修改密码
 */
export const UpdatePwd = (data) => fetch.post(Api.UpdatePwd.url,
  { ...Api.UpdatePwd.data, ...data })
/**
 *首页轮播
 */
export const GetLink = (data) => fetch.post(Api.GetLink.url,
  { ...Api.GetLink.data, ...data })
/**
 *首页通知公告
 */
export const NoticeList = (data) => fetch.post(Api.NoticeList.url,
  { ...Api.NoticeList.data, ...data })
/**
 *首页通知公告
 */
export const GetArticleInfoList = (data) => fetch.post(Api.GetArticleInfoList.url,
  { ...Api.GetArticleInfoList.data, ...data })
  /**
 *首页课程中心ProductionInfoList
 */
export const CourseList = (data) => fetch.post(Api.CourseList.url,
  { ...Api.CourseList.data, ...data })
  /**
 *首页社区风采-学员风采
 */
export const ProductionInfoList = (data) => fetch.post(Api.ProductionInfoList.url,
  { ...Api.ProductionInfoList.data, ...data }, { timeout: 10000 })
/**
 *未读消息
 */
export const UnReadNotice = (data) => fetch.post(Api.UnReadNotice.url,
  { ...Api.UnReadNotice.data, ...data })
  /**
 *电子书频道
 */
export const BookCategory = (data) => fetch.post(Api.BookCategory.url,
  { ...Api.BookCategory.data, ...data })
  /**
 *电子书列表
 */
export const BookList = (data) => fetch.post(Api.BookList.url,
  { ...Api.BookList.data, ...data })
  /**
 *首页学员排行
 */
export const RankUserList = (data) => fetch.post(Api.RankUserList.url,
  { ...Api.RankUserList.data, ...data })
  /**
 *首页街道排行
 */
export const RankGroupList = (data) => fetch.post(Api.RankGroupList.url,
  { ...Api.RankGroupList.data, ...data })
  /**
 *课程点击排行
 */
export const CourseClickRank = (data) => fetch.post(Api.CourseClickRank.url,
  { ...Api.CourseClickRank.data, ...data })
 /**
 *首页文章排行
 */
export const GetArticleRank = (data) => fetch.post(Api.GetArticleRank.url,
  { ...Api.GetArticleRank.data, ...data })
  /**
 *首页实时数据
 */
export const LeftRealTimeData = (data) => fetch.post(Api.LeftRealTimeData.url,
  { ...Api.LeftRealTimeData.data, ...data })
  /**
 *电子书内容
 */
export const BookContent = (data) => fetch.post(Api.BookContent.url,
  { ...Api.BookContent.data, ...data })
  /**
 *章节列表
 */
export const BookChapterList = (data) => fetch.post(Api.BookChapterList.url,
  { ...Api.BookChapterList.data, ...data })
  /**
 *章节详情
 */
export const BookChapterContent = (data) => fetch.post(Api.BookChapterContent.url,
  { ...Api.BookChapterContent.data, ...data })
  /**
 *我的收藏课程   
 */
export const CourseCollect = (data) => fetch.post(Api.MyCourseCollect.url,
  { ...Api.MyCourseCollect.data, ...data })
 /**
 * 我的收藏文章
 */
export const EssayCollect = (data) => fetch.post(Api.MyEssayCollect.url,
  { ...Api.MyEssayCollect.data, ...data })
/**
 * 我的收藏作品
 */
export const ProductCollect = (data) => fetch.post(Api.MyProductCollect.url,
  { ...Api.MyProductCollect.data, ...data })
/**
 * 我的收藏电子书
 */
export const MyBookFavorite = (data) => fetch.post(Api.MyBookFavorite.url,
  { ...Api.MyBookFavorite.data, ...data })
/**
 * 我的收藏删除
 */
export const CollectDelete = (data) => fetch.post(Api.CollectDelete.url,
  { ...Api.CollectDelete.data, ...data })
/**
 * 添加收藏
 */
export const FavoriteAdd = (data) => fetch.post(Api.FavoriteAdd.url,
  { ...Api.FavoriteAdd.data, ...data })
/**
 * 查看收藏
 */
export const FavoriteExist = (data) => fetch.post(Api.FavoriteExist.url,
  { ...Api.FavoriteExist.data, ...data })
/**
 * 删除收藏
 */
export const FavoriteDelete = (data) => fetch.post(Api.FavoriteDelete.url,
  { ...Api.FavoriteDelete.data, ...data })
/**
 * 记录已读
 */
export const SetArticleRed = (data) => fetch.post(Api.SetArticleRed.url,
  { ...Api.SetArticleRed.data, ...data })
/**
 * 个人学习文档
 */
export const StudyStatistics = (data) => fetch.post(Api.StudyStatistics.url,
  { ...Api.StudyStatistics.data, ...data })
/**
 * 考试中心
 */
export const ExamCenter = (data) => fetch.post(Api.ExamCenter.url,
  { ...Api.ExamCenter.data, ...data })
/**
 * 考试详细信息
 */
export const GetExamInfo = (data) => fetch.post(Api.GetExamInfo.url,
  { ...Api.GetExamInfo.data, ...data })
/**
 * 考试种类列表
 */
export const GetExamType = (data) => fetch.post(Api.GetExamType.url,
  { ...Api.GetExamType.data, ...data })
/**
 * 考试列表页
 */
export const ExamListItem = (data) => fetch.post(Api.ExamListItem.url,
  { ...Api.ExamListItem.data, ...data })
/**
 * 考试答案提交
 */
export const GetExamReviewInfo = (data) => fetch.post(Api.GetExamReviewInfo.url,
  { ...Api.GetExamReviewInfo.data, ...data })
/**
 * 考试结果获取
 */
export const PostExam = (data) => fetch.post(Api.PostExam.url,
  { ...Api.PostExam.data, ...data })
/**
 * 注册页面获取镇区列表
 */
export const GetAllGroupList = (data) => fetch.post(Api.GetAllGroupList.url,
  { ...Api.GetAllGroupList.data, ...data })
/**
 * 获取登录注册验证码
 */
export const GetLoginVC = (data) => fetch.post(Api.GetLoginVC.url,
  { ...Api.GetLoginVC.data, ...data })
/**
 * 注册
 */
export const Register = (data) => fetch.post(Api.Register.url,
  { ...Api.Register.data, ...data })
/**
 * 注册
 */
export const FindPasswordEmail = (data) => fetch.post(Api.FindPasswordEmail.url,
  { ...Api.FindPasswordEmail.data, ...data })
/**
 * 添加点赞
 */
export const AddUserAssist = (data) => fetch.post(Api.AddUserAssist.url,
  { ...Api.AddUserAssist.data, ...data })
/**
 * 文章页面公告列表
 */
export const NoticeCategory = (data) => fetch.post(Api.NoticeCategory.url,
  { ...Api.NoticeCategory.data, ...data })
/**
 * 删除点赞
 */
export const DelUserAssist = (data) => fetch.post(Api.DelUserAssist.url,
  { ...Api.DelUserAssist.data, ...data })
/**
 * 更新用户信息
 */
export const UpdateUserInfo = (data) => fetch.post(Api.UpdateUserInfo.url,
  { ...Api.UpdateUserInfo.data, ...data })
/**
 * 获取评论
 */
export const CommentList = (data) => fetch.post(Api.CommentList.url,
  { ...Api.CommentList.data, ...data })
/**
 * 网上展厅分类列表
 */
export const OnlineShowList = (data) => fetch.post(Api.ProductionCategoryInfoList.url,
  { ...Api.ProductionCategoryInfoList.data, ...data })
/**
 * 网上展厅列表内容
 */
export const OnlineShowInfor = (data) => fetch.post(Api.ProductionInfoList.url,
  { ...Api.ProductionInfoList.data, ...data }, { timeout: 40000 })
/**
 * 网上展厅详细内容
 */
export const ProductionDetail = (data) => fetch.post(Api.ProductionDetail.url,
  { ...Api.ProductionDetail.data, ...data })
/**
 * 网上展厅获取随机内容
 */
export const ProductionListTask = (data) => fetch.post(Api.ProductionListTask.url,
  { ...Api.ProductionListTask.data, ...data })
/**
 * 下载网上展厅资料
 */
export const DownLoadImages = (data) => fetch.post(Api.DownLoadImages.url + '?id=' + data.id,
  {})
/**
 * 课程分类-左侧导航
 */
export const CourseCategory = (data) => fetch.post(Api.CourseCategory.url,
  { ...Api.CourseCategory.data, ...data }) 
/**
 * 我的课程
 */
export const MyCenter = (data) => fetch.post(Api.MyCenter.url,
  { ...Api.MyCenter.data, ...data })
/**
 * 我的课程删除学习中的课程
 */
export const DelUserCourseReg = (data) => fetch.post(Api.DelUserCourseReg.url,
  { ...Api.DelUserCourseReg.url, ...data })
/**
 * 获取课程类型
 */
export const GetCourseType = (data) => fetch.post(Api.GetCourseType.url,
  { ...Api.GetCourseType.data, ...data })
/**
 * 获取课程类型
 */
export const CourseList2 = (data) => fetch.post(Api.CourseList2.url,
  { ...Api.CourseList2.data, ...data })
/**
 * 课程内容
 */
export const CourseContent = (data) => fetch.post(Api.CourseContent.url,
  { ...Api.CourseContent.data, ...data })
/**
 * 课程内容
 */
export const CourseComment = (data) => fetch.post(Api.CourseComment.url,
  { ...Api.CourseComment.data, ...data })
/**
 * 获取视频内容
 */
export const Play = (data) => fetch.post(Api.Play.url,
  { ...Api.Play.data, ...data })
/**
 * Refresh接口
 */
export const Refresh = (data) => fetch.post(Api.Refresh.url,
  { ...Api.Refresh.data, ...data })
/**
 * 防止播放多个视频
 */
export const ClearPlayingCourse = (data) => fetch.post(Api.ClearPlayingCourse.url,
  { ...Api.ClearPlayingCourse.data, ...data })
/**
 * 获取mp4视频内容
 */
export const PlayJwplay = (data) => fetch.post(Api.PlayJwplay.url,
  { ...Api.PlayJwplay.data, ...data })
/**
 * 获取所有商品父级种类
 */
export const ProductTypeList = (data) => fetch.post(Api.ShopCenter.url, 
  { ...data })
/** 
 * 获取所有商品父级种类
 */
export const MyProductRecordList = (data) => fetch.post(Api.MyProductRecordList.url, 
  { ...Api.MyProductRecordList.data, ...data })
  // , { headers: { 'Content-Type': 'application/json' } }
/**
 * 根据条件查询符合条件商品列表
 */
export const ProductList = (data) => fetch.post(Api.ProductList.url,
  { ...Api.ProductList.data, ...data })
/**
 * 获取商品详细信息
 */
export const ProductDetail = (data) => fetch.post(Api.ProductDetail.url,
  { ...Api.ProductDetail.data, ...data })
/**
 * 积分商城商品兑换
 */
export const SendRecord = (data) => fetch.post(Api.SendRecord.url,
  { ...Api.SendRecord.data, ...data })
/**
 * 积分商城热门商品兑换
 */
export const ProductHotList = (data) => fetch.post(Api.ProductHotList.url,
  { ...Api.ProductHotList.data, ...data })
/**
 * 记录mp4视频进度
 */
export const SingleProcess = (data) => fetch.post(Api.SingleProcess.url,
  { ...Api.SingleProcess.data, ...data })
/**
 * 记录mp4视频进度
 */
export const CourseComment2 = (data) => fetch.post(Api.CourseComment2.url,
  { ...Api.CourseComment2.data, ...data })
/**
 * 课程添加笔记
 */
export const AddNote = (data) => fetch.post(Api.AddNote.url,
  { ...Api.AddNote.data, ...data })
/**
 * 课程删除笔记
 */
export const DelNote = (data) => fetch.post(Api.DelNote.url,
  { ...Api.DelNote.data, ...data })
/**
 * 课程播放页添加评论
 */
export const CourseCommentAdd = (data) => fetch.post(Api.CourseCommentAdd.url,
  { ...Api.CourseCommentAdd.data, ...data })
/**
 * 获取jy精英-三分屏课程信息PlayJY
 */
export const PlayJY = (data) => fetch.post(Api.PlayJY.url,
  { ...Api.PlayJY.data, ...data })
/**
 * 防伪造请求
 */
export const AntiForgeryToken = (data) => fetch.post(Api.AntiForgeryToken.url,
  { ...Api.AntiForgeryToken.data, ...data })
/**
 * 上传学习圈文章
 */
export const CircleArticleCreate = (data) => fetch.post(Api.CircleArticleCreate.url,
  { ...Api.CircleArticleCreate.data, ...data })
/**
 * 学习圈详情
 */
export const CircleDetail = (data) => fetch.post(Api.CircleDetail.url,
  { ...Api.CircleDetail.data, ...data })
/**
 * 圈内达人
 */
export const CircleArticleHotModel = (data) => fetch.post(Api.CircleArticleHotModel.url,
  { ...Api.CircleArticleHotModel.data, ...data })
/**
 * 上传学习圈
 */
export const CircleCreate = (data) => fetch.post(Api.CircleCreate.url,
  { ...Api.CircleCreate.data, ...data })
/**
 * 学习圈文章列表
 */
export const CircleArticleList = (data) => fetch.post(Api.CircleArticleList.url,
  { ...Api.CircleArticleList.data, ...data })
/**
 * 热门学习圈
 */
export const CircleHotInfoList = (data) => fetch.post(Api.CircleHotInfoList.url,
  { ...Api.CircleHotInfoList.data, ...data })
/**
 * 学习圈列表
 */
export const CircleInfoList = (data) => fetch.post(Api.CircleInfoList.url,
  { ...Api.CircleInfoList.data, ...data })
/**
 * 学习圈类型
 */
export const CircleTypeInfoList = (data) => fetch.post(Api.CircleTypeInfoList.url,
  { ...Api.CircleTypeInfoList.data, ...data })
/**
 * 获取课程计划
 */
export const StudyPlanGet = (data) => fetch.post(Api.StudyPlanGet.url,
  { ...Api.StudyPlanGet.data, ...data })
/**
 * 上传课程计划
 */
export const StudyPlanUpdate = (data) => fetch.post(Api.StudyPlanUpdate.url,
  { ...Api.StudyPlanUpdate.data, ...data })
/**
 * 添加课程计划
 */
export const StudyPlanAdd = (data) => fetch.post(Api.StudyPlanAdd.url,
  { ...Api.StudyPlanAdd.data, ...data })
/**
 * 获取课程计划
 */
export const MyStudyPlan = (data) => fetch.post(Api.MyStudyPlan.url,
  { ...Api.MyStudyPlan.data, ...data })
/**
 * 删除课程计划
 */
export const DelStudyPlan = (data) => fetch.post(Api.DelStudyPlan.url,
  { ...Api.DelStudyPlan.data, ...data })
/**
 * 附件上传
 */
export const UploadAttachment = (data, config) => fetch.postFormData(Api.UploadAttachment.url, data,
  config)
/**
 * 培训班
 */
export const TrainingClass = (data) => fetch.post(Api.TrainingClass.url,
  { ...Api.TrainingClass.data, ...data })
/**
 * 培训班类型列表
 */
export const GetTrainingClassTypeList = (data) => fetch.post(Api.GetTrainingClassTypeList.url,
  { ...Api.GetTrainingClassTypeList.data, ...data })
/**
 * 学校列表
 */
export const GetTrainingSchoolList = (data) => fetch.post(Api.GetTrainingSchoolList.url,
  { ...Api.GetTrainingSchoolList.data, ...data })
/**
 * 培训班详情页
 */
export const GetTrainingById = (data) => fetch.post(Api.GetTrainingById.url,
  { ...Api.GetTrainingById.data, ...data })
/**
 * 培训班报名(带批量)
 */
export const TrainingSign = (data) => fetch.post(Api.TrainingSign.url,
  { ...Api.TrainingSign.data, ...data })
/**
 * 获取课程笔记列表
 */
export const CourseNoteList = (data) => fetch.post(Api.CourseNoteList.url,
  { ...Api.CourseNoteList.data, ...data })
/**
 * 获取笔记信息信息
 */
export const NoteUpdate = (data) => fetch.get(Api.NoteUpdate.url,
  { ...Api.NoteUpdate.data, ...data })
/**
 * 修改笔记信息
 */
export const NoteUpdatePost = (data) => fetch.post(Api.NoteUpdate.url,
  { ...Api.NoteUpdate.data, ...data })
/**
 * 获取评论类型
 */
export const GetCommentType = (data) => fetch.get(Api.GetCommentType.url,
  { ...Api.NoteUpdate.data, ...data })
/**
 * 获取我的评论
 */
export const MyCommentList = (data) => fetch.post(Api.MyCommentList.url,
  { ...Api.MyCommentList.data, ...data })
/**
 * 获取我的考试信息
 */
export const MyExamStat = (data) => fetch.post(Api.MyExamStat.url,
  { ...Api.MyExamStat.data, ...data })
/**
 * 获取我的考试信息
 */
export const NoticeContent = (data) => fetch.post(Api.NoticeContent.url,
  { ...Api.NoticeContent.data, ...data })
/**
 * 课程推荐
 */
export const RecommendCourse = (data) => fetch.post(Api.RecommendCourse.url,
  { ...Api.RecommendCourse.data, ...data })
/**
 * 首页分享资源
 */
export const AddQualityResources = (data) => fetch.post(Api.AddQualityResources.url,
  { ...Api.AddQualityResources.data, ...data })
  /**
 * 提交线索
 */
export const AddClub = (data) => fetch.post(Api.AddClub.url,
  { ...Api.AddClub.data, ...data }, { headers: { 'Content-Type': 'application/json' } })
    /**
 * 提交线索上传图片
 */
export const ToLead = (data) => fetch.postFormData(Api.ToLead.url, data)
/**
 * 获取领域信息
 */
 export const GetIndustryList = (data) => fetch.post(Api.GetIndustryList.url,
  { ...Api.GetIndustryList.data, ...data }, { headers: { 'Content-Type': 'application/json' } })
/**
 * 获取领域信息
 */
 export const GetUnfinshClubList = (data) => fetch.post(Api.GetUnfinshClubList.url,
  { ...Api.GetIndustryList.data, ...data }, { headers: { 'Content-Type': 'application/json' } })
  /**
 * 获取领域信息
 */
 export const GetClubDetail = (data) => fetch.post(Api.GetClubDetail.url,
  { ...Api.GetClubDetail.data, ...data }, { headers: { 'Content-Type': 'application/json' } }) 
/**
 * 上传用户头像
 */
export const SetUserPhoto = (data) => fetch.post(Api.SetUserPhoto.url, { ...Api.SetUserPhoto.data, ...data })
/* 将所有的API封装起来 */
const allApi = {}
for (let key in Api) {
  if (Api[key].method === 'get') {
    if (key === 'GetNoticeInfoContent') {
      allApi[key] = (data) => fetch.get(Api[key].url + '/' + data.Id, { ...Api[key].data, ...data })
    } else {
      allApi[key] = (data) => fetch.get(Api[key].url, { ...Api[key].data, ...data })
    }
  } else if (Api[key].method === 'formData') {
    allApi[key] = (data, config) => fetch.postFormData(Api[key].url, data, config)
  } else {
    allApi[key] = (data) => fetch.post(Api[key].url, { ...Api[key].data, ...data })
  }
}
export default allApi
