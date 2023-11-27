export type ProposalType = {
  name: string,
  votes: number,
}

export type BallotType = {
  name: string,
  address: string,
  proposals: ProposalType[]
}

export type Event = {
  type: EventTypes,
  from_address: string,
  on_address: string,
  to_address: string,
}

export enum EventTypes {
  BallotCreatedEvent,
  VotedEvent,
  VoteGivenEvent,
  VoteDelegatedEvent,
  None
}

export function createEvent(event): Event {
  if (event == "BallotCreated") {
    return {
      type: EventTypes.BallotCreatedEvent,
      from_address: event.from_address,
      on_address: event.on_address,
      to_address: "",
    }
  }
  if (event == "Voted") {
    return {
      type: EventTypes.VotedEvent,
      from_address: event.from_address,
      on_address: event.on_address,
      to_address: "",
    }
  }
  if (event == "VoteGiven") {
    return {
      type: EventTypes.VoteGivenEvent,
      from_address: event.from_address,
      on_address: event.on_address,
      to_address: event.to_address,
    }
  }
  if (event == "VoteDelegated") {
    return {
      type: EventTypes.VoteDelegatedEvent,
      from_address: event.from_address,
      on_address: event.on_address,
      to_address: event.to_address,
    }
  }
  return null;
}

