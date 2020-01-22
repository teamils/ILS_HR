package com.example.demo.Controller;



import com.sun.xml.messaging.saaj.packaging.mime.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import javax.mail.internet.MimeMessage;

@Service
public class MailService {


	private JavaMailSender javaMailSender;

	@Autowired
	public MailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}




	public void sendEmail() throws MailException, MessagingException, javax.mail.MessagingException {


		SimpleMailMessage mail = new SimpleMailMessage();
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo("dikinakub6509@gmail.com");
		helper.setFrom("KUY! <myemail>");
		helper.setSubject("แจ้งเตือนนะ");
		helper.setText("<p></p><br><font>Book Meeting Room ILS</font><br>" +
				"<font style=\'color: rgb(0, 176, 80);\'><i><b>Logistics and Beyond</b></i></font><br>" +
				"<a href=\"https://www.youtube.com/watch?v=8UJFII55u48\">https://www.youtube.com/watch?v=8UJFII55u48</a><br>"+
				"<img src=\"http://www.ils.co.th/wp-content/themes/ils/images/logo.png\"><br>" +
				"<font style=\'color: rgb(0, 176, 80);\'><b>I.L.S. CO., LTD.</b> ( <i>Integrated Logistics Services</i> )</font><br>" +
				"<a href=\""+"\">Tel." +" " +"</a><br>"+
				"<a href=\"http://www.ils.co.th\">Website : http://www.ils.co.th</a><br>",true);

		javaMailSender.send(message);
	}




}
