<template>
<div class="reg-bg">
    <div class="reg-form">
        <div class="title">新用户注册</div>
        <div class="input-label">
            <span>用户名</span>
            <span>密码</span>
        </div>
        <div class="reg-wrap">
            <el-input placeholder="请输入用户名" v-model="username"></el-input>
            <el-input placeholder="请输入密码" v-model="password" type="password" style="margin-top:20px"></el-input>
        </div>
        <span class="reglink" @click="$router.push({path:'/'})">返回登陆</span>
        <el-button type="primary" class="reg-btn" @click="reg()">注册</el-button>
    </div>
    <canvas ref="canvas"></canvas>
</div>
</template>
<script>
export default {
    data(){
        return{
            username:null,
            password:null
        }
    },
    created(){
        
    },
    methods:{
        reg(){
            var self = this;
            let postData = self.$qs.stringify({
                username:self.username,
                password:self.password
            });
            if(self.username&&self.password){
                self.$http.post("/reg.php",postData).then(res=>{
                    if(res.data.status){
                        self.$alert(res.data.msg,'温馨提示',{
                            confirmButtonText:'确定',
                            callback:action=>{
                                self.$message({
                                    showClose: true,
                                    message: '已经跳转首页',
                                    type: 'success'
                                });
                                self.$router.push({path:'/index'})
                            }
                        });
                    }else{
                        self.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                });
            }else{
                self.$alert('用户名密码不能为空!','温馨提示',{
                    confirmButtonText: '确定',
                })
            }
        }
    }
}
</script>
<style lang="scss">
.reg-bg{
    height: 100vh;
    width: 100%;
    background: url("/static/img/login_bg.jpg") no-repeat;
    background-size: 100% 100%;
    .reg-form{
        width: 500px;
        height: 300px;
        border: #e3dede 1px solid;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top:-150px;
        margin-left: -250px;
        border-radius: 5px;
        background: rgba(255,255,255,.8);
        .title{
            padding-top:40px;
            font-size: 14px;
        }
        .input-label{
            width: 125px;
            height: 100px;
            position: absolute;
            top: 74px;
            left: 0;
            span{
                display: block;
                height: 42px;
                line-height: 42px;
                text-align: right;
                padding-right: 5px;
            }
            span:last-child{
                margin-top: 18px;
            }
        }
        .reg-wrap{
            width: 250px;
            height: 150px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top:-75px;
            margin-left:-125px;
        }
        .reglink{
            position: absolute;
            position: absolute;
            bottom: 70px;
            left: 127px;
            color: #1ec31d;
            font-size: 14px;
            cursor: pointer;
        }
        .reglink:hover{
            text-decoration:underline;
        }
        .reg-btn{
            position: absolute;
            bottom: 70px;
            right: 125px;
        }
    }
}
</style>
