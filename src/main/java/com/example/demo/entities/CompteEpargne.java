package com.example.demo.entities;

import java.util.Date;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
@Entity
@DiscriminatorValue("CE")
public class CompteEpargne  extends Compte{

	private double taux;
	public CompteEpargne( Date dateCreation, double solde, Client client,double taux) {
		super( dateCreation, solde, client);
		// TODO Auto-generated constructor stub
		this.taux=taux;
	}
	

}
