(function (window) {
    function Player($audio) {
        return new Player.prototype.init($audio);


    }
    Player.prototype = {
        constructor:Player,
        musicList:[],
        currentIndex: -1,
        init:function ($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        playMusic:function (index, music) {
            // 判断是否为同一首音乐
            if (this.currentIndex == index) {
                // 同一首歌曲
                if(this.audio.paused) {
                    this.audio.play();
                }else {
                    this.audio.pause();
                }
            }else {
                // 非同一首歌
                this.$audio.attr('src',music.link_url);
                this.audio.play();
                this.currentIndex = index;
            }
        },
        preIndex:function () {
            var index = this.currentIndex-1;
            if(index <0) {
                index = this.musicList.length-1;
            }
            return index;
        },
        nextIndex:function () {
            var index = this.currentIndex +1;
            if(index > this.musicList.length -1) {
                index = 0;
            }
            return index;
        },
        changeMusic:function (index) {
            //删除对应的数据
            this.musicList.splice(index,1)

            // 判断当前删除的是否是正在播放音乐的前面的歌曲
            if(index < this.currentIndex) {
                this.currentIndex -= 1;
            }
        },
        // 总时长
        getMusicDuration:function () {
            return this.audio.duration;
        },
        // 播放时长
        getCurrentTime:function () {
          return this.audio.currentTime;
        },
        musicTimeUpdata:function (callback) {
            this.$audio.on('timeupdate',()=> {
                var currentTime = this.audio.currentTime;
                var durationTime = this.audio.duration;
                var durTime =format(durationTime);
                var curtime = format(currentTime);
                callback(curtime,durTime,currentTime,durationTime)
            });
            // 定义一个格式化时间的方法
            function format(time) {
                var min = parseInt(time/60);
                var sec = parseInt(time%60);
                if(min < 10) {
                    min = '0'+min;
                }
                if(sec < 10) {
                    sec = '0'+sec;
                }
                return min+':'+sec;
            }
        }
    };

    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;

})(window);


