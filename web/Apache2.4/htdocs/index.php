<?php
    //测试php是否可以拿到数据库中的数据
    /*echo "44444";*/
    
    //做个路由 action为url中的参数
    $action = $_GET['action'];

    switch($action) {
        case 'init_data_list':
            init_data_list();
            break;
        case 'add_row':
            add_row();
            break;
        case 'del_row':
            del_row();
            break;
        case 'edit_row':
            edit_row();
            break;
        case 'category_list':
            category_list();
            break;
    }
    
    //查询方法
    function init_data_list(){
        //测试 运行crud.html时是否可以获取到 下面这个字符串
        /*echo "46545465465456465";*/
        
        //查询表
        $sql = "SELECT * FROM `t_users`";
        $query = query_sql($sql);
        while($row = $query->fetch_assoc()){
            $data[] = $row;
        }
        
        $json = json_encode(array(
            "resultCode"=>200,
            "message"=>"查询成功！",
            "data"=>$data
        ), JSON_UNESCAPED_UNICODE);
        
        //转换成字符串JSON
        echo($json);
    }

    function category_list() {
        //查询表
        $sql1 = "SELECT * FROM `t_category`";
        $query1 = query_sql($sql1);
        while($row1 = $query1->fetch_assoc()){
            $data1[] = $row1;
        }
        // $json1 = json_decode(json_encode($data1));

        $sql2 = "SELECT * FROM `t_subcategory`";
        $query2 = query_sql($sql2);
        while($row2 = $query2->fetch_assoc()){
            $data2[] = $row2;
        }
        // $json2 = json_decode(json_encode($data2));


        foreach($data2 as $category) {
            foreach($data1 as $p_category) {
                if ($category['type_id'] == $p_category['id']) {
                    echo($category['id']);
                    echo('<br>');
                    echo($category['name']);
                    echo('<br>');
                    echo($p_category['name']);
                }
            }
        }
        //转换成字符串JSON
        // echo(json_encode($data));
    }

    
    
    /**查询服务器中的数据
     * 1、连接数据库,参数分别为 服务器地址 / 用户名 / 密码 / 数据库名称
     * 2、返回一个包含参数列表的数组
     * 3、遍历$sqls这个数组，并把返回的值赋值给 $s
     * 4、执行一条mysql的查询语句
     * 5、关闭数据库
     * 6、返回执行后的数据
     */
    function query_sql(){
        $mysqli = new mysqli("127.0.0.1", "root", "0987abc123", "crud");
        $sqls = func_get_args();
        foreach($sqls as $s){
            $query = $mysqli->query($s);
        }
        $mysqli->close();
        return $query;
    }
?>