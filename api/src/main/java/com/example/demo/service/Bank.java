package com.example.demo.service;

import java.util.Date;
import java.util.Optional;

import com.example.demo.dao.IntOperationDao;
import com.example.demo.dto.OperationDTO;
import com.example.demo.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	public boolean Verser(Long CompteNumber, double amount, String description, long receipient_id) {
		Compte compte =ConsulterCompte(CompteNumber);
		Compte receipient =ConsulterCompte(receipient_id);
		if(compte!=null && receipient != null){
			Versement versement = new Versement(new Date(),amount,compte,description,receipient);
			intOperationDao.save(versement);
			compte.setSolde(compte.getSolde()+amount);
			Compte com = compteDao.save(compte);
//			if
			return true;
		}else{
			return false;
		}
	}

	@Override
	public boolean Retrait(Long CompteNumber, double amount, String description, long receipient_id) {
		Compte compte = null;
		Compte receipient =ConsulterCompte(receipient_id);

		try {
			System.out.println("I'm here 4");
			compte = ConsulterCompte(CompteNumber);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		if(compte!=null && receipient != null){
			System.out.println("I'm here 3");
			double facilitesDeCaisse=0;
			if(compte instanceof CompteCourant){
				System.out.println("I'm here 2");
				facilitesDeCaisse=((CompteCourant) compte).getDecouverte();

				if(compte.getSolde()+facilitesDeCaisse>=amount){
					System.out.println("I'm here");
					Retrait retrait = new Retrait(new Date(),amount,compte,description,receipient);
					intOperationDao.save(retrait);

					compte.setSolde(compte.getSolde()-amount);
					Compte compte1 =compteDao.save(compte);
					return compte1.equals(compte);
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
			boolean Rdone=	Retrait(compte1.getCodeCompte(), amount, "Virement vers " + compte2.getCodeCompte(),compteNumber2);
			if(Rdone) {
				Vdone = Verser(compte2.getCodeCompte(), amount, "Virement depuis " + compte1.getCodeCompte(),compteNumber);
			}else{

				return false;
			}
			return Vdone;
			}else{

			return false;
			}
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

    @Override
	public Page< OperationDTO> listOperation(Long compteNumber, int page, int size) {
		Pageable pageable= PageRequest.of(page,size);
//			return intOperationDao.CompteOp(	compteNumber, pageable);
		Page<Operation> ops = intOperationDao.findOperationsByCompte(compteNumber,pageable);
		ops.forEach(op -> System.out.println(op.getClass())); // to confirm subclass

		return ops.map(op -> {
			if (op instanceof Retrait) {
				return  new OperationDTO(
						"RET",
						op.getCompte(),
						op.getMontant(),
						op.getReceipient() != null ? op.getReceipient() : null,
						op.getDescription(),op.getDateOperation()
				);

			} else if (op instanceof Versement) {
				return new OperationDTO(
						"VER",
						op.getCompte(),
						op.getMontant(),
						op.getReceipient() != null ? op.getReceipient() : null,
						op.getDescription(),
						op.getDateOperation()
				);
			}else{
				throw new RuntimeException("Something Wrong");
			}
		});

	}
}
