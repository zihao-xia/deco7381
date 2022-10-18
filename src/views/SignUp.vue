<template>
    <div class="background">
        <div class="signup-form">
            <el-form
            ref="signUpFormRef"
            label-position="top"
            :model="signUpForm"
            :rules="signUpRules"
            label-width="120px">
                <el-row justify="center" align="middle" style="margin-bottom: 40px;">
                    <el-col :span="4"><img src="../assets/images/Logo.png" alt="title" style="width: 100%;"></el-col>
                    <el-col :span="10" class="title">Sign Up</el-col>
                </el-row>
                <el-form-item label="Name" prop="name">
                    <el-input v-model="signUpForm.name" :prefix-icon="User" size="large" placeholder="Enter Your Name" />
                </el-form-item>
                <el-form-item label="Username" prop="username">
                    <el-input v-model="signUpForm.username" :prefix-icon="User" size="large" placeholder="Enter Your Username" />
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="signUpForm.password" type="password" :prefix-icon="Lock" size="large" placeholder="Password" />
                </el-form-item>
                <el-form-item>
                    <el-button class="submit" @click="signUp" color="#b026e3"><b>Sign Up</b></el-button>
                </el-form-item>
            </el-form>
            <el-row justify="center" align="middle">
                <el-col :span="12">
                    Already have account?
                    <router-link to="/login">Login</router-link>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { User, Lock} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { register } from '@/api/login'
import { ElMessage } from 'element-plus'
import router from '@/router'

const store = useStore()

const signUpForm = ref({
    name: '',
    username: '',
    password: ''
})

const signUpRules = ref({
    name: [
        {
            required: true,
            message: 'Enter Your Name',
            trigger: 'blur'
        }
    ],
    username: [
        {
            required: true,
            message: 'Enter Your Username',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: 'Enter Your Password',
            trigger: 'blur'
        },
        {
            min: 6,
            message: 'Password length should be at least 6',
            trigger: 'blur'
        }
    ]
})

const signUpFormRef = ref(null)

const signUp = () => {
    signUpFormRef.value.validate(async valid => {
        if (!valid) {
            return
        }
        register(signUpForm.value).then(res => {
            ElMessage({
                message: 'You have successfully signed up!',
                type: 'success',
            })
            router.replace('/login')
        }).catch(res => {
            console.log(signUpForm.value)
        })
    })
}
</script>

<style scoped>
.background {
    background: url("../assets/images/background_image.jpg") no-repeat;
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: cover;
}

.title {
    font-size: 2em;
    font-weight: bold;
    padding-left: 1em;
}

.signup-form {
    width: 700px;
    height: 700px;
    border-radius: 8px;
    background: white;
    margin: 250px auto;
    padding: 100px 150px 0;
}

.submit {
    width: 100%;
    padding: 25px 0;
}
</style>