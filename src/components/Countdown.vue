<template>
    <div class="countdown-bg">
        <div class="lottery-logo"><img src="/static/img/big_logo1.png"></div>
        <div class="issue-text">第20181012期</div>
        <div class="posi-text">截止时间:</div>
        <div class="clock"></div>
    </div>
</template>
<script>
import {FlipClock} from '../../static/js/flipclock.js'
export default {
    created(){
        var self = this;
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            var self = this;
			var clock = $('.clock').FlipClock({
		        clockFace: 'HourlyCounter',
		        autoStart: false,
		        callbacks: {
		        	stop: function() {
                        //倒计时结束开始摇奖
                        self.send();
                        clock.setCountdown(true);
                        clock.setTime(95);
                        clock.start();
		        	}
                }
            });
            clock.setCountdown(true);
		    clock.setTime(95);
            clock.start();
        },
        send(){
            this.$emit('open');
        }
    }
}
</script>
<style lang="scss">
.flip-clock-wrapper ul{
    width: 30px;
    height: 40px;
    background: #3f3c4d;
}
.flip-clock-wrapper ul li a div div.inn{
    font-size: 36px;
    line-height:40px;
    font-weight: 500;
    background:linear-gradient(#a39cc5,#757090);
    color: #fff;
}
.flip-clock-wrapper ul li a div.down div.inn{
    background:linear-gradient(#646079,#646176);
}
.flip-clock-divider{
    width: 10px;
    height: 40px;
    top: 6px;
}
.flip-clock-divider .flip-clock-label{
    display: none;
}
.flip-clock-dot.top{
    line-height: 10px;
    width: 5px;
    height: 5px;
    background: #fff;
    left: 2px;
}
.flip-clock-dot.bottom{
    line-height: 10px;
    width: 5px;
    height: 5px;
    left: 2px;
    background: #fff;
}
.countdown-bg{
    width: 500px;
    height: 70px;
    background: #3f3c4d;
    color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    position: relative;
    float: left;
    .lottery-logo{
        position: absolute;
        width: 50px;
        height: 50px;
        top: 10px;
        left: 28px;
        img{
            width: 100%;
        }
    }
    .issue-text{
        position: absolute;
        top: 13px;
        left: 104px;
        font-size: 14px;
    }
    .posi-text{
        position: absolute;
        top: 38px;
        left: 134px;
        font-size: 14px;
    }
    .clock{
        width: 263px;
        position: absolute;
        top: 9px;
        right: 23px;
        margin: 0;
    }
}
</style>
