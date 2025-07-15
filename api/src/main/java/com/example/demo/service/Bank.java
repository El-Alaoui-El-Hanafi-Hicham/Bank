package com.example.demo.service;

import java.util.Date;
import java.util.Optional;

import com.example.demo.dao.IntOperationDao;
import com.example.demo.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dao.IntCompDao;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class Bank implements IBanque{
@Autowired
public IntCompDao compteDao;
@Autowired
public IntOperationDao intOperationDao;
	public Bank() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public Compte ConsulterCompte(Long number)  {
		// TODO Auto-generated method stub
		Optional<Compte> com=compteDao.findById(number);
		if(com.isPresent()){

		return com.get();
		}else{
		return null;
		}
	}

	@Override
	public boolean Verser(Long CompteNumber, double amount) throws Exception {
		Compte compte =ConsulterCompte(CompteNumber);
		if(compte!=null){
			Versement versement = new Versement(new Date(),amount,compte);
			intOperationDao.save(versement);
			compte.setSolde(compte.getSolde()+amount);
			Compte com = compteDao.save(compte);
			if(com.)
			return true;
		}else{
			return false;
		}
	}

	@Override
	public void Retrait(Long CompteNumber, double amount) {
		Compte compte = null;
		try {
			compte = ConsulterCompte(CompteNumber);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		if(compte!=null){
double facilitesDeCaisse=0;
			if(compte instanceof CompteCourant){
				facilitesDeCaisse=((CompteCourant) compte).getDecouverte();

		if(compte.getSolde()+facilitesDeCaisse>=amount){
				Retrait retrait = new Retrait(new Date(),amount,compte);
			intOperationDao.save(retrait);

			compte.setSolde(compte.getSolde()-amount);
			compteDao.save(compte);
		}}
		}else{
			System.out.println("Account Not Found");
		}
	}

	@Override
	public ResponseEntity<String> Virement(Long compteNumber, Long compteNumber2, double amount)  {
		try {
		Compte compte1 =ConsulterCompte(compteNumber);
		Compte compte2 =ConsulterCompte(compteNumber2);

		if(compte1!=null && compte2!=null){
			Retrait( compte1.getCodeCompte(),  amount);
		 	Verser(compte2.getCodeCompte(),amount);
			return ResponseEntity.ok().body("done a weld 3emy");
		}
		return ResponseEntity.badRequest().body("User not found");

	}

	@Override
	public Page<Operation> listOperation(Long compteNumber, int page, int size) {

		return intOperationDao.CompteOp(compteNumber, PageRequest.of(page,size));
	}
}
