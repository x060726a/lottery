export default {
    watch:{
        'init.ball':{
            handler:function(v,o){
                var arr = [];
                var self = this;
                for(var k in v ){
                    if(v[k].length!=0){
                        arr.push(v[k].length);
                    }
                }
                var i;
                if(arr.length>0){
                    i = eval(arr.join('*'));
                    var myAnimation_Count = TweenLite.to(this.$data,0.5,{betCount:i});
                    myAnimation_Count.eventCallback('onStart',function(){
                        self.is_stop_count = false;
                    });
                    myAnimation_Count.eventCallback('onComplete',function(){
                        self.is_stop_count = true;
                    });
                    var myMode = this.moneyMode*i*2;
                    var bet_num = parseInt(this.betNum);
                    var myAnimation_Money = TweenLite.to(this.$data,0.5,{betMoney:myMode*bet_num});
                    myAnimation_Money.eventCallback('onStart',function(){
                        self.is_stop_money = false;
                    });
                    myAnimation_Money.eventCallback('onComplete',function(){
                        self.is_stop_money = true;
                    });
                }
            },
            deep: true
        },
        moneyMode:function(v,o){
            var self = this;
            var bet_num = parseInt(this.betNum);
            var myAnimation_Count = TweenLite.to(this.$data,0.5,{betMoney:this.betCount*bet_num*v*2});
            myAnimation_Count.eventCallback('onStart',function(){
                self.is_stop_money = false;
            });
            myAnimation_Count.eventCallback('onComplete',function(){
                self.is_stop_money = true;
            });
            var modeObj = {
                '元':1,
                '角':0.1,
                '分':0.01,
                '厘':0.001,
            }
            for(var k in modeObj){
                if(modeObj[k]==self.moneyMode){
                    self.mode_name = k
                }
            }
        },
        betNum:function(v,o){
            var self = this;
            console.log(v);
            var num = parseInt(v);
            var myAnimation_Money = TweenLite.to(this.$data,0.5,{betMoney:this.betCount*num*2});
            myAnimation_Money.eventCallback('onStart',function(){
                self.is_stop_money = false;
            });
            myAnimation_Money.eventCallback('onComplete',function(){
                self.is_stop_money = true;
            });
        }
    },
    methods:{
        //清空状态
        clear_bet_status(){
            var self = this;
            //清空号码
            for(var k in self.init.ball ){
                self.init.ball[k] = [];
            }
            //重制注数
            self.betCount = 0;
            self.betMoney = 0;
            this.$refs.balldom.forEach(ele1=>{
                ele1.childNodes.forEach(ele2=>{
                    ele2.className = "ripple"
                });
            });
        },
        //删除购彩篮list
        delete_Box_list(idx){
            var self = this;
            self.betList.splice(idx,1);
            if(self.betList.length==0){
                self.all_betCount = 0;
                self.all_betMoney = 0;
            }else{
                self.betList.forEach(ele=>{
                    self.all_betCount = self.all_betCount + ele.bet_count*1;
                    self.all_betMoney = self.all_betMoney + ele.bet_money*1;
                });
            }
        },
        //添加购彩篮
        add_shoppingcar(){
            if(this.is_stop_money==false||this.is_stop_count==false){
                console.log(123);
                return;
            };
            var self = this;
            var arr_check = [];
            for(var k in self.init.ball){
                arr_check.push(self.init.ball[k].length);
            }
            if(arr_check.indexOf(0)!=-1) {
                this.$message.error('号码选择有误!');
                return;
            }
            var play_number = [];
            for(var k in this.init.ball){
                var list = this.init.ball[k].join(',');
                play_number.push(list);
            }
            var modeObj = {
                '元':1,
                '角':0.1,
                '分':0.01,
                '厘':0.001,
            }
            for(var k in modeObj){
                if(modeObj[k]==self.moneyMode){
                    self.mode_name = k
                }
            }
            console.log(self.mode_name);
            console.log(self.moneyMode);
            var betObj = {
                play_number:play_number.join('|'),
                bet_issue:self.issue,
                bet_mode:self.mode_name,
                bet_count:self.betCount.toFixed(0),
                bet_num:parseInt(self.betNum),
                bet_money:self.betMoney.toFixed(0),
                bet_expected_money:190000
            }
            self.betList.push(betObj);
            console.log(self.betList);
            self.betList.forEach(ele=>{
                self.all_betCount = self.all_betCount + ele.bet_count*1;
                self.all_betMoney = self.all_betMoney + ele.bet_money*1;
            });
            self.clear_bet_status();
        },
        //倍的加减 -
        subtraction(){
            var num = parseInt(this.betNum);
            if(num>1){
                num --;
                this.betNum = num+'倍';
            }
            console.log(this.betNum);
        },
        //倍的加减 +
        addition(){
            var num = parseInt(this.betNum);
            if(num>9999){
                num ++;
                this.betNum = num+'倍';
            }
            console.log(this.betNum);
        },
        changeVal(){
            if(this.betNum.indexOf('倍')>-1){
                console.log(this.betNum);
            }else{
                this.betNum = this.betNum+'倍'
            }
        },
        handleCommand(command){
            this.betNum = command;
        },
        open(){
            this.$refs.issuenum.animareNum();
        },
        sortBall(arr){
            return arr.sort((a,b)=>{
                return a > b;
            })
        },
        //选中全部
        seleteAll(key,val,idx){
            var self = this;
            self.$set(self.init.ball,key,val);
            self.$refs.balldom[idx].childNodes.forEach(ele => {
                ele.className = "ripple active"
            });
            // console.log(self.init.ball);
        },
        //选中大
        seleteBig(key,val,idx){
            var arr = [];
            var self = this;
            self.clearBall(key,val,idx);
            for(var i = 0; i<5;i++){
                arr[i] = val[i+5];
                this.$refs.balldom[idx].childNodes[i+5].className = "ripple active"
            }
            self.$set(self.init.ball,key,arr);
            // console.log(self.init.ball);
        },
        //选中小
        seleteMin(key,val,idx){
            var arr = [];
            var self = this;
            self.clearBall(key,val,idx);
            for(var i = 0; i<5;i++){
                arr[i] = val[i];
                this.$refs.balldom[idx].childNodes[i].className = "ripple active"
            }
            self.$set(self.init.ball,key,arr);
            // console.log(self.init.ball);
        },
        //选中奇
        seleteOdd(key,val,idx){
            var arr = [];
            var self = this;
            self.clearBall(key,val,idx);
            for(var i=0,j=-1;i<val.length;i++){
                if(i%2==1){
                    j++
                    arr[j] = val[i];
                    self.$refs.balldom[idx].childNodes[i].className = "ripple active"
                }
            }
            self.$set(self.init.ball,key,arr);
        },
        //选中偶
        seleteEven(key,val,idx){
            var arr = [];
            var self = this;
            self.clearBall(key,val,idx);
            for(var i=0,j=-1;i<val.length;i++){
                if(i%2==0){
                    j++
                    arr[j] = val[i];
                    self.$refs.balldom[idx].childNodes[i].className = "ripple active"
                }
            }
            self.$set(self.init.ball,key,arr);
        },
        //清空所选号码
        clearBall(key,val,idx){
            var self = this;
            self.$set(self.init.ball,key,[]);
            this.$refs.balldom[idx].childNodes.forEach(ele=>{
                ele.className = "ripple"
            })
        },
        //选球单个号码
        selectBall(num,key) {
            var self = this;
            self.activeBall(event);
            var index = self.init.ball[key].indexOf(num);
            if(index==-1){
                self.init.ball[key].push(num);
            }else{
                var newArr = self.init.ball[key];
                var resArr = [];
                newArr.forEach(ele => {
                    if(ele!=num){
                        resArr.push(ele);
                    }
                });
                self.init.ball[key] = resArr;
            }
        },
        //选中一个号码的active
        activeBall(e){
            var className = e.target.className;
            if(className.indexOf('active')==-1){
                e.target.className = 'ripple active';
            }else{
                e.target.className = 'ripple';
            }
        },
    }
}