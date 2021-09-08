export default function ({ $axios }, inject) {
    const api = $axios.create();
    api.setBaseURL('https://services.ghtklab.com');
    inject('api', api);
  }