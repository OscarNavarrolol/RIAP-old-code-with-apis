package com.sena.riap.service.mailservice;

import java.io.File;

public interface IEmailService {

    void sendEmail(String[] toUser, String subject, String message);

    void sendEmailRecover(String toUser, String key);
}
