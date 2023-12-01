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
    return -1;
  }
}

export const createBallot = async (ballotName, proposalNames) => {
  await ballotManagerContract.once('BallotCreated', {}, function(error, event) {
    console.log(event);
    ballotAddress = event.ballotAddress;
  });
  try {
    let ballotAddress;
    const account = await getAccount();
    const receipt = await ballotManagerContract.methods.createBallot(ballotName, proposalNames).send({ from: account });
    console.log(receipt);
    if (receipt.status) {
      return {
        status: true,
        address: ballotAddress
      }
    }
    return {
      status: false,
      address: null
    }

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
    return ballots.reverse();

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
    console.error('vote error', error);
  }
}

export const delegateVote = async (ballotAddress, to) => {
  try {
    const account = await getAccount();
    const ballotContract = new web3.eth.Contract(ballotAbi, ballotAddress);
    const receipt = await ballotContract.methods.delegate(to).send({ from: account });

    return receipt.status > 0 ? true : false;

  } catch (error) {
    console.error('delegateVote error', error.message);
  }
}

export const isChairperson = async (ballotAddress) => {
  try {
    const account = await getAccount();
    const ballotContract = new web3.eth.Contract(ballotAbi, ballotAddress);
    const chairperson = await ballotContract.methods.chairperson().call();

    return chairperson.toLowerCase() === account.toLowerCase();
  } catch (error) {
    console.log('isChairperson error', error);
  }
}

export const hasRightToVote = async (ballotAddress) => {
  try {
    const account = await getAccount();
    const ballotContract = new web3.eth.Contract(ballotAbi, ballotAddress);
    const voter = await ballotContract.methods.voters(account).call();

    return voter.weight > 0;
  } catch (error) {
    console.error('hasRightToVote error', error);
  }
}

export const hasVoted = async (ballotAddress) => {
  try {
    const account = await getAccount();
    const ballotContract = new web3.eth.Contract(ballotAbi, ballotAddress);
    const voter = await ballotContract.methods.voters(account).call();

    return voter.voted;
  } catch (error) {
    console.error('hasVoted error', error);
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

export const unsubscribeAllEvents = async () => {
  await web3.eth.clearSubscripotions();
}

export const subscribeEvents = async (func) => {
  try {
    const result = await web3.eth.getBlockNumber();
    if (result !== null) {
      var lel = await web3.eth.subscribe('logs', { fromBlock: "earliest", address: ballotManagerAddress, topics: [] });
      lel.on("data", async (log) => {
        try {
          console.log("trying");
          const decodedData = web3.eth.abi.decodeLog([
            {
              indexed: true,
              internalType: "address",
              name: "creator",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "ballotAddress",
              type: "address"
            },
            {
              components: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string"
                },
                {
                  internalType: "uint256",
                  name: "voteCount",
                  type: "uint256"
                }
              ],
              indexed: true,
              internalType: "struct Proposal[]",
              name: "proposals",
              type: "tuple[]"
            }
          ], log.data, log.topics);
          console.log(decodedData);
          await func(decodedData);
          // this is literal hell...
        } catch (error) {
          // this means another event fired, which we ignore
          console.log("got some other event");
        }
      });
    }
  } catch (error) {
    console.error('error bro', error);
  }
}

export const subscribeBallotEvents = async (addresses, func) => {
  try {
    const result = await web3.eth.getBlockNumber();
    if (result !== null) {
      var lel = await web3.eth.subscribe('logs', { fromBlock: "earliest", address: addresses, topics: [] });
      lel.on("data", async (log) => {
        try {
          console.log("trying");
          const decodedData = web3.eth.abi.decodeLog([
            {
              indexed: true,
              internalType: "address",
              name: "voter",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "ballotAddress",
              type: "address"
            },
            {
              indexed: false,
              internalType: "string",
              name: "proposal",
              type: "string"
            }
          ], log.data, log.topics);
          console.log(decodedData);
          await func(decodedData);
          // this is literal hell...
        } catch (error) {
          // this means another event fired, which we ignore
          console.log("got some other event");
        }
      });
    }
  } catch (error) {
    console.error('error bro', error);
  }
}

export const getLogsOfBallot = async (ballotAddress) => {
  try {
    const ballotContract = new web3.eth.Contract(ballotAbi, ballotAddress);
    const result = await web3.eth.getBlockNumber();
    console.log(result);
    if (result !== null) {
      const events = await ballotContract.getPastEvents("allEvents", { fromBlock: result - 1000n, toBlock: result }).then((geil) => { return geil; });
      console.log(events);
      return events;
    }
    return [];
  } catch (error) {
    console.error('getWinningProposal error', error);
    return [];
  }
}

export const getLogs = async () => {
  try {
    const result = await web3.eth.getBlockNumber();
    if (result !== null) {
      const events = await ballotManagerContract.getPastEvents("allEvents", { fromBlock: result - 1000n, toBlock: result }).then((geil) => { return geil; });
      return events;
    }
    return [];
  } catch (error) {
    console.error('getWinningProposal error', error);
    return [];
  }
}
