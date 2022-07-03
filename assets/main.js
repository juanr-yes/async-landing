const API = "https://sportscore1.p.rapidapi.com/teams/18806/events?page=1";

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '15aa6249ddmsh635d2108bc8ecb0p144181jsne5c82623976f',
		'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
  }
};

const content = null || document.getElementById("content");

async function fetchData(urlApi, options) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const games = await fetchData(API, options);
    let view = "";
    for (const game of games.data.slice(0,6).reverse()) {
      console.log(game)
      view += `
        <div class="group relative border-solid rounded-md border-2">
          <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75 lg:aspect-none relative">
            <img src="${(game.home_team_id === 18806) ? game.away_team.logo : game.home_team.logo}" alt="" class="mx-auto my-2">
            <span class="absolute bottom-1 right-2 px-1 rounded-md text-sm ${(game.home_team_id === 18806) ? "bg-slate-800 text-slate-300" : "bg-violet-700 text-slate-100"}">${(game.home_team_id === 18806) ? "away" : "home"}</span>
          </div>
          <div class="p-3 justify-between">
            <h3 class="text-sm text-gray-700">
              ${game.challenge.name}
            </h3>
            <h4>
              vs. ${(game.home_team_id === 18806) ? game.away_team.name : game.home_team.name}
            </h4>
            <h5 class="text-xs text-gray-700">
              ${new Date(game.start_at).toLocaleDateString("en-GB")}
            </h5>
          </div>
        </div>
      `;
    }
    content.innerHTML = view;
  } catch (error) {
    console.log(`Te has encontrado con un error: ${error}`);
  }
})();