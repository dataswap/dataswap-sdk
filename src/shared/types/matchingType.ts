export enum MatchingState {
    None,
    Published, // Matching is published and open for bids
    InProgress, // Matching is currently in progress
    Paused, // Matching is paused
    Closed, // Matching is closed and no longer accepting bids
    Completed, // Matching is completed
    Cancelled, // Matching is cancelled
    Failed // Matching has failed
}