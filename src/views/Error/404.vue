<template>
    <div class="notfound-box">
        <div class="hit-the-floor">404</div>
        <div class="nofound">NOT FOUND</div>
        <p>抱歉，您访问的页面不存在。</p>
        <el-button type="primary" @click="goToHome">返回首页</el-button>
    </div>
</template>
<script lang="ts" setup>
    import { useRouter } from 'vue-router'
    const router = useRouter()

    const goToHome = () => {
        router.push('/')
    }
</script>

<style lang="less" scoped>
    .notfound-box {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -80%, 0);
        text-align: center;
        .el-button {
            margin-top: 20px;
        }
        p {
            font-size: 14px;
            margin-top: 20px;
            color: #909399;
        }
    }
    .hit-the-floor {
        color: #fff;
        font-size: 12em;
        font-weight: bold;
        font-family: Helvetica;
        text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3),
            0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15);
    }

    .hit-the-floor {
        text-align: center;
    }
    .nofound {
        color: #fff;
        font-size: 40px;
        font-weight: bold;
        font-family: Helvetica;
        text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3),
            0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15);
        text-align: center;
    }
    body {
        background-color: #f1f1f1;
    }
</style>
