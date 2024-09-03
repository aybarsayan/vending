import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import Web3 from 'web3';
import nodemailer from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { verificationFlow } from "./utils/verify"
import * as Kilt from '@kiltprotocol/sdk-js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = 'test';

var serviceAccount = require('./database.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cryptobox-56968-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "yourazzi13@gmail.com",
    pass: "uxvqlpnrywjaotqc",
  },
});

// Ethereum Sepolia Testnet'e bağlanmak için Infura URL
const infuraUrl = 'https://sepolia.infura.io/v3/e8ac73ea18194b92a4ced474b3fed93d';

const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// Akıllı kontrat bilgileri
const contractAddress = "0x6ceda29030e778d0c1a4d5c99824b658dca177c2"; // Akıllı kontrat adresinizi buraya ekleyin
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint8[]",
        "name": "products",
        "type": "uint8[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8[]",
        "name": "products",
        "type": "uint8[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "name": "withdrawDonation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "batteryCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "batteryPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "breadCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "breadPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "diaperCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "diaperPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pastaCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pastaPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "recipient",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

app.use(bodyParser.json());

function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.params.apiAnahtari;
  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Geçersiz API anahtarı' });
  }
  next();
}

app.get('/getBalance', async (req: Request, res: Response): Promise<void> => {
  try {
    const breadCount = await contract.methods.breadCount().call();
    const pastaCount = await contract.methods.pastaCount().call();
    const diaperCount = await contract.methods.diaperCount().call();
    const batteryCount = await contract.methods.batteryCount().call();

    const result = {
      breadCount: breadCount ? breadCount.toString() : '0',
      pastaCount: pastaCount ? pastaCount.toString() : '0',
      diaperCount: diaperCount ? diaperCount.toString() : '0',
      batteryCount: batteryCount ? batteryCount.toString() : '0',
    };

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'Hata', message: (error as Error).message });
  }
});

