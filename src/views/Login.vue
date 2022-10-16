<template>
    <div class="background">
        <div class="login-form">
            <el-form
            ref="loginFormRef"
            label-position="top"
            :model="loginForm"
            :rules="loginRules"
            label-width="120px">
                <el-row>
                    <el-col :span="4"></el-col>
                    <el-col :span="16">
                        <div style="margin-bottom: 40px;"><img src="../assets/images/logo_with_title.png" alt="Logo" style="width: 100%;"></div>
                    </el-col>
                </el-row>
                <el-form-item label="Username" prop="username">
                    <el-input v-model="loginForm.username" :prefix-icon="User" size="large" placeholder="Enter Your Username" />
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="loginForm.password" type="password" :prefix-icon="Lock" size="large" placeholder="Password" />
                </el-form-item>
                <el-row justify="space-between" style="margin-bottom: 40px;">
                    <el-col :span="8">
                        <div>No account? Sign up</div>
                    </el-col>
                    <el-col :span="7">
                        <div>Forgot password</div>
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
import { User, Lock} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { loginByUsername } from '@/api/login'

// const validateEmail = (rule, value, callback) => {
//     if (validateEmail == null) {
//         callback(new Error('Enter your UQ Email'))
//     } else {
//         callback()
//     }
// }

// const validatePassword = (rule, value, callback) => {
//     callback()
// }

const loginForm = ref({
    username: '',
    password: ''
})

const loginRules = ref({
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

const loginFormRef = ref(null)

const login = () => {
    loginFormRef.value.validate(async valid => {
        if (valid) {
            const res = await loginByUsername(loginForm.value.username, loginForm.value.password)
            console.log(res)
        } else {
            console.log('failed')
            return false
        }
    })
}

// export default {
//     name: 'Login',
//     setup() {
//         const loginFormRef = ref(null)
//         return {
//             User,
//             Lock,
//             loginFormRef
//         }
//     },
//     data() {
//         return {
//             loginForm,
//             loginRules,
//             // loginRules: {
//             //     email: [{
//             //     required: true,
//             //     trigger: 'blur',
//             //     validator: validateEmail
//             //     }],
//             //     password: [{
//             //     required: true,
//             //     trigger: 'blur',
//             //     validator: validatePassword
//             // }]
//             // }
//         }
//     },
//     methods: {
//         login() {
//             console.log(loginFormRef)
//             loginFormRef.value.validate(valid => {
//                 if (valid) {
//                     console.log('login!')
//                 } else {
//                     console.log('failed!')
//                     return false
//                 }
//             })
//         }
//     }
    // methods: {
    //     login() {
    //         loginForm.validate(valid => {
    //             if (valid) {
    //                 this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
    //                     this.$router.push({
    //                         path: '/'
    //                     })
    //                 }).catch(response => {
    //                     console.log(response.data.message)
    //                 })
    //             } else {
    //                 return false
    //             }
    //         })
    //     }
    // }
// }
</script>

<style scoped>
.background {
    background: url("../assets/images/background_image.jpg") no-repeat;
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: cover;
}

.login-form {
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