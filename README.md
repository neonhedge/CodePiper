Dev tool for merging a whole module or code folder into one text file for LLM input as a resource.

# Code Piper

![Code Piper Logo](https://via.placeholder.com/600x200?text=Code+Piper)

## Overview
**Code Piper** is a robust and interactive tool designed to consolidate files and folders into a single structured text file. It’s perfect for preparing codebases or projects for AI and LLM (Large Language Model) analysis, sharing clean inputs, or simply merging files for organized documentation.

Built with scalability and ease of use in mind, **Code Piper** ensures that even complex repositories can be bundled interactively with minimal effort.

---

## Features
- **Interactive File Selection**: Choose files and folders to include via prompts.
- **Recursive Folder Inclusion**: Select entire folders to automatically include all files within them.
- **Exclusion Patterns**: Skips common folders like `node_modules` and specific file types (e.g., images).
- **Readable Output**: Generates a single, timestamped text file with clear section headers.
- **Error Handling**: Avoids crashes by robustly handling missing files or access issues.
- **Customizable Exclusions**: Easily extend exclusion patterns for specific workflows.
- **Cross-Platform Support**: Works seamlessly on Windows, macOS, and Linux.

---

## Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **NPM** (bundled with Node.js)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/code-piper.git
   cd code-piper
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## Usage

### Run the Tool
Execute the script in the root of your project:
```bash
node bundleup.js
```

### Interactive Prompts
- **File Selection**: The tool will guide you to include or exclude specific files and folders.
- **Automatic Exclusion**: Skips `node_modules`, `.git`, and common image files like `.png`, `.jpg`.

### Output
- The merged output will be saved in the `llm_text_transcripts` directory with a timestamped filename (e.g., `merged-repo-YYYY-MM-DD-HH-MM-SS.txt`).

---

## Use Cases

### For Developers
- **Simplify Codebase Reviews**: Share a unified file for easy analysis or debugging.
- **Prepare Inputs for AI/LLMs**: Feed clean, structured text files to AI tools like ChatGPT for better analysis.

### For Educators
- **Teaching Material**: Create consolidated code examples for students.

### For Documentation
- **Project Archives**: Archive projects into single, readable files for future reference.

---

## Configuration
### Exclude Patterns
Customize exclusion patterns in the `selectFiles` function:
```javascript
const excludePatterns = ['node_modules', '.git', 'dist'];
```
Add or remove entries as needed.

---

## Contributing
We welcome contributions to enhance **Code Piper**! To get started:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## Future Enhancements
- **Support for Output Formats**: Add JSON, Markdown outputs.
- **Cloud Upload**: Automatically upload to S3 or Google Drive.
- **CLI Options**: Add non-interactive mode with CLI flags.
- **AI Integrations**: Enable direct analysis of merged files with AI tools.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author
Developed with passion by **Byte Zero**. Let’s simplify your code workflows together!

---

## Feedback
We’d love to hear from you! Feel free to [open an issue](https://github.com/yourusername/code-piper/issues) or contribute directly to this project.

