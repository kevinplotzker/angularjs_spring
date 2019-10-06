package com.java.demo.exception;

import java.util.List;

public class ApiError {
    private List<String> errors;
    private String errorMessage;

    public ApiError(List<String> errors) {
        this.errors = errors;
    }

    public ApiError(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
