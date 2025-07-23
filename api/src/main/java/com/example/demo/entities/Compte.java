package com.example.demo.entities;


import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import groovy.transform.builder.Builder;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE_COMP", discriminatorType = DiscriminatorType.STRING, length = 2)
@Builder
@Getter
@Setter
@Data

public abstract class Compte implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long codeCompte;
    private Date dateCreation;
    private double solde;
    @ManyToOne()
    @JoinColumn(name = "CODE_CLI")
    private User user;

    @OneToMany(mappedBy = "compte",fetch = FetchType.LAZY)
	@JsonManagedReference
    private Collection<Operation> oparation;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;




    public Compte(Date dateCreation, double solde, User user) {
        super();

        this.dateCreation = dateCreation;
        this.solde = solde;
        this.user = user;
    }

    public Compte() {
    }
}
