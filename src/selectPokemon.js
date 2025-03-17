searchPokemons(toBattlePage);
defaultPokemons(toBattlePage);
let selectedPokemon = "";
async function searchPokemons(nextPage){
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
            selectedPokemon=query;
            nextPage();
        });

        } 
    catch (error) {
        console.log(error)
    }
}

async function defaultPokemons(nextPage){
    try{
        const data = await (fetch("https://pokeapi.co/api/v2/pokemon"))
        const fetchPokemons=  await data.json();
        console.log(fetchPokemons);
        const pokeNames = fetchPokemons.results.map(results => results.name);
        console.log(pokeNames);

        let i=0;
        const lengthArr = pokeNames.length;
        console.log(lengthArr);
        const rightArrow = document.getElementById("rightArrow");
        const leftArrow = document.getElementById("leftArrow");
        const smallDisplay = document.getElementById("smallDisplayImgHolder");
        const getDefaultPoke = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeNames[i]}`)
        const getDefaultPokeJson = await getDefaultPoke.json();

        smallDisplay.src = getDefaultPokeJson.sprites.front_default;
        
            rightArrow.addEventListener("click", async function(){
               if(i<lengthArr){ 
                    i++;
                    console.log(i)
                    const getPoke = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeNames[i]}`);
                    const getPokeJson = await getPoke.json();
                    console.log(getPokeJson)
                    smallDisplay.src=getPokeJson.sprites.front_default;
               }
            });
   
            leftArrow.addEventListener("click", async function(){
                if(i>=0){
                    i--;
                    console.log(i)
                    const getPoke = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeNames[i]}`);
                    const getPokeJson = await getPoke.json();
                    console.log(getPokeJson) 

                    smallDisplay.src=getPokeJson.sprites.front_default; 
                } 
            }); 

            const defaultSelection = document.getElementById("defaultSelection"); 
            defaultSelection.onclick = async function(getPokeJson){ 
                        selectedPokemon=pokeNames[i]; 
                        nextPage();
                    }
        
        }
        catch(error){
            console.log(error)
        }
}

function toBattlePage(){
    document.getElementById("selectBtn").onclick = () =>{
        localStorage.setItem("selectedPokemon", selectedPokemon);
        window.location.href = "battleHtml.htm"
    }

    
}



