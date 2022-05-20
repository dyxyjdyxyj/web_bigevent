$('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
})
$('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
})

// 这个方法配合 lay-verify='' 可以实现验证和提示
layui.form.verify({
    pwd: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (repwd) {
        if (repwd !== $('.reg-box [name=password]').val()) {
            return '两次密码不一致'
        }
    }
})

$('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.post('/api/reguser', { username: $('#form_reg [name=title]').val(), password:$('#form_reg [name=password]').val()},function(res){
        if (res.status!==0) return layui.layer.msg(res.message)
        layui.layer.msg(res.message)
        $('#link_login').click()
    })
})

$('#form_login').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        url:'/api/login',
        method:'POST',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0) {
                return layui.layer.msg(res.message)
            }
            // 将token存在本地中
            localStorage.setItem('token',res.token)
            location.href = '/index.html' 
        }
    })
})
