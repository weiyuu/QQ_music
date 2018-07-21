(function (window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path);
    }
    Lyric.prototype = {
        constructor:Lyric,
        init:function (path) {
            this.path = path;
        },
        //保存时间
        times:[],
        //保存歌词
        lyric:[],
        index:-1,
        loadLyric:function (callBack) {
            var $this = this;
            $.ajax({
                url:$this.path,
                dataType:'text',
                success:function (data) {
                    $this.parseLyric(data);
                    callBack()
                },
                error:function (e) {
                    console.log(e);
                }
            });
        },
        parseLyric(data) {
            this.times = [];
            this.lyric = [];
            var arr = data.split('\n');
            // 遍历取出每一条歌词

            // 匹配歌词内的时间
            var exp = /\[(\d+:\d+\.\d+)\]/;
            $.each(arr,(index,ele)=> {
                var lrc = ele.split(']')[1];
                // 排除空行
                if(lrc.length !== 1){
                    this.lyric.push(lrc);
                    var res = exp.exec(ele);
                    if(res == null) {
                        return true;
                    }
                    var timeStr = res[1];
                    var res2 = timeStr.split(':');
                    var min = parseInt(res2[0]) * 60;
                    var sec = parseFloat(res2[1]);
                    var time = parseFloat(Number(min+sec).toFixed(2));
                    this.times.push(time);
                }



            });
        },
        currentIndex(currentTime){
            if(currentTime >= this.times[0]) {
                this.index++;
                this.times.shift(); // 删除数组最前面一个元素
            }
            return this.index;
        }
    };


    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window);