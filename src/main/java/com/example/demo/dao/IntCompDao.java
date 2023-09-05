package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Compte;
@Repository
public interface IntCompDao extends JpaRepository<Compte, Long>{

}
