import {
  GET_USERINFO,
  GET_USERAGENT,
  GET_NETWORKTYPE,
  SAVE_USERINFO,
  SET_PERSONWINDOW_DISAPPEAR,
  SET_NOTECHANGE_APPEAR,
  SET_PLANCHANGE_APPEARCREATE,
  SET_PLANCHANGE_APPEARFIX,
  SET_PLANSTARTTIME,
  SET_PLANFINISHTIME,
  SET_PLANAWAKEPERIOD,
  GET_EXAMID,
  GET_EXAMRESULT,
  SET_NOTELABEL,
  SET_NOTEINFOR,
  SET_HEADCHANGE_APPEAR
} from './mutation-types.js'

export default {
    // 获取用户信息
    [GET_USERINFO] (state, userInfo) {
        state.userInfo = userInfo
    },
    // 获取userAgent
    [GET_USERAGENT] (state, userAgent) {
        state.userAgent = userAgent
    },
    // 获取网络类型
    [GET_NETWORKTYPE] (state, netWorkType) {
        state.netWorkType = netWorkType
    },
    // 保存用户信息
    [SAVE_USERINFO] (state, userInfo) {
        state.userInfo = userInfo
    },
    // 获取考试ID
    [GET_EXAMID] (state, examId) {
        state.examId = examId
    },
    // 获取考试结果信息
    [GET_EXAMRESULT] (state, result) {
        state.examResultValue = result
    },
    // 隐藏所有个人中心弹窗
    [SET_PERSONWINDOW_DISAPPEAR] (state) {
        state.perNoteBox = false
        state.perPlanBox = false
        state.perWindow = false
        state.perHeadBox = false
    },
    [SET_HEADCHANGE_APPEAR] (state) {
        state.perHeadBox = true
        state.perWindow = true
    },
    // 显示笔记修改弹窗
    [SET_NOTECHANGE_APPEAR] (state, arr) {
        state.pernoteLabel = arr[0]
        state.pernoteInfor = arr[1]
        state.pernoteId = arr[4]
        state.perNoteForLesson = arr[2]
        state.perNoteIndex = arr[3]
        state.perWindow = true
        state.perNoteBox = true
    },
    [SET_NOTELABEL] (state, value) {
        state.pernoteLabel = value
    },
    [SET_NOTEINFOR] (state, value) {
        state.pernoteInfor = value
    },
    // 显示计划添加窗口
    [SET_PLANCHANGE_APPEARCREATE] (state, arr) {
        state.perWindow = true
        state.perPlanBox = true
        state.planAddOrChange = '添加'
        state.planCourseID = arr[0]
        state.planCourseName = arr[1]
        state.planCredit = arr[2]
        state.planStartTime = new Date()
        state.planFinishTime = new Date()
        state.planAwakePeriod = 0
    },
    [SET_PLANCHANGE_APPEARFIX] (state, arr) {
        state.perWindow = true
        state.perPlanBox = true
        state.planAddOrChange = '修改'
        state.planID = arr[0]
        state.planCourseID = arr[1]
        state.planCourseName = arr[2]
        state.planCredit = arr[3]
        state.planStartTime = arr[4]
        state.planFinishTime = arr[5]
        if (arr[6] == '每天一次') {
            state.planAwakePeriod = 0
        } else if (arr[6] == '每周一次') {
            state.planAwakePeriod = 1
        } else {
            state.planAwakePeriod = 0
        }
    },
    // 设置计划开始时间
    [SET_PLANSTARTTIME] (state, value) {
        state.planStartTime = value
    },
    // 设置计划结束时间
    [SET_PLANFINISHTIME] (state, value) {
        state.planFinishTime = value
    },
    [SET_PLANAWAKEPERIOD] (state, value) {
        state.planAwakePeriod = value
    }
}
