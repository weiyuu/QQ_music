(function (window) {
    function Progress(bar,line,dot) {
        return new Progress.prototype.init(bar,line,dot);
    }
    Progress.prototype = {
        constructor:Progress,
        init:function (bar,line,dot) {
            this.bar = bar;
            this.line = line;
            this.dot = dot;
        },
        progressClick:function () {
            /*// 监听背景点击
            var $this = this;
            this.bar.click(function (event) {
                    // 获取背景距离窗口默认的位置
                    //默认距离左窗口的距离
                    var normalLeft = $(this).offset().left;
                    // 获取点击的位置距离窗口的位置
                    var eventLeft = event.pageX;
                    // 设置前景的宽度
                    $this.line.css('width',eventLeft-normalLeft);
                    $this.dot.css('left',eventLeft-normalLeft)
            });*/

            this.bar.click(event => {
                // 获取背景距离窗口默认的位置
                //默认距离左窗口的距离
                let normalLeft = this.bar.offset().left;
                // 获取点击的位置距离窗口的位置
                let eventLeft = event.pageX;
                this.line.css('width',eventLeft - normalLeft);
                this.dot.css('left',eventLeft-normalLeft);
            });
        },
        progressMove:function () {
            // 获取背景距离窗口默认的位置
            //默认距离左窗口的距离
            var normalLeft = this.bar.offset().left;

            this.bar.mousedown(event=> {
                $(document).mousemove(event=> {
                    var eventLeft = event.pageX;
                    //处理进度条超出的问题
                    if(eventLeft <= normalLeft) {
                        this.line.css('width',0);
                        this.dot.css('left',0);
                    }else if(eventLeft >= (658+normalLeft)) {
                        this.line.css('width',658);
                        this.dot.css('left',658);
                    }else if(eventLeft > normalLeft || eventLeft < (normalLeft+670)){
                        this.line.css('width',eventLeft - normalLeft);
                         this.dot.css('left',eventLeft - normalLeft);
                    }
                })
            });






            // 监听鼠标抬起事件
            $(document).mouseup(function () {
                $(document).off('mousemove');
            })

        },
        setprogress:function (value) {
            if(value < 0 || value >100) {
                return;
            }else {
                this.line.css({
                    width: value+'%'
                });
                this.dot.css({
                    left:value+'%'
                })
            }
        },
    };
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;


})(window);