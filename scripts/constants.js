const ipRegex = /^(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3})$|^(?:[0-9a-fA-F]{1,4}(?::[0-9a-fA-F]{1,4}){0,7})$/;
const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}$/;
const geoIpBaseUrl = 'https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_rWCwhOz8XFt6RpC7s5XZe06EpgLh1&';
const localKeyForHistory = 'history';