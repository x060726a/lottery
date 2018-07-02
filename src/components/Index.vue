<template>
    <div class="index">
        <div class="lottery">
            <Countdown></Countdown>
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

                        <div class="select-ball-list" v-for="(val,key) in lotteryInit.CrtPlayBallMethod">
                            <span class="ball-key">{{key}}</span>
                            <div class="ball-number">
                                <span class="ripple" 
                                v-for="(ele,idx) in val" 
                                @click="selectBall(ele,key)"
                                :class="{active:init.ball[key]==ele}">{{ele}}</span>
                            </div>
                            <div class="ball-selector">
                                <div class="wrap">
                                    <span>全</span>
                                    <span>大</span>
                                    <span>小</span>
                                    <span>奇</span>
                                    <span>偶</span>
                                    <span>清</span>
                                </div>
                            </div>
                        </div>
                        
                        <div v-if="lotteryInit.CrtPlayBallMethod==false">手动输入</div>
                    </div>
                    <div class="lottery-issue-wrap">
                        <div class="wrap">
                            <div class="title"><span>奖期</span><span>开奖</span></div>
                            <ul class="content">
                                <li><div class="left">20180603008</div><div class="right"><span>3</span><span>4</span><span>7</span><span>7</span><span>0</span></div></li>
                                <li><div class="left">20180603008</div><div class="right"><span>3</span><span>4</span><span>7</span><span>7</span><span>0</span></div></li>
                                <li><div class="left">20180603008</div><div class="right"><span>3</span><span>4</span><span>7</span><span>7</span><span>0</span></div></li>
                                <li><div class="left">20180603008</div><div class="right"><span>3</span><span>4</span><span>7</span><span>7</span><span>0</span></div></li>
                                <li><div class="left">20180603008</div><div class="right"><span>3</span><span>4</span><span>7</span><span>7</span><span>0</span></div></li>
                                <li><div class="left">20180603008</div><div class="right"><span>3</span><span>4</span><span>7</span><span>7</span><span>0</span></div></li>
                                <li><div class="left">20180603008</div><div class="right"><span>3</span><span>4</span><span>7</span><span>7</span><span>0</span></div></li>
                                <li><div class="left">20180603008</div><div class="right"><span>3</span><span>4</span><span>7</span><span>7</span><span>0</span></div></li>
                                <li><div class="left">20180603008</div><div class="right"><span>3</span><span>4</span><span>7</span><span>7</span><span>0</span></div></li>
                                <li><div class="left">20180603008</div><div class="right"><span>3</span><span>4</span><span>7</span><span>7</span><span>0</span></div></li>
                            </ul>
                        </div>
                    </div>
                </div>
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
    export default {
        data() {
            return {
                //缓存一系列选中
                id: 11023,
                reference:{},
                betPlayType:null,
                ballKey:null,
                ballNum:null,
                init: {
                    id: 11023,
                    name: '五星',
                    playKey: false,
                    playSub: null,
                    //CrtPlayMethod:{},//玩法列表
                    //CrtPlayBallMethod:{},//号码球列表
                    ball:{}
                },
            };
        },
        mixins: [mixinConf,mixinFun],
        components:{
            Countdown
        },
        created() {
            
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
                        //self.init.CrtPlayMethod = ele.playType;
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
                };
                //根据玩法计算出选号模式
                lotteryList.CrtPlayMethod[self.init.playKey].forEach(ele=>{
                    if(ele.name === self.init.playSub){
                        lotteryList.CrtPlayBallMethod = ele.ball;
                        //self.init.CrtPlayBallMethod = ele.ball;
                        lotteryList.tip = ele.tip;
                    };
                });
                self.reference = lotteryList.CrtPlayBallMethod;
                self.betPlayType = self.init.playKey+'-'+self.init.playSub;
                return lotteryList;
            },
        },
        methods: {
            //选球
            selectBall(num,key) {
                var self = this;
                switch (self.betPlayType) {
                    case '直选-直选复式':
                        self.zxfsPlay(num,key);
                        break;
                
                    default:
                        break;
                }
            },
            postJson() {
                var data = {
                    amount: 10000,
                    planId: "1000001",
                    ticketId: 1,
                    rebate: 12.9,
                    potWinnerPrize: 1940000,
                    finishTime: 0,
                    orders: [
                        {
                            betNo: "2 3,4,5,6,1",
                            playId: "100100",
                            betMultiple: 3,
                            moneyMethod: 1000,
                            betMethod: 1,
                            betAmount: 6,
                            potNum: 2
                        },
                        {
                            betNo: "2 3,4,5,6,1",
                            playId: "100100",
                            betMultiple: 3,
                            moneyMethod: 1000,
                            betMethod: 1,
                            betAmount: 5,
                            potNum: 2
                        }
                    ]
                };
                this.$http
                    .get("/apis", {params: {module: "Bets", action: "Bet", data: data}})
                    .then(data => {
                        console.log(data);
                    });
            }
        }
    };
