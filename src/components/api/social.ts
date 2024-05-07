/* eslint-disable @typescript-eslint/no-unused-vars */
const apple_url = 'https://amp-api.music.apple.com/v1/me/social/profile/';
//const auth_token = localStorage.getItem('media-user-token');
const auth_token = localStorage.getItem('music.ampwebplay.media-user-token');
const dev_token =
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNzEyOTY5NDQxLCJleHAiOjE3MjAyMjcwNDEsInJvb3RfaHR0cHNfb3JpZ2luIjpbImFwcGxlLmNvbSJdfQ.UFr00OkWHnwqPNAXOy5FospHFzX4_hjJU6H-WPU6dquP7KZE5Pe6_CukE3IbPi0EEfzHEvCYwkj84VjKAydnjA';
export async function profile() {
  try {
    const response = await fetch(apple_url, {
      headers: {
        Authorization: `Bearer ${dev_token}`,
        'Media-User-Token': `${auth_token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    if (
      json.data &&
      json.data[0] &&
      json.data[0].attributes &&
      json.data[0].attributes.artwork
    ) {
      const artworkUrl = json.data[0].attributes.artwork.url
        .replace('{w}', '34')
        .replace('{h}', '34')
        .replace('{c}', '');
      const username = json.data[0].attributes.name;
      return {
        ...json.data[0].attributes,
        artwork: {
          ...json.data[0].attributes.artwork,
          url: artworkUrl,
        },
        user: {
          ...json.data[0].attributes.name,
          name: username,
        },
      };
    } else {
      console.error('Profile data is missing the expected structure:', json);
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return null;
  }
}
