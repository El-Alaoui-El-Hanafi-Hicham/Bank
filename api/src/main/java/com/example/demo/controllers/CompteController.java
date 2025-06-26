package com.example.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entities.Compte;
import com.example.demo.entities.Operation;
import com.example.demo.service.IBanque;

@Controller
public class CompteController  {
    @Autowired
    public IBanque  bank;



    @RequestMapping("/")
    public String index(Long Code){
        return "consultation";
    }
    @RequestMapping("/Consulter")
    public String consulter(Model model,@RequestParam("code") Long Code) {
        Compte compte = null;
        try {
            compte = bank.ConsulterCompte(Code);

try {
    Page<Operation> operations = bank.listOperation(Code,0,4);

    model.addAttribute("Operation",operations.getContent());
    int[] pages= new int[operations.getTotalPages()];
    model.addAttribute("OperationsPages",pages);
}catch (Exception e){
    model.addAttribute("OpException","Pas d'operation");
}
model.addAttribute("codeCompte",compte.getCodeCompte());

            model.addAttribute("Compte",compte);

        } catch (Exception e) {
            model.addAttribute("exception","compte non trouve");

        }
            return "consultation";

    }

    @RequestMapping("/SaveOperation")
    public String saveOperation(Model model,@RequestParam("codeCompte")Long codeCompte,@RequestParam("op") String op,Long ClientCode,@RequestParam("montant")double montant){
       switch (op){

        case"Versement":
            try {
                bank.Verser(codeCompte,montant);

          model.addAttribute("OPStatus","Vous Avez versez a "+codeCompte+", le montant de "+montant);

            } catch (Exception e) {
                model.addAttribute("OPStatus","Votre versement a echoue");

            }
            break;

        case"Virement":
            try {
                bank.Virement(codeCompte,ClientCode,montant);

                model.addAttribute("OPStatus","Vous Avez effectuer un virement du "+codeCompte+" a "+ClientCode +", le montant de "+montant);

            } catch (Exception e) {
                model.addAttribute("OPStatus","Votre virement a echoue");

            }
               break;

        case"Retrait":
            try {
                bank.Retrait(codeCompte,montant);

                model.addAttribute("OPStatus","Vous Avez Retrait du compte numero "+codeCompte+", le montant de "+montant);

            } catch (Exception e) {
                model.addAttribute("OPStatus","Votre Retrait a echoue");

            }
               break;

       }
        return "redirect:Consulter?code="+codeCompte;
    }
}