</script>
<style lang="scss">
    .lottery {
        width: 1200px;
        margin: auto;
        .play-list {
            overflow: hidden;
            display: flex;
            background: #ffd22c;
            li {
                float: left;
                flex: 1;
                height: 45px;
                line-height: 45px;
                cursor: pointer;
                border-right: 1px solid #ebc433;
                font-size: 14px;
            }
            li:last-child {
                border-right: none;
            }
            li:hover {
                background: #fff;
                border-right: #fff 1px solid;
            }
            li.active {
                background: #fff;
                border-right: #fff 1px solid;
            }
        }

        .play-list-type {
            ul {
                overflow: hidden;
                background: #fff;
                padding: 12px 30px 12px 30px;
                li {
                    margin-bottom: 15px;
                    font-size: 12px;
                    overflow: hidden;
                    label, span {
                        float: left;
                    }
                    label {
                        font-weight: bold;
                        padding-left: 15px;
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
                        background: #ecc233;
                        color: #fff;
                        border: #ecc233 1px solid;
                        font-weight: bold;
                    }
                    span:hover {
                        color: #ecc233;
                        font-weight: bold;
                        border: #ecc233 1px solid;
                    }
                    span.active:hover {
                        color: #fff;
                        font-weight: bold;
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
            background: #eae5e5;
            border-bottom: #fff 1px solid;
            font-size: 14px;
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
                    }
                    .ball-number {
                        width: 65%;
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
                            border: #ebc433 1px solid;
                            border-radius: 50%;
                            margin-left: 10px;
                            margin-top: 5px;
                            margin-bottom: 5px;
                            background: #fff;
                            font-weight: bold;
                            box-shadow: 0px 0px 3px #eaba0a;
                        }
                        >span.active{
                            background: #ffd22c;
                            color:#fff;
                        }
                    }
                    .ball-selector {
                        display: table-cell;
                        vertical-align: middle;
                        overflow: hidden;
                        width: 194px;
                        .wrap{
                            border:#ebc433 1px solid;
                            border-radius: 40px;
                            overflow: hidden;
                            padding: 5px 3px 5px 3px;
                            >span{
                                width: 25px;
                                height: 25px;
                                line-height: 25px;
                                text-align: center;
                                cursor: pointer;
                                float: left;
                                border-radius: 50%;
                                margin-left: 5px;
                                font-weight: bold;
                            }
                            >span:hover{
                                background: #ebc433;
                                color: #fff;
                            }
                        }
                    }
                }

            }
            .lottery-issue-wrap{
                width: 30%;
                height: 300px;
                display: table-cell;
                vertical-align: top;
                padding-left: 10px;
                .wrap{
                    width: 80%;
                    margin: 20px auto;
                    border-radius: 5px;
                    border: #d0cccc 1px solid;
                    overflow: hidden;
                    .title{
                        overflow: hidden;
                        background: #b1aeae;
                        color: #4e4c4c;
                        >span{
                            display: inline-block;
                            width:50%;
                            text-align: center;
                            height: 30px;
                            line-height: 30px;
                        }
                    }
                    ul{
                        li{
                            height: 30px;
                            line-height: 30px;
                            display: table;
                            width:100%;
                            border-bottom:#fff 1px dotted;
                            >div{
                                width: 50%;
                                display: table-cell;
                                text-align: center;
                                vertical-align: middle;
                            }
                            .right{
                                padding-left:5px;
                                padding-right:5px;
                                width:calc(50% - 10px);
                                overflow: hidden;
                                span{
                                    width:20px;
                                    height: 20px;
                                    line-height: 20px;
                                    text-align: center;
                                    display: inline-block;
                                    background: #fff;
                                    border-radius: 50%;
                                    margin-left: 5px;
                                }
                            }
                        }
                    }
                }
            }
        }
        // 选号与购彩篮
    }
</style>
