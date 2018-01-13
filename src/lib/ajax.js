/**
 * Created by Sing <78276478@qq.com> on 2018/1/8 0008.
 */
import axios from 'axios';
import http from 'http';
let util = {};
let ajaxUrl ='';
console.log(process.env.NODE_ENV)
  ajaxUrl = 'http://10.255.255.1:3000/'
  util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
  });
  util.ajax.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    response = response.data;
    if (typeof(response) != 'object') {
      response = response.split("\n");
      try {
        if(response.length>0){
          response = response[response.length-1]
          response = JSON.parse(response) // response.parseJSON()
        }
      }catch (e){
        return {
          errCode: 500,
          msg: '数据错误！类型：' + typeof(response),
          data: response
        };
      }
    }
    response.msg = response.msg || response.Msg || "";
    response.data = response.data || {};
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
//   // node http请求方式
//   ajaxUrl = 'http://10.255.255.1:8080/api'
//   util.ajax = {
//     url:'',
//     get(url){
//       this.url = ajaxUrl+url;
//       return this;
//     },
//     then(callback){
//       // console.log(this.url)
//       http.get(this.url,function(req,res){
//         var html='';
//         // console.log(res)
//         req.on('data',function(data){
//           html+=data;
//         });
//         req.on('end',function(){
//           html = JSON.parse(html);
//           callback(html)
//         });
//       });
//     }
//   }
// }
util.formatSeconds = function(value){
  var theTime = parseInt(value);// 秒
  var theTime1 = 0;// 分
  var theTime2 = 0;// 小时
// alert(theTime);
  if(theTime > 60) {
    theTime1 = parseInt(theTime/60);
    theTime = parseInt(theTime%60);
// alert(theTime1+"-"+theTime);
    if(theTime1 > 60) {
      theTime2 = parseInt(theTime1/60);
      theTime1 = parseInt(theTime1%60);
    }
  }
  var result = 0; //""+parseInt(theTime)+""; //秒
  if(parseInt(theTime) < 10){
    result = 0+''+parseInt(theTime);
  }else{
    result = parseInt(theTime);
  }
  if(theTime1 > 0) {
    if(parseInt(theTime1) < 10){
      theTime1 = 0+''+parseInt(theTime1);
    }
    result = "" + theTime1 + ":"+result; //分
  }
  if(theTime2 > 0) {
    result = ""+parseInt(theTime2)+":"+result; //小时
  }
  return result;
}

export default util;
