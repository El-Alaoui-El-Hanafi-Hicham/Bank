package com.example.demo.entities;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.Builder;

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE_OP", discriminatorType = DiscriminatorType.STRING, length = 3)
@Entity
@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "operationType", // this will appear in the JSON
		visible = true
)
@JsonSubTypes({
		@JsonSubTypes.Type(value = Retrait.class, name = "RET"),
		@JsonSubTypes.Type(value = Versement.class, name = "VER")
})


public abstract class Operation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long numero;
    private Date dateOperation;


    private String description;
    private double montant;
    @ManyToOne()
    @JsonBackReference
    private Compte compte;
    @ManyToOne()
    @JsonBackReference
    private Compte receipient;
    @Column(name = "TYPE_OP", insertable = false, updatable = false)
    private String typeOp; // optional, for debugging

    public Operation() {
    }

    public Operation(Date dateOperation, double montant, Compte compte, String description, Compte receipient) {


        this.dateOperation = dateOperation;
        this.montant = montant;
        this.compte = compte;
        this.description = description;
        this.receipient = receipient;

    }

    public Compte getReceipient() {
        return receipient;
    }

    public void setReceipient(Compte receipient) {
        this.receipient = receipient;
    }

    public Long getNumero() {
        return numero;
    }

    public void setNumero(Long numero) {
        this.numero = numero;
    }

    public Date getDateOperation() {
        return dateOperation;
    }

    public void setDateOperation(Date dateOperation) {
        this.dateOperation = dateOperation;
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }

    public Compte getCompte() {
        return compte;
    }

    public void setCompte(Compte compte) {
        this.compte = compte;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
