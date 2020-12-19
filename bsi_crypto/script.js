var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes"); 
var RC4 = require("crypto-js/rc4"); 
var TripleDES = require("crypto-js/tripledes"); 

const crypto = require("crypto")


const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Massage : ", function(message) {
rl.question("Encryption [AES , RC4 , 3DES , RSA] : ", function(enc) {


if(enc == "AES"){
	var encrypted = CryptoJS.AES.encrypt(message, "Secret Passphrase");

	var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
}

if(enc == "RC4"){
	var encrypted = CryptoJS.RC4.encrypt(message, "Secret Passphrase");

	var decrypted = CryptoJS.RC4.decrypt(encrypted, "Secret Passphrase");
}

if(enc == "3DES"){
	var encrypted = CryptoJS.TripleDES.encrypt(message, "Secret Passphrase");

	var decrypted = CryptoJS.TripleDES.decrypt(encrypted, "Secret Passphrase");
}

if(enc == "RSA"){

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	// The standard secure default length for RSA keys is 2048 bits
	modulusLength: 2048,
})

var encrypted = crypto.publicEncrypt(
	{
		key: publicKey,
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
	},
	// We convert the data string to a buffer using `Buffer.from`
	Buffer.from(message)
)

var decrypted = crypto.privateDecrypt(
	{
		key: privateKey,
		// In order to decrypt the data, we need to specify the
		// same hashing function and padding scheme that we used to
		// encrypt the data in the previous step
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
	},
	encrypted
)

}

console.log("")

console.log("Message :")
console.log(message)
console.log("")

console.log("Encryption :")
console.log(enc)
console.log("")

console.log("Encrypted :")
console.log(encrypted.toString())
console.log("")

console.log("Decrypted :")
console.log(decrypted.toString())
console.log("")

if(enc != "RSA"){
console.log("Actual Message :")
console.log(decrypted.toString(CryptoJS.enc.Utf8)) 
console.log("")
}

});  
});

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

 

