## Google Search PDF Saver

### Description:

The provided script allows you to generate PDFs of Google search results. For each search term provided, the script will:

1. Perform a Google search for the term.
2. Save the search results as a PDF.
3. Perform a Google news search for the term.
4. Save the news search results as a PDF.
5. (Optionally) Perform the above steps again appending the term "fraud" to the original search term.

PDFs are saved in a folder named "Search Results", and within that, they're organized into subfolders named after the search terms.

### Pre-requisites:

1. Node.js installed.
2. A new Node.js project is initiallized using npm:

   ```
   npm init -y
   ```

4. The Puppeteer library installed. You can install it using npm:

   ```
   npm install puppeteer
   ```

### Instructions:

1. **Setup:**
   Ensure that you have the required pre-requisites installed.

2. **Search Terms File:**
   - Create a file named `search_terms.txt`.
   - Each line of this file should contain a unique search term.
   - Place this file in the same directory as the script.

3. **Run the Script:**
   - Navigate to the directory containing the script using the terminal.
   - Execute the script using the command:

     ```
     node <script_filename>.js
     ```

   Replace `<script_filename>` with the name you've saved the script as.

4. **Output:**
   - After the script runs, check the "Search Results" directory.
   - Inside this directory, there will be sub-directories for each search term.
   - Each sub-directory will contain two PDFs: one for the regular search and one for the news search. If the script is set to append "fraud" to the search term, there will be an additional two PDFs.

5. **Notes:**
   - The script includes delays between searches to reduce the risk of being temporarily blocked by Google due to rapid consecutive searches.
   - The header of each PDF will contain the date when the PDF was generated.
   - If you face any CAPTCHA challenges from Google, you might need to adjust the script or consider other solutions.

### Code:

You can find the code in `index.js` attached.
