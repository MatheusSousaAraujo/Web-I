const URL = "https://dummyjson.com/recipes";

async function chamarApi(query) {
    const resp = await fetch(URL);
    console.log(resp);
    if (resp.status === 200) {
        const obj = await resp.json();
        console.log(obj);
        // Filtrar receitas de acordo com a pesquisa do usuário
        const resultados = obj.recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query.toLowerCase())
        );
        
        // Exibir os resultados na div #resultado
        mostrarResultados(resultados);
    } else {
        // Caso a requisição falhe
        document.getElementById('resultado').innerHTML = "<p style='color: red;'>Erro ao carregar as receitas. Tente novamente mais tarde.</p>";
    }
}

function mostrarResultados(resultados) {
    const resultadoDiv = document.getElementById('resultado');
    if (resultados.length > 0) {
        // Criar uma lista de receitas encontradas
        resultadoDiv.innerHTML = "<ul>" + resultados.map(recipe => {
            return `
                <li style="list-style: none; padding: 10px; background-color: #f0f8ff; margin: 5px 0; border-radius: 5px;">
                    <h3 style="margin-bottom: 5px; color: #333;">${recipe.name}</h3>
                    <p><strong>Ingredientes:</strong> ${recipe.ingredients.join(', ')}</p>
                    <p><strong>Modo de preparo:</strong> ${recipe.description || 'Descrição não disponível.'}</p>
                    <p><strong>Tempo de preparo:</strong> ${recipe.cookingTime || 'N/A'} minutos</p>
                    ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" style="width: 100%; max-width: 200px; margin-top: 10px; border-radius: 5px;">` : ''}
                </li>
            `;
        }).join('') + "</ul>";
    } else {
        resultadoDiv.innerHTML = "<p style='color: orange;'>Nenhuma receita encontrada com o nome informado.</p>";
    }
}

function Pesquisar() {
    const query = document.getElementById('recipe-input').value;
    if (query.trim() !== '') {
        chamarApi(query);
    } else {
        document.getElementById('resultado').innerHTML = "<p style='color: red;'>Por favor, digite uma receita para pesquisar.</p>";
    }
}
