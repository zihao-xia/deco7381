<template>
    <div class="container">
        <router-link
        v-for="course in courses"
        :key="course"
        class="course"
        :to="'/teams/' + course">
            <img src="@/assets/images/course.png" alt="course">
            <div>{{ course }}</div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Tutor',
    data() {
        return {
            courses: ['DECO7180', 'DECO7381']
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: start;
    align-items: center;
}

.course {
    margin: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
</style>