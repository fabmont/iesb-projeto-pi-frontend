export default function capitalizeString(str = '') {
  return str
    .split(' ')
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase())
    .join(' ');
}
