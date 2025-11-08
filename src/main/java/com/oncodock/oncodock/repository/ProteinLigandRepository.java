package com.oncodock.oncodock.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.oncodock.oncodock.domain.ProteinLigand;

public interface ProteinLigandRepository extends JpaRepository<ProteinLigand, Long> {
	
//    List<ProteinLigand> findByProteinContainingIgnoreCase(String name);
//    List<ProteinLigand> findByLigandContainingIgnoreCase(String category);
	List<ProteinLigand> findByProteinNameContainingIgnoreCaseOrLigandNameContainingIgnoreCase(String proteinName, String ligandName);
	
    @Query("SELECT p.proteinName FROM ProteinLigand p WHERE LOWER(p.proteinName) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<String> findProteinNamesByQuery(@Param("query") String query);

    @Query("SELECT p.ligandName FROM ProteinLigand p WHERE LOWER(p.ligandName) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<String> findLigandNamesByQuery(String query);
}
