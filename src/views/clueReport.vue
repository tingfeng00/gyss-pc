<template>
    <div class="clueReport">
        <div class="title clearFix">
            <p class="name pull-left">公益线索提报</p>
            <p class="notice pull-right"><img src="../assets/notice-icon.png" alt=""> 用户须知</p>
        </div>
        <div class="container">
            <el-form ref="form" :model="form"  :rules="rules1">
               
                <el-form-item  label="所在地区:" class="selArea">
                     <el-select placeholder="请选择省份" v-model="form.province" @change="changeProvince">
                        <el-option
                            v-for="item in provinceList"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>&nbsp;&nbsp;
                    <el-select placeholder="请选择城市" 
                    v-model="form.city"
                     @focus="focusCity" 
                     @visible-change="getCityLists"
                     @change="changeCity"
                     ref="citySel"
                     popper-class="citySel"
                     >
                        <el-option
                            v-for="item in cityList"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>&nbsp;&nbsp;
                    <el-select placeholder="请选择区县"
                     v-model="form.country"
                     @visible-change="getCountryLists"
                     @change="changeCountry"
                     popper-class="countrySel"
                     >
                        <el-option
                            v-for="item in countryList"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细地址:">
                    <el-input type="text" v-model="form.address" placeholder="可选填" class="inputEl"></el-input>
                </el-form-item>
                <el-form-item label="线索发现时间:">
                    <date-select
                        @getYear="getYear"
                        @getMonth="getMonth"
                        @getDay="getDay"
                    >
                    </date-select>
                </el-form-item>
                <el-form-item label="涉及单位或企业:">
                    <el-input type="text" v-model="form.companyList" placeholder="可选填，以多个分号分隔" class="inputEl"></el-input>
                </el-form-item>
                <el-form-item label="公益损害领域:">
                    <el-select placeholder="请选择公益损害领域" v-model="form.area1" @change="getIndustryList2($event)">
                        <el-option
                            v-for="item in industryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <el-select placeholder="请选择公益损害领域" v-model="form.area2" v-if="showIndustry2">
                        <el-option
                            v-for="item in industryList2"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <div class="desc">
                        食品药品安全领域：主要指在食品安全、化妆品卫生和药品、医疗器械、保健食品的研制、生产、流通、
                        使用等方面侵害国家或者社会公共利益的情形。
                    </div>
                </el-form-item>
                <el-form-item label="反映情况简要描述:">
                    <div class="area">
                        <textarea name="" v-model="form.descText" id="" placeholder="简要描述情况，有助于线索评估"></textarea>
                        <p>还可输入{{num}}字</p>
                    </div>
                    <div class="upload">
                        <div class="hd clearFix">
                            <div class="content pull-left">
                                <ul class="clearFix">
                                    <li v-for="(item,index) in AttachList" :key="index">
                                        <div class="imgBox">
                                            <img v-if="item.isImg" :src="item.path" alt="upload" class="imgList">
                                            <img src="../assets/close-icon.png" alt="" class="close" @click="deleteAttach(item, index)">
                                        </div>
                                    </li>
                                </ul>
                                
                            </div>
                            <div class="btn pull-left" v-if="AttachList.length<5">
                                <input type="file" name="image" ref="attach" accept="image/*" @change='onchangeImgFun($event)'
                                class="upload-btn user-header-com" >
                                <img src="../assets/upload-icon.png" alt="" @click="getAttachment">
                            </div>
                            <div class="tip pull-left">
                                共<span>{{AttachList.length}}</span>张,还能上传<span>{{5-AttachList.length}}</span>张
                            </div>
                        </div>
                        <div class="bd">
                            图片拍摄日期 <el-date-picker
                                v-model="picTime"
                                type="date"
                                placeholder="选择图片拍摄日期">
                            </el-date-picker>  
                        </div>
                        <div class="ft clearFix">
                            <div class="ft-title pull-left">
                                上传附件要求:
                            </div>
                            <div class="list pull-left">
                              <p>1、图片清晰；</p>
                              <p>2、如实反映所描述信息；</p>
                              <p>3、最少2张最多5张；</p>
                              <p>4、规定图片大小、格式</p>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                
            </el-form>
        </div>
        <div class="notice">
            <div class="title">
                <img src="../assets/warn-icon2.png" alt="">
            </div>
            <div class="text">
                线索提报人应当如实反映情况。对于借线索提报捏造事实、诬告陷害的，依照有关规定严肃处理；
                涉嫌违法犯罪的， 依法处理。
            </div>
                
        </div>
        <div class="submit">
            <el-button type="primary" @click.native="submit">提交线索</el-button>
        </div>
        <!-- <div>
            <router-view @courseType="titleChange" :keys="examNameToSend" ref="grandson"></router-view>
        </div> -->
    </div>
</template>

