package com.example.demo.entities;

import java.util.Date;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
@Entity
@DiscriminatorValue( "RET")
public class Retrait extends Operation {

	public Retrait( Date dateOperation, double montant, Compte compte) {
		super( dateOperation, montant, compte);
		// TODO Auto-generated constructor stub
	}

}
