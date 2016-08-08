$(function() {

    //初始化日历参数
    var $time = $('.time');
    var setCurMonth = new Date().getMonth() + 1;
    var setCurYear = new Date().getFullYear();
    var setCurDate = new Date().getDate();
    var displayingMonth,diplayingYear;
    var MonthInEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    my_table('now', 'calendar');


    $time.find('.date').html(setCurDate);
    $time.find('.month').html(MonthInEng[setCurMonth-1]);
    $time.find('year').html(setCurYear);


    //当点击某个日期时
    $('#calendar').on('tap', '.cur', function(event) {

        //获取点击的日期的时间的字符串表示，格式为yyyy/m/d，例如2016/8/5
        var clickDateStr = $(this).attr('data-date');

        //改变备忘录模块的显示日期
        var clickDateStrArray = clickDateStr.split('/')
        $time.find('.date').html(clickDateStrArray[2]);
        $time.find('.month').html(MonthInEng[parseInt(clickDateStrArray[1]-1)]);
        $time.find('year').html(clickDateStrArray[0]);

        /*此时发起ajax请求，获得点击日期的备忘录条目，更新页面*/
    });


    /*在网页加载的时候先用当天的备忘录条目插入html中*/



    //生成日历
    function my_table(e, f, callback) { /*e参数格式为y/m/d,必填传入now则获得今天的日历,f为载入容器的ID,callback为回调内容，会返回一些可能需要的参数*/
        if (e == 'now') e = GetDateStr(0);
        var now_date = e;
        var now_date_str_array = now_date.split('/');
        var curMonthfirstDate = now_date_str_array[0]+'/'+now_date_str_array[1]+'/1';
        displayingMonth = parseInt(now_date_str_array[1]);
        displayingYear = parseInt(now_date_str_array[0]);
        var week_no = new Date(curMonthfirstDate).getDay();
        var date_size = getCountDays(now_date);
        var my_date = document.getElementById(f);
        my_date.innerHTML = '<p><a href="#" id="prev-btn"><</a><a href="#" id="next-btn">></a><span class="title-month">'+MonthInEng[displayingMonth-1]+'</span><span class="title-year">'+displayingYear+'</span></p><table><thead><tr><td>S</td><td>M</td><td>T</td><td>W</td><td>T</td><td>F</td><td>S</td></tr></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></tbody></table>'
        var tbody = my_date.getElementsByTagName('tbody')[0];
        var td = tbody.getElementsByTagName('td');
        var pre_date = now_date.split('/');
        pre_date[1] = Number(pre_date[1]) - 1;
        if (pre_date[1] < 1) {
            pre_date[0] = Number(pre_date[0]) - 1;
            pre_date[1] = 12;
        };
        if (pre_date[1] < 10) {
            pre_date[1] = '0' + pre_date[1]
        };
        pre_date = pre_date[0] + '/' + pre_date[1] + '/' + pre_date[2];
        var pre_week_no = new Date(pre_date).getDay();
        var pre_date_size = getCountDays(pre_date);
        var n_date = now_date.split('/');
        n_date[1] = Number(n_date[1]) + 1;
        if (n_date[1] > 12) {
            n_date[0] = Number(n_date[0]) + 1;
            n_date[1] = 1;
        };
        if (n_date[1] < 10) {
            n_date[1] = '0' + n_date[1]
        };
        n_date = n_date[0] + '/' + n_date[1] + '/' + n_date[2];
        var n_week_no = new Date(n_date).getDay();
        var n_date_size = getCountDays(n_date);
    var data = {}; //回调返回数据
    data.now_date = now_date;
    data.week_no = week_no;
    data.date_size = date_size;
    data.my_date = my_date;
    data.pre_date = pre_date;
    data.pre_week_no = pre_week_no;
    data.n_week_no = n_week_no;
    data.n_date_size = n_date_size;
    for (i = 0; i < date_size; i++) {
        td[(week_no + i)].innerHTML = (i + 1);
        td[(week_no + i)].className = 'cur';
        if ((week_no + i) == week_no + Number(now_date.split('/')[2])) {
            if ((setCurMonth == displayingMonth)&&(setCurYear == displayingYear)) {
              td[(week_no + i - 1)].className = 'cur cur-day';
          }                   
      };
      td[(week_no + i)].setAttribute('data-date',displayingYear+'/'+displayingMonth+'/'+td[(week_no + i)].innerHTML);
  };
  for (i = 0; i < week_no; i++) {
    td[i].innerHTML = (pre_date_size - week_no + i + 1);
    td[i].style.color = '#cccccc';
}
for (i = week_no + date_size, j = 1; i < 42; i++, j++) {
    td[i].innerHTML = j;
    td[i].style.color = '#cccccc';
}
if(callback)callback(data);
document.getElementById('prev-btn').onclick = function() {
    var y = displayingYear;
    var m = displayingMonth;
    m = m - 1;
    if (m <= 0) {
        m = 12;
        y = y - 1;
    };

    my_table(y + '/' + m + '/' + setCurDate, f);
}
document.getElementById('next-btn').onclick = function() {
    var y = displayingYear;
    var m = displayingMonth;
    m = m + 1;
    if (m > 12) {
        m = 1;
        y = y + 1;
    };
    my_table(y + '/' + m + '/' + setCurDate, f);
}

    function getCountDays(e) { //获取当前日期所在的月有多少天
        var curDate = new Date(e);
        var curMonth = curDate.getMonth();
        curDate.setMonth(curMonth + 1);
        curDate.setDate(0);  //将时间设置为本月最后一天，变相获得本月天数。
        return curDate.getDate();
    };

    function GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1; //获取当前月份的日期
        var d = dd.getDate();
        return y + "/" + m + "/" + d;
    };
}
});

