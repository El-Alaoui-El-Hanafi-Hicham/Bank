package com.example.demo.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Compte;

import java.util.List;

@Repository
public interface IntCompDao extends JpaRepository<Compte, Long>{
    @Query("SELECT c FROM Compte c WHERE c.user.id = :x")
    public Page<Compte> findByUserUserID(@Param("x") Long userId, Pageable pageable);
}
