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

    const re = new RegExp(`\\W+${searchTerm}\\W*`);

    scannedTextObj.forEach(book => {

        const content = book.Content;
        const isbn = book.ISBN;

        content.forEach(line => {

            if (line.Text.match(re)) {
                result.Results.push({
                    "ISBN": isbn,
                    "Page": line.Page,
                    "Line": line.Line
                });
            }
        });
    });
    
    return result; 
}

/** Example input object. */
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
    
/** Example output objects */
const theOutput = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
};

const andOutput = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
};

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
        idx => testOutputEqualsResult('the', twentyLeaguesIn, idx + 1, theOutput),
        idx => testOutputEqualsResult('and', twentyLeaguesIn, idx + 1, andOutput)
    ];

    console.log('Running Tests...');

    tests.forEach((func, idx) => {
        func(idx);
    });

    console.log('Testing complete!');

})();