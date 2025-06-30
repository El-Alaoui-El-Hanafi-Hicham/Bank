package com.example.demo.entities;

import java.util.Date;

import groovy.transform.builder.Builder;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CE")
@Builder
public class CompteEpargne extends Compte {

	private double taux;

	public double getTaux() {
		return taux;
	}

	public void setTaux(double taux) {
		this.taux = taux;
	}

	public CompteEpargne(Date dateCreation, double solde, User user, double taux) {
		super(dateCreation, solde, user);
		this.taux = taux;
	}

	public CompteEpargne() {
		// Default constructor
	}
}