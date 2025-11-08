package com.oncodock.oncodock.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oncodock.oncodock.domain.ProteinLigand;
import com.oncodock.oncodock.repository.ProteinLigandRepository;

@Service
public class ProteinLigandService {
    
	@Autowired
    private ProteinLigandRepository proteinLigandRepository;

    // Get all products
    public List<ProteinLigand> getAll() {
        return proteinLigandRepository.findAll();
    }

    // Search for products by name or category
    public List<ProteinLigand> searchProteinLigands(String proteinName, String ligandName) {
        return proteinLigandRepository.findByProteinNameContainingIgnoreCaseOrLigandNameContainingIgnoreCase(proteinName, ligandName);
    }
    
    public List<String> getProteinSuggestions(String query) {
        return proteinLigandRepository.findProteinNamesByQuery(query);
    }
    
    public List<String> findLigandNamesByQuery(String ligandName) {
        return proteinLigandRepository.findLigandNamesByQuery(ligandName);
    }
    
    // Method to load CSV into H2 Database
    public void loadCsvData(String filePath) {
        List<ProteinLigand> proteinLigands = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            // Skip the header
            br.readLine();
            
            // Read each line of the CSV file
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                ProteinLigand data = new ProteinLigand(values[0], values[1],values[2],values[3], values[4],values[5],values[6],values[7],values[8],
                		values[9],values[10],values[11],values[12],values[13],values[14]);
                proteinLigands.add(data);
            }
            // Save the products into H2 Database
            proteinLigandRepository.saveAll(proteinLigands);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    
}
