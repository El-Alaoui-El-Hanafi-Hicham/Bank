package com.example.demo.entities;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE_OP",discriminatorType = DiscriminatorType.STRING, length = 3)
@Entity
public abstract class Operation implements Serializable{
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE)
private Long numero; 
private Date dateOperation;



	private String description;
private double montant;
@ManyToOne()
@JsonBackReference
private Compte compte;

	public Operation() {
	}

	public Operation(Date dateOperation, double montant, Compte compte,String description) {
	
	
	this.dateOperation = dateOperation;
	this.montant = montant;
	this.compte = compte;
	this.description= description;

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
