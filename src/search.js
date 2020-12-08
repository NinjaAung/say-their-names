import States from './data/states.json';

const url = 'http://ec2-52-14-129-248.us-east-2.compute.amazonaws.com/victims';
const queryURL = 'http://ec2-52-14-129-248.us-east-2.compute.amazonaws.com/victims/find?';

export default function search(gender, race, place, cam, verdict, callback, fail) {
  let fetchURL = queryURL;
  let count = 0;

  switch (gender) {
    case 'He':
      fetchURL += 'gender=Male';
      count += 1;
      break;
    case 'She':
      fetchURL += 'gender=Female';
      count += 1;
      break;
    default:
      break;
  }

  if (race !== 'someone') {
    const raceParam = encodeURIComponent(race.startsWith('a ') ? race.replace('a ', '') : race);
    fetchURL += `${count > 0 ? '&' : ''}race=${raceParam}`;
    count += 1;
  }

  if (place !== 'America') {
    let state = place;
    let area = '';
    if (place.includes(', ')) [area, state] = place.split(', ');

    state = encodeURIComponent(state);
    fetchURL += `${count > 0 ? '&' : ''}state=${States[state]}`;
    if (area) {
      if (area.endsWith(' County')) {
        area = area.replace(' County', '');
        area = encodeURIComponent(area);
        fetchURL += `&county=${area}`;
      } else {
        area = encodeURIComponent(area);
        fetchURL += `&city=${area}`;
      }
    }
    count += 1;
  }

  switch (cam) {
    case 'had':
      fetchURL += `${count > 0 ? '&' : ''}body-camera=True`;
      count += 1;
      break;
    case 'did not have':
      fetchURL += `${count > 0 ? '&' : ''}body-camera=False`;
      count += 1;
      break;
    default:
      break;
  }

  switch (verdict) {
    case 'An investigation is pending.':
      fetchURL += `${count > 0 ? '&' : ''}disposition-of-death=Pending%20investigation%2FNo%20Known%20Charges`;
      count += 1;
      break;
    case 'This was unreported.':
      fetchURL += `${count > 0 ? '&' : ''}disposition-of-death=Unreported`;
      count += 1;
      break;
    case 'This was deemed justified by a legal entity.':
      fetchURL += `${count > 0 ? '&' : ''}disposition-of-death=Justified`;
      count += 1;
      break;
    default:
      break;
  }

  fetchURL = count > 0 ? fetchURL : url;
  fetch(fetchURL)
    .then((r) => r.json())
    .then((d) => callback(d.map((v, index) => ({ index, ...v }))))
    .catch(() => fail());
}
