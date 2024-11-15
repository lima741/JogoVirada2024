import { writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

// Função para salvar os dados em um arquivo JSON
function saveDataToFile(data) {
    writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Função para carregar os dados do arquivo JSON
function loadDataFromFile() {
    if (existsSync(dataFilePath)) {
        const data = readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return { tabelaDados: [], usuarioPreenchidoPorLinha: [], contadoresUsuarios: {} };
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        saveDataToFile(data);
        res.status(200).json({ message: 'Dados salvos com sucesso!' });
    } else if (req.method === 'GET') {
        const data = loadDataFromFile();
        res.status(200).json(data);
    } else {
        res.status(405).json({ message: 'Método não permitido.' });
    }
}
