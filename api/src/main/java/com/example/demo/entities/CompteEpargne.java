package com.example.demo.entities;

import java.util.Date;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
@Entity
@DiscriminatorValue("CE")
public class CompteEpargne  extends Compte{

	private double taux;

	public double getTaux() {
		return taux;
	}

	public void setTaux(double taux) {
		this.taux = taux;
	}

	public CompteEpargne(Date dateCreation, double solde, User user, double taux) {
		super( dateCreation, solde, user);
		// TODO Auto-generated constructor stub
		this.taux=taux;
	}
	public CompteEpargne() {

		// TODO Auto-generated constructor stub
	}

}
