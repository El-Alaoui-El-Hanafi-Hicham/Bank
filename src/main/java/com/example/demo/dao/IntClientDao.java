package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Client;


@Repository
public interface IntClientDao extends JpaRepository<Client, Long>{

}
