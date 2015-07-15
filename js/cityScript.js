function cityScript(options) {
    //默认参数
    var defaults = {
        url: 'js/cityData.json',
        id: "inputTest"
    };
    var settings = $.extend(defaults, options || {});
    var baseProvince = ""; //省
    var baseCity = "";     //市
    var baseCounty = "";   //县
    var _index = null;
    var _index2 = null;
    var nums = null;
    var addtext = null;
    var inputText = $("#" + settings.id);
    $.getJSON(settings.url, function (data) {
        var obj = eval(data);
        $(obj).each(function (index) {
            baseProvince += "<li data-xuhao='" + index + "'>" + obj[index].n + "</li>";
        });
        step();
    })
    function step() {
        var htmls = "<div class=\"city-box\">" +
            "<div class=\"city-close\">X</div>" +
            "<ul class=\"city-ul\">" +
            "<li class=\"city-on\">" +
            "<em class=\"province\">请选择</em>" +
            "</li>" +
            "<li>" +
            "<em class=\"city\">请选择</em>" +
            "</li>" +
            "<li>" +
            "<em class=\"county\">请选择</em>" +
            "</li>" +
            "</ul>" +
            "<div class=\"baseAddress-box\">" +
            "<ul class=\"baseprovince\">" +
            "</ul>" +
            "<ul class=\"basecity\">" +
            "</ul>" +
            "<ul class=\"basecounty\">" +
            "</ul>" +
            "</div>" +
            "</div>";

        inputText.after(htmls);
        //地区三级标签点击切换
        $(".city-ul li").click(function () {
            $(".city-ul li").removeClass("city-on");
            $(this).addClass("city-on");
            changeadd();
            if ($(this).index() == 0) {
                $(".city,.county").hide().html("请选择");
            }
            if ($(this).index() == 1) {
                $(".county").hide().html("请选择");
            }
        });
        //关闭弹出层
        $(".city-close").click(function () {
            $(".city-box").hide();
        })
        //省操作
        $(".baseprovince").html(baseProvince);
        $(".baseprovince li").click(function () {
            $(".province").html($(this).html());
            _index = $(this).attr("data-xuhao");
            baseCity = "";
            step1(_index);
            $(".city").show();
            $(".city-ul li").removeClass("city-on");
            $(".city-ul li").eq(1).addClass("city-on");
            changeadd();
        })
    }
    //市操作
    function step1(_index) {
        $.getJSON(settings.url, function (data) {
            var obj = eval(data);
            $(obj[_index].s).each(function (index) {
                baseCity += "<li data-xuhao='" + index + "'>" + obj[_index].s[index].n + "</li>";
            });
            if (baseCity == "") {
                alert("出错了哦！");
            } else {
                $(".basecity").html(baseCity);
                $(".basecity li").on("click", function () {
                    $(".city").html($(this).html());
                    _index2 = $(this).attr("data-xuhao");
                    baseCounty = "";
                    step2(_index2);
                })
            }
        })
    }
    //县操作
    function step2(_index2) {
        $.getJSON(settings.url, function (data) {
            var obj = eval(data);
            $(obj[_index].s[_index2].s).each(function (index) {
                baseCounty += "<li data-xuhao='" + index + "'>" + obj[_index].s[_index2].s[index].n + "</li>";
            });
            if (baseCounty == "") {
                inputtext(1);
                inputText.val(addtext);
                $(".city-box").hide();
            } else {
                $(".county").show();
                $(".city-ul li").removeClass("city-on");
                $(".city-ul li").eq(2).addClass("city-on");
                changeadd();
                $(".basecounty").html(baseCounty);
                $(".basecounty li").click(function () {
                    $(".county").html($(this).html());
                    inputtext();
                    inputText.val(addtext);
                    $(".city-box").hide();
                })
            }
        })
    }
    function changeadd() {
        nums = $(".city-ul").find(".city-on").index();
        $(".baseAddress-box ul").hide();
        $(".baseAddress-box ul").eq(nums).show();
    }
    inputText.click(function () {
        $(".city-box").show();
    })
    function inputtext(attr) {
        if (attr == 1) {
            addtext = $(".province").html() + $(".city").html();
        } else {
            addtext = $(".province").html() + $(".city").html() + $(".county").html();
        }
    }

}
