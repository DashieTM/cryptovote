import Web3, { Contract, errors } from 'web3';
import { contractAddress, contractAbi } from './config';

let web3;
let contract;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractAbi, contractAddress)
} else (
    console.log('MetaMask is not installed')
)

export const connectMetaMaskAccount = async () => {
    if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          const permissions = await window.ethereum.request({ method: 'wallet_getPermissions' });
          console.log(permissions);
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.log('MetaMask is not installed');
      }
}

export const hasAccountPermissions = async () => {
    if (window.ethereum) {
        const permissions = await window.ethereum.request({ method: 'wallet_getPermissions' });
        return permissions.length > 0 ? true : false;
    }
}

export const getBalance = async () => {
    try {
        let accounts = await window.ethereum.request({ method: 'eth_accounts' });
        let balance = await window.ethereum.request({ method: 'eth_getBalance',  params: [accounts[0], null]});
        console.log(web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
        console.error('getBalance error')
    }
}

export const createProposal = async (name) => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const receipt = await contract.methods.createProposal(name).send({ from: accounts[0] });
        console.log(receipt.status);
    } catch (error) {
        console.error('createProposal error', error);
    }
}

export const getProposals = async () => {
    try {
        const proposal = await contract.methods.proposals(0).call();
        console.log(proposal)
    } catch (error) {
        console.error('Proposals error', error);
    }
}

export const giveRightToVote = async (to) => {

}

export const vote = async (proposal) => {

}

export const resetBallot = async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const receipt = await contract.methods.reset().send({ from: accounts[0] });
        console.log(receipt.status);
    } catch (error) {
        console.error('createProposal error', error);
    }
}

// export const retrieveNumber = async () => {
//     try {
//         const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//         const response = await contract.methods.retrieve().call({ from: accounts[0] });
//         console.log(response.toString());
//     } catch (error) {
//         console.error('retrieveNumber error', error);
//     }
// }

// export const storeNumber = async (num) => {
//     try {
//         const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//         const receipt = await contract.methods.store(num).send({ from: accounts[0] });
//         console.log(receipt.status);
//     } catch (error) {
//         console.error('storeNumber error', error);
//     }
// }

// export const getActiveBallots = () => {

// }

// export const getPastBallots = () => {
//     return
// }

// TODO: How to show past Ballots?