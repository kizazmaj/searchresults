require('events').EventEmitter.defaultMaxListeners = 100; // or some other number that makes sense for the program
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

function delay(time) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}

// Define the asynchronous function that performs the searches
async function run(searchTerm) {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    // Create the "Search Results" directory if it doesn't exist
    const baseDir = 'Search Results';
    if (!fs.existsSync(baseDir)){
        fs.mkdirSync(baseDir);
    }

    // Sanitize the search term to use it as a directory name
    const dir = path.join(baseDir, searchTerm.replace(/[^\w\s]/gi, '').replace(/ /g,"_"));

    // Create the directory for the search term if it doesn't exist
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    // Perform searches for both the original search term and the search term with "fraud" appended
    for (let i = 0; i < 2; i++) {
        let currentTerm = searchTerm;
        if (i === 1) {
            currentTerm += " fraud";
        }

        // Sanitize the search term to use it as a filename
        const filename = currentTerm.replace(/[^\w\s]/gi, '').replace(/ /g,"_");

        // Navigate to Google and perform a regular search
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(currentTerm)}&hl=en&gl=nl`);
        let url = page.url();
        // Wait for the search results to load
        await page.waitForSelector('.g');
        let pdfPath = path.join(dir, filename + '_search.pdf');
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            displayHeaderFooter: true,
            headerTemplate: '<div style="font-size:10px;text-align:right;width:100%;margin-right:20px"><span class="date"></span></div>',
            footerTemplate: '<div style="font-size:10px;text-align:right;width:100%;margin-right:20px"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
            margin: {
                top: '30px',
                right: '30px',
                bottom: '30px',
                left: '30px'
            }
        });

        // Add a delay before the next search
        await delay(5000);

        // Perform a news search
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(currentTerm)}&tbm=nws&hl=en&gl=nl`);
        url = page.url();
        pdfPath = path.join(dir, filename + '_news.pdf');
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            displayHeaderFooter: true,
            headerTemplate: '<div style="font-size:10px;text-align:right;width:100%;margin-right:20px"><span class="date"></span></div>',
            footerTemplate: '<div style="font-size:10px;text-align:right;width:100%;margin-right:20px"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
            margin: {
                top: '30px',
                right: '30px',
                bottom: '30px',
                left: '30px'
            }
        });

        // Add a delay before the next search
        await delay(5000);
    }

    await browser.close();
}

// Read the file
fs.readFile('search_terms.txt', 'utf8', function(err, data) {
    if (err) throw err;

    // Split the file into lines
    const lines = data.split('\n');

    // For each line (i.e., each search term), run the search function
    for (const line of lines) {
        run(line);
    }
});
