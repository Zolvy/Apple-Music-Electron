/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

declare global {
  interface Window {
    MusicKit: any;
  }
}

const base_url = 'https://amp-api.music.apple.com/v1/catalog/us/albums';
const auth_token = localStorage.getItem('music.ampwebplay.media-user-token');
const dev_token =
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNzEyOTY5NDQxLCJleHAiOjE3MjAyMjcwNDEsInJvb3RfaHR0cHNfb3JpZ2luIjpbImFwcGxlLmNvbSJdfQ.UFr00OkWHnwqPNAXOy5FospHFzX4_hjJU6H-WPU6dquP7KZE5Pe6_CukE3IbPi0EEfzHEvCYwkj84VjKAydnjA'; // Your actual dev token here

export async function AlbumCatalog() {
  try {
    const hash = window.location.hash;
    const segments = hash.split('/');
    const [, , , albumId] = segments;

    const apple_url = `${base_url}/${albumId}`;

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

    const processedData = recentsData.data.map((album: any) => {
      if (album.attributes.artwork) {
        const artwork = album.attributes.artwork;
        artwork.url = artwork.url
          .replace('{w}', '3000')
          .replace('{h}', '3000')
          .replace('{c}', 'hq');
      }
      return album;
    });

    console.log(processedData);
    return processedData;
  } catch (error) {
    console.error('Failed to fetch recents:', error);
    return [];
  }
}

export async function playRecord(jsonResponse: any) {
  if (!window.MusicKit) {
    console.error(
      'MusicKit not loaded. Ensure MusicKit JS is included and initialized.',
    );
    return;
  }

  const music = window.MusicKit.getInstance();

  if (!music.isAuthorized) {
    try {
      await music.authorize();
      console.log('Authorization successful');
    } catch (error) {
      console.error('Authorization failed:', error);
      return;
    }
  }

  const trackId = jsonResponse.relationships.tracks.data[0].id;

  try {
    console.log(`Setting up the queue for track ID: ${trackId}`);
    await music.setQueue({ song: trackId });
    console.log('Queue set. Playing track...');
    await music.play();
  } catch (error) {
    console.error('Error during setting queue or playing the track:', error);
  }
}
