import { AutoClient } from 'discord-auto-rpc';
import { clientid } from './index.json';

const client = new AutoClient({ transport: 'ipc' });

const setActivity = () => {
  client.setActivity({
    details: 'Apple Music',
    state: 'Musickit V3',
    startTimestamp: new Date(),
    largeImageKey: 'apple',
    buttons: [
      { label: 'Github', url: 'https://github.com/Zolvy/Apple-Music-Electron' },
    ],
  });
};

client.once('ready', () => {
  setActivity();
  setInterval(setActivity, 15e3);
});

client.endlessLogin({ clientId: clientid });

console.log('RPC Loaded!');
