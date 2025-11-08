package com.oncodock.oncodock.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oncodock.oncodock.domain.ProteinLigand;
import com.oncodock.oncodock.service.ProteinLigandService;

@RestController
@RequestMapping(value="/oncodock",produces = MediaType.APPLICATION_JSON_VALUE)
public class ProteinLigandController {
    @Autowired
    private ProteinLigandService proteinLigandService;

    // Endpoint to get all products
    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("/all")
    public List<ProteinLigand> getAll() {
        return proteinLigandService.getAll();
    }

    // Endpoint to search products by name or category
    @GetMapping("/search")
    public List<ProteinLigand> searchProducts(@RequestParam String searchTerm) {
        return proteinLigandService.searchProteinLigands(searchTerm, searchTerm);
    }

    @GetMapping("/suggestions")
    public List<String> getSuggestions(@RequestParam("query") String query) {
        // List to store matching names
        List<String> matchingNames = new ArrayList<>();

        // Search for protein names and add them to the list
        List<String> proteinNames = proteinLigandService.getProteinSuggestions(query);
        matchingNames.addAll(proteinNames);

        // Search for ligand names and add them to the list
        List<String> ligandNames = proteinLigandService.findLigandNamesByQuery(query);
        matchingNames.addAll(ligandNames);

        // Return the combined list of matching names
        return matchingNames;
    }
}
