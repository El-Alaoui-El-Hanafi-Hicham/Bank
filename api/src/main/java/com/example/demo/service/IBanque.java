package com.example.demo.service;

import com.example.demo.entities.Compte;
import com.example.demo.entities.Operation;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface IBanque {
public Compte ConsulterCompte(Long number) throws Exception;
public void Verser(Long CompteNumber,double amount) throws Exception;
public void Retrait(Long CompteNumber,double amount);
public ResponseEntity<String> Virement(Long compteNumber, Long compteNumber2, double amout) throws Exception;
public Page<Operation> listOperation(Long compteNumber,int page,int size);

}
