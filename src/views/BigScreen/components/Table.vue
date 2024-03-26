<template>
    <div class="table-content">
        <ul class="ul-title">
            <li>序号</li>
            <li>数字一</li>
            <li>数字二</li>
            <li>数字三</li>
            <li>数字四</li>
        </ul>
        <div class="ul-box">
            <ul>
                <li>1</li>
                <li>121</li>
                <li>159</li>
                <li>895</li>
                <li>9878</li>
            </ul>
            <ul>
                <li>2</li>
                <li>121</li>
                <li>159</li>
                <li>895</li>
                <li>9878</li>
            </ul>
            <ul>
                <li>3</li>
                <li>121</li>
                <li>159</li>
                <li>895</li>
                <li>9878</li>
            </ul>
            <ul>
                <li>4</li>
                <li>121</li>
                <li>159</li>
                <li>895</li>
                <li>9878</li>
            </ul>
            <ul>
                <li>5</li>
                <li>121</li>
                <li>159</li>
                <li>895</li>
                <li>9878</li>
            </ul>
            <ul>
                <li>6</li>
                <li>121</li>
                <li>159</li>
                <li>895</li>
                <li>9878</li>
            </ul>
            <ul>
                <li>7</li>
                <li>121</li>
                <li>159</li>
                <li>895</li>
                <li>9878</li>
            </ul>
            <ul>
                <li>8</li>
                <li>121</li>
                <li>159</li>
                <li>895</li>
                <li>9878</li>
            </ul>
            <ul>
                <li>8</li>
                <li>121</li>
                <li>159</li>
                <li>895</li>
                <li>9878</li>
            </ul>
            <ul>
                <li>8</li>
                <li>121</li>
                <li>159</li>
                <li>895</li>
                <li>9878</li>
            </ul>
            <ul>
                <li>8</li>
                <li>121</li>
                <li>159</li>
                <li>895</li>
                <li>9878</li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
    .table-content {
        height: 100%;
        overflow: hidden;
        ul {
            overflow: hidden;
            li {
                color: #fff;
                float: left;
                width: 20%;
                text-align: center;
                .px2font(14);
                .px2vh(height,35);
                .px2vh(line-height,35);
            }
        }
        .ul-title {
            background-color: rgb(13, 43, 115);
        }
        .ul-box {
            ul {
                &:nth-of-type(2n) {
                    background-color: rgb(13, 43, 115);
                }
            }
            overflow-y: auto;
            height: 100%;
            &::-webkit-scrollbar {
                width: 1px;
            }
            &::-webkit-scrollbar-track-piece {
                background-color: transparent; /*滚动条的背景颜色*/
            }
            &::-webkit-scrollbar-thumb:vertical {
                outline: none;
                background: red;
            }
        }
    }
</style>
