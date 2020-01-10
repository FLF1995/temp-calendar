/**
 * TODO 本功能需要layer和jquery插件的支持； 本功能为二次开发。
 * @see 源文件地址：http://sc.chinaz.com/jiaobendemo.aspx?downloadid=0201785541739
 */
var layer;
var index;
var myCalendar = null;
var feeData = [];
var resultObj = {}

layui.use('layer', function () {
    layer = layui.layer;
});

function renderCalendar() {
    // if (typeof (layer) != "object" || !layer) {
    //     setTimeout("main()", 400);
    //     return;
    // }
    myCalendar = new SimpleCalendar('#calendar', {
        width: '100%',
        height: '500px',
        language: 'CH', //语言
        showLunarCalendar: true, //阴历
        showHoliday: false, //休假-暂时禁用
        showFestival: true, //节日
        showLunarFestival: true, //农历节日
        showSolarTerm: true, //节气
        showMark: true, //标记
        realTime: true, //具体时间
        timeRange: {
            startYear: 2002,
            endYear: 2049
        },
        mark: {},
        markColor: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],//记事各个颜色
        main: function (year, month) {
            console.log(year + "--->" + month);

            // alert("[获取数据]" + year + "--->" + month);
            if (layer) index = layer.msg('正在查询数据......', { icon: 16, shade: 0.6 });
            setTimeout(function (params) {
                feeData = [
                    { subject: "2020-01-01", type: '水表度数', value: 71.49 },
                    { subject: "2020-01-01", type: '水表度数', value: 71.49 },
                    { subject: "2020-01-02", type: '水表度数', value: 71.94 },
                    { subject: "2020-01-13", type: '水表度数', value: 73.84 },
                    { subject: "2020-01-15", type: '水表度数', value: 73.84 }
                ];

                //模拟获取数据start
                var resultObj = {}

                console.log('feeData', feeData)
                // setTimeout(()=>{
                //     console.log('myCalendar', myCalendar)
                // }, 2000)
                if (layer) layer.close(index);
                console.log('myCalendar', myCalendar)
                console.log('resultObj', resultObj)

                for (var i = 0; i < feeData.length; i++) {
                    var data = feeData[i]
                    var dateArr = data.subject.split('-')
                    var month = data.subject.split('-')[1]
                    month = Number(month) < 10 ? month.replace('0', '') : month
                    dateArr[1] = month
                    var key = dateArr.join('-')
                    resultObj[key] = resultObj[key] || []
                    resultObj[key].push({
                        title: resultObj[key].length > 0 ? '' : '水表度数',
                        name: data.value,
                        ratio: '',
                        status: '',
                        statusText: ''
                    })
                }
                myCalendar.addMark(resultObj)
            }, 500)
            return {}
        },
        timeupdate: false,//显示当前的时间HH:mm
        theme: {
            changeAble: false,
            weeks: {
                backgroundColor: '#FBEC9C',
                fontColor: '#4A4A4A',
                fontSize: '20px',
            },
            days: {
                backgroundColor: '#ffffff',
                fontColor: '#565555',
                fontSize: '24px'
            },
            todaycolor: 'orange',
            activeSelectColor: 'orange',
        }
    });
}

// $.ajax({
//   data: params,
//   dataType: "json",
//   type: "get",
//   url: "http://192.168.1.116/property/roomMeterNo/historyDegree?id=23&start=2020-01-01&end=2020-01-08",
//   success: function(result) {
//     console.log('success')
//     // if (result.success == true) {
//     //   console.log('success')
//     // } else {
//     //   console.log("success");

//     // }
//   }
// });

renderCalendar();
