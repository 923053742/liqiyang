<template>
  <div class="LoginBox">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>

<script>

import { getLogin } from "../api/index"
import { setCookie } from "../utils/cookie"

export default {
    data() {
        var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (!/^.{5,9}$/.test(value)) {
              callback(new Error('用户名输入错误'));
          }
          callback();
        }
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (!/^.{6,9}$/.test(value)) {
              callback(new Error('密码输入错误'));
          }
          callback();
        }
      };
      
      return {
        ruleForm: {
          pass: 'admin123',
          username: 'admin',
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: ['blur','change'] }
          ],
          pass: [
            { validator: validatePass, trigger: ['blur','change'] }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            
            getLogin({
              account:this.ruleForm.username,
              pwd:this.ruleForm.pass
            })
            .then((res)=>{
              console.log(res);

              if(res.status===200){
                setCookie('token',res.data.token)

                window.sessionStorage.setItem('LeftList',JSON.stringify(res.data.menus))
                this.$router.push('/index')
              }

            })
            .catch((err)=>{
              console.log(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang='less'>

</style>    