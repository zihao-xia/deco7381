<template>
    <div id="background">
        <div id="form">
            <el-form
            :label-position="labelPosition"
            :model="form"
            label-width="120px">
                <div><img src="../assets/Logo.png" alt="Logo" width="100"></div>
                <br>
                <el-form-item label="Email">
                    <el-input v-model="form.email" :prefix-icon="User" placeholder="Enter your UQ Email" />
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="form.password" type="password" :prefix-icon="Lock" placeholder="Password" />
                </el-form-item>
                <el-form-item>
                    <el-button color="#b026e3" @click="login" style="width: 100%;">Login</el-button>
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
    width: 600px;
    height: 600px;
    border-radius: 8px;
    background: white;
    margin: 250px auto;
    padding: 50px 150px;
}
</style>