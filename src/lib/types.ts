export type ProposalType = {
  name: string,
  votes: number,
}
export type BallotType = {
  name: string,
  address: string,
  proposals: ProposalType[]
}
