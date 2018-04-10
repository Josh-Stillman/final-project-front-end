let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === 'localhost') {
  backendHost = 'http://localhost:3000';
} else {
  backendHost = 'https://follow-your-money-back-end.herokuapp.com';
}

export const API_ROOT = backendHost;

//'follow-your-money.herokuapp.com'
