import { promises as fs } from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ASCII Art Logo and Intro Section
function displayIntro() {
  console.log(`
 ▄████████  ▄██████▄  ████████▄     ▄████████         ▄███████▄  ▄█     ▄███████▄    ▄████████    ▄████████ 
███    ███ ███    ███ ███   ▀███   ███    ███        ███    ███ ███    ███    ███   ███    ███   ███    ███ 
███    █▀  ███    ███ ███    ███   ███    █▀         ███    ███ ███▌   ███    ███   ███    █▀    ███    ███ 
███        ███    ███ ███    ███  ▄███▄▄▄            ███    ███ ███▌   ███    ███  ▄███▄▄▄      ▄███▄▄▄▄██▀ 
███        ███    ███ ███    ███ ▀▀███▀▀▀          ▀█████████▀  ███▌ ▀█████████▀  ▀▀███▀▀▀     ▀▀███▀▀▀▀▀   
███    █▄  ███    ███ ███    ███   ███    █▄         ███        ███    ███          ███    █▄  ▀███████████ 
███    ███ ███    ███ ███   ▄███   ███    ███        ███        ███    ███          ███    ███   ███    ███ 
████████▀   ▀██████▀  ████████▀    ██████████       ▄████▀      █▀    ▄████▀        ██████████   ███    ███ 
                                                                                                 ███    ███ 
  `);


  console.log(`

  Code Piper - 0B GIVEN

  ----------------------------------------
  0x30 0x42 0x20 0x47 0x69 0x76 0x65 0x6E
  ----------------------------------------

  ** About this program **
  Author: Byte Zero
  License: MIT

  This program merges selected files and folders into a single text file, 
  perfect for use with AI and LLMs. Simplify your workflow by consolidating 
  codebases into structured inputs. Created as a side tool whilst building an AI Agent.

  Features:
  - Interactive file/folder selection
  - Automatic exclusion of common folders (e.g., node_modules, .git)
  - Merges files with clear headers for AI processing
  - Output saved in 'llm_text_transcripts' with a timestamp

  Use cases:
  - Preparing raw input for AI and LLM models
  - Sharing codebases without directories
  - Creating structured, unified views of large projects

  Run the program and follow the prompts to get started.
  For help, press 'Ctrl+C' to exit and review this guide.
  `);
}

// Prompt Utility
async function promptUser(question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer.trim().toLowerCase());
      });
    });
  }
  
  // Allow user to select files and folders interactively
async function selectFiles(currentDir, excludePatterns) {
    const selectedFiles = [];
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg'];

    try {
    const files = await fs.readdir(currentDir);

    for (const file of files) {
        const filePath = path.join(currentDir, file);
        const stats = await fs.stat(filePath);

        if (stats.isDirectory()) {
        if (!excludePatterns.includes(file)) {
            const includeFolder = await promptUser(`Include entire folder '${file}'? (y/n) `);
            if (includeFolder === 'y') {
            console.log(`Including all files in folder '${file}'...`);
            const subFiles = await getAllFilesInFolder(filePath, excludePatterns, imageExtensions);
            selectedFiles.push(...subFiles);
            }
        }
        } else {
        const fileExtension = path.extname(file).toLowerCase();
        if (imageExtensions.includes(fileExtension)) {
            console.log(`Skipping image file: ${file}`);
            continue;
        }
        const includeFile = await promptUser(`Include file '${file}'? (y/n) `);
        if (includeFile === 'y') {
            selectedFiles.push(filePath);
        }
        }
    }
    } catch (error) {
    console.error(`Error reading files in directory '${currentDir}':`, error.message);
    }

    return selectedFiles;
}
  
  // Recursively get all files in a folder
  async function getAllFilesInFolder(folderPath, excludePatterns, imageExtensions) {
    const allFiles = [];
    try {
      const files = await fs.readdir(folderPath);
  
      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stats = await fs.stat(filePath);
  
        if (stats.isDirectory()) {
          if (!excludePatterns.includes(file)) {
            const subFiles = await getAllFilesInFolder(filePath, excludePatterns, imageExtensions);
            allFiles.push(...subFiles);
          }
        } else {
          const fileExtension = path.extname(file).toLowerCase();
          if (!imageExtensions.includes(fileExtension)) {
            allFiles.push(filePath);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading folder '${folderPath}':`, error.message);
    }
    return allFiles;
  }
  
  
  // Merge all selected files into one output file
  async function mergeFiles(selectedFiles, outputFilePath) {
    let mergedContent = '';
  
    for (const filePath of selectedFiles) {
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const sectionHeader = `\n--- BEGIN: ${filePath.toUpperCase()} ---\n`;
        mergedContent += sectionHeader + fileContent + `\n--- END: ${filePath.toUpperCase()} ---\n`;
      } catch (error) {
        console.error(`Error reading file '${filePath}':`, error.message);
      }
    }
  
    try {
      await fs.writeFile(outputFilePath, mergedContent);
      console.log(`\n🎉 Merged files saved to: ${outputFilePath}`);
    } catch (error) {
      console.error(`Error writing merged file '${outputFilePath}':`, error.message);
    }
  }
  
  // Create the output directory if it doesn't exist
  async function createOutputDirectory(outputDirPath) {
    try {
      await fs.access(outputDirPath); // Check if directory exists
    } catch {
      try {
        await fs.mkdir(outputDirPath);
      } catch (error) {
        console.error(`Error creating directory '${outputDirPath}':`, error.message);
      }
    }
  }
  
  // Generate a timestamped file name
  function getTimestampedFileName() {
    const timestamp = new Date().toISOString().replace(/[:T]/g, '-').split('.')[0];
    return `merged-repo-${timestamp}.txt`;
  }
  
  // Main function to drive the script
  async function main() {
    displayIntro();
  
    const currentDir = process.cwd();
    console.log(`Current directory: ${currentDir}`);
  
    console.log('\nStarting file selection process...');
    const excludePatterns = ['node_modules', '.git', 'dist']; // Default excluded patterns
    const selectedFiles = await selectFiles(currentDir, excludePatterns);
  
    if (selectedFiles.length === 0) {
      console.log('\n⚠️ No files selected. Exiting.');
      rl.close();
      return;
    }
  
    console.log('\nPreparing to merge selected files...');
    const outputDirName = 'llm_text_transcripts';
    const outputDirPath = path.join(currentDir, outputDirName);
    await createOutputDirectory(outputDirPath);
  
    const outputFileName = getTimestampedFileName();
    const outputFilePath = path.join(outputDirPath, outputFileName);
  
    await mergeFiles(selectedFiles, outputFilePath);
  
    console.log(`\nAll done! Your files have been merged into: ${outputFilePath}`);
    rl.close();
  }
  
  // Catch and log errors globally
  main().catch((error) => {
    console.error('\n🚨 An unexpected error occurred:', error.message);
    rl.close();
  });