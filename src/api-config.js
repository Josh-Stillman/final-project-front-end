let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === 'follow-your-money.herokuapp.com') {
  backendHost = 'https://follow-your-money-back-end.herokuapp.com/';
} else {
  backendHost = 'http://localhost:3000';
}

export const API_ROOT = backendHost;
