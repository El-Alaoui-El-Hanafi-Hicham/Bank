package com.example.demo.controllers;


import com.example.demo.dto.AccountDTO;
import com.example.demo.entities.User;
import com.example.demo.entities.Compte;
import com.example.demo.entities.Operation;
import com.example.demo.service.AccountService;
import com.example.demo.service.AuthService;
import com.example.demo.service.IBanque;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")  // Changed to plural form as per REST conventions
@CrossOrigin(origins = "*")      // Add CORS at controller level for extra safety
public class CompteController {

    @Autowired
    private IBanque bank;

    @Autowired
    private AccountService accountService;

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<Page<Compte>> getAllAccounts( @RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "4") int size) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User credentials = (User) authentication.getPrincipal();

            Page<Compte> accounts = accountService.getAccounts(credentials.getId(),page,size);
            return ResponseEntity.ok(accounts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createAccount(@RequestBody AccountDTO accountDTO) {
        System.out.println("ACCount DTO ----------> "+accountDTO.Solde);
        System.out.println("ACCount DTO ----------> "+accountDTO.userType);
        System.out.println("ACCount DTO ----------> "+accountDTO.TOD);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
        System.out.println(username+" <=================USERNAE");
            User user = authService.getUser(username);
        System.out.println(user.getEmail()+" <=================USERNAE");
        try {
            String result = accountService.createAccount(user, accountDTO.userType, accountDTO.Solde, accountDTO.TOD);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{code}")
    public ResponseEntity<Compte> getAccount(@PathVariable Long code, @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "4") int size) {
        try {
            Compte compte = bank.ConsulterCompte(code);
            if (compte == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(compte);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{code}/operations")
    public ResponseEntity<Page<Operation>> getAccountOperations(
            @PathVariable Long code,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size) {
        try {
            Page<Operation> operations = bank.listOperation(code, page, size);
            return ResponseEntity.ok(operations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{code}/operations")
    public ResponseEntity<String> saveOperation(
            @PathVariable Long code,
            @RequestParam("op") String op,
            @RequestParam(value = "clientCode", required = false) Long clientCode,
            @RequestParam("montant") double montant) {
        try {
            switch (op) {
                case "Versement":
                    bank.Verser(code, montant);
                    return ResponseEntity.ok("Versement effectué avec succès.");
                case "Virement":
                    bank.Virement(code, clientCode, montant);
                    return ResponseEntity.ok("Virement effectué avec succès.");
                case "Retrait":
                    bank.Retrait(code, montant);
                    return ResponseEntity.ok("Retrait effectué avec succès.");
                default:
                    return ResponseEntity.badRequest().body("Type d'opération inconnu.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
