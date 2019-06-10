<?php
if (isset($_POST["name"]) && isset($_POST["phone"]) && isset($_POST["email"])) 
{ 
    echo "
	<div class = 'form_spasibo'>
		<strong>Спасибо</strong>
		<p>Наши менеджеры свяжутся с Вами в ближайщее время.</p>
	</div>"; 

}

	$sendto = "w.s.Davidov@yandex.ru, 91popovich91@mail.ru";

	$userName = $_POST['name'];
	$userPhone = $_POST['phone'];
	$userEmail = $_POST['email'];

	$userCaption = $_POST['caption'];
	$userSubject = $_POST['subject'];

	
	$userCity = $_POST['city'];
	$userRegion= $_POST['region'];
	$userIp = $_POST['ip'];
	$userBrowser = $_POST['browser'];

	// Формирование заголовка письма

	$subject  = "$userCaption";

	$headers  = "From: artfolio.bz\r\n";
	$headers .= "Content-Type: text/html; charset=utf-8 \r\n";
	$headers .= "MIME-Version: 1.0\r\n";



	// Формирование тела письма
	$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
	if ($userSubject != '')
	{
		$msg .= "<p><strong>".$userSubject."</strong></p>\r\n";
	}
	if ($userName != '')
	{
		$msg .= "<p><strong>Имя:</strong> ".$userName."</p>\r\n";
	}

	if ($userPhone != '')
	{
		$msg .= "<p><strong>Телефон:</strong> ".$userPhone."</p>\r\n";
	}
	if ($userEmail != '')
	{
		$msg .= "<p><strong>E-mail:</strong> ".$userEmail."</p>\r\n";
	}
	$msg .= "<p>--------------------------------------</p>\r\n";
	if ($userCity != '')
	{
		$msg .= "<p><strong>Город:</strong> ".$userCity."</p>\r\n";
	}
	if ($userRegion != '')
	{
		$msg .= "<p><strong>Регион:</strong> ".$userRegion."</p>\r\n";
	}
	if ($userIp != '')
	{
		$msg .= "<p><strong>ip:</strong> ".$userIp."</p>\r\n";
	}
	if ($userBrowser != '')
	{
		$msg .= "<p><strong>Браузер:</strong> ".$userBrowser."</p>\r\n";
	}

	$msg .= "</body></html>";
	// отправка сообщения
	@mail($sendto, $subject, $msg, $headers);

?>