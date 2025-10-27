export const appInit = {
    data() {
        return {
            version: ""
        }
    },
    /**
     * app更新下载版本
     * @param version 最新版本号
     * @param description 版本描述
     * @param url 最新版本下载链接
     * @returns
     * */
    updateVersion(content):void {
        const { version, description, url } = content
        plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
            this.version = widgetInfo.version as string
            let _this = this

            // 1代表app新包版本号大于本地版本号
            if (this.compareVersion(version, this.version) === 1) {
                uni.showModal({
                    title: `发现新版本V${version}`,
                    content: `更新内容：${description}`,
                    success: function (res1) {
                        if (res1.confirm) {
                            _this.downloadApp(url)
                        }
                    }
                });
            }
        });
    },
    /**
     * 进行版本更新检查操作
     * */
    compareVersion(version1: string, version2: string) {
        const newVersion1 = `${version1}`.split('.').length < 3 ? `${version1}`.concat('.0') : `${version1}`;
        const newVersion2 = `${version2}`.split('.').length < 3 ? `${version2}`.concat('.0') : `${version2}`;

        return this.isUpdateVersion(newVersion1 ,newVersion2);
    },
    /**
     * 计算版本号大小,转化大小
     * */
    toNum(a: number | string){
        const c = a.toString().split('.');
        const num_place = ["", "0", "00", "000", "0000"],
            r = num_place.reverse();
        for (let i = 0; i < c.length; i++){
            const len=c[i].length;
            c[i]=r[len]+c[i];
        }
        return c.join('');
    },
    /**
     * 检测版本号是否需要更新
     * */
    isUpdateVersion(a: number | string, b: number | string) {
        const numA = this.toNum(a);
        const numB = this.toNum(b);
        return numA > numB ? 1 : numA < numB ? -1 : 0;
    },
    /**
     * 下载新的app版本
     * */
    downloadApp(downloadUrl: string) {
        uni.showLoading({
            title: '更新中……'
        })
        uni.downloadFile({
            // 存放最新安装包的地址
            url: downloadUrl,
            success: (downloadResult) => {
                uni.hideLoading();
                if (downloadResult.statusCode === 200) {
                    plus.runtime.install(downloadResult.tempFilePath,{
                        force: false
                    }, function() {
                        plus.runtime.restart();
                    }, function(e) {
                        uni.showToast({
                            title: "安装失败",
                            icon: "none"
                        })
                    });
                } else {
                    uni.showToast({
                        title: "更新失败",
                        icon: "none"
                    })
                }
            },
            fail: (err) => {
                uni.showToast({
                    title: "下载失败",
                    icon: "none"
                })
            }
        });
    }
}