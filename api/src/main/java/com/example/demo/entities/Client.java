package com.example.demo.entities;

import java.io.Serializable;
import java.util.Collection;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Client implements Serializable {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long code;
private String nom;
private String email;
@OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
private Collection<Compte> compte;
@Override
public String toString() {
	return "Client [code=" + code + ", nom=" + nom + ", email=" + email + "]";
}
public Client( String nom, String email) {
	super();
	this.nom = nom;
	this.email = email;
}
public Client() {
	super();
	// TODO Auto-generated constructor stub
}
}