app.post('/withdrawFunds', async (req: Request, res: Response): Promise<void> => {
  const { from, privateKey } = req.body;

  // Parametrelerin doğruluğunu kontrol edin
  if (!from || !privateKey) {
    res.status(400).send({ status: 'Hata', message: 'Eksik veya yanlış parametreler' });
    return;
  }

  try {
    const nonce: bigint = await web3.eth.getTransactionCount(from);
    const gasEstimate: bigint = await contract.methods.withdraw().estimateGas({ from: from });

    const tx = {
      to: contractAddress,
      gas: gasEstimate,
      gasPrice: await web3.eth.getGasPrice(),
      nonce: nonce,
      data: contract.methods.withdraw().encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`);

    // signedTx.rawTransaction null olabilir, bu yüzden kontrol ekliyoruz
    if (!signedTx.rawTransaction) {
      throw new Error("Signed transaction is null or undefined");
    }

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    res.send({ status: 'Başarılı', transactionHash: receipt.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'Hata', message: (error as Error).message });
  }
});

app.post('/sendTransaction', async (req: Request, res: Response): Promise<void> => {
  const { from, products, amounts, privateKey } = req.body;

  if (!from || !products || !amounts || !privateKey) {
    res.status(400).send({ status: 'Hata', message: 'Eksik veya yanlış parametreler' });
    return;
  }

  if (!Array.isArray(products) || !Array.isArray(amounts) || products.length !== amounts.length) {
    res.status(400).send({ status: 'Hata', message: 'Ürünler ve miktarlar array formatında olmalı ve aynı uzunlukta olmalı' });
    return;
  }

  try {
    const nonce: bigint = await web3.eth.getTransactionCount(from);
    const gasEstimate: bigint = await contract.methods.withdrawDonation(products, amounts).estimateGas({ from: from });

    const tx = {
      to: contractAddress,
      gas: gasEstimate,
      gasPrice: await web3.eth.getGasPrice(),
      nonce: nonce,
      data: contract.methods.withdrawDonation(products, amounts).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`);

    if (!signedTx.rawTransaction) {
      throw new Error("Signed transaction is null or undefined");
    }

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    const urunler = ["Yara Bandı", "Pastil", "Batarya", "Diş Macunu"];

    const snapshot = await db.ref('orders').orderByKey().limitToLast(1).once('value');
    const data = snapshot.val();
    const latestOrder = Object.values(data)[0] as { email: string; timestamp: number };
    const email = latestOrder.email;
    const time = new Date(latestOrder.timestamp);

    // Dizinin içeriğini kontrol ederek güvenli dizin kullanımı
    const productNames = products.map((productIndex: number) => urunler[productIndex] || "Bilinmeyen Ürün");

    const mailOptions = {
      from: '"Yazgit Feza" <yourazzi13@gmail.com>',
      to: email,
      subject: "Transaction Successful",
      text: `Merhaba! ${time.toString()} tarihinde yaptığınız ${productNames.join(", ")} bağışınız ${receipt.transactionHash} hash değeri ile kontrol edebileceğiniz üzere başarılı bir şekilde tamamlanmıştır. Bağış yaptınız için teşekkürler!`,
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
              <h2 style="color: #4CAF50;">Merhaba!</h2>
              <p>${time.toString()} tarihinde yaptığınız <strong>${productNames.join(", ")}</strong> bağışınız, https://sepolia.etherscan.io/tx/${receipt.transactionHash} hash değeri ile kontrol edebileceğiniz üzere başarılı bir şekilde tamamlanmıştır.</p>
              <p>Bağış yaptığınız için teşekkürler!</p>
              <br>
              <p>En iyi dileklerimizle,</p>
              <p><strong>Yazgit Feza</strong></p>
          </div>
          `,
    };

    await transporter.sendMail(mailOptions);

    res.send({ status: 'Başarılı', transactionHash: receipt.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'Hata', message: (error as Error).message });
  }
});


// GET endpoint for /getcredential/:apiAnahtari
app.get('/getcredential/:apiAnahtari', apiKeyMiddleware, async (req: Request, res: Response) => {
  try {
    const usersRef = db.ref('users');
    const undefinedRef = db.ref('undefined');

    // Fetch the values from the database
    const usersSnapshot = await usersRef.once('value');
    const undefinedSnapshot = await undefinedRef.once('value');

    const usersValue = usersSnapshot.val();
    const undefinedValue = undefinedSnapshot.val();

    // Parse the 'undefined' field in 'users' if it's a string
    if (usersValue && typeof usersValue.undefined === 'string') {
      try {
        usersValue.undefined = JSON.parse(usersValue.undefined);
      } catch (e) {
        console.error('Failed to parse undefined field in users:', (e as Error).message);
      }
    }

    // Extract relevant data
    const email = usersValue.undefined.claim.contents.Email;
    const claimHashes = usersValue.undefined.claimHashes;
    const claimNonceMap = JSON.stringify(usersValue.undefined.claimNonceMap);
    const rootHash = usersValue.undefined.rootHash;
    const signature = usersValue.undefined.claimerSignature.signature;
    const challenge = usersValue.undefined.claimerSignature.challenge;

    const data = [
      email,
      ...claimHashes,
      claimNonceMap,
      rootHash,
      signature,
      challenge
    ];

    // Function to convert string to hex with separator
    function stringToHexWithSeparator(str: string): string {
      return str.split('')
        .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('') + '2c'; // '2c' is the hex code for ',' (comma)
    }

    // Convert the data array to hexadecimal with separators
    const hexData = data.map(item => stringToHexWithSeparator(item)).join('');

    res.status(200).json({ hexData });
  } catch (error) {
    res.status(500).json({ message: 'Veri çekilirken bir hata oluştu', error: (error as Error).message });
  }
});

app.post('/validate/:apiAnahtari', apiKeyMiddleware, async (req: Request, res: Response) => {
  try {
    console.log("sorgu geldi");

    const hexInput = req.body.hexData;
    await Kilt.connect(process.env.WSS_ADDRESS as string)

    console.log('Received hex input:', hexInput);

    // Function to convert hex string to normal string
    function hexToString(hex: string): string {
      let str = '';
      for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      return str;
    }

    // Convert the hex input to a string
    const convertedString = hexToString(hexInput.replace(/\s+/g, ''));

    console.log('Converted string:', convertedString);

    // Assuming the format as comma-separated values
    const valuesArray = convertedString.split(',');

    console.log('Parsed values array:', valuesArray);

    let claim = `
    {
    "claim": {
      "cTypeHash": "0x3291bb126e33b4862d421bfaa1d2f272e6cdfc4f96658988fbcffea8914bd9ac",
      "contents": {
        "Email": "${valuesArray[0]}"
      },
      "owner": "did:kilt:light:004staaktXUAuBCujvdB4JRjiQo85e5KJCYZZks8Y8VRwFNT5w:z15dZSRuzEPTFnBErPxqJie4CmmK1xWFLGZW3TPSzNfsTYY8wbviBgBogTYym9wkWLVBGwMjrRP4MgvYnGk3JPyCJpNigGDvzDp1qoFkxC728hMwtniqK8kCfW4JLUvhaptZDzC8bhoRct5r9iPLUp"
    },
    "claimHashes": [
      "${valuesArray[1]}",
      "${valuesArray[2]}"
    ],
    "claimNonceMap": {
      ${valuesArray[3].slice(1)},
      ${valuesArray[4].slice(0, -1)}
    },
    "delegationId": null,
    "legitimations": [],
    "rootHash": "${valuesArray[5]}",
    "claimerSignature": {
      "signature": "${valuesArray[6]}",
      "keyUri": "did:kilt:light:004staaktXUAuBCujvdB4JRjiQo85e5KJCYZZks8Y8VRwFNT5w:z15dZSRuzEPTFnBErPxqJie4CmmK1xWFLGZW3TPSzNfsTYY8wbviBgBogTYym9wkWLVBGwMjrRP4MgvYnGk3JPyCJpNigGDvzDp1qoFkxC728hMwtniqK8kCfW4JLUvhaptZDzC8bhoRct5r9iPLUp#authentication",
      "challenge": "${valuesArray[7]}"
    }
  }
    `

    let JsonClaim = JSON.parse(claim);

    console.log("Json Claim: ", JsonClaim)

    // Burada asenkron işlemler yapılabilir, örneğin bir API çağrısı veya veritabanı işlemi
    // await someAsyncFunction();
    const success = await verificationFlow(JsonClaim)
    console.log("Success: " + success);

    // Send a temporary boolean response (true for now)
    if (success) {
      res.status(200).json({ valid: true });
    } else {
      res.status(500).json({ message: 'Verification Error' });
    }
  } catch (error) {
    console.error('Error during validation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});