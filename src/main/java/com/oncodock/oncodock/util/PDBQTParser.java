package com.oncodock.oncodock.util;
import java.io.*;
import java.nio.file.Path;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PDBQTParser {

	public static double[] calculateDockingBox(Path pdbqtFilePath) throws IOException {
	    double minX = Double.MAX_VALUE, minY = Double.MAX_VALUE, minZ = Double.MAX_VALUE;
	    double maxX = -Double.MAX_VALUE, maxY = -Double.MAX_VALUE, maxZ = -Double.MAX_VALUE;

	    // Pattern to extract atomic coordinates
	    Pattern pattern = Pattern.compile("^(ATOM|HETATM)\\s+\\d+\\s+\\S+\\s+\\S+\\s+\\d+\\s+([-\\d\\.]+)\\s+([-\\d\\.]+)\\s+([-\\d\\.]+)");
	   
	    File file = pdbqtFilePath.toFile();
	    if (!file.exists() || file.length() == 0) {
	        throw new IllegalArgumentException("PDBQT file is empty or missing: " + pdbqtFilePath);
	    }
	    try (BufferedReader reader = new BufferedReader(new FileReader(pdbqtFilePath.toFile()))) {
	    	
	        System.out.println("Checking PDBQT File Content:");
	        int lineCount = 0;
	        String line;
	        System.out.println("reader.readLine()::: "+reader.readLine());
	        while ((line = reader.readLine()) != null && lineCount < 20) { // Print first 20 lines
	            System.out.println(line);
	            lineCount++;
	        }
	    } catch (IOException e) {
	        e.printStackTrace();
	    }

	    try (BufferedReader reader = new BufferedReader(new FileReader(pdbqtFilePath.toFile()))) {
	        String line;
	        boolean foundAtoms = false;

	       while ((line = reader.readLine()) != null) {
	            if (line.startsWith("ATOM") || line.startsWith("HETATM")) {
	            	foundAtoms = true;

	            	try {
	                    // Extract coordinates from fixed-width columns
	                    double x = Double.parseDouble(line.substring(30, 38).trim());
	                    double y = Double.parseDouble(line.substring(38, 46).trim());
	                    double z = Double.parseDouble(line.substring(46, 54).trim());

	                    // Update min/max values
	                    minX = Math.min(minX, x);
	                    minY = Math.min(minY, y);
	                    minZ = Math.min(minZ, z);
	                    maxX = Math.max(maxX, x);
	                    maxY = Math.max(maxY, y);
	                    maxZ = Math.max(maxZ, z);

	                } catch (NumberFormatException | StringIndexOutOfBoundsException e) {
	                    System.err.println("Error parsing coordinates in line: " + line);
	                }
	            }
	        }

	        // Ensure at least one valid atom was found
	        if (!foundAtoms) {
	            throw new IllegalArgumentException("No valid atomic coordinates found in the PDBQT file.");
	        }
	    }

	    // Compute center and size
	    double centerX = (minX + maxX) / 2.0;
	    double centerY = (minY + maxY) / 2.0;
	    double centerZ = (minZ + maxZ) / 2.0;
	    double sizeX = Math.max(0.1, maxX - minX);  // Ensure size is positive
	    double sizeY = Math.max(0.1, maxY - minY);
	    double sizeZ = Math.max(0.1, maxZ - minZ);

	    // Add a padding to ensure the ligand fits within the docking box
	    double padding = 5.0;
	    sizeX += padding;
	    sizeY += padding;
	    sizeZ += padding;

	    return new double[]{centerX, centerY, centerZ, sizeX, sizeY, sizeZ};
	}

}

