import Vue from 'vue'
import Vuex from 'vuex'
import { getStore, getPCUrl } from '../plugins/utils'
import actions from './action'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    userInfo: getStore('userInfo') || {}, // 用户信息
    userAgent: getStore('userAgent') || {}, // 浏览器设备信息
    wxIndexUrl: getPCUrl('#/home'),
    wxLoginUrl: getPCUrl('#/userLogin'),
    netWorkType: '', // 网络类型
    perWindow: false, // 窗口背部阴影打开情况true为打开，false关闭（要打开笔记或者计划窗口比继续先打开背部阴影）
    perNoteBox: false, // 笔记修改窗口打开情况true为打开，false关闭
    perPlanBox: false, // 课程计划窗口打开情况true为打开，false关闭
    perHeadBox: false,
    pernoteLabel: '', // 课程标题
    pernoteInfor: '', // 课程内容
    perNoteForLesson: '', // 笔记关于哪门课程
    perNoteIndex: '', // 笔记ID
    examId: 0, // 试卷Id存储  
    examResultValue: 0, // 后台返回试卷结果码
    examValue: 0, // 试卷状态码(可能无用)
    planAddOrChange: '',
    planID: 0,
    planCourseID: 0,
    planCourseName: '',
    planCredit: 0,
    planStartTime: '',
    planFinishTime: '',
    planAwakePeriod: 0
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
