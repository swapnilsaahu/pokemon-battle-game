searchPokemons();
defaultPokemons();
async function searchPokemons(){
    try {
        
        const search = document.getElementById("searchBar")
        const displayBox = document.getElementById("displayAreaPokemon")
        search.addEventListener("input",async function(){
            displayBox.innerHTML =""
            const query = search.value.toLowerCase();
            const linkPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
            const linkPokeJson = await linkPoke.json();
            console.log(linkPokeJson);

            const addPoke = document.createElement("div");
            const addImg = document.createElement("img")
            addImg.src = linkPokeJson.sprites.front_default;
            addPoke.appendChild(addImg);
            displayBox.appendChild(addPoke);
        });
           } catch (error) {
        console.log(error)
    }
}

async function defaultPokemons(){
        const data = await (fetch("https://pokeapi.co/api/v2/pokemon"))
        const fetchPokemons=  await data.json();
        console.log(fetchPokemons);
        const pokeNames = fetchPokemons.results.map(results => results.name);
        console.log(pokeNames);

        let i=0;
        const lengthArr = pokeNames.length;
        const rightArrow = document.getElementById("rightArrow");
        const leftArrow = document.getElementById("leftArrow");
        const smallDisplay = document.getElementById("smallDisplayImgHolder");
        const getDefaultPoke = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeNames[i]}`)
        const getDefaultPokeJson = await getDefaultPoke.json();

        smallDisplay.src = getDefaultPokeJson.sprites.front_default;
        rightArrow.addEventListener("click", async function(){
            i++;
            console.log(i)
            const getPoke = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeNames[i]}`);
            const getPokeJson = await getPoke.json();
            console.log(getPokeJson)
            smallDisplay.src=getPokeJson.sprites.front_default;
        });
        leftArrow.addEventListener("click", async function(){
            i--;
            let index = lengthArr+i;
            console.log(index)
            const getPoke = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeNames[index]}`);
            const getPokeJson = await getPoke.json();
            console.log(getPokeJson)
            smallDisplay.src=getPokeJson.sprites.front_default;
        });
}