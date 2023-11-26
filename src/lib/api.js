import Web3 from 'web3';
import { ballotManagerAddress, ballotManagerAbi, ballotAbi } from './config';

let web3;
let ballotManagerContract;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  web3.eth.handleRevert = true;
  ballotManagerContract = new web3.eth.Contract(ballotManagerAbi, ballotManagerAddress);
} else (
  console.log('MetaMask is not installed')
)

export const showWalletWindow = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.log("No compatible wallet installed");
    }
  }
}

export const connectMetaMaskAccount = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const permissions = await window.ethereum.request({ method: 'wallet_getPermissions' });

      return permissions;

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
    console.log(permissions);

    return permissions.length > 0 ? true : false;
  }
}

export const getBalance = async () => {
  try {
    const account = await getAccount();
    const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [account, null] });

    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    console.error('getBalance error')
  }
}

export const createBallot = async (ballotName, proposalNames) => {
  try {
    const account = await getAccount();
    const receipt = await ballotManagerContract.methods.createBallot(ballotName, proposalNames).send({ from: account });
    console.log(receipt); // TODO: remove
    return receipt.status > 0 ? true : false;

  } catch (error) {
    console.error('createBallot error', error);
  }
}

export const getBallots = async () => {
  try {
    const ballots = [];
    const ballotAddresses = await ballotManagerContract.methods.getBallots().call();

    for (let ballotAddress of ballotAddresses) {
      const ballotContract = new web3.eth.Contract(ballotAbi, ballotAddress);
      const name = await ballotContract.methods.name().call();

      ballots.push({ name: name, address: ballotAddress });
    }
    console.log(ballots); // TODO remove
    return ballots;

  } catch (error) {
    console.error('getBallots error', error);
  }
}

export const giveRightToVote = async (ballotAddress, to) => {
  try {
    const account = await getAccount();
    const ballotContract = new web3.eth.Contract(ballotAbi, ballotAddress);
    const receipt = await ballotContract.methods.giveRightToVote(to).send({ from: account });

    return receipt.status > 0 ? true : false;

  } catch (error) {
    console.error('giveRightToVote error', error);
  }
}

export const vote = async (ballotAddress, proposal) => {
  try {
    const account = await getAccount();
    const ballotContract = new web3.eth.Contract(ballotAbi, ballotAddress);
    const receipt = await ballotContract.methods.vote(proposal).send({ from: account });

    return receipt.status > 0 ? true : false;

  } catch (error) {
    // TODO: implement proper error handling with the reason of transaction revert
    console.error('vote error', error);
  }
}

export const delegateVote = async (ballotAddress, to) => {
  try {
    const account = await getAccount();
    const ballotContract = new web3.eth.Contract(ballotAbi, ballotAddress);
    const receipt = ballotContract.methods.delegate(to).send({ from: account });

    return receipt.status > 0 ? true : false;

  } catch (error) {
    console.error('delegateVote error', error.message);
  }
}

export const getProposals = async (ballotAddress) => {
  try {
    const ballotContract = new web3.eth.Contract(ballotAbi, ballotAddress);
    const proposals = await ballotContract.methods.getProposals().call();

    console.log(proposals);
    return proposals;

  } catch (error) {
    console.error('getProposals error', error);
  }
}

export const getWinningProposal = async (ballotAddress) => {
  try {
    const ballotContract = new web3.eth.Contract(ballotAbi, ballotAddress);
    const proposal = ballotContract.methods.winnerName().call();

    return proposal;
  } catch (error) {
    console.error('getWinningProposal error', error);
  }
}
