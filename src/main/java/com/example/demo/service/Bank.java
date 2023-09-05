package com.example.demo.service;

import java.util.Date;
import java.util.Optional;

import com.example.demo.dao.IntOperationDao;
import com.example.demo.entities.CompteCourant;
import com.example.demo.entities.Retrait;
import com.example.demo.entities.Versement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.IntCompDao;
import com.example.demo.entities.Compte;
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
	public Compte ConsulterCompte(Long number) throws Exception {
		// TODO Auto-generated method stub
		Optional<Compte> com=compteDao.findById(number);
		if(com.isPresent()){

		return com.get();
		}
		throw new Exception("Account Not Found");
	}

	@Override
	public void Verser(Long CompteNumber, double amount) throws Exception {
		Compte compte =ConsulterCompte(CompteNumber);
		if(compte!=null){
			Versement versement = new Versement(new Date(),amount,compte);
			intOperationDao.save(versement);
			compte.setSolde(compte.getSolde()+amount);
			compteDao.save(compte);
		}else{
			System.out.println("Account Not Found");
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
	public void Virement(Long compteNumber, Long compteNumber2, double amount) {
		try {
		Compte compte1 =ConsulterCompte(compteNumber);
		Compte compte2 =ConsulterCompte(compteNumber);
		if(compte1!=null && compte2!=null){
			Retrait( compte1.getCodeCompte(),  amount);
			Verser(compte2.getCodeCompte(),amount);
			System.out.println("done a weld 3emy");
		}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

}
