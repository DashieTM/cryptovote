export type ProposalType = {
  name: string,
  votes: number,
}

export type BallotType = {
  name: string,
  address: string,
  proposals: ProposalType[]
}

export enum EventTypes {
  BallotCreatedEvent,
  VotedEvent,
  VoteGivenEvent,
  VoteDelegatedEvent,
  None
}

export function createEvent(event) {
  console.log(event);
  if (event.event == "BallotCreated") {
    return {
      type: EventTypes.BallotCreatedEvent,
      from_address: event.returnValues.creator,
      on_address: event.returnValues.ballotAddress,
      to_address: "",
    }
  }
  if (event.event == "Voted") {
    return {
      type: EventTypes.VotedEvent,
      from_address: event.returnValues.voter,
      on_address: event.returnValues.ballotAddress,
      to_address: event.returnValues.proposal,
    }
  }
  if (event.event == "VoteGiven") {
    return {
      type: EventTypes.VoteGivenEvent,
      from_address: event.returnValues.owner,
      on_address: event.returnValues.ballotAddress,
      to_address: event.returnValues.recipient,
    }
  }
  if (event.event == "VoteDelegated") {
    return {
      type: EventTypes.VoteDelegatedEvent,
      from_address: event.returnValues.owner,
      on_address: event.returnValues.ballotAddress,
      to_address: event.returnValues.recipient,
    }
  }
  return {
    type: EventTypes.None,
    from_address: "",
    on_address: "",
    to_address: "",
  }
}

