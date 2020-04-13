module.exports = survey => {
    return `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>I'd like your input</h3>
                    <p>Please answer following question</p>
                    <p>${survey.body}</p>
                    <a href="${keys.redirectDomain}/api/surveys/complete">Yes</a>
                    <a href="${keys.redirectDomain}/api/surveys/complete">No</a>
                </div>
                
                
            </body>
        </html>
    `;
}