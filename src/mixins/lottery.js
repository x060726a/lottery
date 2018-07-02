export default {
    methods:{
        //直选复式玩法
        zxfsPlay(num,key){
            var self = this;
            self.$set(self.init.ball,key,num);
            console.log(self.reference);
            console.log(self.init);
        }
    }
}