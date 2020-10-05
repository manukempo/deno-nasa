let launches;

const numberHeading = 'No.'.padStart(5);
const dateHeading = 'Date'.padEnd(15);
const missionHeading = 'Mission'.padEnd(25);
const rocketHeading = 'Rocket'.padEnd(22);
const targetHeading = 'Destination';
const customersHeading = 'Customers';

const initValues = () => {
  const today = new Date().toISOString().split('T')[0];
  const launchDaySelector = document.getElementById('launch-day');
  launchDaySelector.setAttribute('min', today);
  launchDaySelector.setAttribute('value', today);
};

const loadLaunches = () => {
  return fetch('/launches')
    .then((launchesResponse) => launchesResponse.json())
    .then((fetchedLaunches) => {
      launches = fetchedLaunches.sort(
        (a, b) => a.flightNumber < b.flightNumber
      );
    });
};

const loadPlanets = () => {
  return fetch('/planets')
    .then((planetsResponse) => planetsResponse.json())
    .then((planets) => {
      const selectPlanet = document.querySelector('#planets-selector');
      selectPlanet.innerHTML = planets.map(
        (planet) =>
          `<option value="${planet.kepler_name}">${planet.kepler_name}</option>`
      );
    });
};

const listUpcoming = () => {
  const upcomingList = document.getElementById('upcoming-list');
  upcomingList.innerHTML = `
  <table class="table table-hover table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">${numberHeading}</th>
        <th scope="col">${dateHeading}</th>
        <th scope="col">${missionHeading}</th>
        <th scope="col">${rocketHeading}</th>
        <th scope="col">${targetHeading}</th>
      </tr>
    </thead>
    <tbody id="launch-data">
    </tbody>
  </table>`;
  const launchData = document.getElementById('launch-data');
  launches
    .filter((launch) => launch.upcoming)
    .forEach((launch) => {
      const launchDate = new Date(launch.launchDate * 1000).toDateString();
      const flightNumber = String(launch.flightNumber).padEnd(3);
      const mission = launch.mission.slice(0, 25).padEnd(25);
      const rocket = launch.rocket.padEnd(22);
      const target = launch.target ?? '';
      launchData.innerHTML += `
      <tr>
        <th scope="row"><a class="btn btn-outline-danger btn-sm" onclick="abortLaunch(${launch.flightNumber})">✖</a></th>
        <td>${flightNumber}</td>
        <td>${launchDate}</td>
        <td>${mission}</td>
        <td>${rocket}</td>
        <td>${target}</td>
      </tr>`;
    });
};

const listHistory = () => {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = `
  <table class="table table-hover table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">${numberHeading}</th>
        <th scope="col">${dateHeading}</th>
        <th scope="col">${missionHeading}</th>
        <th scope="col">${rocketHeading}</th>
        <th scope="col">${customersHeading}</th>
      </tr>
    </thead>
    <tbody id="launch-history">
    </tbody>
  </table>`;
  const launchHistory = document.getElementById('launch-history');
  launches
    .filter((launch) => !launch.upcoming)
    .forEach((launch) => {
      const success = launch.success
        ? `<span class="success">█</span>`
        : `<span class="failure">█</span>`;
      const launchDate = new Date(launch.launchDate * 1000).toDateString();
      const flightNumber = String(launch.flightNumber).padEnd(3);
      const mission = launch.mission.slice(0, 25).padEnd(25);
      const rocket = launch.rocket.padEnd(22);
      const customers = launch.customers.join(', ').slice(0, 27);
      launchHistory.innerHTML += `
      <tr>
        <th scope="row">${success}</th>
        <td>${flightNumber}</td>
        <td>${launchDate}</td>
        <td>${mission}</td>
        <td>${rocket}</td>
        <td>${customers}</td>
      </tr>`;
    });
};

const navigate = (navigateTo) => {
  const pages = ['history', 'upcoming', 'launch'];
  document.getElementById(navigateTo).hidden = false;
  pages
    .filter((page) => page !== navigateTo)
    .forEach((page) => (document.getElementById(page).hidden = true));
  document.getElementById('launch-success').hidden = true;
  if (navigateTo === 'upcoming') {
    loadLaunches();
    listUpcoming();
  } else if (navigateTo === 'history') {
    loadLaunches();
    listHistory();
  }
};

window.onload = () => {
  initValues();
  loadLaunches();
  loadPlanets();
};
