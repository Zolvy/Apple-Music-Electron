/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const apple_url = 'http://localhost:5500/v1/me/recommendations/';
const auth_token = localStorage.getItem('media-user-token');
const dev_token =
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNzEyOTY5NDQxLCJleHAiOjE3MjAyMjcwNDEsInJvb3RfaHR0cHNfb3JpZ2luIjpbImFwcGxlLmNvbSJdfQ.UFr00OkWHnwqPNAXOy5FospHFzX4_hjJU6H-WPU6dquP7KZE5Pe6_CukE3IbPi0EEfzHEvCYwkj84VjKAydnjA'; // Your actual dev token here

export async function Recommend() {
  try {
    const response = await fetch(apple_url, {
      headers: {
        Authorization: `Bearer ${dev_token}`,
        'Media-User-Token': `${auth_token}`,
      },
    });
    const recentsData = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const processedData = recentsData.data.map((item: any) => {
      const artworkUrl =
        item.relationships?.contents?.data[0]?.attributes?.artwork?.url;
      if (artworkUrl) {
        item.relationships.contents.data[0].attributes.artwork.url = artworkUrl
          .replace('{w}', '3000')
          .replace('{h}', '3000')
          .replace('{c}', 'hq');
      }
      return item;
    });

    console.log(processedData);
    return processedData;
  } catch (error) {
    console.error('Failed to fetch recents:', error);
    return [];
  }
}
