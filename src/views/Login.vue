<template>
    <div id="background">
        <div id="form">
            <el-form
            :label-position="labelPosition"
            :model="form"
            label-width="120px">
                <el-row>
                    <el-col :span="4"></el-col>
                    <el-col :span="16">
                        <div style="margin-bottom: 40px;"><img src="../assets/logo_with_title.png" alt="Logo" style="width: 100%;"></div>
                    </el-col>
                </el-row>
                <el-form-item label="Email">
                    <el-input v-model="form.email" :prefix-icon="User" size="large" placeholder="Enter your UQ Email" />
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="form.password" type="password" :prefix-icon="Lock" size="large" placeholder="Password" />
                </el-form-item>
                <el-row justify="space-between" style="margin-bottom: 40px;">
                    <el-col :span="8">
                        <div>No account? Sign up</div>
                    </el-col>
                    <el-col :span="7">
                        <div>Forget password</div>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button id="loginbtn" @click="login" color="#b026e3"><b>Login</b></el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'

const labelPosition = ref('top')

const form = reactive({
    email: '',
    password: '',
})

const login = () => {
    console.log('login!')
}
</script>

<style scoped>
#background {
    background: url("../assets/background_image.jpg") no-repeat;
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: cover;
}

#form {
    width: 700px;
    height: 700px;
    border-radius: 8px;
    background: white;
    margin: 250px auto;
    padding: 100px 150px 0;
}

#loginbtn {
    width: 100%;
    padding: 25px 0;
}
</style>