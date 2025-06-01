import { GraphQLClient } from 'graphql-request';
import { DuduraveEvent, EventsResponse, EventDetailsResponse, Poll, PollOption, AboutPageContent, AboutPageResponse } from './types';

const hygraphApiEndpoint = process.env.NEXT_PUBLIC_HYGRAPH_API_ENDPOINT;

if (!hygraphApiEndpoint) {
  throw new Error(
    "NEXT_PUBLIC_HYGRAPH_API_ENDPOINT environment variable is not defined. Please set it to your Hygraph API endpoint URL."
  );
}

// Verify that the URL is absolute (starts with http:// or https://)
if (!hygraphApiEndpoint.startsWith('http://') && !hygraphApiEndpoint.startsWith('https://')) {
  throw new Error(
    "NEXT_PUBLIC_HYGRAPH_API_ENDPOINT must be an absolute URL starting with http:// or https://"
  );
}

// Configure the GraphQL client with timeout and retries
const hygraphClient = new GraphQLClient(hygraphApiEndpoint, {

  fetch: async (url: RequestInfo | URL, options: RequestInit = {}) => {
    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
      } catch (error) {
        lastError = error as Error;

        // If this was the last attempt, throw the error
        if (attempt === maxRetries) {
          throw lastError;
        }
      }
    }

    // This line should never be reached
    throw new Error("Unexpected error in fetch implementation");
  },
});

// Admin client for write operations (mutations)
const hygraphAdminApiEndpoint = process.env.NEXT_PUBLIC_HYGRAPH_ADMIN_API_ENDPOINT;
const hygraphAdminToken = process.env.NEXT_PUBLIC_HYGRAPH_ADMIN_API_TOKEN;
if (!hygraphAdminApiEndpoint || !hygraphAdminToken) {
  throw new Error('HYGRAPH_ADMIN_API_ENDPOINT and HYGRAPH_ADMIN_API_TOKEN must be set for mutations');
}
const hygraphAdminClient = new GraphQLClient(hygraphAdminApiEndpoint, {
  headers: { Authorization: `Bearer ${hygraphAdminToken}` },
});

export const getEvents = async (): Promise<DuduraveEvent[]> => {
  try {
    const query = `
      query Events {
        events(orderBy: date_ASC) {
          id
          title
          description
          date
          location
          price
          image {
            url
          }
          slug
        }
      }
    `;

    const { events } = await hygraphClient.request<EventsResponse>(query);
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events. Please try again later.');
  }
};

export const getAllEvents = async () => {
  try {
    const query = `
      query Events {
        events(orderBy: date_ASC) {
          slug
        }
      }
    `;

    const { events } = await hygraphClient.request<EventsResponse>(query)
    return events;
  } catch (error) {
    console.error('Error fetching all events:', error);
    throw new Error('Failed to fetch events. Please try again later.');
  }
};

export const getEventBySlug = async (slug: string) => {
  try {
    const query = `
      query EventBySlug($slug: String!) {
        event(where: { slug: $slug }) {
          id
          title
          description
          date
          location
          price
          image {
            url
          }
          slug
        }
      }
    `;

    const { event } = await hygraphClient.request<EventDetailsResponse>(query, { slug });
    return event;
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error);
    throw new Error('Failed to fetch event details. Please try again later.');
  }
};

export const getLatestPoll = async (): Promise<Poll | null> => {
  try {
    const query = `
      query GetLatestPoll {
        polls(orderBy: createdAt_DESC, first: 1) {
          id
          question
          options {
            id
            text
            votes
          }
        }
      }
    `;
    const { polls } = await hygraphClient.request<{ polls: Poll[] }>(query);
    return polls.length ? polls[0] : null;
  } catch (error) {
    console.error('Error fetching latest poll:', error);
    throw new Error('Failed to fetch latest poll.');
  }
};

export const voteOnPollOption = async (optionId: string): Promise<void> => {
  try {
    // fetch current poll to compute new votes
    const poll = await getLatestPoll();
    if (!poll) throw new Error('No poll found');
    const option = poll.options.find(o => o.id === optionId);
    if (!option) throw new Error('Option not found');
    const newVotes = option.votes + 1;
    
    // Update and publish in one mutation
    const mutation = `
      mutation VoteOnOption($id: ID!, $votes: Int!) {
        # First update the votes
        updateOption(where: { id: $id }, data: { votes: $votes }) {
          id
          votes
        }
        # Then publish the updated option
        publishOption(where: { id: $id }) {
          id
          votes
        }
      }
    `;
    
    await hygraphAdminClient.request(mutation, { id: optionId, votes: newVotes });
  } catch (error) {
    console.error('Error voting on option:', error);
    throw new Error('Failed to submit vote.');
  }
};

/**
 * Fetches the About page content from Hygraph CMS.
 *
 * @returns {Promise<AboutPageContent>} The About page content or null if not found
 * @throws {Error} If the API call fails
 */
export const getAboutPageContent = async (): Promise<AboutPageContent | null> => {
  try {
    const query = `
      query GetAboutPageContent {
        aboutPages(first: 1) {
          id
          title
          subtitle
          introText
          missionTitle
          missionText
          valuesTitle
          valuesList {
            id
            title
            description
          }
        }
      }
    `;

    const response = await hygraphClient.request<{aboutPages: AboutPageContent[]}>(query);
    return response.aboutPages && response.aboutPages.length > 0 ? response.aboutPages[0] : null;
  } catch (error) {
    console.error('Error fetching about page content:', error);
    throw new Error('Failed to fetch about page content. Please try again later.');
  }
};