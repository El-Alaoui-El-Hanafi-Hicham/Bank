package com.example.demo.entities;

import java.util.Date;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
@Entity
@DiscriminatorValue( "CC")
public class CompteCourant extends Compte {


	private double decouverte;

public CompteCourant( Date dateCreation, double solde, User user,double decouverte) {
		super( dateCreation, solde, user);
		// TODO Auto-generated constructor stub
		this.decouverte=decouverte;
}

public double getDecouverte() {
	return decouverte;
}

	public CompteCourant() {

	}

	public void setDecouverte(double decouverte) {
	this.decouverte = decouverte;
}
}
