const Web3 = require("web3");
const contractAbi = require("../contract-abis/affliate.json")

const privateKey =
  "f118b6ecb3360405995d1356f9e16bcb4200ad335d53289801d459c60e52cd46";
const infuraUrl =
  "https://polygon-mumbai.infura.io/v3/733df61c6a694169bf6ac7d5d28c85de";



const addAffliateToContract = async ({ referredAddress, affiliateAddress }) => {
  try {
    let web3 = new Web3(infuraUrl);
    const adminAddress = "0xF1d3217f5D8368248E9AfBAd25e5396b5a93599b";
    const contractAddress = '0xBB1Af60b4B80A7ee8539c35C26877BE1a3943675';

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
    const contractAddress = '0xBB1Af60b4B80A7ee8539c35C26877BE1a3943675';

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