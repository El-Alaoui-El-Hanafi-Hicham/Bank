package com.example.demo.service;

import com.example.demo.entities.Compte;

public interface IBanque {
public Compte ConsulterCompte(Long number);
public void Verser(Long CompteNumber,double amount);
public void Retrait(Long CompteNumber,double amount);
public void Virement(Long compteNumber,Long compteNumber2,double amout);

}
