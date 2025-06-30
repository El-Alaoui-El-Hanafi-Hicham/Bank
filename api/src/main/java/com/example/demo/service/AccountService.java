package com.example.demo.service;

import com.example.demo.dao.IntClientDao;
import com.example.demo.dao.IntCompDao;
import com.example.demo.dto.AccountDTO;
import com.example.demo.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    IntCompDao intCompDao;
    public  AccountService(){

    }

    public List<Compte> getAccounts(String email){
        List<Compte> intCompDaoAlln=intCompDao.findAll();
        return intCompDaoAlln;
    }
    public String createAccount(User user, AccountDTO.UserType type,Double solde, Double TOD ){
        Compte compte ;
        if(type.equals(AccountDTO.UserType.CE)){
           compte = new CompteEpargne(new Date(),solde,user,TOD);
        }else{
            compte = new CompteCourant(new Date(),solde,user,TOD);
        }
        Compte c = intCompDao.save(compte);
        if(c.equals(compte)){
            return "ACCOUNT CREATED SUCCESSFULLY";
        }else{
            return"SOMETHING WENT WRONG";
        }
    };


}
