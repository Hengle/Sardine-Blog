<?php
    require "../lib/mysql/const.php";
    require "../lib/mysql/MySQL.php";
    require "Statistics.php";
    class Response
    {
        public $status;
        public $data;
        public $msg;
        function __construct()
        {
            $this->status=">_<";
            $this->msg="";
            $this->data=0;
        }
        public function send()
        {
            echo json_encode($this);
            exit();
        }
    }
    session_start();
    $response=new Response();
    $url=$_GET['url'];
    if(!$_SESSION["visited ".$url])
    {
        $result=Statistics::Set("visited ".$url,"+",1);
        if(!$result->succeed)
        {
            $response->msg=$result->error;
            $response->send();
        }
        $_SESSION["visited ".$url]=true;
        $response->data=$result->value;
    }
    else
    {
        $result = Statistics::Get("visited ".$url);
        if(!$result->succeed)
        {
            $response->msg=$result->error;
            $response->send();
        }
    $response->data=$result->value;
    }
    $response->status="^_^";
    $response->send();
?>