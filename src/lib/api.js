import Web3, { Contract, errors } from 'web3';
import { ballotManagerAddress, ballotManagerAbi, ballotAbi } from './config';

let web3;
let ballotManagerContract;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    ballotManagerContract = new web3.eth.Contract(ballotManagerAbi, ballotManagerAddress);
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

const getAccount = async () => {
    let accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
}

export const hasAccountPermissions = async () => {
    if (window.ethereum) {
        const permissions = await window.ethereum.request({ method: 'wallet_getPermissions' });
        return permissions.length > 0 ? true : false;
    }
}

export const getBalance = async () => {
    try {
        const account = await getAccount();
        const balance = await window.ethereum.request({ method: 'eth_getBalance',  params: [account, null]});
        console.log(web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
        console.error('getBalance error')
    }
}

export const createBallot = async (proposalNames) => {
    try {
        const account = await getAccount();
        const receipt = await ballotManagerContract.methods.createBallot(proposalNames).send({ from: account });
        console.log(receipt.status); // TODO: remove
        return { status: receipt.status };
    } catch (error) {
        console.error('createBallot error', error);
    }
}

export const getBallots = async () => {
    try {
        const result = await ballotManagerContract.methods.getBallots().call();
        console.log(result.status); // TODO: remove
    } catch (error) {
        console.error('getBallots error', error);
    }
}

export const giveRigthToVote = async (to) => {
    try {

    } catch (error) {

    }
} 

export const vote = async (ballotAdress, proposal) => {
    try {
        const ballotContract = new web3.eth.Contract(ballotAbi, ballotAdress);

    } catch (error) {

    }
}

export const delegateVote = async (to) => {
    try {

    } catch (error) {

    }
}



// export const createProposal = async (name) => {
//     try {
//         const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//         const receipt = await contract.methods.createProposal(name).send({ from: accounts[0] });
//         console.log(receipt.status);
//     } catch (error) {
//         console.error('createProposal error', error);
//     }
// }

// export const getProposals = async () => {
//     try {
//         const proposal = await contract.methods.proposals(0).call();
//         console.log(proposal)
//     } catch (error) {
//         console.error('Proposals error', error);
//     }
// }
