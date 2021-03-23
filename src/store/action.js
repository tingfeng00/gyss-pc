import { setStore, userAgent } from '../plugins/utils'
import { GetUserInfo, StudyPlanGet } from '../service/getData'
import { GET_USERAGENT, GET_USERINFO, SAVE_USERINFO, SET_PLANCHANGE_APPEARCREATE, SET_PLANCHANGE_APPEARFIX } from './mutation-types.js'

export default {
    async getUserInformation ({ state, commit }, payload) {
        let data = await GetUserInfo(payload)
            setStore('userInfo', data.Data || {})
            commit(GET_USERINFO, data.Data || {})
    },
    saveUserInfo ({ state, commit }, payload) {
        setStore('userInfo', payload || {})
        commit(SAVE_USERINFO, payload || {})
    },
    getUserAgent ({ state, commit }, payload) {
        let data = userAgent()
        commit(GET_USERAGENT, data)
    },
    async setplanchangesappear ({ state, commit }, payload) {
        if (payload[0] == 0) {
            payload.splice(0, 2)
            commit(SET_PLANCHANGE_APPEARCREATE, payload)
        } else {
            console.log(payload)
            let msg = await StudyPlanGet({
                planId: payload[1]
            })
            
            let start = new Date(msg.RemindDate)
            let end = new Date(msg.PlanFinishDate)
            let arr = [payload[1], payload[2], payload[3], payload[4], start, end, msg.RemindCycle]
            commit(SET_PLANCHANGE_APPEARFIX, arr)
        }
    }
}
