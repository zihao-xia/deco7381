<template>
    <div class="dashboard">
        <div>
            <h1>Team Dashboard</h1>
        </div>
        <div>goals</div>
        <div>score</div>
    </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss" scoped>
.dashboard {
    width: 40%;
    border-left: 1px solid var(--el-border-color);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    div {
        width: 80%;
        text-align: center;
        font-size: 2em;
        padding: 40px 0;
    }
    div:nth-child(1), div:nth-child(2) {
        border-bottom: 1px solid var(--el-border-color);
    }
}
</style>