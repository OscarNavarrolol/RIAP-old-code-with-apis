package com.sena.riap.service.mailservice;

public interface IEmailService {

    void sendEmail(String[] toUser, String subject, String message);

    void sendEmailRecover(String toUser, String key);
}
