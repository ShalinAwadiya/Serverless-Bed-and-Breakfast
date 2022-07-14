/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.caesarCipher = (req, res) => {
  let cipherKey = req.query.key;
  let text = req.query.text.toUpperCase();
  if (!cipherKey || !text) {
    res.status(400).send(JSON.stringify({ message: 'Missing required field(s) or value(s)' }));
  }

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var decryptedText = '';
  for (var i = 0; i < text.length; i++) {
    var index = parseInt(alphabets.indexOf(text[i])) + parseInt(cipherKey);
    if (index > 25) {
      index = index - 26;
    }
    decryptedText = decryptedText + alphabets[index];
  }
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).send(JSON.stringify({ problem: text, solution: decryptedText }));
};