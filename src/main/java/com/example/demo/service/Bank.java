package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.IntCompDao;
import com.example.demo.entities.Compte;
@Service
public class Bank implements IBanque{
@Autowired
public IntCompDao compteDao;
	public Bank() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public Optional<Compte> ConsulterCompte(Long number) {
		// TODO Auto-generated method stub
		return compteDao.findById(number);
	}

	@Override
	public void Verser(Long CompteNumber, double amount) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void Retrait(Long CompteNumber, double amount) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void Virement(Long compteNumber, Long compteNumber2, double amout) {
		// TODO Auto-generated method stub
		
	}

}
