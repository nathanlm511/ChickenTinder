export class Group {
  passcode: string;
  host: string;
  users: [string];
  votes: [{id: string, name: string, numVotes: number }];
  started: boolean;
  winner: string;
}
