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
            }
        }
    };

    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;

})(window);


