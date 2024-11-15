import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Método não permitido' });
  }

  const { linha, coluna, valor, usuario } = req.body;

  const { error } = await supabase.from('celulas').insert([{ linha, coluna, valor, usuario }]);
  
  if (error) {
    return res.status(500).json({ error: 'Erro ao salvar dados' });
  }

  return res.status(200).json({ message: 'Dados salvos com sucesso' });
}
