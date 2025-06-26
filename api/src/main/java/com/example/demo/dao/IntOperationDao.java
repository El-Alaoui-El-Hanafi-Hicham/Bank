package com.example.demo.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Operation;
@Repository
public interface IntOperationDao extends JpaRepository<Operation, Long> {
@Query("Select o FROM Operation o where o.compte.codeCompte= :x order by o.dateOperation desc")
    public Page<Operation> CompteOp(@Param("x") Long compteNumber, Pageable pageable);
}
