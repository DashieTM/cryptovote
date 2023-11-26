import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

// Replace with your contract address and ABI
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = []; // Replace with your ABI

const contract = new web3.eth.Contract(contractABI, contractAddress);

export async function callSmartContractFunction() {
  const accounts = await window.ethereum.enable();
  const fromAccount = accounts[0];

  try {
    const result = await contract.methods.yourSmartContractFunction().send({ from: fromAccount });
    console.log('Transaction Hash:', result.transactionHash);
  } catch (error) {
    console.error('Error:', error);
  }
}
