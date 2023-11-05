import Web3 from 'web3';

const rpcEndpoint = 'https://rpc2.sepolia.org';
const web3 = new Web3(rpcEndpoint);
const contractAddress = '';
const contractABI = [];
const contract = new web3.eth.Contract(contractABI, contractAddress);

export const checkConnection = (): boolean => {
    return true;
};

export const connectMetaMaskAccount = async () => {
    console.log(window.ethereum)
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(window.ethereum);
        return true
    }
    return false
}

export const getProposals = (): string[] => {
    let numProposals: number;
    let proposals: string[] = [];

    contract.methods.proposalsLength().call((error, result) => {
        if (!error) {
            numProposals = result.toNumber();
            for (let i = 0; i < numProposals; i++) {
                contract.methods.proposals(i).call((proposalError, proposalResult) => {
                    if (!proposalError) {
                      const proposalName: string = proposalResult.name;
                    //  const voteCount = proposalResult.voteCount.toNumber();
                      proposals.push(proposalName);
                    } else {
                      console.error('Error fetching proposal:', proposalError);
                    }
                  });
            }

        } else {
            console.error('Error fetching number of Proposals: ', error);
        }
    });

    return proposals;
}

export const vote = () => {
    return
}

export const getActiveBallots = () => {

}

export const getPastBallots = () => {
    return
}

// TODO: Publish Smart Contract onto Blockchain
// TODO: Get contract Application Binary Interface (ABI)
// TODO: Get contract address
// TODO?: Implement connection check