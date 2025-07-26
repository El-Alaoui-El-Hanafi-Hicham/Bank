package com.example.demo.dto;

import com.example.demo.entities.Compte;

import java.util.Date;


public class OperationDTORequest {
    private String op;
    private Long clientCode;
    private double montant;
    private String description;
    private Date date;

    public OperationDTORequest(String op, long clientCode, double montant,  String description, Date date) {
        this.op= op;
        this.montant = montant;
        this.description = description;
        this.date = date;
        this.clientCode=clientCode;
    }




    public Date getDate() {
        return date;
    }

    public long getClientCode() {
        return clientCode;
    }

    public void setClientCode(long clientCode) {
        this.clientCode = clientCode;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public OperationDTORequest(String op) {
        this.op= op;
    }



    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOp() {
        return op;
    }

    public void setOp(String op) {
        this.op = op;
    }

    @Override
    public String toString() {
        return "OperationDTORequest{" +
                "op='" + op + '\'' +
                ", clientCode=" + clientCode +
                ", montant=" + montant +
                ", description='" + description + '\'' +
                ", date=" + date +
                '}';
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }
}
