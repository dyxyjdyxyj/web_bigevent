$(function(){
    layui.form.verify({
        newPwd: function(value){ //value：表单的值、item：表单的DOM对象
           if(value === $('[name=oldPwd]').val()){
            return '新密码不能和旧密码相同'
          }
        },
        rePwd:function(value){
            if(value!== $('[name=newPwd]').val()){
                return '两次密码不一致'
            }
        },
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
      })
})
$('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        url:'/my/updatepwd',
        method:'POST',
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0){
              return  layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)
            $('.layui-form')[0].reset()
        }
    })
})