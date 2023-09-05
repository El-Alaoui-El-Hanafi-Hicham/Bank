package com.example.demo;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.server.servlet.OAuth2AuthorizationServerProperties.Client;

import com.example.demo.dao.IntClientDao;
import com.example.demo.dao.IntCompDao;
import com.example.demo.dao.IntOperationDao;
import com.example.demo.entities.CompteCourant;
import com.example.demo.entities.CompteEpargne;
import com.example.demo.entities.Retrait;
import com.example.demo.entities.Versement;
@SpringBootApplication
public class BankApplication implements CommandLineRunner {
	@Autowired
IntClientDao clientRep;
	@Autowired
	IntCompDao compteRep;
	@Autowired
	IntOperationDao operDao;
	public static void main(String[] args) {
		SpringApplication.run(BankApplication.class, args);
	}



	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		com.example.demo.entities.Client c1= new com.example.demo.entities.Client("Hicham","Hicham@gmail.com");
		com.example.demo.entities.Client c2= new com.example.demo.entities.Client("FTZ","FTZ@gmail.com");
		c1= clientRep.save(c1);
		c2= clientRep.save(c2);
		CompteCourant comp1=compteRep.save(new  CompteCourant (new Date(), 13.31, c1, 412));
		CompteEpargne  comp2=compteRep.save(new  CompteEpargne (new Date(), 13.31, c1, 412));
		operDao.save(new Retrait(new Date(), 100.00,comp1 ));
		operDao.save(new Versement(new Date(), 100.00,comp2 ));
		
		
	}

}
