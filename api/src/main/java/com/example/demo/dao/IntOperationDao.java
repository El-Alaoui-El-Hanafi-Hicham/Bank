package com.example.demo.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Operation;
@Repository
public interface IntOperationDao extends JpaRepository<Operation, Long> {
    @Query("SELECT o FROM Operation o WHERE o.compte.codeCompte = :x ORDER BY o.dateOperation DESC")
    Page<Operation> CompteOp(@Param("x") Long compteNumber, Pageable pageable);
    @Query("SELECT o FROM Operation o WHERE o.compte.codeCompte = :code or o.receipient.codeCompte = :code ORDER BY o.dateOperation DESC")
    Page<Operation> findOperationsByCompte(@Param("code") Long code, Pageable pageable);


}
