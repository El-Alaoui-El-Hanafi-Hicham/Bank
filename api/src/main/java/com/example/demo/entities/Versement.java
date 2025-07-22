package com.example.demo.entities;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue( "VER")
public class Versement extends Operation {
	public Versement() {
	}

	public Versement(Date dateOperation, double montant, Compte compte,String description) {
		super( dateOperation, montant, compte,description);
		// TODO Auto-generated constructor stub
	}

}
