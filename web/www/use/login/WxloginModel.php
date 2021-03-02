<?php
/**
 * Created by PhpStorm.
 * User: fourn
 * Date: 2017/10/30
 * Time: 上午11:27
 */
 
 
class WxloginModel {
 
    const APP_ID = 'wxe61d3e11941fd424';
    const APP_SECRET = 'c13ace7594a6b221cd9a3103d425d760';
 
    public function getCodeUrl(){
        $redirect_url = urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']);
        $get_code_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
          .self::APP_ID.'&redirect_uri='.$redirect_url
            .'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
        return $get_code_url;
    }
 
    /**
     * @param $code
     * @return bool|string
     * access_token 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
    expires_in  access_token接口调用凭证超时时间，单位（秒）
    refresh_token   用户刷新access_token
    openid  用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
    scope   用户授权的作用域，使用逗号（,）分隔
     *
     * {"errcode":40029,"errmsg":"invalid code"}
     */
    public function getOpenId($code){
        $get_openid_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.self::APP_ID
          .'&secret='.self::APP_SECRET.'&code='.$code.'&grant_type=authorization_code';
        $rst = file_get_contents($get_openid_url);
        $rst = json_decode($rst, true);
        if(isset($rst['openid'])){
            return $rst;
        }else{
            return false;
        }
    }
 
    /**
     * @param $access_token
     * @param $open_id
     * @return bool|mixed
     * openid   用户的唯一标识
    nickname    用户昵称
    sex 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
    province    用户个人资料填写的省份
    city    普通用户个人资料填写的城市
    country 国家，如中国为CN
    headimgurl  用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
    privilege   用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）
    unionid 只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。
     */
    public function getUserInfo($access_token, $open_id){
        $url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token
          .'&openid='.$open_id.'&lang=zh_CN';
        $rst = $this->https_request($url);
        $rst = json_decode($rst, true);
        if(isset($rst['errcode'])){
            return false;
        }else{
            return $rst;
        }
    }
 
    public function https_request($url, $data = null){
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        if (!empty($data)){
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($curl);
        curl_close($curl);
        return $output;
    }
}