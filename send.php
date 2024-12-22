<meta charset="utf-8">
<?php
if(isset($_POST['이메일'])) {
     
    
	$email_to = "ggpa19@naver.com";
	$email_subject = "[제일현관문] 상담 문의드립니다.";
	$email_subject = '=?UTF-8?B?'.base64_encode($email_subject).'?=';

     
     
    function died($error) {
        // your error code can go here
        echo "<script> alert('메일발송을 실패하였습니다.');";
		echo "history.go(-1);";
		echo "</script>";
        die();
    }
     
    $user_name = $_POST['user_name'];
    $email_from = $_POST['이메일'];
    $telephone = $_POST['전화번호'];
  
    $product = $_POST['원하는시공'];
    $comments = $_POST['상담내용'];

    $email_message = "";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
     
    $email_message .= "이름 : ".clean_string($user_name)."\n\n";
    $email_message .= "연락처 : ".clean_string($telephone)."\n\n";

    $email_message .= "원하는시공 : ".clean_string($product)."\n\n";
    $email_message .= "상담내용 : ".clean_string($comments)."\n\n";
     
     
// create email headers
$headers = 'From: '.$email_from;
// 제목이 깨질경우 아래 캐릭터셋 적용

@mail($email_to, $email_subject, $email_message, $headers);  
?>
 
<!-- include your own success html here -->
 
<script>
alert ("메일이 발송되었습니다.\n빠른 시일안에 답변드리겠습니다.");
history.go(-1);
</script>
 
<?php
}
?>