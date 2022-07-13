/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.caesarCipher = (req, res) => {
    let cipherKey = req.query.key;
    let text = req.query.text;
    if (!cipherKey || !text) {
        res.status(400).send(JSON.stringify({ message: 'Missing required field(s) or value(s)' }));
    }

    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var decryptedText = '';
    for (var i = 0; i < text.length; i++) {
        var index = alphabets.indexOf(text[i]) - cipherKey;
        if (index < 0) {
            index = index + 26;
        }
        decryptedText = decryptedText + alphabets[index];
    }
    res.status(200).send(JSON.stringify({ problem: text, solution: decryptedText }));
};