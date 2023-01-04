/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    const result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    // Only searches for matches if there is at least one book in scannedTextObj
    if (scannedTextObj.length) {

        /*
        * Matches any line where searchTerm is not surrounded by an alphanumeric
        * character
        */
        const re = new RegExp(`[^a-zA-Z0-9]+${searchTerm}[^a-zA-Z0-9]+`);

        /* 
        * Matches any line where searchTerm is the first word of a line, may or may
        * not be prepended with a non-alphanumeric character, and is immediately
        * followed by one or more non-alphanumeric characters.
        */
        const begRe = new RegExp(`^[^a-zA-Z0-9]*${searchTerm}[^a-zA-Z0-9]+`);

        /*
        * Matches any line where the searchTerm is prepended with a
        * non-alphanumeric character, is at the end of a line, and may or may not be
        * immediately followed by a non-alphanumeric character.
        */
        const endRe = new RegExp(`[^a-zA-Z0-9]+${searchTerm}[^a-zA-Z0-9]*$`);

        // Matches any line where the searchTerm is immediately followed by a hypen.
        const hyphenRe = new RegExp(`${searchTerm}-`);

        scannedTextObj.forEach(book => {

            const content = book.Content;
            const isbn = book.ISBN;

            content.forEach(line => {

                if (line.Text.match(re) ||
                    line.Text.match(begRe) ||
                    line.Text.match(endRe)) {
                    
                    // Exclude matches followed by hyphen
                    if(!line.Text.match(hyphenRe)) {
                        result.Results.push({
                            "ISBN": isbn,
                            "Page": line.Page,
                            "Line": line.Line
                        });
                    }
                }
            });
        });

    }
    
    return result; 
}

/** Example input objects. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
];

const noBooksList = [];

const noScannedTextBook = [
    {
        "Title": "This book has no text",
        "ISBN": "0000",
        "Content": []
    }
];
    
/** Example output objects */

/**
 * Used as a template for when output is expected to contain an empty results list
 * @param {string} term - The word that was searched
 * @returns {JSON} - Object with empty results list
 */
function returnNoResults(term) {
    return {
        "SearchTerm": term,
        "Results": []
    }
}

const darkOutput = returnNoResults('dark');
const dogOutput = returnNoResults('dog');
const everOutput = returnNoResults('ever');
const momOutput = returnNoResults('mom');
const eveOutput = returnNoResults('eve');

/**
 * Used as a template to return the data for a match for a specific line in the twentyLeaguesIn object
 * @param {number} n - The number of the line a match is supposed to be in the twentyLeaguesIn object
 * @returns {JSON} - An object contain the ISBN, page number, and line number
 */
function returnLineNumObj(n) {
    return {
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": n,
    };
}

const LINE8 = returnLineNumObj(8);
const LINE9 = returnLineNumObj(9);
const LINE10 = returnLineNumObj(10);

const theOutput = {
    "SearchTerm": "the",
    "Results": [LINE9]
};

const TheOutput = {
    "SearchTerm": "The",
    "Results": [LINE8]
};

const andOutput = {
    "SearchTerm": "and",
    "Results": [LINE9, LINE10]
};

const CanadianOutput = {
    "SearchTerm": "Canadian",
    "Results": [LINE9]
};

const CanadiansOutput = {
    "SearchTerm": "Canadian's",
    "Results": [LINE9]
};

const profoundOutput = {
    "SearchTerm": "profound",
    "Results": [LINE9]
};

const nowOutput = {
    "SearchTerm": "now",
    "Results": [LINE8]
};

const howOutput = {
    "SearchTerm": "how",
    "Results": [LINE10]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */

/**
 * Tests the findSearchTermInBooks function given certain inputs and expected output.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @param {Number} testCount - An integer indicating the number of the test.
 * @param {JSON} output - A JSON object representing the expected output.
 */
function testOutputEqualsResult(searchTerm, scannedTextObj, testCount, output) {
    const result = findSearchTermInBooks(searchTerm, scannedTextObj)
    if (JSON.stringify(output) === JSON.stringify(result)) {
        console.log(`PASS: Test ${testCount}`);
    } else {
        console.log(`FAIL: Test ${testCount}`);
        console.log("Expected:", output);
        console.log("Received:", result);
    }
}

/**
 * Automatically run tests when page is loaded
 */
(() => {
    const tests = [
        i => testOutputEqualsResult('the', twentyLeaguesIn, i + 1, theOutput),
        i => testOutputEqualsResult('The', twentyLeaguesIn, i + 1, TheOutput),
        i => testOutputEqualsResult('and', twentyLeaguesIn, i + 1, andOutput),
        i => testOutputEqualsResult('Canadian', twentyLeaguesIn, i + 1, CanadianOutput),
        i => testOutputEqualsResult("Canadian's", twentyLeaguesIn, i + 1, CanadiansOutput),
        i => testOutputEqualsResult('profound', twentyLeaguesIn, i + 1, profoundOutput),
        i => testOutputEqualsResult('now', twentyLeaguesIn, i + 1, nowOutput),
        i => testOutputEqualsResult('dark', twentyLeaguesIn, i + 1, darkOutput),
        i => testOutputEqualsResult('dog', twentyLeaguesIn, i + 1, dogOutput),
        i => testOutputEqualsResult('ever', twentyLeaguesIn, i + 1, everOutput),
        i => testOutputEqualsResult('mom', twentyLeaguesIn, i + 1, momOutput),
        i => testOutputEqualsResult('eve', twentyLeaguesIn, i + 1, eveOutput),
        i => testOutputEqualsResult('how', twentyLeaguesIn, i + 1, howOutput),
        i => testOutputEqualsResult('dog', noBooksList, i + 1, dogOutput),
        i => testOutputEqualsResult('dog', noScannedTextBook, i + 1, dogOutput)
    ];

    console.log('Running Tests...');

    tests.forEach((func, idx) => {
        func(idx);
    });

    console.log('Testing complete!');

})();