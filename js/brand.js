/**插入信息填写及品牌
 * @param id [插入位置id]
 * @param btn [触发按钮]
 * @param val [文字填写位置]
 */
function InfoBrand(id,btn,val) {
    $(id).append(`<div class="company_fixed_list">
        <div class="top-bar">
            <a href="javascript:;" class="prev-btn"></span></a>
            <h3>选择公司</h3>
        </div>
        <div class="company_new_fixed">
            <div class="company_new_area">
                <div class="line_x"></div>
                <ul class="company_lists commend_list"></ul>
                <div class="title_line_x">A-F</div>
                <ul class="company_lists company_af"></ul>
                <div class="title_line_x">G-L</div>
                <ul class="company_lists company_gl"></ul>
                <div class="title_line_x">M-R</div>
                <ul class="company_lists company_mr"></ul>
                <div class="title_line_x">S-Z</div>
                <ul class="company_lists company_sz"></ul>
                <div class="writer_input writer_input_com">找不到我的公司，点这里&gt;&gt;</div>
            </div>
        </div>
    </div>`);

    //  品牌
    var brands = [
        {id: 1, title: '安邦保险', pinyin: 'anbang'},
        {id: 1, title: '北京人寿', pinyin: 'beijing'},
        {id: 1, title: '长安保险', pinyin: 'changan'},
        {id: 1, title: '大地财险', pinyin: 'dadi'},
        {id: 1, title: '泛华保险', pinyin: 'fanhua'},

        {id: 1, title: '国华保险', pinyin: 'guohua'},
        {id: 1, title: '合众人寿', pinyin: 'hezhon'},
        {id: 1, title: '建信人寿', pinyin: 'jianxin'},
        {id: 1, title: '昆仑健康', pinyin: 'kunlun'},
        {id: 1, title: '利宝保险', pinyin: 'libao'},

        {id: 1, title: '民生保险', pinyin: 'minsheng'},
        {id: 1, title: '前海人寿', pinyin: 'qianhai'},
        {id: 1, title: '人保财险', pinyin: 'renbao'},

        {id: 1, title: '史带财险', pinyin: 'shidai'},
        {id: 1, title: '太平洋保险', pinyin: 'taipingyang'},
        {id: 1, title: '泰康养老', pinyin: 'taikang'},
        {id: 1, title: '完美', pinyin: 'wanmei'},
        {id: 1, title: '幸福人寿', pinyin: 'xingfu'},
        {id: 1, title: '友邦保险', pinyin: 'youbang'},
        {id: 1, title: '中国人保', pinyin: 'zhongguorenbao'}
    ];
    var A_F = [], G_L = [], M_R = [],S_Z = [];
    for (var k = 0; k < brands.length; k++) {
        var ch = brands[k].pinyin.substring(0, 1);
        if ('a'<= ch && ch <= 'f') {
            A_F.push('<li class="comp">' + brands[k].title + '</li>');
        } else if('g'<= ch && ch <= 'l'){
            G_L.push('<li class="comp">' + brands[k].title + '</li>');
        } else if('m'<= ch && ch <= 'r'){
            M_R.push('<li class="comp">' + brands[k].title + '</li>');
        } else if('s'<= ch && ch <= 'z'){
            S_Z.push('<li class="comp">' + brands[k].title + '</li>');
        }
    }
    $('.company_af').append(A_F.join(''))
    $('.company_gl').append(G_L.join(''));
    $('.company_mr').append(M_R.join(''));
    $('.company_sz').append(S_Z.join(''));

    // 选择品牌--记录点击过的品牌
    var HOT = [], hot = [];
    $(btn).click(function () {
       $(id).show();
        $(".company_lists>li").click(function () {
            $('.selected').remove();  //删除自定义选项
            hot.splice(0,hot.length);
            var selected = $(this).text();
            $(val).val(selected);
            var key = $.inArray(selected,HOT);
            // if(key == 0) return;
            if(key == -1){
                HOT.unshift(selected);
            }else{
                HOT.splice(key,1);
                HOT.unshift(selected);
            }
            if(HOT.length > 6) HOT.splice(6,1)
            for(var i=0; i< HOT.length; i++){
                hot.push('<li class="comp">' + HOT[i] + '</li>');
            }
            $('.commend_list').children('.comp').remove();
            $('.commend_list').append(hot.join(''));
            $(id).hide();
        });
    });

    //关闭品牌窗
    $(".prev-btn").click(function () {
        $(id).hide();
    });

    // 弹出自定义窗
    $(".writer_input_com").click(function () {
        $(id).append(`<div class="dialog-wrap" style="display: block;">
            <div class="dialog-mask"></div>
            <form class="dialog-form">
                <div class="dialog-hd">手动输入</div>
                <div class="dialog-bd">
                    <div class="input-item"><input type="text" name="company" data-rule="*" data-errmsg="请选择公司" maxlength="10" placeholder="请输入公司名字，10个字内"></div>
                </div>
                <div class="dialog-ft clearfix">
                    <button type="button" class="phone-submit-btn">确定</button>
                </div>
                <a href="javascript:;" class="dialog-close-btn"></a>
            </form>
        </div>`);

        $("input[name=company]").focus();
        // 验证表单
        var checker = new checkForm({
            form : '.dialog-form',
            btn : '.phone-submit-btn',
            error : function (ele,err){showMsg(err);},
            complete : function (ele){
                $(val).val($(ele).serializeArray()[0].value);
                $(".commend_list").prepend('<li class="selected">'+$(ele).serializeArray()[0].value+'</li>');
                $('.commend_list li:last').remove();
                $(".dialog-wrap").remove();
                $(id).hide();
            }
        });
        // 关闭自定义窗
        $(".dialog-close-btn").click(function () {
            $(".dialog-wrap").remove();
        });
    });
}








//无按钮无x自动消失弹窗
var okMsg = function(param) {
    var content = param.content, closeTimer = param.closeTimer*1000, htm = "";
    htm += '<p class="tip-msg save-ok-msg">' + content + '</p>';
    $("body").append(htm);
    setTimeout(function() {
        $('.tip-msg').remove();
    }, closeTimer);
};