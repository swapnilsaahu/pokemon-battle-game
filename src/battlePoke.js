const selectedPokemon = localStorage.getItem("selectedPokemon");
document.getElementById("displaySelectedPokemon").textContent = selectedPokemon;
displayPokemon();
async function displayPokemon(){
    try{
        const displayPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        const getPokeJson = await displayPokemon.json();
        console.log(getPokeJson)
        const displayPlayer=document.getElementById("playerImagePokemon");
        displayPlayer.src=getPokeJson.sprites.front_default;
    }
    catch(error){
        console.log(error);
    }
}

async function attacks(){
    try {
        
    } catch (error) {
        console.error("there was an error fetching attacks")
    }
}