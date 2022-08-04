   
        // 获取url的参数
        
        function getQueryString(name) {
            const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            const urlObj = window.location;
            var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
        // 填入学号
        $(".stu_job_id").text(getQueryString("a"))

        $.ajax({
          // ulr
          url:"/index-xuanran",
          // 参数
          data:{
            stu_job_id:getQueryString("a")
          },
          // 请求类型
          type:"GET",
          // 响应体结果
          dataType:"json",
         //  成功的回调
          success:function(data){
            $(".login>p>b").text(`欢迎，${data.username}`)
            $(".username").text(data.username)
            $(".password").text(data.password)
          },
           // 失败的回调
          error:function(){
              console.log("出错啦");
          },
         });




        //  成绩信息
        $(".req_result").click(function(){
            if(String(getQueryString("id")) === "100"){

        $.ajax({
          // ulr
          url:"/index-result",
          // 参数
          data:{
            stu_job_id:getQueryString("a")
          },
          // 请求类型
          type:"GET",
          // 响应体结果
          dataType:"json",
         //  成功的回调
          success:function(data){
            let result = $(".result")
            let fenshu = [data.语文,data.数学,data.英语]
            for(let i = 0;i < result.length;i++){
                result[i].innerHTML = fenshu[i]
            }
          },
           // 失败的回调
          error:function(){
              console.log("出错啦");
          },
         });
        }

            
        })
        

        // 修改密码
        $(".btn-pass").click(function(){
            let btn_password = $(".btn-password")
            let password = []
            for(let i = 0;i < btn_password.length;i++){
                password[i] = btn_password[i].value
            }
            if(password[0] === password[1]){
                 $.ajax({
          // ulr
          url:"/index-password",
          // 参数
          data:{
            newPassword:password[1],
            stu_job_id:getQueryString("a")
          },
          // 请求类型
          type:"GET",
          // 响应体结果
          dataType:"html",
         //  成功的回调
          success:function(data){
           alert(data)
          },
           // 失败的回调
          error:function(){
              console.log("出错啦");
          },
         });
            }
            else{
                alert("密码错误")
            }
           
        })


        // 成绩信息教师端
        
        $(".btn-te").click(function(){
          let val = $(".input-te");
          let valStr = []
          for(let i = 0;i < val.length;i++){
            valStr[i] = val[i].value
          }
          $.ajax({
            // ulr
          url:"/index-result-t",
          // 参数
          data:{
            stu_job_id:valStr[0],
            c:valStr[1],
            m:valStr[2],
            e:valStr[3]
          },
          // 请求类型
          type:"GET",
          // 响应体结果
          dataType:"html",
         //  成功的回调
          success:function(data){
            alert(data)
          },
           // 失败的回调
          error:function(){
              console.log("出错啦");
          },
          })
        })
        
        
        

        if(getQueryString("id") === "100"){
            var nav_lis = $(".nav-box_stu")
            var nav_right = [$("#user"), $("#password"), $("#result-s")]
        }
        else if(getQueryString("id") === "200"){
            var nav_lis = $(".nav-box_stu")
            var nav_right = [$("#user"), $("#password"), $("#result-t")]
        }
        else{
            var nav_lis = $(".nav-box_stu")
            var nav_right = [$("#user"), $("#password"), $("#result-t")]
        }

        // 获取左侧菜单栏
        let nav_a = $(".nav_a")
        nav_a.click(function () {
            let Index = nav_a.index(this);
            console.log(Index);
            for (let i = 0; i < nav_a.length; i++) {
                nav_lis[i].style.backgroundColor = "burlywood"
                nav_right[i].css("display", "none")
            }
            nav_lis[Index].style.backgroundColor = "rgb(213, 149, 64)"
            nav_right[Index].css("display", "flex")
        })