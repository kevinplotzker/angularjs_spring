package com.java.demo.exception;

public class UserNotFoundException extends Exception {
    private Integer userId;

    public static UserNotFoundException createWith(Integer userId) {
        return new UserNotFoundException(userId);
    }

    private UserNotFoundException(Integer userId) {
        this.userId = userId;
    }

    @Override
    public String getMessage() {
        return "UserId '" + userId + "' not found";
    }
}
