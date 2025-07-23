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
	public boolean Verser(Long CompteNumber, double amount,String description)  {
		Compte compte =ConsulterCompte(CompteNumber);
		if(compte!=null){
			Versement versement = new Versement(new Date(),amount,compte,description);
			intOperationDao.save(versement);
			compte.setSolde(compte.getSolde()+amount);
			Compte com = compteDao.save(compte);
//			if(com.)
			return true;
		}else{
			return false;
		}
	}

	@Override
	public boolean Retrait(Long CompteNumber, double amount,String description) {
		Compte compte = null;
		try {
			System.out.println("I'm here 4");
			compte = ConsulterCompte(CompteNumber);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		if(compte!=null){
			System.out.println("I'm here 3");
			double facilitesDeCaisse=0;
			if(compte instanceof CompteCourant){
				System.out.println("I'm here 2");
				facilitesDeCaisse=((CompteCourant) compte).getDecouverte();

		if(compte.getSolde()+facilitesDeCaisse>=amount){
			System.out.println("I'm here");
				Retrait retrait = new Retrait(new Date(),amount,compte,description);
			intOperationDao.save(retrait);

			compte.setSolde(compte.getSolde()-amount);
			Compte compte1 =compteDao.save(compte);
			return compte1.equals(compte)?true:false;
		}else{
			System.out.println("I'm here 5");

			return false;
		}
			}else{
				System.out.println("I'm here 6");

				return false;
			}
		}else{
			System.out.println("I'm here 7");
			return false;
		}
	}

	@Override
	public boolean Virement(Long compteNumber, Long compteNumber2, double amount)  {
		try {
			Compte compte1 = ConsulterCompte(compteNumber);
			Compte compte2 = ConsulterCompte(compteNumber2);
			boolean Vdone=false;
			if (compte1 != null && compte2 != null) {
			boolean Rdone=	Retrait(compte1.getCodeCompte(), amount, "Virement vers " + compte2.getCodeCompte());
			if(Rdone) {
				Vdone = Verser(compte2.getCodeCompte(), amount, "Virement depuis " + compte1.getCodeCompte());
			}else{

				return false;
			}
			return Vdone?true:false;
			}else{

			return false;
			}
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}

	};
	@Override
	public Page<Operation> listOperation(Long compteNumber, int page, int size) {

		return intOperationDao.CompteOp(compteNumber, PageRequest.of(page,size));
	}
}
