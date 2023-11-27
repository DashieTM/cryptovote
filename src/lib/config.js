export const ballotManagerAddress = '0x75bf581fb206F6d62769E2e6c5c5158D6c361a4E'

// export const ballotManagerAbi = [
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "ballots",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "name",
//         "type": "string"
//       },
//       {
//         "internalType": "string[]",
//         "name": "proposalNames",
//         "type": "string[]"
//       }
//     ],
//     "name": "createBallot",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "getBallots",
//     "outputs": [
//       {
//         "internalType": "address[]",
//         "name": "",
//         "type": "address[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ]
// export const ballotAbi = [
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "ballotName",
//         "type": "string"
//       },
//       {
//         "internalType": "string[]",
//         "name": "proposalNames",
//         "type": "string[]"
//       },
//       {
//         "internalType": "address",
//         "name": "chairpersonAddress",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "inputs": [],
//     "name": "chairperson",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       }
//     ],
//     "name": "delegate",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "getProposals",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "string",
//             "name": "name",
//             "type": "string"
//           },
//           {
//             "internalType": "uint256",
//             "name": "voteCount",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct Ballot.Proposal[]",
//         "name": "",
//         "type": "tuple[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "voter",
//         "type": "address"
//       }
//     ],
//     "name": "giveRightToVote",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "name",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "proposals",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "name",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "voteCount",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "proposal",
//         "type": "uint256"
//       }
//     ],
//     "name": "vote",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "name": "voters",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "weight",
//         "type": "uint256"
//       },
//       {
//         "internalType": "bool",
//         "name": "voted",
//         "type": "bool"
//       },
//       {
//         "internalType": "address",
//         "name": "delegate",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "vote",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "winnerName",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "winnerName_",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "winningProposal",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "winningProposal_",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ]

export const ballotManagerAbi = [
  {
    "anonymous": false, "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "ballotAddress",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "indexed": true,
        "internalType": "struct Proposal[]",
        "name": "proposals",
        "type": "tuple[]"
      }
    ],
    "name": "BallotCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ], "name": "ballots",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "proposalNames",
        "type": "string[]"
      }
    ],
    "name": "createBallot",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBallots",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const ballotAbi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ballotName",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "proposalNames",
        "type": "string[]"
      },
      {
        "internalType": "address",
        "name": "chairpersonAddress",
        "type": "address"
      }
    ], "stateMutability": "nonpayable",
    "type": "constructor"
  }, {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner", "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "ballotAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "VoteDelegated",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "ballotAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "VoteGiven",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter", "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "ballotAddress", "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "proposal", "type": "uint256"
      }
    ], "name": "Voted", "type": "event"
  },
  {
    "inputs": [],
    "name": "chairperson",
    "outputs": [
      {
        "internalType": "address",
        "name": "", "type": "address"
      }
    ], "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ], "name": "delegate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProposals",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Proposal[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "giveRightToVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposal",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "weight",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "voted",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "delegate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "vote",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "winnerName",
    "outputs": [
      {
        "internalType": "string",
        "name": "winnerName_",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "winningProposal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "winningProposal_",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
