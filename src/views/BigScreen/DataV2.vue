<template>
    <div class="data-box">
        <div class="header-box animate__animated animate__fadeInDown">
            <p class="header-title">arcgis大屏展示系统</p>
        </div>
        <div class="content-box">
            <div class="content-list left-content">
                <div class="list-box animate__animated animate__fadeInLeft">
                    <div class="title-box">
                        <span>柱状图</span>
                    </div>
                    <div class="c-box">
                        <Bar />
                    </div>
                </div>
                <div class="list-box animate__animated animate__fadeInLeft">
                    <div class="title-box">
                        <span>饼状图</span>
                    </div>
                    <div class="c-box">
                        <Pie />
                    </div>
                </div>
                <div class="list-box animate__animated animate__fadeInLeft">
                    <div class="title-box">
                        <span>折线图</span>
                    </div>
                    <div class="c-box">
                        <Line />
                    </div>
                </div>
            </div>
            <div class="content-list right-content">
                <div class="list-box num-box animate__animated animate__fadeInRight">
                    <div class="title-box">
                        <span>数字渐变</span>
                    </div>
                    <div class="c-box">
                        <div class="list-d">
                            <p class="num-p">
                                <CountTo :endVal="1234567" />
                            </p>
                            <p class="num-t">法律文件</p>
                            <img src="@/assets/bigScreen/num-bg-1.png" alt="" />
                        </div>
                        <div class="list-d">
                            <p class="num-p">
                                <CountTo :endVal="48158" />
                            </p>
                            <p class="num-t">爱国人数</p>
                            <img src="@/assets/bigScreen/num-bg-2.png" alt="" />
                        </div>
                        <div class="list-d">
                            <p class="num-p">
                                <CountTo :endVal="985467" />
                            </p>
                            <p class="num-t">爱国人数</p>
                            <img src="@/assets/bigScreen/num-bg-3.png" alt="" />
                        </div>
                    </div>
                </div>
                <div class="list-box table-box animate__animated animate__fadeInRight">
                    <div class="title-box">
                        <span>表格</span>
                    </div>
                    <div class="c-box">
                        <Table />
                    </div>
                </div>
                <div class="list-box animate__animated animate__fadeInRight">
                    <div class="title-box">
                        <span>柱状图</span>
                    </div>
                    <div class="c-box">
                        <Bar />
                    </div>
                </div>
            </div>
            <div class="map-box">
                <Arcgis style="height: 100%" />
            </div>
            <div class="card-box">
                <div class="card-list animate__animated animate__fadeInDown">
                    <div class="card-img">
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE3NUM4MDhGQzgzNjExRURCODhERUQ2OEM5QjlDMkM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE3NUM4MDkwQzgzNjExRURCODhERUQ2OEM5QjlDMkM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTc1QzgwOERDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTc1QzgwOEVDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ysBrtAAACQUlEQVR42uyXTUgVURTH3+hLwwwsKpP8ANE+FkVBC0FblFJB4UYkgtBF+EFtSlzYImgZRBC5iEBcuBF3Qi2C8KOMQOOlRpG6CywRLY0i0Ez7HTkDl8vMvDHnLQIP/Jj77sy9/3vOnHvuPMfpWItFbDXQBVlGn4h0QGNaLHo7bImJOXBOGqkQvAun4Cb8sW+mQlBEvsItSIeVVAsegn7YB9PQat6Ma3zl+jsCsRLog/0wA5VQqPdWXQ9fwjzcg4JNiBXDAByAWTgDUzAE7XB7PXvYFuNcj+kg8bIH7sPYBsSK4IVe5+A0fPB6UDws14z6BNvgCozCc01lJ4lYgb6zIo1UlZ+YK/gTHmj8L0NC78nAZyARqIcMj/H5Kibh/AZn4V3Q6hyfSiMhuQEXjUz+Ag/hMSxCHgzCQfiuCZIw5jgKuUalmYDPTpLSJineAnWwXft+QKd6c0TFpD1iVJVuuGTNJfuxyQlZS2VPXYdrsMfoF/Hz8NroOwlvfOaZcQVz4LjuR3c1Yxo607L0fYrXezXkr6xnLsBTv5XHtdgOWSuPacZVwKTR9wseKZJEyxvdrJIQjR5iMe1rCBi7/C/VIW5kkpflWb936Emw0yjUCd3DoQXD2i4YhlKrfwlq4UnYkIa1Wg8xsUz7RIhKcHcS7yMXjMS2BLcE/3/BNZ92kK0GzSeCHwMemPBp22bOMRUg+j7dqb7zVo+oUsNjOQ97oc04FWSibDihH1uu13L4NuvJL7agn4ll1n8M+bC6+leAAQDVY3ivnfmExgAAAABJRU5ErkJggg=="
                            alt=""
                        />
                    </div>
                    <div class="card-body">
                        <div class="info">
                            <div class="title">
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAARCAYAAAAL4VbbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFMUVGOUYwQzgzNjExRURCODhERUQ2OEM5QjlDMkM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFMUVGOUYxQzgzNjExRURCODhERUQ2OEM5QjlDMkM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUUxRUY5RUVDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUUxRUY5RUZDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7OuqzvAAAA5ElEQVR42mL8//8/EwMDAyMQ/2UgAGAK5YCYlxjFIMAGxJ5ArEqMYhBgBeIcIPYhRjGMXwvFTNgUgzz2HcpnhNJZQLwGiLmxmfwYiB+iGRQIxAeBWAouAgw6ZOwNxCeA+Pl/BHgMxAYgeXTFIJyPphgE3gOxGLpCKyA+iqb4HRC7geRZkNxoDMRRQIwsdhcalDeQPSgNxJpoHjwCxBYwhTDFIMyDpnAtELsA8RtkQRaksAUHDhDPAuJ5UDYDumIY+APE84H4HK7oZgT6khlIKwDxByB+iy8hMULTM0jDb0JJFCDAAGaBk8VsmazpAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                                <span>这是标题</span>
                            </div>
                            <div class="num">
                                <CountTo :endVal="545545" :delaytime="500" />
                                <span>个</span>
                            </div>
                        </div>
                        <div class="compare">
                            <p class="title">占比</p>
                            <div class="num">
                                <span>
                                    +
                                    <CountTo :endVal="25" :delaytime="500" />
                                    %
                                </span>
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFMUVGOUY0QzgzNjExRURCODhERUQ2OEM5QjlDMkM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFMUVGOUY1QzgzNjExRURCODhERUQ2OEM5QjlDMkM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUUxRUY5RjJDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUUxRUY5RjNDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6wKoJbAAAAmUlEQVR42mI0uNnAgAZigFgKiLuQBVnQFOkBcR8QCwHxZSDeDpNgQlIkCMRzgFgUiJmBeAYQq6ErBEn0ArEpkkY5qGJuZIWZQJzAgAkcgbgF5sYwIJ7MgBsUAPELkEI+qA//AbEOEPtAFZwA4gNAzAjEf1mgHoCBACSF24C4GZuvQYAXic2FLMHEQCSgvkIWLGL/0WgwAAgwAEAJFPc7gj8rAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-list animate__animated animate__fadeInUp">
                    <div class="card-img">
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE3NUM4MDhGQzgzNjExRURCODhERUQ2OEM5QjlDMkM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE3NUM4MDkwQzgzNjExRURCODhERUQ2OEM5QjlDMkM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTc1QzgwOERDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTc1QzgwOEVDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ysBrtAAACQUlEQVR42uyXTUgVURTH3+hLwwwsKpP8ANE+FkVBC0FblFJB4UYkgtBF+EFtSlzYImgZRBC5iEBcuBF3Qi2C8KOMQOOlRpG6CywRLY0i0Ez7HTkDl8vMvDHnLQIP/Jj77sy9/3vOnHvuPMfpWItFbDXQBVlGn4h0QGNaLHo7bImJOXBOGqkQvAun4Cb8sW+mQlBEvsItSIeVVAsegn7YB9PQat6Ma3zl+jsCsRLog/0wA5VQqPdWXQ9fwjzcg4JNiBXDAByAWTgDUzAE7XB7PXvYFuNcj+kg8bIH7sPYBsSK4IVe5+A0fPB6UDws14z6BNvgCozCc01lJ4lYgb6zIo1UlZ+YK/gTHmj8L0NC78nAZyARqIcMj/H5Kibh/AZn4V3Q6hyfSiMhuQEXjUz+Ag/hMSxCHgzCQfiuCZIw5jgKuUalmYDPTpLSJineAnWwXft+QKd6c0TFpD1iVJVuuGTNJfuxyQlZS2VPXYdrsMfoF/Hz8NroOwlvfOaZcQVz4LjuR3c1Yxo607L0fYrXezXkr6xnLsBTv5XHtdgOWSuPacZVwKTR9wseKZJEyxvdrJIQjR5iMe1rCBi7/C/VIW5kkpflWb936Emw0yjUCd3DoQXD2i4YhlKrfwlq4UnYkIa1Wg8xsUz7RIhKcHcS7yMXjMS2BLcE/3/BNZ92kK0GzSeCHwMemPBp22bOMRUg+j7dqb7zVo+oUsNjOQ97oc04FWSibDihH1uu13L4NuvJL7agn4ll1n8M+bC6+leAAQDVY3ivnfmExgAAAABJRU5ErkJggg=="
                            alt=""
                        />
                    </div>
                    <div class="card-body">
                        <div class="info">
                            <div class="title">
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAARCAYAAAAL4VbbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFMUVGOUYwQzgzNjExRURCODhERUQ2OEM5QjlDMkM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFMUVGOUYxQzgzNjExRURCODhERUQ2OEM5QjlDMkM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUUxRUY5RUVDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUUxRUY5RUZDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7OuqzvAAAA5ElEQVR42mL8//8/EwMDAyMQ/2UgAGAK5YCYlxjFIMAGxJ5ArEqMYhBgBeIcIPYhRjGMXwvFTNgUgzz2HcpnhNJZQLwGiLmxmfwYiB+iGRQIxAeBWAouAgw6ZOwNxCeA+Pl/BHgMxAYgeXTFIJyPphgE3gOxGLpCKyA+iqb4HRC7geRZkNxoDMRRQIwsdhcalDeQPSgNxJpoHjwCxBYwhTDFIMyDpnAtELsA8RtkQRaksAUHDhDPAuJ5UDYDumIY+APE84H4HK7oZgT6khlIKwDxByB+iy8hMULTM0jDb0JJFCDAAGaBk8VsmazpAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                                <span>这是标题</span>
                            </div>
                            <div class="num">
                                <CountTo :endVal="854721" :delaytime="500" />
                                <span>个</span>
                            </div>
                        </div>
                        <div class="compare">
                            <p class="title">占比</p>
                            <div class="num">
                                <span>
                                    +
                                    <CountTo :endVal="33" :delaytime="500" />
                                    %
                                </span>
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFMUVGOUY0QzgzNjExRURCODhERUQ2OEM5QjlDMkM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFMUVGOUY1QzgzNjExRURCODhERUQ2OEM5QjlDMkM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUUxRUY5RjJDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUUxRUY5RjNDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6wKoJbAAAAmUlEQVR42mI0uNnAgAZigFgKiLuQBVnQFOkBcR8QCwHxZSDeDpNgQlIkCMRzgFgUiJmBeAYQq6ErBEn0ArEpkkY5qGJuZIWZQJzAgAkcgbgF5sYwIJ7MgBsUAPELkEI+qA//AbEOEPtAFZwA4gNAzAjEf1mgHoCBACSF24C4GZuvQYAXic2FLMHEQCSgvkIWLGL/0WgwAAgwAEAJFPc7gj8rAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-list animate__animated animate__fadeInDown">
                    <div class="card-img">
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE3NUM4MDhGQzgzNjExRURCODhERUQ2OEM5QjlDMkM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE3NUM4MDkwQzgzNjExRURCODhERUQ2OEM5QjlDMkM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTc1QzgwOERDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTc1QzgwOEVDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ysBrtAAACQUlEQVR42uyXTUgVURTH3+hLwwwsKpP8ANE+FkVBC0FblFJB4UYkgtBF+EFtSlzYImgZRBC5iEBcuBF3Qi2C8KOMQOOlRpG6CywRLY0i0Ez7HTkDl8vMvDHnLQIP/Jj77sy9/3vOnHvuPMfpWItFbDXQBVlGn4h0QGNaLHo7bImJOXBOGqkQvAun4Cb8sW+mQlBEvsItSIeVVAsegn7YB9PQat6Ma3zl+jsCsRLog/0wA5VQqPdWXQ9fwjzcg4JNiBXDAByAWTgDUzAE7XB7PXvYFuNcj+kg8bIH7sPYBsSK4IVe5+A0fPB6UDws14z6BNvgCozCc01lJ4lYgb6zIo1UlZ+YK/gTHmj8L0NC78nAZyARqIcMj/H5Kibh/AZn4V3Q6hyfSiMhuQEXjUz+Ag/hMSxCHgzCQfiuCZIw5jgKuUalmYDPTpLSJineAnWwXft+QKd6c0TFpD1iVJVuuGTNJfuxyQlZS2VPXYdrsMfoF/Hz8NroOwlvfOaZcQVz4LjuR3c1Yxo607L0fYrXezXkr6xnLsBTv5XHtdgOWSuPacZVwKTR9wseKZJEyxvdrJIQjR5iMe1rCBi7/C/VIW5kkpflWb936Emw0yjUCd3DoQXD2i4YhlKrfwlq4UnYkIa1Wg8xsUz7RIhKcHcS7yMXjMS2BLcE/3/BNZ92kK0GzSeCHwMemPBp22bOMRUg+j7dqb7zVo+oUsNjOQ97oc04FWSibDihH1uu13L4NuvJL7agn4ll1n8M+bC6+leAAQDVY3ivnfmExgAAAABJRU5ErkJggg=="
                            alt=""
                        />
                    </div>
                    <div class="card-body">
                        <div class="info">
                            <div class="title">
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAARCAYAAAAL4VbbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFMUVGOUYwQzgzNjExRURCODhERUQ2OEM5QjlDMkM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFMUVGOUYxQzgzNjExRURCODhERUQ2OEM5QjlDMkM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUUxRUY5RUVDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUUxRUY5RUZDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7OuqzvAAAA5ElEQVR42mL8//8/EwMDAyMQ/2UgAGAK5YCYlxjFIMAGxJ5ArEqMYhBgBeIcIPYhRjGMXwvFTNgUgzz2HcpnhNJZQLwGiLmxmfwYiB+iGRQIxAeBWAouAgw6ZOwNxCeA+Pl/BHgMxAYgeXTFIJyPphgE3gOxGLpCKyA+iqb4HRC7geRZkNxoDMRRQIwsdhcalDeQPSgNxJpoHjwCxBYwhTDFIMyDpnAtELsA8RtkQRaksAUHDhDPAuJ5UDYDumIY+APE84H4HK7oZgT6khlIKwDxByB+iy8hMULTM0jDb0JJFCDAAGaBk8VsmazpAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                                <span>这是标题</span>
                            </div>
                            <div class="num">
                                <CountTo :endVal="98654" :delaytime="500" />
                                <span>个</span>
                            </div>
                        </div>
                        <div class="compare">
                            <p class="title">占比</p>
                            <div class="num">
                                <span>
                                    +
                                    <CountTo :endVal="58" :delaytime="500" />
                                    %
                                </span>
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFMUVGOUY0QzgzNjExRURCODhERUQ2OEM5QjlDMkM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFMUVGOUY1QzgzNjExRURCODhERUQ2OEM5QjlDMkM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUUxRUY5RjJDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUUxRUY5RjNDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6wKoJbAAAAmUlEQVR42mI0uNnAgAZigFgKiLuQBVnQFOkBcR8QCwHxZSDeDpNgQlIkCMRzgFgUiJmBeAYQq6ErBEn0ArEpkkY5qGJuZIWZQJzAgAkcgbgF5sYwIJ7MgBsUAPELkEI+qA//AbEOEPtAFZwA4gNAzAjEf1mgHoCBACSF24C4GZuvQYAXic2FLMHEQCSgvkIWLGL/0WgwAAgwAEAJFPc7gj8rAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import CountTo from '@/components/CountTo/CountTo.vue'
    import Bar from './components/Bar.vue'
    import Pie from './components/Pie.vue'
    import Line from './components/Line.vue'
    import Table from './components/Table.vue'
    import Arcgis from '../Arcgis/Arcgis.vue'
