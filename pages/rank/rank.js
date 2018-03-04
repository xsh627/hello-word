$(document).ready(function () {
    var urls = {
        list: 'http://asuna.net.cn:32249/?c=lb&a=lebo_showList'
    };
    var pollTimer, countTimer;
    var endTime = new Date(2018, 01, 21, 23, 59, 59);
    var updateTime = '';
    var listObj = $('#rankList');
    var countObj = $('#countCon');
    function init () {
        getData(renderAll);
        poll();
    }
    //轮询
    function poll () {
        clearInterval(pollTimer);
        pollTimer = setInterval(function () {
            getData(renderList);
        }, 30*1000);
    }
    //请求接口
    function getData (fn) {
        $.ajax({
            url: urls.list,
            dataType: 'jsonp',
            success: function (result) {
                if (fn && typeof fn === 'function') {
                    fn(result);
                }
            }
        });
    }
    //拿到数据后render内容
    function renderAll (result) {
        renderList(result);
        renderCount(result);
    }
    //render排行榜
    function renderList (result) {
        var result = result.result;
        if (updateTime === result.data.updateTime) {
            return false;
        }
        updateTime = result.data.updateTime;
        var tmpl = '';
        if (result.status === 200) {
            var data = result.data.userList;
            for (var i = 0, dataLen = data.length; i < dataLen; i++) {
                var dataItem = data[i];
                tmpl += renderItem(dataItem, i);
            }
        }
        listObj.html(tmpl);
    }
    //render排行榜item
    function renderItem (dataItem, i) {
        var r_n = '';
        var pt_icon = dataItem.source;
        var flag = '';
        var zanNum = formateNum(dataItem.upNum);
        if (i < 3) {
            r_n = ' r_' + (i + 1);
        }
        switch (dataItem.source) {
            case '西瓜视频':
                pt_icon = '<i class="icon_pt xigua"></i>';
                break;
            case '抖音':
                pt_icon = '<i class="icon_pt douyin"></i>';
                break;
            case '快手':
                pt_icon = '<i class="icon_pt kuaishou"></i>';
                break;
            case '美拍':
                pt_icon = '<i class="icon_pt meipai"></i>';
                break;
            case '内涵段子':
                pt_icon = '<i class="icon_pt neihan"></i>';
                break;
            case '今日头条':
                pt_icon = '<i class="icon_pt toutiao"></i>';
                break;
            case '百度贴吧':
                pt_icon = '<i class="icon_pt baidu"></i>';
                break;
            default:
                pt_icon = dataItem.source
                break;
        }
        if (dataItem.flag < 0) {
            flag = ' up';
        } else if (dataItem.flag > 0) {
            flag = ' down';
        }
        var itemTmpl = 
        '<li class="item">'+
            '<div class="p1">'+
                '<div class="rank_num' + r_n + '">' + (i+1) + '</div>'+
            '</div>'+
            '<div class="p2">'+
                '<div class="title">' + dataItem.title + '</div>'+
                '<div class="info">'+
                    '<div class="anchor">作者：' + dataItem.author + '</div>'+
                    '<div class="from">投稿平台：' + pt_icon + '</div>'+
                '</div>'+
            '</div>'+
            '<div class="p3' + flag + '">'+
                '<a href="' + dataItem.url + '" class="video_btn">'+
                    '<img src="' + dataItem.videoPic + '" class="video_pic" />'+
                    '<span class="video_cover"></span>'+
                    '<i class="video_play"></i>'+
                '</a>'+
                '<div class="zan">'+
                    '<div class="zan_state"></div>'+
                    '<div class="zan_num">' + zanNum + '</div>'+
                    '<div class="zan_txt">爱心数</div>'+
                '</div>'+
            '</div>'+
        '</li>';

        return itemTmpl;
    }
    //格式化数字
    function formateNum (num) {
        if (num >= 10000) {
            return parseInt(num/1000)/10 + 'w';
        } else if (num >= 1000) {
            return parseInt(num/100)/10 + 'k';
        } else {
            return num;
        }
    }
    //render倒计时
    function renderCount (result) {
        var result = result.result;
        if (result.status === 200) {
            var obj = {
                end: parseInt(endTime.getTime()/1000),
                start: parseInt(new Date(result.data.ServerTime).getTime()/1000)
            };
            countDown(obj);
        }
    }
    //倒计时
    function countDown (options) {
        var timeObj;
        var subTime = options.end - options.start;
        countTimer = setInterval(function () {
            var timeStr = '';
            var hours, minutes, seconds;
            if (subTime >= 0) {
                timeObj = formateTime(subTime);
                hours = timeObj.hours > 9 ? timeObj.hours : '0' + timeObj.hours;
                minutes = timeObj.minutes > 9 ? timeObj.minutes : '0' + timeObj.minutes;
                seconds = timeObj.seconds > 9 ? timeObj.seconds : '0' + timeObj.seconds;
                timeStr += '<span class="count_num">' + hours + '</span>' + '小时';
                timeStr += '<span class="count_num">' + minutes + '</span>' + '分钟';
                timeStr += '<span class="count_num">' + seconds + '</span>' + '秒';
                countObj.html(timeStr);
                subTime--;
            } else {
                clearInterval(countTimer);
            }
        }, 1000);
    }
    //时间戳格式化
    function formateTime (time) {
        //var days = parseInt(time / (24*60*60));
        var hours = parseInt(time / (60*60));
        var minutes = parseInt(time % (60*60) / 60);
        var seconds = parseInt(time % (60*60) % 60);
        return {
            //days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
    init();
});