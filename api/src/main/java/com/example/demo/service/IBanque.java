package com.example.demo.service;

import com.example.demo.dto.OperationDTO;
import com.example.demo.entities.Compte;
import com.example.demo.entities.Operation;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface IBanque {
Compte ConsulterCompte(Long number) throws Exception;
boolean Verser(Long CompteNumber, double amount, String description, long receipient_id) ;
boolean Retrait(Long CompteNumber, double amount, String description, long receipient_id);


    boolean Virement(Long compteNumber, Long compteNumber2, double amount) ;
Page<OperationDTO> listOperation(Long compteNumber, int page, int size);

}
