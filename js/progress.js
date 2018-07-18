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
            // 监听背景点击
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
            });



        },
        progressMove:function () {




        }
    };
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;


})(window);