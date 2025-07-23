package com.example.demo.dto;


import jakarta.persistence.Entity;
import lombok.Builder;

@Builder
public class AccountDTO {

    public enum UserType {
        CC, CE
    }

    public UserType userType;
    public Double Solde;
    public Double TOD;


}