<script>
import { GetAllGroupList, GetIndustryList, AddClub, ToLead } from '../service/getData'
import { getFileType, formatDate } from '../plugins/utils'
import { MessageBox } from 'element-ui'
export default {
    data: function () {
         return {
            mineStatusValue: '',
            allGroupList: [],
            provinceList: [],
            cityList: [],
            countryList: [],
            industryList: [],
            industryList2: [],
            showIndustry2: false,
            AttachList: [],
            num: '150',
            picTime: '',
            form: {
                province: '',
                city: '',
                country: '',
                region: '',
                address: '',
                companyList: '',
                year: 0,
                month: 0,
                day: 0,
                area1: '',
                area2: '',
                regionId: '',
                descText: '',
                occurrenceDate: ''
            },
            rules1: {
                // account: [
                //     { required: true, validator: checkAccount, trigger: 'blur' }
                // ],
                // idCard: [
                //     { required: true, validator: checkIdCard, trigger: 'blur' }
                // ],
                // passWord: [
                //     { required: true, validator: checkPassWord, trigger: 'blur' }
                // ],
                // cerPassWord: [
                //     { required: true, validator: checkCerWord, trigger: 'blur' }
                // ]
            }
            
        }
    },
    mounted: function () {
        this.$emit('getchildvalue', '0', '0')
        this.getAllGroupList()
        this.getIndustryList()
    },
    methods: {
        getYear (val) {
            this.form.year = val
        },
        getMonth (val) {
            this.form.month = val
        },
        getDay (val) {
            this.form.day = val
        },
        handleCheckChange (data, checked, node) {
            if (checked == true) {
                this.checkedId = data.id
                this.$refs.tree.setCheckedNodes([data])
                // console.log(data)
                this.form.region = data.text
                this.form.regionId = data.id
            }
        },
        getAttachment () {
            // eslint-disable-next-line
            var notNeed = FastClick.notNeeded(document.body)
            this.$refs.attach.click()
            if (!notNeed) {
                this.$refs.attach.click()
            }
        },
        async onchangeImgFun (e) {
             let file = e.target.files[0]
                let arr = file.name.split('.')
                let fileType = arr[arr.length - 1]
                let formData = new FormData()
                let fileName = `${+new Date()}.${fileType}`
                let time = new Date()
                let time1 = formatDate(time, 'yyyy-MM-dd')
                formData.append('fileType', 'ImageTraining')
                formData.append('uploadDates', time1)
                formData.append('ImageToUpload', file, fileName)
                if ((file.size / 1024 / 1024) > 10) {
                    MessageBox('图片大小不得超过10M')
                    return
                }
                let type = getFileType(fileType)
                if (type != 'jpeg' && type != 'png' && type != 'gif') {
                    MessageBox('请使用主流图片格式')
                    return
                }
                // console.log(formData.get('FileType'), formData.get('FileName'), formData.get('file'))
                let res = await ToLead(formData)
                if (res.msg == 'OK') {
                    MessageBox('上传成功')
                    let type = getFileType(fileType)
                    let isImg = false
                    if (type == 'jpeg' || type == 'png' || type == 'gif') {
                        isImg = true
                    }
                    // let obj = { Name: fileName, Url: res.Data.Url, Size: res.Data.Size, Type: type, isImg }
                    let obj = { name: res.data.fileName, path: res.data.filePath, isImg, date: '', desc: '' }
                    this.AttachList.push(obj)
                    console.log(this.AttachList)
                } else {
                    MessageBox('上传失败')
                }
        },
        deleteAttach (item, index) {
            MessageBox.confirm('是否要删除该文件？').then(() => {
                this.AttachList.splice(index, 1)
            })
        },
        // 获取省份
        async getAllGroupList () {
            let data = await GetAllGroupList({ id: '0' })
            this.provinceList = data
        },
        // 选中省份
        changeProvince (val) {
            this.getAllGroupList2(val)
        },
        // 获取城市
        async getAllGroupList2 (cityid) {
            let data = await GetAllGroupList({ id: cityid })
            this.cityList = data
            // JSON.parse(JSON.stringify(data))
        },
        // 选中城市
        changeCity (val) {
            this.getAllGroupList3(val)
        },
        // 获取县区
        async getAllGroupList3 (countryId) {
            let data = await GetAllGroupList({ id: countryId })
            this.countryList = data
        },
        // 选中县区
        async changeCountry (val) {
           this.countryId = val 
        },
        focusCity () {
        },
        getCityLists (flag) {
            if (flag) {
                if (this.cityList.length == 0) {
                    this.$message('暂无数据,请先选择省份')
                    this.$refs.citySel.blur()
                }
            }
        },
        getCountryLists (flag) {
             if (flag) {
                 if (this.countryList.length == 0) {
                    this.$message('暂无数据,请先选择省份和城市')
                    this.$refs.countrySel.blur()
                 }
             }
        },
        // 获取领域信息
        async getIndustryList () {
            let data = await GetIndustryList({ parentId: 0 })
            if (data.msg == 'OK') {
                this.industryList = data.data
                // this.industrySlots[0].values = data.data
                // this.damageAreaTipList = []
            }
        },
        async getIndustryList2 (id) {
            let data = await GetIndustryList({ parentId: id })
            if (data.msg == 'OK') {
                this.industryList2 = data.data
                this.showIndustry2 = true
                this.form.area2 = data.data[0].id
            }
        },
        async submit () {
            let date1 = this.form.year + '-' + this.form.month + '-' + this.form.day
            let data = {
                provincialId: this.form.province,
                cityId: this.form.city,
                countyId: this.form.country,
                companyList: this.form.companyList,
                industryId: this.form.area1,
                subIndustryId: this.form.area2,
                description: this.form.descText,
                address: this.form.address,
                files: this.AttachList,
                occurrenceDate: date1
            }
            let data1 = await AddClub(data)
            if (data1.msg == 'OK') {
                alert('提交成功')
            } else {
                MessageBox(data1.msg)
            }
        }
    },
    watch: {
        'form.descText' (val, oldVal) {
            if (val.length >= 0) {
                this.form.descText = val.slice(0, 150)
                let length = val.length
                this.num = 150 - length
            }
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .clueReport{
       .title{
           padding: 30px 20px;
           background: #fff;
           .name{
               border-left: 7px solid #066cc4;
               text-indent: 35px;
               font-size: 16px;
               color: #066fc4;
               font-weight: bold;
           }
           .notice{
               font-size: 14px;
               color: #066fc4;
               
               img{
                   margin-right: 5px;
               }
           }
       }
       .container{
           background: #fff;
           padding: 40px 60px;
           margin-top: 20px;
           form{
               .el-form-item{
                   margin-bottom: 40px;
                   .el-form-item__label{
                       float: none;
                   }
                   .el-form-item__content{
                       float: none;
                       input{
                           border: 1px solid #cecbce;
                       }
                       .inputEl{
                           width: 510px;
                       }
                       .el-select{
                           margin-right: 20px;
                       }
                       .desc{
                           margin-top: 20px;
                           color: #666;
                           font-size: 12px;
                           line-height: 24px;
                       }
                  }
                  .area{
                      border: 1px solid #cecbce;
                      width: 485px;
                      padding: 0 10px 10px 10px;
                      @extend %clearFix;
                      textarea{
                        height: 130px;
                      }
                      p{
                          float: right;
                          height: 20px;
                          line-height: 20px;
                          color: #666;
                      }
                  }
                  .upload{
                      margin-top: 20px;
                      .content{
                          ul{
                              margin-right: 20px;
                              @extend %clearFix;
                              li{
                                  float:left;
                                  margin-right: 10px;
                                  &:nth-last-child(1){
                                      margin-right: 0;
                                  }
                              }
                          }
                      }
                      .hd{
                          .btn{
                              margin-top: 5px;
                              position: relative;
                              width: 50px;
                              height: 50px;
                              cursor: pointer;
                              input{
                                  width: 50px;
                                  height: 50px;
                                  position: absolute;
                                  opacity: 0;
                                  z-index: 5;
                              }
                              img{
                                  width: 50px;
                                  height: 50px;
                                  position: absolute;
                                  z-index: 1;
                              }
                          }
                          .tip{
                              margin-left: 20px;
                              line-height: 60px;
                              span{
                                  color: #e4393c;
                              }
                          }
                      }
                      .bd{
                          margin-top: 20px;
                          .el-input__inner{
                              padding-left:15px ;
                              padding-right: 15px;
                              width: 150px;
                          }
                          .el-input__prefix{
                              display: none;
                          }
                          
                      }
                      .content{
                          ul{
                              li{
                                  .imgBox{
                                    width: 60px;
                                    height: 60px;
                                    border: 1px solid #cecbce;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    position: relative;
                                    .imgList{
                                        max-width: 60px;
                                        height: auto;
                                    }
                                    .close{
                                        position: absolute;
                                        width: 12px;
                                        height: 12px;
                                        right: 0;
                                        top: 0;
                                        z-index: 10;
                                        cursor: pointer;
                                    }
                                  }
                                  .time{
                                      margin-left: 20px;
                                  }
                              }
                          }
                      }
                      .ft{
                          margin-top: 20px;
                          .ft-title{
                              height: 30px;
                              line-height: 30px;
                              font-size: 14px;
                              color: #666;
                          }
                          .list{
                              color: #666;
                              margin-left: 10px;
                              p{
                                height: 30px;
                                line-height: 30px; 
                              }
                          }
                      }
                  }
                  .year,.month,.day{
                     float: left;
                     .el-input__prefix{
                         display: none;
                     }
                  }
               }
           } 
       }
       .notice{
           margin-top: 3px;
            background: #fff;
            padding-bottom: 30px;
            @extend %clearFix;
            .title{
                padding: 20px 0 10px 50px;
                font-size: 16px;
                float:left;
            }
            .text{
                float:left;
                line-height: 24px;
                font-size: 14px;
                width: 705px;
                color: #ffaa02;
                padding-top: 20px;
                margin-left: 10px;
            }
        }
       .submit{
            margin-top: 10px;
            background: #fff;
            padding: 20px 0;
            .el-button{
                margin-left: 50px;
                width: 250px;
                background: #066fc4;
                height: 50px;
                font-size: 18px;
            }
        }
    }
    
</style>
