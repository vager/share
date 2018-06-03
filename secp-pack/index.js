const fs = require('fs');
const secp256k1 = require('secp256k1');
const { randomBytes } = require('crypto');


function writeObject(key, obj, cb) {
  db.put(key, obj, (err) => {
    if (err) {
      return cb(err);
    }
    return cb();
  });
}


function readObject(key, cb) {
  db.get(key, (err, value) => {
    if (err) {
      return cb(err, value);
    }
    return cb(null, value);
  });
}


function main() {
  // or require('secp256k1/elliptic')
  //   if you want to use pure js implementation in node
   
  // generate message to sign
  const msg = randomBytes(32)
   
  // generate privKey
  let privKey
  do {
    privKey = randomBytes(32)
  } while (!secp256k1.privateKeyVerify(privKey))
   
  // get the public key in a compressed format
  const pubKey = secp256k1.publicKeyCreate(privKey)
   
  // sign the message
  const sigObj = secp256k1.sign(msg, privKey)
   
  // verify the signature
  console.log(secp256k1.verify(msg, sigObj.signature, pubKey))
  // => true
}

main();

