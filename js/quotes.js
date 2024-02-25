function startQuotes() {
    fetch('/Secrets/quotes.ini')
        .then(function (response) {
            response.text()

                .then(function (text) {

                    const rawLines = text.split('\n');
                    const textLines = [];
                    for (const line of rawLines) {
                        const [lineNumber, lineQuote] = line.split('=');
                        if (
                            Number.isNaN(Number(lineNumber))
                            || !lineQuote
                        ) {
                            continue;
                        }

                        textLines.push({
                            quoteNum: Number(lineNumber),
                            quoteText: lineQuote
                                .replaceAll('<', '&lt;')
                                .replaceAll('>', '&gt;')
                                .replaceAll('"', '&quot;')
                                .replaceAll("'", '&apos;')
                                .replaceAll("%22", "&apos;")
                                .replaceAll("%25", "%")
                        });
                    }
                    textLines.sort((a, b) => {
                        return a.quoteNum - b.quoteNum;
                    });

                    const formattedLines = textLines.map((line) => {
                        return `${line.quoteNum}: ${line.quoteText}`;
                    });
                    document.getElementById('quotebox').innerHTML = formattedLines.join('<br />');
                });
        });
};

startQuotes()