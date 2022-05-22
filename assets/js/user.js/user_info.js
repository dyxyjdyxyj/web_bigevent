$(function(){
    layui.form.verify({
        nickname: function(value){ //value：表单的值、item：表单的DOM对象
          
          if(value.length>6){
            return '用户昵称必须1-6位';
          }
        }
      });      
})
initUserInfo()
function initUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        method:"get",
        success:function(res){
            if(res.status!==0){
                return console.log(res.message);
            }
            layui.form.val("formtext", res.data);
        }
    })
}

$('#btnReset').click(function(e){
    e.preventDefault()
    initUserInfo()
})

$('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        url:"/my/userinfo",
        method:'post',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg('更改失败')
            }
            layui.layer.msg('更改成功')
            window.parent.getUserInfo()

        }
    })
})