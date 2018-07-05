<template>
    <div class="index">
        <div class="lottery">
            <Countdown @open="open()"></Countdown>
            <Issuenum ref="issuenum"></Issuenum>
            <div style="clear:both"></div>
            <!-- 投注body -->
            <div class="lottery-body">
                <ul class="play-list">
                    <li class="ripple" 
                    v-for="(ele,idx) in lotteryInit.list"
                    :class="{active:ele.name===init.name}"
                    @click="init.name=ele.name,init.playKey=false"
                    >
                    {{ele.name}}
                    </li>
                </ul>
                <div class="play-list-type">
                    <ul>
                        <li v-for="(val,key) in lotteryInit.CrtPlayMethod">
                            <label>{{key}}</label>
                            <span v-for="ele1 in val" 
                            @click="init.playKey=key,init.playSub=ele1.name,init.ball={}"
                            :class="{active:init.playKey===key&&init.playSub===ele1.name}"
                            >{{ele1.name}}</span>
                        </li>
                    </ul>
                </div>
                <!-- 选号与购彩篮 -->
                <div class="ball-tip">
                    <i class="el-icon-info" style="color:#f23838;"></i>
                    <span style="color:#f23838;">选号提示:</span>
                    <span>{{lotteryInit.tip}}</span>
                </div>
                <div class="ball-lottery-box">
                    <div class="select-ball">
                        <div class="select-ball-list" v-for="(val,key,idx) in lotteryInit.CrtPlayBallMethod">
                            <span class="ball-key">{{key}}</span>
                            <div class="ball-number" ref="balldom">
                                <span class="ripple" 
                                v-for="(ele,idx) in val" 
                                @click="selectBall(ele,key)"
                                >{{ele}}</span>
                            </div>
                            <div class="ball-selector">
                                <div class="wrap">
                                    <span @click="seleteAll(key,val,idx)">全</span>
                                    <span @click="seleteBig(key,val,idx)">大</span>
                                    <span @click="seleteMin(key,val,idx)">小</span>
                                    <span @click="seleteOdd(key,val,idx)">奇</span>
                                    <span @click="seleteEven(key,val,idx)">偶</span>
                                    <span @click="clearBall(key,val,idx)">清</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="lotteryInit.CrtPlayBallMethod==false">
                            <div class="textarea-wrap">
                                <el-input
                                type="textarea"
                                rows="12"
                                resize="none"
                                placeholder="请输入内容">
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="play-options">
                    <div class="left">
                        <div class="play-options-number">
                            <input type="text" class="res-num" @blur="changeVal()" v-model="betNum">
                            <el-dropdown @command="handleCommand" trigger="click">
                                <span class="selete-num"><i class="el-icon-caret-bottom"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="10倍">10</el-dropdown-item>
                                    <el-dropdown-item command="100倍">100</el-dropdown-item>
                                    <el-dropdown-item command="1000倍">1000</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <span class="jian" @click="subtraction()">-</span>
                            <span class="jia" @click="addition()">+</span>
                        </div>
                        <el-button-group class="button-bar">
                            <el-button size="mini" @click="moneyMode=1">元</el-button>
                            <el-button size="mini" @click="moneyMode=0.1">角</el-button>
                            <el-button size="mini" @click="moneyMode=0.01">分</el-button>
                            <el-button size="mini" @click="moneyMode=0.001">厘</el-button>
                        </el-button-group>
                        <div class="mode_name">{{mode_name}}</div>
                        <div class="bet-total">选了 <span>{{betCount.toFixed(0)}}</span> 注&nbsp&nbsp&nbsp&nbsp共 <span>￥{{(betMoney==1?0:betMoney).toFixed(0)}}</span> 元</div>
                    </div>
                    <div class="right">
                    <el-button-group class="button-bar">
                        <el-button type="success" @click="add_shoppingcar()"><i class="el-icon-circle-plus-outline el-icon--left"></i>添加号码</el-button>
                        <el-button type="primary">机选号码<i class="el-icon-tickets el-icon--right"></i></el-button>
                    </el-button-group>
                    </div>
                </div>

                <!-- 购彩篮 -->
                <div class="shopping-cart">
                    <div class="shopping-box">
                        <div class="title">
                            <span style="width:200px">玩法&号码</span>
                            <span style="width:132px">奖期</span>
                            <span style="width:112px">模式</span>
                            <span style="width:68px">注</span>
                            <span style="width:68px">倍</span>
                            <span style="width:132px">金额</span>
                            <span style="width:132px">预计奖金</span>
                            <span style="width:52px"><i class="el-icon-delete"></i></span>
                        </div>
                        <div class="content">
                            <el-scrollbar style="height:95px">
                                <div class="list" v-for="(ele,idx) in betList">
                                    <span style="width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-left:10px;padding-right:10px">
                                        {{ele.play_number}}
                                    </span>
                                    <span style="width:132px">{{ele.bet_issue}}</span>
                                    <span style="width:112px">{{ele.bet_mode}}</span>
                                    <span style="width:68px">{{ele.bet_count}}</span>
                                    <span style="width:68px">{{ele.bet_num}}</span>
                                    <span style="width:132px">{{ele.bet_money}}</span>
                                    <span style="width:132px">{{ele.bet_expected_money}}</span>
                                    <span style="width:52px;cursor: pointer;" @click="delete_Box_list(idx)"><i class="el-icon-close"></i></span>
                                </div>
                            </el-scrollbar>
                        </div>
                        <div class="footer">已经选择【 {{betList.length}} 】单,总投注【 {{all_betCount}} 】注,总金额 {{all_betMoney}} 元</div>
                    </div>
                    <div class="right">
                        <div class="title">
                            <span>预计中奖金额</span>
                            <div><span>190000</span>元</div>
                        </div>
                        <div class="btn">
                            <el-button type="success">一键投注</el-button>
                        </div>
                        <div class="btn">
                            <el-button type="primary">立即投注</el-button>
                        </div>
                    </div>
                </div>
                <!-- 购彩篮 -->
                <!-- 选号与购彩篮 -->

            </div>
            <!-- 投注body -->
        </div>
    </div>
