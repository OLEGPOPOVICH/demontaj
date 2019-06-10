<?php
if (isset($_POST["name"]) || isset($_POST["phone"]) || isset($_POST["mail_smeta"])) 
{ 
    echo "
	<div class = 'form_spasibo'>
		<strong>Спасибо</strong>
		<p>Наши менеджеры свяжутся с Вами в ближайщее время.</p>
	</div>"; 
}

$sendto = "w.s.Davidov@yandex.ru, 91popovich91@mail.ru";
$userName = $_POST['name'];

$userSubject = $_POST['subject'];
$userSubjectName = $_POST['subjectName'];

$userPhone = $_POST['phone'];

// Формирование заголовка письма

$subject  = "$headerSmeta";
$subject  = "$userSubjectName: $userSubject";

$headers  = "From: artfolio.bz\r\n";
$headers .= "Content-Type: text/html; charset=utf-8 \r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";



// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
if ($userName != '')
{
	$msg .= "<p><strong>Имя:</strong> ".$userName."</p>\r\n";
}

if ($userPhone != '')
{
	$msg .= "<p><strong>Номер телефона:</strong> ".$userPhone."</p>\r\n";
}

$msg .= "</body></html>";
// отправка сообщения
@mail($sendto, $subject, $msg, $headers);
?>