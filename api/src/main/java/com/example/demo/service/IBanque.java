package com.example.demo.service;

import com.example.demo.entities.Compte;
import com.example.demo.entities.Operation;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface IBanque {
public Compte ConsulterCompte(Long number) throws Exception;
public boolean Verser(Long CompteNumber,double amount,String description) ;
public boolean Retrait(Long CompteNumber,double amount, String description);
public boolean Virement(Long compteNumber, Long compteNumber2, double amount) ;
public Page<Operation> listOperation(Long compteNumber,int page,int size);

}
