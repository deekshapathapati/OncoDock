package com.oncodock.oncodock.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.oncodock.oncodock.domain.BindingScore;
import com.oncodock.oncodock.util.PDBQTParser;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AutoDockController {

    // Default docking box parameters
    private static final double DEFAULT_CENTER_X = 0.0;
    private static final double DEFAULT_CENTER_Y = 0.0;
    private static final double DEFAULT_CENTER_Z = 0.0;
    private static final double DEFAULT_SIZE_X = 20.0;
    private static final double DEFAULT_SIZE_Y = 20.0;
    private static final double DEFAULT_SIZE_Z = 20.0;

    @RequestMapping("/run-autodock")
    public BindingScore runAutoDock(@RequestParam("protein") MultipartFile proteinFile,
                                    @RequestParam("ligand") MultipartFile ligandFile) {
        try {
            // Create temporary directory
            Path tempDir = Files.createTempDirectory("autodock");
            Path proteinPath = tempDir.resolve("protein.pdbqt");
            Path ligandPath = tempDir.resolve("ligand.pdbqt");

            // Save uploaded files
            Files.copy(proteinFile.getInputStream(), proteinPath, StandardCopyOption.REPLACE_EXISTING);
            Files.copy(ligandFile.getInputStream(), ligandPath, StandardCopyOption.REPLACE_EXISTING);

            System.out.println("proteinPath::: "+proteinPath);
            // Compute docking box values from the protein
            double[] dockingBox = PDBQTParser.calculateDockingBox(proteinPath);

            // Assign computed values
            double centerX = dockingBox[0];
            double centerY = dockingBox[1];
            double centerZ = dockingBox[2];
            double sizeX = dockingBox[3];
            double sizeY = dockingBox[4];
            double sizeZ = dockingBox[5];

            // Specify path to AutoDock Vina
            String vinaPath = "/Users/poojapathapati/autodockvina/bin/vina"; 

            // Construct the AutoDock Vina command with computed values
            String command = String.format(
                "%s --receptor %s --ligand %s " +
                "--center_x %f --center_y %f --center_z %f " +
                "--size_x %f --size_y %f --size_z %f " +
                "--out result.pdbqt --log log.txt",
                vinaPath, proteinPath.toString(), ligandPath.toString(),
                centerX, centerY, centerZ, sizeX, sizeY, sizeZ
            );

            // Run AutoDock Vina
            Process process = Runtime.getRuntime().exec(command);
            int exitCode = process.waitFor();

            // Check execution status
            if (exitCode != 0) {
                String errorOutput = readErrorStream(process);
                System.err.println("Error running AutoDock Vina: " + errorOutput);
                throw new RuntimeException("AutoDock Vina execution failed: " + errorOutput);
            }

            // Extract binding score from log file
            List<Map<String, String>> bindingScore = extractBindingScore("log.txt");

            // Clean up
            cleanup(tempDir);

            return new BindingScore(bindingScore);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error during AutoDock Vina execution", e);
        }
    }


    // Helper method to read error stream from process
    private String readErrorStream(Process process) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
        StringBuilder errorOutput = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            errorOutput.append(line).append("\n");
        }
        return errorOutput.toString();
    }

    private List<Map<String, String>> extractBindingScore(String logFilePath) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(logFilePath));
        String line;
        List<String> rawLines = new ArrayList<>();
        List<Map<String, String>> scores = new ArrayList<>();
        boolean dataStart = false;
        int lineCounter = 0; // Track line numbers after data starts

        while ((line = reader.readLine()) != null) {
            System.out.println("line123: " + line);

            // Detect start of data
            if (line.contains("mode") && line.contains("affinity")) {
                dataStart = true;
                lineCounter = 0; // Reset counter when data starts
                continue; // Skip header line
            }

            if (dataStart && !line.startsWith("-----") && !line.isEmpty()) {
                lineCounter++;

                if (lineCounter == 1) {
                    continue; // Skip the second line (first line after header)
                }

                rawLines.add(line);
            }
        }
        reader.close();

        // Remove the last line to ignore it
        if (!rawLines.isEmpty()) {
            rawLines.remove(rawLines.size() - 1);
        }

        // Process the remaining lines
        for (String dataLine : rawLines) {
            String[] parts = dataLine.trim().split("\\s+"); // Split by spaces
            if (parts.length >= 4) {
                Map<String, String> row = new HashMap<>();
                row.put("mode", parts[0]);
                row.put("affinity", parts[1] + " kcal/mol");
                row.put("rmsd_lb", parts[2]);
                row.put("rmsd_ub", parts[3]);
                scores.add(row);
            }
        }

        return scores;
    }


    private void cleanup(Path tempDir) throws IOException {
        Files.walk(tempDir)
             .map(Path::toFile)
             .forEach(file -> {
                 if (file.exists()) {
                     if (!file.delete()) {
                         System.err.println("Failed to delete file: " + file.getAbsolutePath());
                     }
                 }
             });
    }
}
