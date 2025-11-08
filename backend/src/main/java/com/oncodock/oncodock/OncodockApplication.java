package com.oncodock.oncodock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.oncodock.oncodock.domain.ProteinLigand;
import com.oncodock.oncodock.repository.ProteinLigandRepository;
import com.oncodock.oncodock.service.ProteinLigandService;

@SpringBootApplication
public class OncodockApplication implements CommandLineRunner{
	@Autowired
    private ProteinLigandService proteinLigandService;
	
	public static void main(String[] args) {
		SpringApplication.run(OncodockApplication.class, args);
	}
	 @Override
	    public void run(String... args) throws Exception {
	        // Load the CSV data into the database
		 proteinLigandService.loadCsvData("src/main/resources/protein_ligand_binding_final.csv");
	    }
}
