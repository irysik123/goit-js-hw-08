/* import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

const savePlaybackTime = throttle(() => {
  player.getCurrentTime().then(currentTime => {
    localStorage.setItem('videoplayer-current-time', currentTime);
  });
}, 1000);

player.on('timeupdate', savePlaybackTime);

function resumePlaybackFromStorage() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(parseFloat(savedTime));
  }
}

window.addEventListener('load', resumePlaybackFromStorage); */

import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

const LOCAL_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(function( { seconds } ) {
    localStorage.setItem(LOCAL_KEY, seconds);
}, 1000));

player.setCurrentTime(localStorage.getItem(LOCAL_KEY) || 0);


