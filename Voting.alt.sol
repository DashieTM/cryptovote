// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Ballot {
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted; // if true, that person already voted
        address delegate; // person delegated to
        uint vote; // index of the voted proposal
    }

    struct Proposal {
        string name;
        uint voteCount; // number of accumulated votes
    }

    struct BallotData {
        address creator;
        string name;
        bool isOpen;
        Proposal[] proposals;
    }

    address public chairperson;
    mapping(address => Voter) public voters;
    BallotData[] public ballots;

    constructor() {
        chairperson = msg.sender;
    }

    function createBallot(string memory name) public {
        require(msg.sender == chairperson, "Only chairperson can create ballots");
        ballots.push(BallotData({
            creator: msg.sender,
            name: name,
            isOpen: true,
            proposals: new Proposal[](0)
        }));
    }

    function addProposal(uint ballotIndex, string memory proposalName) public {
        BallotData storage ballot = ballots[ballotIndex];
        require(msg.sender == ballot.creator, "Only the creator can add proposals");
        require(ballot.isOpen, "Ballot is closed");
        ballot.proposals.push(Proposal({
            name: proposalName,
            voteCount: 0
        }));
    }

    function closeBallot(uint ballotIndex) public {
        BallotData storage ballot = ballots[ballotIndex];
        require(msg.sender == ballot.creator, "Only the creator can close the ballot");
        require(ballot.isOpen, "Ballot is already closed");
        ballot.isOpen = false;
    }

    function vote(uint proposal) public {
        require(currentBallot.isOpen, "Ballot is closed");
        require(proposal < currentBallot.proposalVoteCounts.length, "Invalid proposal");
        currentBallot.proposalVoteCounts[proposal]++;
    }

    function getPastBallotsCount() public view returns (uint) {
        return pastBallots.length;
    }

    function getPastBallot(uint index) public view returns (string memory, bool, uint[] memory) {
        require(index < pastBallots.length, "Invalid index");
        return (pastBallots[index].name, pastBallots[index].isOpen, pastBallots[index].proposalVoteCounts);
    }
}
