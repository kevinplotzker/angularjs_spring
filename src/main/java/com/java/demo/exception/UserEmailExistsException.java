package com.java.demo.exception;

public class UserEmailExistsException extends Exception {
    private String emailAddress;

    public static UserEmailExistsException createWith(String emailAddress) {
        return new UserEmailExistsException(emailAddress);
    }

    private UserEmailExistsException(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    @Override
    public String getMessage() {
        return "Email address '" + emailAddress + "' already exists";
    }
}
