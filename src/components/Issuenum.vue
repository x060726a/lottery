<template>
    <div class="issuenum-bg">
        <div class="issue-text" @click="animareNum()">第 20181012-045 期</div>
        <div class="issue-status-text" @click="open()">已开奖</div>
        <div class="ball-num-position">
            <div class="ball-num" @click="open()">
                <span v-for="(ele,idx) in activeBallNum">{{ele.num.toFixed(0)}}</span>
            </div>
        </div>
        <div class="zoushi"><i class="el-icon-share"></i>号码走势</div>
        <div class="game-text"><i class="el-icon-document"></i>游戏说明</div>
        <div class="rideo"><i class="el-icon-bell"></i>音效开启</div>
    </div>
</template>
<script>
import TweenLite from "gsap/TweenLite"
export default {
    data(){
        return{
            intervalIdArr:[],
            activeBallNum:[],//上一期开奖结果
            resBallNum:[],//本期开奖结果
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            var self = this;
            //初始化上一期开奖号码;
            var result = [5,3,8,9,1];
            result.forEach((ele,idx) => {
                self.activeBallNum.push({num:result[idx]});
            });
        },
        //开始摇奖
        animareNum(){
            var self = this;
            self.activeBallNum.forEach((ele,idx)=>{
                self.intervalIdArr[idx] = setInterval(()=>{
                    var random = (Math.random()*9).toFixed(0);
                    TweenLite.to(self.activeBallNum[idx], 0.2, {num:random});
                },200);
            });
            setTimeout(()=>{
                self.open();
            },5000)
        },
        //模拟开奖
        open(){
            var self = this;
            //本期开奖结果;
            var nextRes = [9,0,7,8,4];
            self.intervalIdArr.forEach((ele,idx)=>{
                clearInterval(ele);
                TweenLite.to(self.activeBallNum[idx], 0.2, {num:nextRes[idx]});
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.issuenum-bg{
    float: left;
    width: 690px;
    height: 70px;
    background: #3f3c4d;
    color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    position: relative;
    margin-left: 10px;
    .issue-text{
        position: absolute;
        top:15px;
        left: 10px;
        font-size: 14px;
    }
    .issue-status-text{
        position: absolute;
        top:38px;
        left: 94px;
        font-size: 14px;
        color: red;  
    }
    .ball-num-position{
        width: 400px;
        height: 70px;
        position: absolute;
        top:0;
        left: 160px;
        text-align: center;
        display: table;
        vertical-align: middle;
        font-size: 0;
        .ball-num{
            padding-top: 15px;
            padding-bottom: 15px;
            height: 40px;
            display: inline-block;
            >span{
                display: block;
                float: left;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 32px;
                border-radius: 50%;
                background: linear-gradient(#f1cf5f, #cc9d04);
                box-shadow: 1px 1px 1px #000;
                margin-right:10px;
                cursor: default;
                color: #413f3f;
            }
            >span:first-child{
                margin-left:10px;
            }
        }
    }
    .zoushi,.game-text,.rideo{
        position: absolute;
        right: 10px;
        font-size: 12px;
        cursor: pointer;
    }
    .zoushi{
        top: 8px;
    }
    .game-text{
        top: 28px;
    }
    .rideo{
        top: 48px;
    }
}
</style>
