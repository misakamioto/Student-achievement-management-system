$(".btn").click(() => {
  // 获取用户名
  let stu_job_id = $("#inputStu_job_id").val()
  // 获取密码
  let password = $("#inputPassword3").val()
  // 获取登录身份
  let type = $('[name="type"]:checked').attr("user_id")
  // 判断是否选择了身份
  if (stu_job_id === '' || password === '') {
    alert("请输入用户名或密码")
  }
  else {

    $.ajax({
      // ulr
      url: "/index.html",
      // 参数
      data: {
        stu_job_id: stu_job_id,
        password: password,
        type: type
      },
      // 请求类型
      type: "GET",
      // 响应体结果
      dataType: "json",
      //  成功的回调
      success: function (data) {
        console.log(data);
        if (data.id === "100") {
          window.location.href = "/HTML/index.html?id=100&a=" + stu_job_id
        }
        else if (data.id === "200") {
          window.location.href = "/HTML/index.html?id=200&a=" + stu_job_id
        }
        else if(data.id === "200"){
          window.location.href = "/HTML/index.html?id=300&a=" + stu_job_id
        }
        else{
          $("p").text("用户名或密码或身份错误")
        }
      },
      // 失败的回调
      error: function () {
        console.log("出错啦");
      },
    });
  }
})