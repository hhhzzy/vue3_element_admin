<template>
    <div class="node-panel">
        <div class="node-item" v-for="item in props.nodeList" :key="item.text" @mousedown="$_dragNode(item)">
            <div class="node-item-icon" :class="item.class" :style="item.style">
                <div v-if="item.type === 'user' || item.type === 'time'" class="shape"></div>
            </div>
            <span class="node-label">{{ item.text }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import LogicFlow from '@logicflow/core'
    interface Props {
        nodeList: Array<any>
        lf: LogicFlow
    }
    const props = defineProps<Props>()
    const $_dragNode = (item: any) => {
        console.log(item)
        props.lf.dnd.startDrag({
            type: item.type
        })
    }
    console.log(props)
</script>
<style lang="less" scoped>
    .node-panel {
        position: absolute;
        top: 100px;
        left: 20px;
        width: 70px;
        padding: 20px 10px;
        background-color: white;
        box-shadow: 0 0 10px 1px rgb(228, 224, 219);
        border-radius: 6px;
        text-align: center;
        z-index: 101;
    }
    .node-item {
        margin-bottom: 20px;
    }
    .node-item-icon {
        width: 30px;
        height: 30px;
        margin-left: 10px;
        background-size: cover;
    }
    .node-label {
        font-size: 12px;
        margin-top: 5px;
        user-select: none;
    }
    .node-start {
        background-size: cover;
    }
    .node-rect {
        border: 1px solid black;
    }
    .node-user {
        background: url('data:image/svg+xml;base64,PHN2ZyB0PSIxNjgyNDE1MTM4MDU1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjkyNzQiIHdpZHRoPSI3NTAiIGhlaWdodD0iNzUwIj48cGF0aCBkPSJNODkyLjI1MDg2MiA4NDYuNzQ2OTk0IDQwMC4wODc2NTMgODQ2Ljc0Njk5NGMtMzcuMDA3ODY5IDAtNjcuMTEyNTE0LTMwLjEwNTY2OC02Ny4xMTI1MTQtNjcuMTEzNTM3IDAtMi4xNDA3NTcgMC40ODA5NTQtNTMuMjE5MDg1IDQxLjMzNDQwNy0xMDMuNTUzNDcxIDIzLjUwNzM5LTI4LjkyNTc5NiA1NS41MzQ4MjctNTEuODIwMjI2IDk1LjIwODQwOS02OC4xMTc0IDQ3LjkzMTY2Mi0xOS43MDY4MzEgMTA3LjM5OTA1NS0yOS42MjQ3MTQgMTc2LjY1MzM0OS0yOS42MjQ3MTQgNjkuMjUxMjI0IDAgMTI4LjY3NDYxNSAxMC4wMDU4ODggMTc2LjY1MDI3OSAyOS42MjQ3MTQgMzkuNjc0NjA1IDE2LjI5ODE5OCA3MS43MDQwODkgMzkuMTkyNjI3IDk1LjIxMDQ1NSA2OC4xMTc0IDQwLjg5OTUwMiA1MC4zMzQzODUgNDEuMzM1NDMxIDEwMS40MTM3MzcgNDEuMzM1NDMxIDEwMy41NTM0NzFDOTU5LjM2NTQyMiA4MTYuNjQxMzI1IDkyOS4yNTc3MDcgODQ2Ljc0Njk5NCA4OTIuMjUwODYyIDg0Ni43NDY5OTR6TTM3Ny43MTYxMzIgNzc5Ljc2NDQ0YzAuMDQ0MDAyIDEyLjI3ODY1MSAxMC4wOTI4NjkgMjIuMjM5NTE0IDIyLjM3MDQ5NyAyMi4yMzk1MTRsNDkyLjE2MzIwOSAwYzEyLjMyMjY1MyAwIDIyLjMyNDQ0OC05Ljk2MDg2MyAyMi4zNzI1NDMtMjIuMjM5NTE0LTAuMDQ4MDk1LTEuNTcxNzk4LTEuNDQ0OTA4LTQwLjA2NjUzMS0zMy4wMzMzNDctNzcuNTU2Mzc3LTQzLjYwNjE0Ny01MS44MjAyMjYtMTI1LjAwOTEzMi03OS4xMjgxNzUtMjM1LjQyMDgwMS03OS4xMjgxNzUtMTEwLjQxMjY5MiAwLTE5MS44MTQ2NTQgMjcuMzk0OTMtMjM1LjM3NzgyMiA3OS4xMjgxNzVDMzc5LjE1Nzk3MSA3MzkuNzg0ODkgMzc3Ljc2MDEzNSA3NzguMTkyNjQxIDM3Ny43MTYxMzIgNzc5Ljc2NDQ0eiIgcC1pZD0iOTI3NSI+PC9wYXRoPjxwYXRoIGQ9Ik02NDYuMTY5MjU3IDUzMy41NTA4MjljLTk4LjcwNDAyMyAwLTE3OC45NjkwOTEtODAuMjY0MDQ1LTE3OC45NjkwOTEtMTc4Ljk2ODA2OCAwLTk4LjcwNDAyMyA4MC4yNjUwNjgtMTc4Ljk2OTA5MSAxNzguOTY5MDkxLTE3OC45NjkwOTEgOTguNzAwOTUzIDAgMTc4Ljk3MDExNCA4MC4yNjUwNjggMTc4Ljk3MDExNCAxNzguOTY5MDkxQzgyNS4xMzkzNzIgNDUzLjI4Njc4NCA3NDQuODcwMjEgNTMzLjU1MDgyOSA2NDYuMTY5MjU3IDUzMy41NTA4Mjl6TTY0Ni4xNjkyNTcgMjIwLjM1NjcxYy03NC4wMTY3NjEgMC0xMzQuMjI3MDc0IDYwLjIyODczMy0xMzQuMjI3MDc0IDEzNC4yMjYwNTFzNjAuMjEwMzEzIDEzNC4yMjcwNzQgMTM0LjIyNzA3NCAxMzQuMjI3MDc0IDEzNC4yMjcwNzQtNjAuMjMwNzggMTM0LjIyNzA3NC0xMzQuMjI3MDc0UzcyMC4xODYwMTggMjIwLjM1NjcxIDY0Ni4xNjkyNTcgMjIwLjM1NjcxeiIgcC1pZD0iOTI3NiI+PC9wYXRoPjxwYXRoIGQ9Ik0yNjUuODYxNjAyIDg0Ni43NDY5OTRsLTEzNC4yMjcwNzQgMGMtMzcuMDA3ODY5IDAtNjcuMTEyNTE0LTMwLjEwNTY2OC02Ny4xMTI1MTQtNjcuMTEzNTM3IDAtMS42NjA4MjYgMC4zNDk5NzEtNDEuNDY1MzkgMjkuNjY3NjkzLTgwLjUyNzAzNSAxNi45MDkxMTItMjIuNTg4NDYxIDQwLjAyMzU1Mi00MC40NjA1MDQgNjguNTk4MzU0LTUzLjE3NTA4MyAzNC4xNjgxOTQtMTUuMjA1MzA3IDc2LjM3NjUwNS0yMi44OTU0NTMgMTI1LjQ4ODAzOS0yMi44OTU0NTMgOC4wMzkwOTMgMCAxNS45MDQyMjUgMC4yMTc5NjQgMjMuNTk0MzcxIDAuNjExOTM3IDEyLjMyMTYzIDAuNjk5OTQxIDIxLjc1OTU4MyAxMS4xODY3ODMgMjEuMTQ3NjQ2IDIzLjU1MTM5Mi0wLjYxMTkzNyAxMi4zNjQ2MDktMTEuMTg1NzYgMjEuODAyNTYyLTIzLjUwNzM5IDIxLjE5MTY0OC02LjkwNDI0Ny0wLjM5Mzk3My0xMy45ODI0NTYtMC41Njg5NTgtMjEuMTkxNjQ4LTAuNTY4OTU4LTE3NC4yMDU2MDEgMC0xNzguODM4MTA4IDEwNi40MzgxNzEtMTc4Ljk2OTA5MSAxMTEuOTg3NTYgMC4wNDI5NzkgMTIuMjM0NjQ5IDEwLjA5Mzg5MiAyMi4yMzk1MTQgMjIuMzcwNDk3IDIyLjIzOTUxNGwxMzQuMjI3MDc0IDBjMTIuMzY1NjMyIDAgMjIuMzcwNDk3IDEwLjAwNTg4OCAyMi4zNzA0OTcgMjIuMzcxNTIgMCAxMi4zNjQ2MDktMTAuMDA0ODY1IDIyLjM2OTQ3My0yMi4zNzA0OTcgMjIuMzY5NDczTDI2NS44NjE2MDIgODQ2Ljc0Njk5NHoiIHAtaWQ9IjkyNzciPjwvcGF0aD48cGF0aCBkPSJNMjg4LjIzMTA3NSA1NzguMjkzODY5Yy03My45NzM3ODIgMC0xMzQuMjI2MDUxLTYwLjIxMDMxMy0xMzQuMjI2MDUxLTEzNC4yMjcwNzQgMC03My45OTQyNDggNjAuMjUyMjY5LTEzNC4yMjcwNzQgMTM0LjIyNjA1MS0xMzQuMjI3MDc0IDczLjk3Mzc4MiAwIDEzNC4yMjYwNTEgNjAuMjMyODI2IDEzNC4yMjYwNTEgMTM0LjIyNzA3NEM0MjIuNDU4MTQ5IDUxOC4wODM1NTUgMzYyLjIwNTg4IDU3OC4yOTM4NjkgMjg4LjIzMTA3NSA1NzguMjkzODY5ek0yODguMjMxMDc1IDM1NC41ODI3NjFjLTQ5LjMyOTQ5OSAwLTg5LjQ4NDAzNCA0MC4xMzQwNjktODkuNDg0MDM0IDg5LjQ4NTA1NyAwIDQ5LjM1MzAzNSA0MC4xNTQ1MzUgODkuNDgzMDExIDg5LjQ4NDAzNCA4OS40ODMwMTEgNDkuMzMwNTIyIDAgODkuNDg1MDU3LTQwLjEyOTk3NiA4OS40ODUwNTctODkuNDgzMDExQzM3Ny43MTYxMzIgMzk0LjcxNjgzIDMzNy41NjE1OTcgMzU0LjU4Mjc2MSAyODguMjMxMDc1IDM1NC41ODI3NjF6IiBwLWlkPSI5Mjc4Ij48L3BhdGg+PC9zdmc+')
            center center no-repeat;
        background-size: cover;
    }
    .node-time {
        // background: url('../background/time.png') no-repeat;
        background-size: cover;
    }
    .node-push {
        // background: url('../background/push.png') no-repeat;
        background-size: cover;
    }
    .node-download {
        // background: url('../background/download.png') no-repeat;
        background-size: cover;
    }
    .node-click {
        // background: url('../background/click.png') no-repeat;
        background-size: cover;
    }
    .node-end {
        background: url('data:image/svg+xml;base64,PHN2ZyB0PSIxNjgyNDE1NTQ3MTI5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExODI4IiB3aWR0aD0iNzUwIiBoZWlnaHQ9Ijc1MCI+PHBhdGggZD0iTTUxMiAzMmE0ODAgNDgwIDAgMSAxIDAgOTYwIDQ4MCA0ODAgMCAwIDEgMC05NjB6TTUxMiAxMjhhMzg0IDM4NCAwIDEgMCAwIDc2OEEzODQgMzg0IDAgMCAwIDUxMiAxMjh6TTM2OCAzNTJoMjg4YTE2IDE2IDAgMCAxIDE2IDE2djI4OGExNiAxNiAwIDAgMS0xNiAxNmgtMjg4YTE2IDE2IDAgMCAxLTE2LTE2di0yODhhMTYgMTYgMCAwIDEgMTYtMTZ6IiBmaWxsPSIjZDgxZTA2IiBwLWlkPSIxMTgyOSI+PC9wYXRoPjwvc3ZnPg==')
            center center no-repeat;
        background-size: cover;
    }
    .bpmn-start {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==)
            center center no-repeat;
        cursor: grab;
    }
    .bpmn-end {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC)
            center center no-repeat;
        cursor: grab;
    }
    .bpmn-user {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==)
            center center no-repeat;
        cursor: grab;
    }
    .bpmn-exclusiveGateway {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=)
            center center no-repeat;
        cursor: grab;
    }
</style>
