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
import java.time.temporal.TemporalAccessor;

@Service
public class MailService {

	private JavaMailSender javaMailSender;

	@Autowired
	public MailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}


	public void sendEmailToSupervisor(String managerName, String email,String leaveType,String empName,String dateAndTotel,String reason) throws MailException, MessagingException, javax.mail.MessagingException {
		SimpleMailMessage mail = new SimpleMailMessage();
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(email);
		helper.setFrom("ILS HR Notify! <myemail>");
		helper.setSubject("แจ้งเตือนการลา");
		helper.setText("<font style=\'color: rgb(103,114,196);\' size=\"4px\">เรียนคุณ "+managerName+"</font><br>"+
				"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style=\'color: rgb(103,114,196);\' size=\"4px\">เนื่องด้วย คุณ "+empName+" ได้มีการขอ"+leaveType+" "+dateAndTotel+"</font><br>"+
				"<font style=\'color: rgb(103,114,196);\' size=\"4px\">เหตุผลการลา : "+reason+"</font><br><br>"+
				"<font style=\'color: rgb(103,114,196);\' size=\"4px\">จึงเรียนมาเพื่อพิจารณาอนุมัติในระบบ</font><br>"+
				"<p></p><br>ILS-HR-ADMIN : " +
				"<a href=\"http://192.168.1.40:8000/#/HR-ADMIN\">http://www.ils-hr.co.th</a><br>"+
				"<font style=\'color: rgb(0, 176, 80);\'><i><b>Logistics and Beyond</b></i></font><br>" +
				"<a href=\"https://www.youtube.com/watch?v=8UJFII55u48\">https://www.youtube.com/watch?v=8UJFII55u48</a><br>"+
				"<img src=\"http://www.ils.co.th/wp-content/themes/ils/images/logo.png\"><br>" +
				"<font style=\'color: rgb(0, 176, 80);\'><b>I.L.S. CO., LTD.</b> ( <i>Integrated Logistics Services</i> )</font><br>" +
				"<a href=\"http://www.ils.co.th\">Website : http://www.ils.co.th</a><br>",true);

		javaMailSender.send(message);
	}

	public void sendEmailToManager(String managerName,String supervisorName,String empLeaveName,String leaveType,String dateAndTotel,String email,String reason) throws MailException, MessagingException, javax.mail.MessagingException {
		SimpleMailMessage mail = new SimpleMailMessage();
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(email);
		helper.setFrom("ILS HR Notify! <myemail>");
		helper.setSubject("แจ้งเตือนการลา");
		helper.setText("<font style=\'color: rgb(103,114,196);\' size=\"4px\">เรียนคุณ "+managerName+"</font><br>"+
				"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style=\'color: rgb(103,114,196);\' size=\"4px\">เนื่องด้วย คุณ "+empLeaveName+" ได้มีการขอ"+leaveType+" "+dateAndTotel+"</font><br>"+
				"<font style=\'color: rgb(103,114,196);\' size=\"4px\">เหตุผลการลา : "+reason+"</font><br>"+
				"<font style=\'color: rgb(103,114,196);\' size=\"4px\">และคุณ "+supervisorName+" ได้อนุมัติเป็นที่เรียบร้อยแล้ว </font><br><br>"+
				"<font style=\'color: rgb(103,114,196);\' size=\"4px\">จึงเรียนมาเพื่อพิจารณาอนุมัติในระบบเป็นลำดับต่อไป</font><br>"+
				"<p></p><br>ILS-HR-ADMIN : " +
				"<a href=\"http://192.168.1.40:8000/#/HR-ADMIN\">http://www.ils-hr.co.th</a><br>"+
				"<font style=\'color: rgb(0, 176, 80);\'><i><b>Logistics and Beyond</b></i></font><br>" +
				"<a href=\"https://www.youtube.com/watch?v=8UJFII55u48\">https://www.youtube.com/watch?v=8UJFII55u48</a><br>"+
				"<img src=\"http://www.ils.co.th/wp-content/themes/ils/images/logo.png\"><br>" +
				"<font style=\'color: rgb(0, 176, 80);\'><b>I.L.S. CO., LTD.</b> ( <i>Integrated Logistics Services</i> )</font><br>" +
				"<a href=\"http://www.ils.co.th\">Website : http://www.ils.co.th</a><br>",true);

		javaMailSender.send(message);
	}

	public void sendEmailToDCManager(String managerName, String email,String leaveType,String empName,String dateAndTotel,String reason) throws MailException, MessagingException, javax.mail.MessagingException {
		SimpleMailMessage mail = new SimpleMailMessage();
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(email);
		helper.setFrom("ILS HR Notify! <myemail>");
		helper.setSubject("แจ้งเตือนการลา");
		helper.setText("<font style=\'color: rgb(103,114,196);\' size=\"4px\">เรียนคุณ "+managerName+"</font><br>"+
				"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style=\'color: rgb(103,114,196);\' size=\"4px\">เนื่องด้วย คุณ "+empName+" ได้มีการขอ"+leaveType+" "+dateAndTotel+"</font><br>"+
				"<font style=\'color: rgb(103,114,196);\' size=\"4px\">เหตุผลการลา : "+reason+"</font><br><br>"+
				"<font style=\'color: rgb(103,114,196);\' size=\"4px\">จึงเรียนแจ้งมาเพื่อโปรดทราบ</font><br>"+
				"<p></p><br>ILS-HR-ADMIN : " +
				"<a href=\"http://192.168.1.40:8000/#/HR-ADMIN\">http://www.ils-hr.co.th</a><br>"+
				"<font style=\'color: rgb(0, 176, 80);\'><i><b>Logistics and Beyond</b></i></font><br>" +
				"<a href=\"https://www.youtube.com/watch?v=8UJFII55u48\">https://www.youtube.com/watch?v=8UJFII55u48</a><br>"+
				"<img src=\"http://www.ils.co.th/wp-content/themes/ils/images/logo.png\"><br>" +
				"<font style=\'color: rgb(0, 176, 80);\'><b>I.L.S. CO., LTD.</b> ( <i>Integrated Logistics Services</i> )</font><br>" +
				"<a href=\"http://www.ils.co.th\">Website : http://www.ils.co.th</a><br>",true);

		javaMailSender.send(message);
	}



}
