import fs from 'fs/promises';

async function processData() {
    try {
        const rawData = await fs.readFile('data.json', 'utf8');
        const data = JSON.parse(rawData) as { id: number; nome: string; idade: number }[];

        const updatedData = data.map(person => ({
            ...person,
            idade: person.idade + 1
        }));

        await fs.writeFile('updatedData.json', JSON.stringify(updatedData, null, 2), 'utf8');
        console.log('Arquivo updatedData.json criado com sucesso!');
    } catch (error) {
        console.error('Erro ao processar o arquivo:', error);
    }
}

processData();