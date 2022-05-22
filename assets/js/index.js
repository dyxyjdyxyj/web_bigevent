getUserInfo()
function getUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        type:'GET',
        
        success:function(res){
            console.log(res)
            if(res.status!==0){
                layui.layer.msg('获取失败')
            }else{
                renderAvatar(res.data)
            }
        },
        // complete:function(res){
        //     if(res.responseJSON.status ===1){
        //         localStorage.removeItem('token')
        //         location.href= '/login.html'
        //     }
        // }
        
        
    })
}
$('#btnLogout').click(function(){
    // 提示是否确定退出
    layer.confirm('确定关闭吗?', {icon: 3, title:'提示'}, function(index){
        localStorage.removeItem('token')
        location.href = '/login.html'
        
        layer.close(index);
      });
    
  
})

function renderAvatar(user){
    let name = user.nickname || user.username
    $('.welcome').html('欢迎 '+name)

    if(user.user_pic){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        let avatar = name[0].toUpperCase()
        $('.text-avatar').html(avatar).show()
        $('.layui-nav-img').hide()
    }
}
