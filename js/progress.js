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
        isMove:false,
        progressClick:function (callBack) {

            this.bar.click(event => {
                // 获取背景距离窗口默认的位置
                //默认距离左窗口的距离
                var normalLeft = this.bar.offset().left;
                // 获取点击的位置距离窗口的位置
                var eventLeft = event.pageX;
                this.line.css('width',eventLeft - normalLeft);
                this.dot.css('left',eventLeft-normalLeft);

                // 进度条比例
                var value = (eventLeft-normalLeft)/this.bar.width();
                callBack(value);

            });
        },
        progressMove:function (callBack) {
            // 获取背景距离窗口默认的位置
            //默认距离左窗口的距离
            var normalLeft = this.bar.offset().left;
            var eventLeft;
            this.bar.mousedown(event=> {
                $(document).mousemove(event=> {
                    this.isMove = true;
                    eventLeft = event.pageX;
                    //处理进度条超出的问题
                    if(eventLeft < normalLeft) {
                        this.line.css('width',0);
                        this.dot.css('left','-14px');
                    }else if(eventLeft > (658+normalLeft)) {
                        this.line.css('width',658);
                        this.dot.css('left',658);
                    }else if(eventLeft > normalLeft || eventLeft < (normalLeft+658)){
                        this.line.css('width',eventLeft - normalLeft);
                         this.dot.css('left',eventLeft - normalLeft);
                    }

                })
            });






            // 监听鼠标抬起事件
            $(document).mouseup(()=> {
                $(document).off('mousemove');
                this.isMove = false;
                // 进度条比例
                var value = (eventLeft-normalLeft)/this.bar.width();
                callBack(value);
            })

        },
        setprogress:function (value) {
            if(this.isMove)return;
            var dotLeft = $('.music_progress_line').width() - 6;
            if(value < 0 || value >100) {
                return;
            }else {
                this.line.css({
                    width: value+'%',
                });
                this.dot.css({
                    left:dotLeft
                })
            }
        },
    };
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;


})(window);