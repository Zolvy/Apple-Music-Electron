/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const apple_url =
  'https://amp-api.music.apple.com/v1/me/recent/played?&limit=20';
//const auth_token = localStorage.getItem('media-user-token');

const auth_token = localStorage.getItem('music.ampwebplay.media-user-token');
const dev_token =
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNzEyOTY5NDQxLCJleHAiOjE3MjAyMjcwNDEsInJvb3RfaHR0cHNfb3JpZ2luIjpbImFwcGxlLmNvbSJdfQ.UFr00OkWHnwqPNAXOy5FospHFzX4_hjJU6H-WPU6dquP7KZE5Pe6_CukE3IbPi0EEfzHEvCYwkj84VjKAydnjA';
export async function Recents() {
  try {
    const response = await fetch(apple_url, {
      headers: {
        Authorization: `Bearer ${dev_token}`,
        'Media-User-Token': `${auth_token}`,
      },
    });
    const recentsData = await response.json();

    const processedData = recentsData.data.map((item: any) => {
      if (
        item.attributes &&
        item.attributes.artwork &&
        item.attributes.artwork.url
      ) {
        item.attributes.artwork.url = item.attributes.artwork.url
          .replace('{w}', '3000')
          .replace('{h}', '3000')
          .replace('{c}', 'hq');
      }
      return item;
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(processedData);
    return processedData;
  } catch (error) {
    console.error('Failed to fetch recents:', error);
    return [];
  }
}
