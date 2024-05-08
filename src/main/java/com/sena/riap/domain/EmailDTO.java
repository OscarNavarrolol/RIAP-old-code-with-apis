package com.sena.riap.domain;


public class EmailDTO {

    private String[] toUser;
    private String subject;
    private String message;

    public String[] getToUser() {
        return toUser;
    }

    public String getSubject() {
        return subject;
    }

    public String getMessage() {
        return message;
    }
}
