package com.example.demo.dto;

import com.example.demo.entities.Compte;

import java.util.Date;


public class OperationDTO {
    private String op;
    private Compte compte;
    private double montant;
    private String description;
    private Compte recipient;
    private Date date;

    public OperationDTO(String op, Compte compte, double montant, Compte receipient, String description, Date date) {
        this.op= op;
        this.compte = compte;
        this.montant = montant;
        this.recipient = receipient;
        this.description = description;
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public OperationDTO(String op) {
        this.op= op;
    }

    public Compte getRecipient() {
        return recipient;
    }

    public void setRecipient(Compte recipient) {
        this.recipient = recipient;
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

    public Compte getCompte() {
        return compte;
    }

    public void setCompte(Compte compte) {
        this.compte = compte;
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }
}
