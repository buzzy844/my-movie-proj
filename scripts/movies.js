import fetch from "node-fetch";

import promptFn from "prompt-sync";
const prompt = promptFn();

async function add(data) {
  const res = await fetch(
    "https://my-mov-proj-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();

  return result.name;
}

async function main() {
  const imDbId = encodeURI(prompt("baga aici idul pls: "));

  console.log(`hai sa vedem daca gasim ce ai dat aici ${imDbId}`);

  const res = await fetch(
    `http://www.omdbapi.com/?i=${imDbId}&apikey=97690e43`
  );

  const data = await res.json();

  if (!data) {
    throw "smr eu ce cacat mi ai dat ca nu exista pe imdb retardatule mama ";
  }

  if (data.Poster === "N/A") {
    throw "Nu are poster veric da altceva smr eu";
  }

  const movie = {
    url: data.Poster,
    title: data.Title,
    year: parseInt(data.Year),
    description: data.Plot,
  };

  console.log(`hai ca adaugam filmu asta nebun ${movie.title}`);

  await add(movie);

  console.log("gata frt ");
}

main();