</script>
<style lang="less" scoped>
    .data-box {
        background-color: rgb(0, 34, 111);
        width: 100vw;
        height: 100vh;
    }
    .header-box {
        background-image: url('../../assets/bigScreen/header-bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .px2vh(height,88);
        .header-title {
            text-align: center;
            font-weight: 600;
            color: #fff;
            background: linear-gradient(0deg, #b9cfff 0%, #ffffff 99.0478515625%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            .px2vh(line-height,60);
            .px2font(32);
            .px2vh(height,88);
        }
    }
    .left-content {
        .px2vw(padding-left,20);
    }
    .content-list {
        position: relative;
        z-index: 2;
        background-color: rgba(0, 34, 111, 0.5);
        .list-box {
            .px2vw(width,450);
            .px2vh(height,320);
            .px2vh(margin-bottom,20);
            &:nth-of-type(1) {
                animation-delay: 0.5s;
            }
            &:nth-of-type(2) {
                animation-delay: 1s;
            }
            &:nth-of-type(3) {
                animation-delay: 1.5s;
            }
            .title-box {
                width: 100%;
                background-image: url('../../assets/bigScreen/title-bg.png');
                background-size: 100% 100%;
                background-position: center;
                background-repeat: no-repeat;
                .px2vh(height,40);
                .px2vh(line-height,40);
                span {
                    font-weight: 600;
                    color: #00fcff;
                    .px2vw(margin-left,25);
                    .px2font(16);
                    .px2vh(line-height,25);
                }
            }
            .c-box {
                .px2vh(height,270);
            }
        }
    }
    .right-content {
        .px2vw(margin-right,20);
        .num-box {
            .c-box {
                display: flex;
                justify-content: space-around;
                align-items: center;
                .list-d {
                    position: relative;
                    .num-p {
                        color: #fff;
                        text-align: center;
                        font-weight: bold;
                        font-style: italic;
                        letter-spacing: 2px;
                        .px2font(26);
                    }
                    .num-t {
                        color: #fff;
                        position: absolute;
                        left: 50%;
                        .px2vh(margin-left,-45);
                        .px2vh(margin-top,14);
                        .px2font(18);
                    }
                }
            }
        }
        .table-box {
            .c-box {
                background-image: url('../../assets/bigScreen/table-bg.png');
                background-size: 100% 100%;
                overflow: hidden;
                padding: 1px;
                .px2vh(margin-top,10);
            }
        }
    }
    .content-box {
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    .map-box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .card-box {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        margin: 0 auto;
        z-index: 2;
        display: flex;
        justify-content: center;
        .card-list {
            .px2vw(width,320);
            .px2vh(height,120);
            background-image: url('../../assets/bigScreen/card-bg.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .card-img {
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAABECAYAAADQkyaZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFMUVGOUVDQzgzNjExRURCODhERUQ2OEM5QjlDMkM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFMUVGOUVEQzgzNjExRURCODhERUQ2OEM5QjlDMkM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTc1QzgwOTFDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTc1QzgwOTJDODM2MTFFREI4OERFRDY4QzlCOUMyQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5JWppvAAAJA0lEQVR42tRb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)
                    no-repeat;
                background-size: 100% 100%;
                background-position: center;
                display: flex;
                justify-content: center;
                align-items: center;
                .px2vw(margin-left,25);
                .px2vw(margin-right,10);
                .px2vw(width,57);
                .px2vh(height,67);
                img {
                    .px2vw(width,28);
                    .px2vh(height,30);
                }
            }

            .card-body {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .info {
                    .px2vw(margin-right,8);
                    .title {
                        color: #fff;
                        display: flex;
                        align-items: center;
                        .px2font(18);
                        .px2vw(margin-bottom,10);
                        span {
                            .px2vw(margin-left,5);
                        }
                    }
                    .num {
                        span {
                            .px2font(24);
                            font-weight: bold;
                            color: #fff;
                            font-style: italic;
                            letter-spacing: 1px;
                            &:nth-of-type(2) {
                                color: #999;
                                font-style: inherit;
                                .px2font(16);
                            }
                        }
                    }
                }
                .compare {
                    .title {
                        color: #fff;
                        .px2font(16);
                        .px2vw(margin-bottom,10);
                        .px2vw(margin-top,10);
                    }
                    .num {
                        color: #30e17f;
                        font-weight: bold;
                        .px2font(20);
                    }
                }
            }
        }
    }
</style>
