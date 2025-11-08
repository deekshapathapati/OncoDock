package com.oncodock.oncodock.domain;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "protein_ligand")
public class ProteinLigand {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String uniprot_id;
	private String protein_id;
	
	@Column(name = "protein_name", length = 750)
	private String proteinName;
	
	@Column(name = "ligand_name", length = 780)
	private String ligandName;
	
	@Column(name = "binding_score", length = 380)
	private String binding_score;
	private String IC50;
	private String Ki;
	private String Kd;
	private String chembl_Id;
	private String molecular_formula;
	private String smiles;
	private String molecular_weight;
	private String polar_surface_area;
	private String rotatable_bonds;
	private String alogp;
	
	public ProteinLigand(String uniprot_id, String protein_id, String protein_name, String ligand_name,
			String binding_score, String iC50, String ki, String kd, String chembl_Id,
			String molecular_formula, String smiles, String molecular_weight, String polar_surface_area,
			String rotatable_bonds, String alogp) {
		super();
		this.uniprot_id = uniprot_id;
		this.protein_id = protein_id;
		this.proteinName = protein_name;
		this.ligandName = ligand_name;
		this.binding_score = binding_score;
		IC50 = iC50;
		Ki = ki;
		Kd = kd;
		this.chembl_Id = chembl_Id;
		this.molecular_formula = molecular_formula;
		this.smiles = smiles;
		this.molecular_weight = molecular_weight;
		this.polar_surface_area = polar_surface_area;
		this.rotatable_bonds = rotatable_bonds;
		this.alogp = alogp;
	}

	public ProteinLigand() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUniprot_id() {
		return uniprot_id;
	}

	public void setUniprot_id(String uniprot_id) {
		this.uniprot_id = uniprot_id;
	}

	public String getProtein_id() {
		return protein_id;
	}

	public void setProtein_id(String protein_id) {
		this.protein_id = protein_id;
	}

	public String getProteinName() {
		return proteinName;
	}

	public void setProteinName(String proteinName) {
		this.proteinName = proteinName;
	}

	public String getLigandName() {
		return ligandName;
	}

	public void setLigandName(String ligandName) {
		this.ligandName = ligandName;
	}

	public String getBinding_score() {
		return binding_score;
	}

	public void setBinding_score(String binding_score) {
		this.binding_score = binding_score;
	}

	public String getIC50() {
		return IC50;
	}

	public void setIC50(String iC50) {
		IC50 = iC50;
	}

	public String getKi() {
		return Ki;
	}

	public void setKi(String ki) {
		Ki = ki;
	}

	public String getKd() {
		return Kd;
	}

	public void setKd(String kd) {
		Kd = kd;
	}

	public String getChembl_Id() {
		return chembl_Id;
	}

	public void setChembl_Id(String chembl_Id) {
		this.chembl_Id = chembl_Id;
	}

	public String getMolecular_formula() {
		return molecular_formula;
	}

	public void setMolecular_formula(String molecular_formula) {
		this.molecular_formula = molecular_formula;
	}

	public String getSmiles() {
		return smiles;
	}

	public void setSmiles(String smiles) {
		this.smiles = smiles;
	}

	public String getMolecular_weight() {
		return molecular_weight;
	}

	public void setMolecular_weight(String molecular_weight) {
		this.molecular_weight = molecular_weight;
	}

	public String getPolar_surface_area() {
		return polar_surface_area;
	}

	public void setPolar_surface_area(String polar_surface_area) {
		this.polar_surface_area = polar_surface_area;
	}

	public String getRotatable_bonds() {
		return rotatable_bonds;
	}

	public void setRotatable_bonds(String rotatable_bonds) {
		this.rotatable_bonds = rotatable_bonds;
	}

	public String getAlogp() {
		return alogp;
	}

	public void setAlogp(String alogp) {
		this.alogp = alogp;
	}

	


	
	
	    
}
