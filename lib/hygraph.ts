import { GraphQLClient } from 'graphql-request';

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
  timeout: 15000, // 15 second timeout
  fetch: async (url: RequestInfo, options: RequestInit = {}) => {
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
          throw new Error(
            `Failed to fetch after ${maxRetries} attempts. Last error: ${lastError.message}`
          );
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    throw lastError;
  }
});

export const getEvents = async () => {
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

    const { events } = await hygraphClient.request(query);
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

    const { events } = await hygraphClient.request(query);
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

    const { event } = await hygraphClient.request(query, { slug });
    return event;
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error);
    throw new Error('Failed to fetch event details. Please try again later.');
  }
};