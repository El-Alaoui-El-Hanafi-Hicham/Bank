package com.example.demo.dto;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

public class OperationDTO {
   private String op;
    private Long clientCode;
    private double montant;

    public OperationDTO(String op, Long clientCode, double montant) {
        this.op = op;
        this.clientCode = clientCode;
        this.montant = montant;
    }

    public String getOp() {
        return op;
    }

    public void setOp(String op) {
        this.op = op;
    }

    public Long getClientCode() {
        return clientCode;
    }

    public void setClientCode(Long clientCode) {
        this.clientCode = clientCode;
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }
}
