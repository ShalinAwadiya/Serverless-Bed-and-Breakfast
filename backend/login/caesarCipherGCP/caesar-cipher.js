const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.caesarCipher = async (req, res) => {
  let userSub = req.query.userSub;
  let text = req.query.text.toUpperCase();
  if (!(userSub && text)) {
    res.status(400).send(JSON.stringify({ message: 'Missing required field(s) or value(s)' }));
  }

  //GET caesar cipher key from Firestore using userSub
  let cipherKey = 0;
  await db.collection('Users')
    .where('userSub', '==', userSub)
    .get()
    .then(document => {
      document.forEach(doc => {
        cipherKey = doc.data().caesarKey
      })
    });

  console.log({ cipherKey });
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