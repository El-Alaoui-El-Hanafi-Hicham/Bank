package com.example.demo.entities;


import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE_COMP", discriminatorType = DiscriminatorType.STRING, length = 2)


public abstract class Compte implements Serializable{
	

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long codeCompte;
private Date dateCreation;
private double solde;
@ManyToOne()
@JoinColumn(name="CODE_CLI")
private User user;

@OneToMany(mappedBy = "compte")
private Collection<Operation> oparation;

	
	
	public Long getCodeCompte() {
		return codeCompte;
	}
	public void setCodeCompte(Long codeCompte) {
		this.codeCompte = codeCompte;
	}
	public Date getDateCreation() {
		return dateCreation;
	}
	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}
	public double getSolde() {
		return solde;
	}
	public void setSolde(double solde) {
		this.solde = solde;
	}

	public Compte(Date dateCreation, double solde, User user) {
		super();
		
		this.dateCreation = dateCreation;
		this.solde = solde;
		this.user = user;
	}

	public Compte() {
	}
}
