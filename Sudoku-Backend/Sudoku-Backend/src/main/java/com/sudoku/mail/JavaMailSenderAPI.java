package com.sudoku.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class JavaMailSenderAPI {
    @Autowired
    public JavaMailSender javaMailSender;

    public void sendMail(String toMail,
                         String subject,
                         String body) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rushikeshbangar443@gmail.com");
        message.setTo(toMail);
        message.setText(body);
        message.setSubject(subject);

        javaMailSender.send(message);

        System.out.println("mail sent succesfully....");
    }

}
