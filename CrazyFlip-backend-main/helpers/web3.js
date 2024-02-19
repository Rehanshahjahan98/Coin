const Web3 = require("web3");
const contractAbi = require("../contract-abis/affliate.json")

const privateKey =
  "87d1970d23c81f49689cc37f8b3415e986eba8bbb8683649fa1083ed38d2a79f";
const infuraUrl =
  "https://data-seed-prebsc-1-s1.binance.org:8545";


const addAffliateToContract = async ({ referredAddress, affiliateAddress }) => {
  try {
    let web3 = new Web3(infuraUrl);
    const adminAddress = "0x0516A5Fd8d7FF48fa3CC5d25394189b25bFc8c9a";
    const contractAddress = '0xE5f95c1fA96C4baDAD2f279eE8fCF5507F0c9703';

    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    const isAffiliated = await contract.methods.isAffiliated(affiliateAddress).call();

    if (!isAffiliated) {
      const nonce = await web3.eth.getTransactionCount(adminAddress);

      const txData = contract.methods.addAffiliated(affiliateAddress).encodeABI();

      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = await contract.methods.addAffiliated(affiliateAddress).estimateGas({ from: adminAddress });

      const txObject = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gasLimit),
        to: contractAddress,
        data: txData,
      };

      const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);

      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      console.log('Transaction receipt:', receipt?.transactionHash);

      if (receipt) {
        const nonce = await web3.eth.getTransactionCount(adminAddress);

        const txData = contract.methods.addAffiliatedReferred(referredAddress, affiliateAddress).encodeABI();

        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = await contract.methods.addAffiliatedReferred(referredAddress, affiliateAddress).estimateGas({ from: adminAddress });

        const txObject = {
          nonce: web3.utils.toHex(nonce),
          gasPrice: web3.utils.toHex(gasPrice),
          gasLimit: web3.utils.toHex(gasLimit),
          to: contractAddress,
          data: txData,
        };

        const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log('2nd Transaction receipt:', receipt?.transactionHash);
        return true;
      }
    }
    else {
      const nonce = await web3.eth.getTransactionCount(adminAddress);

      const txData = contract.methods.addAffiliatedReferred(referredAddress, affiliateAddress).encodeABI();

      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = await contract.methods.addAffiliatedReferred(referredAddress, affiliateAddress).estimateGas({ from: adminAddress });

      const txObject = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gasLimit),
        to: contractAddress,
        data: txData,
      };

      const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);

      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      console.log('2nd Transaction receipt:', receipt?.transactionHash);
      return true;
    }

  } catch (error) {
    console.log(error.message, "error")
    return false
  }
};

const whoReffered = async ({ referredAddress }) => {
  try {
    let web3 = new Web3(infuraUrl);
    const contractAddress = '0xE5f95c1fA96C4baDAD2f279eE8fCF5507F0c9703';

    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    const referred = await contract.methods.getWhoReferred(referredAddress).call();

    return referred;
  } catch (error) {
    console.log(error.message, "error")
    return false
  }
};

exports.addAffliateToContract = addAffliateToContract;
exports.whoReffered = whoReffered;
