$(function () {
    // 一些常用变量
    //1. 歌曲列表
    const cList = $('.content_list');
    //底部播放按钮
    const dPlay = $('.music_play');
    //底部上一首按钮
    var mPre = $('.music_pre');
    //底部下一首按钮
    var mNext = $('.music_next');
    // 底部进度条
    const bar = $('.music_progress_bar');
    //底部进度条前景色
    const line = $('.music_progress_line');
    // 底部进度条小圆点
    const dot = $('.music_progress_dot');

    var progress = Progress(bar,line,dot);
    progress.progressClick();


    var $audio = $('audio');
    var player = new Player($audio);
    getPlayerList();

    // 0.加载歌曲列表
    function getPlayerList() {
        $.ajax({
            url:'./source/musiclist.json',
            dataType:'json',
            success:function (data) {
                player.musicList = data;
                // 3.1 遍历获取到的数据，创建每一条音乐
                var $musicList = $('.content_list ul');
                $.each(data,function (index,ele) {
                    var $item = createMusicITem(index,ele);
                    $musicList.append($item);
                });
                initMusicInfo(data[0]);
            },
            error:function (e) {
                console.log(e);
            }
        });
    }

    // 1. 初始化事件监听
    initEvents();
    function initEvents() {


        //1 初始化自定义滚动条
        cList.mCustomScrollbar();

        // 2.监听歌曲的移入事件
        cList.delegate('.list_music','mouseenter',function () {
            // 1.1 显示子菜单
            $(this).find(".list_menu").stop().css({"display":"inline-block"});
            // 1.2显示删除图标
            $(this).find(".list_time a").stop().css({"display":"inline-block"});
            // 1.3 隐藏时长
            $(this).find(".list_time span").stop().css({"display":"none"});
        });
        // 2.2 监听歌曲的移出事件
        cList.delegate('.list_music','mouseleave',function () {
            // 2.1隐藏子菜单
            $(this).find(".list_menu").stop().css({"display":"none"});
            // 2.2 隐藏删除图标
            $(this).find(".list_time a").stop().css({"display":"none"});
            // 显示时长
            $(this).find(".list_time span").stop().css({"display":"inline-block"});
        });

        // 3. 监听复选框的点击事件
        cList.delegate('.list_check','click',function () {
            $(this).toggleClass("list_checked");
        });

        // 4. 添加子菜单播放按钮的监听
        cList.delegate('.list_menu_play','click',function () {
            // 4.1 切换播放图标
            $(this).toggleClass('list_menu_play2');
            // 4.2 恢复其他播放图标
            $(this).parents('.list_music').siblings().find('.list_menu_play').removeClass('list_menu_play2')
            // 4.3 底部播放按钮与菜单播放按钮同步
            const lMusic = $(this).parents('.list_music');
            if($(this).attr('class').indexOf('list_menu_play2') != -1){
                // 当前子菜单播放按钮是播放状态
                dPlay.addClass('music_play2');
                // 文字高亮
                lMusic.find('div').css({'color':'#fff'});
                lMusic.siblings().find('div').css({'color':'rgba(255,255,255,.5)'})
                lMusic.find('.list_number').addClass('list_number2');
                lMusic.siblings().find('.list_number').removeClass('list_number2')
            }else {
                // 当前子菜单播放按钮不是播放状态
                dPlay.removeClass('music_play2');
                // 文字不高亮
                lMusic.find('div').css({'color':'rgba(255,255,255,.5)'});
                lMusic.find('.list_number').removeClass('list_number2');
            }
            // 4.5 播放音乐
            player.playMusic(lMusic.get(0).index,lMusic.get(0).music);

            // 4.6 切换歌曲信息
            initMusicInfo(lMusic.get(0).music);
        });

        // 监听底部控制区域播放按钮事件
        // 5. 监听底部播放按钮事件
        dPlay.click(function () {
            //判断之前有未播放过
            if(player.currentIndex == -1) {
                //未播放过
                $('.list_music').eq(0).find('.list_menu_play').trigger('click');
            }else {
                // 播放过
                $('.list_music').eq(player.currentIndex).find('.list_menu_play').trigger('click');
            }
        });
        //6. 监听底部上一首按钮事件


        mPre.click(function () {
            $('.list_music').eq(player.preIndex()).find('.list_menu_play').trigger('click');
        });


        // 7.监听底部下一首按钮事件
        mNext.click(function () {
            $('.list_music').eq(player.nextIndex()).find('.list_menu_play').trigger('click');
        });

        // 8. 监听删除按钮事件
        $('.content_list').delegate('.list_music_del','click',function () {
            // 找到被点击的音乐
            var $item = $(this).parents('.list_music');

            // 判断当前删除的是否是正在播放的音乐
            // 若是则播放下一首
            if($item.get(0).index === player.currentIndex) {
                mNext.trigger('click');
            }


            $item.remove();
            player.changeMusic($item.get(0).index);

            // 重新排序
            $('.list_music').each(function (index, ele) {
                ele.index = index;
                $(ele).find('.list_number').text(index+1);
            })

        })

    }


    // 初始化歌曲信息
    function initMusicInfo(music) {
        //歌曲图片
        const musicImg = $('.song_info_pic img');
        // 歌曲名
        const musicName = $('.song_info_name a');
        // 歌手
        const singer = $('.song_info_singer a');
        // 专辑
        const album = $('.song_info_album a');
        // 进度条歌曲名
        const dName = $('.music_progress_name');
        //进度条时间
        const dTime =$('.music_progress_time');
        // 背景
        const bg = $('.mask_bg');

        // 给获取到的元素赋值
        musicImg.attr('src',music.cover);
        musicName.text(music.name);
        singer.text(music.singer);
        album.text(music.album);
        dName.text(music.name+" / "+music.singer);
        dTime.text('00:00 /'+music.time);
        bg.css('background','url('+music.cover+')')
    }




    // 定义创建音乐的方法
    function createMusicITem(index,music) {
        var $item = $('<li class="list_music">\n' +
                            '<div class="list_check"> <i></i></div>\n' +
                            '<div class="list_number">'+(index+1)+'</div>\n' +
                            '<div class="list_name">'+music.name+'\n' +
                                '<div class="list_menu">\n' +
                                    '<a href="javascript:;" title="播放" class="list_menu_play"></a>\n' +
                                    '<a href="javascript:;" title="添加"></a>\n' +
                                    '<a href="javascript:;" title="下载"></a>\n' +
                                    '<a href="javascript:;" title="分享"></a>\n' +
                                '</div>\n' +
                            '</div>\n' +
                            '<div class="list_singer">'+music.singer+'</div>\n' +
                            '<div class="list_time">\n' +
                                '<span>'+music.time+'</span>\n' +
                                '<a href="javascript:;" title="删除" class="list_music_del"></a>\n' +
                            '</div>\n' +
                       '</li>');
        $item.get(0).index = index;
        $item.get(0).music = music;
        return $item;
    }
});