</template>
<script>
import mixinConf from "@/confResouce/lotteryConf.js";
import mixinFun from "@/mixins/lottery.js";
import Countdown from "./Countdown.vue";
import Issuenum from "./Issuenum.vue";
import TweenLite from "gsap/TweenLite";
export default {
    data() {
        return {
            //缓存一系列选中
            issue:'20180612-045',
            id: 11023,
            reference:{},//选中的号码
            betPlayType:null,
            ballKey:null,
            ballNum:null,
            arr:[1,2,3,4,5,6,7,8,9],
            init: {
                id: 11023,
                name: '五星',
                playKey: false,
                playSub: null,
                ball:{}
            },
            mode_name:'元',
            betNum:'1倍',
            betCount:0,//注数
            all_betCount:0,
            betMoney:0,//金额
            all_betMoney:0,
            moneyMode:1,
            betList:[],
            is_stop_money:false,
            is_stop_count:false
        };
    },
    mixins: [mixinConf,mixinFun],
    components:{
        Countdown,
        Issuenum
    },
    computed: {
        lotteryInit() {
            var self = this;
            //计算lotteryList属性
            let lotteryList = {
                list:[],//星列表
                CrtPlayMethod:{},//玩法列表
                CrtPlayBallMethod:{},//号码球列表
                tip:'',
            };
            //根据ID计算彩种
            self.lottery.forEach(ele => {
                if (ele.id === self.init.id) {
                    lotteryList.list = ele.list;
                };
            });
            //根据彩种计算星
            lotteryList.list.forEach((ele,idx)=>{
                if(self.init.name === ele.name){
                    lotteryList.CrtPlayMethod = ele.playType;
                };
            });
            //根据星计算玩法(step是一个放玩法key的数组，切换星默认选中第一种玩法的第一个)
            let step = [];
            for(var key in lotteryList.CrtPlayMethod){
                step.push(key);
            };
            if(self.init.playKey==false){
                self.init.playKey = step[0]
                self.init.playSub = lotteryList.CrtPlayMethod[self.init.playKey][0].name
                //清空号码
                self.init.ball = {};
                //清空号码选中样式
                if(self.$refs.balldom){
                    self.$refs.balldom.forEach(ele1=>{
                        ele1.childNodes.forEach(ele2=>{
                            ele2.className = "ripple"
                        });
                    });
                }
                TweenLite.to(this.$data,0.5,{betCount:0});
                TweenLite.to(this.$data,0.5,{betMoney:0});
            };
            //根据玩法计算出选号模式
            lotteryList.CrtPlayMethod[self.init.playKey].forEach(ele=>{
                if(ele.name === self.init.playSub){
                    lotteryList.CrtPlayBallMethod = ele.ball;
                    lotteryList.tip = ele.tip;
                    //清空号码
                    self.init.ball = {};
                    //清空号码选中样式
                    if(self.$refs.balldom){
                        self.$refs.balldom.forEach(ele1=>{
                            ele1.childNodes.forEach(ele2=>{
                                ele2.className = "ripple"
                            });
                        });
                    }
                    TweenLite.to(this.$data,0.5,{betCount:0});
                    TweenLite.to(this.$data,0.5,{betMoney:0});
                };
            });
            //计算空的投注号码
            for(var key in lotteryList.CrtPlayBallMethod){
                self.$set(self.init.ball,key,[]);
            }
            self.reference = lotteryList.CrtPlayBallMethod;
            self.betPlayType = self.init.playKey+'-'+self.init.playSub;
            return lotteryList;
        },
    }
};
</script>
<style lang="scss" scoped>
.lottery {
    width: 1200px;
    margin: auto;
    padding-top: 50px;
    .lottery-body{
        padding: 10px;
        background: #fff;
        border:#8b8989 1px solid;
        border-radius: 5px;
    }
    .play-list {
        overflow: hidden;
        //display: flex;
        //background: #ffd22c;
        border-bottom: #afadad 1px solid;
        padding-bottom:10px;
        li {
            float: left;
            flex: 1;
            // height: 45px;
            line-height: 25px;
            padding-left: 10px;
            padding-right:10px;
            cursor: pointer;
            //border-right: 1px solid #ebc433;
            font-size: 14px;
            border-radius: 3px;
            margin-right:5px;
        }
        li:last-child {
            border-right: none;
        }
        li:hover {
            background: #5c5c7d;
            color: #fff;
            //border-right: #fff 1px solid;
        }
        li.active {
            background: #5c5c7d;
            color: #fff;
            //border-right: #fff 1px solid;
        }
    }

    .play-list-type {
        ul {
            overflow: hidden;
            background: #fff;
            padding: 12px 30px 12px 0px;
            li {
                margin-bottom: 15px;
                font-size: 12px;
                overflow: hidden;
                label, span {
                    float: left;
                }
                label {
                    font-weight: bold;
                    padding-left: 0px;
                    padding-right: 15px;
                    height: 25px;
                    line-height: 25px;
                }
                span {
                    display: block;
                    padding-left: 10px;
                    padding-right: 10px;
                    height: 25px;
                    line-height: 25px;
                    cursor: pointer;
                    margin-left: 5px;
                    margin-right: 5px;
                    border: #d2cbcb 1px solid;
                    border-radius: 3px;
                }
                span.active {
                    background: #5c5c7d;
                    color: #fff;
                    border: #5c5c7d 1px solid;
                }
                span:hover {
                    color: #5c5c7d;
                    border: #5c5c7d 1px solid;
                }
                span.active:hover {
                    color: #fff;
                }
            }
            li:last-child {
                margin-bottom: 0;
            }
        }
    }


    // 选号与购彩篮
    .ball-tip {
        padding-top: 10px;
        padding-bottom: 10px;
        background: #fff;
        border-top: #afadad 1px solid;
        border-bottom: #afadad 1px solid;
        font-size: 12px;
        text-align: left;
        margin-bottom: 10px;
        color:red;
    }
    .ball-lottery-box {
        background: #eae5e5;
        width: 100%;
        overflow: hidden;
        font-size: 12px;
        text-align: left;
        display: table;
        vertical-align: middle;
        .select-ball {
            display: table-cell;
            width: 70%;
            vertical-align: middle;
            border-bottom: #afadad 1px solid;
            .textarea-wrap{
                width: 900px;
                height: 300px;
                display: table-cell;
                vertical-align: middle;
                padding-left: 200px;
                padding-right: 200px;
            }
            .select-ball-list {
                width: calc(100% - 20px);
                padding: 10px 0px 10px 0px;
                margin-left: 20px;
                border-bottom: #fff 1px dotted;
                display: table;
                >span {
                    display: table-cell;
                    height: 45px;
                    line-height: 45px;
                    padding-right: 15px;
                    vertical-align: middle;
                    font-weight: bold;
                    text-align: center;
                    width: 10%;
                }
                .ball-number {
                    width: 60%;
                    display: table-cell;
                    vertical-align: middle;
                    margin-top: 4px;
                    >span {
                        float: left;
                        height: 35px;
                        line-height: 36px;
                        width: 35px;
                        text-align: center;
                        cursor: pointer;
                        font-size: 16px;
                        border: #5c5d7c 1px solid;
                        border-radius: 50%;
                        margin-left: 10px;
                        margin-top: 5px;
                        margin-bottom: 5px;
                        background: #fff;
                        font-weight: bold;
                        box-shadow: 0px 0px 3px #5c5d7c;
                    }
                    >span.active{
                        background: #5c5d7c;
                        color:#fff;
                    }
                }
                .ball-selector {
                    display: table-cell;
                    vertical-align: middle;
                    overflow: hidden;
                    width: 194px;
                    .wrap{
                        overflow: hidden;
                        padding: 5px 3px 5px 3px;
                        >span{
                            width: 25px;
                            height: 25px;
                            line-height: 25px;
                            text-align: center;
                            cursor: pointer;
                            float: left;
                            margin-left: 5px;
                            background: #fff;
                        }
                        >span:hover{
                            background: #5c5c7d;
                            color: #fff;
                        }
                    }
                }
            }

        }

    }
    .play-options{
        height: 70px;
        background: #eae5e5;
        overflow: hidden;
        .left{
            width:900px;
            height: 100%;
            position: relative;
            float: left;
            .mode_name{
                position: absolute;
                top: 25px;
                left: 348px;
                font-size: 12px;
                color: red;
            }
            .play-options-number{
                height: 25px;
                border:rgb(184, 182, 182) 1px solid;
                background: #fff;
                overflow: hidden;
                position: absolute;
                top: 20px;
                left: 20px;
                .res-num{
                    padding: 0;
                    text-align: center;
                    width: 100px;
                    border:none;
                    height: 23px;
                    border:0;
                    outline:none;
                    float:left;
                }
                .el-dropdown{
                    float: left;
                    .selete-num{
                        width: 25px;
                        height: 25px;
                        display: block;
                        margin-top: -1px;
                        border-left:rgb(184, 182, 182) 1px solid;
                        >i{
                            margin-top: 6px;
                        }
                    }
                }
                .jian{
                    position: absolute;
                    font-size: 14px;
                    top: -1px;
                    left: 0;
                    cursor: pointer;
                    display: block;
                    width: 25px;
                    height: 25px;
                    line-height: 25px;
                }
                .jia{
                    position: absolute;
                    font-size: 14px;
                    top: -3px;
                    right: 24px;
                    cursor: pointer;
                    display: block;
                    width: 25px;
                    height: 25px;
                    line-height: 25px;
                }
            }
            .button-bar{
                position: absolute;
                left: 170px;
                top: 19px;
            }
            .bet-total{
                float: right;
                margin-top: 27px;
                font-size: 14px;
                span{
                    color: #cc9d04;
                    font-weight: bold;
                }
            }
        }
        .right{
            float: left;
            width: 278px;
            height: 100%;
            .button-bar{
                margin-top:15px;
            }
        }
    }
    .shopping-cart{
        height: 300px;
        margin-top:10px;
        overflow: hidden;
        .shopping-box{
            width:898px;
            height: 170px;
            margin-right:10px;
            border:#8b8989 1px solid;
            float: left;
            .title{
                height: 40px;
                line-height: 40px;
                background: #f2f2f2;
                >span{
                    float: left;
                    display: block;
                }
            }
            .content{
                width:898px;
                height: 95px;
                .list{
                    overflow: hidden;
                    height: 35px;
                    line-height: 35px;
                    >span{
                        float: left;
                        font-size: 14px;
                        color:#979191;

                    }
                }
            }
            .footer{
                height: 35px;
                line-height: 35px;
                background: #f6f6f6;
                text-align: left;
                padding-left:10px;
                font-size: 14px;
            }
        }
        .right{
            float: left;
            width: 268px;
            .title{
                height: 70px;
                background: #f2f2f2;
                border:#979191 1px solid;
                margin-bottom: 10px;
                >span{
                    display: block;
                    height: 35px;
                    line-height: 35px;
                }
                >div{
                    height: 35px;
                    line-height: 35px;
                    span{
                        color: #e1a725;
                        font-weight: bold;
                    }
                }
            }
            .btn{
                margin-bottom: 10px;
                button{
                    width: 100%;
                }
            }
        }
    }
    // 选号与购彩篮
}
</style>
