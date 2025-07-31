const HARDCOVER_API_URL = "https://api.hardcover.app/v1/graphql";
const HARDCOVER_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXJkY292ZXIiLCJ2ZXJzaW9uIjoiOCIsImp0aSI6IjAxNTBkZmVmLWE1MDktNGUwNC1hZTJkLTY0ZWQzY2YxODkyMyIsImFwcGxpY2F0aW9uSWQiOjIsInN1YiI6IjE2ODAiLCJhdWQiOiIxIiwiaWQiOiIxNjgwIiwibG9nZ2VkSW4iOnRydWUsImlhdCI6MTc1Mzk4NzUxNSwiZXhwIjoxNzg1NTIzNTE1LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtcm9sZSI6InVzZXIiLCJYLWhhc3VyYS11c2VyLWlkIjoiMTY4MCJ9LCJ1c2VyIjp7ImlkIjoxNjgwfX0.kWiQ6AAUZZnqpyxpybuIYzJtMI9PtdLrGzjBGmBHtnE";

const GET_READ_BOOKS_QUERY = `
  query getReadBooks {
    me {
      user_books(
        where: {user_book_status: {status: {_eq: "Read"}}}, 
        order_by: {created_at: desc}
      ) {
        id
        created_at
        book {
          title
          subtitle
          default_cover_edition {
            image {
              url
            }
          }
          slug
        }
      }
    }
  }
`;

export interface Book {
  title: string;
  subtitle?: string;
  default_cover_edition?: {
    image?: {
      url: string;
    };
  };
  slug: string;
}

export interface UserBook {
  id: string;
  created_at: string;
  book: Book;
  user_book_status: {
    status: string;
  };
}

export async function getReadBooks(): Promise<UserBook[]> {
  try {
    const response = await fetch(HARDCOVER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: HARDCOVER_TOKEN,
      },
      body: JSON.stringify({
        query: GET_READ_BOOKS_QUERY,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`);
    }

    return data.data.me[0].user_books;
  } catch (error) {
    console.error("Error fetching read books:", error);
    return [];
  }
}
