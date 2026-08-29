require('dotenv').config();
const OpenAI = require('openai');
const instructions = require('../data/anderson-ai');

// Função para lidar com a rota /api/chat
module.exports = async (req, res) => {
    // Cabeçalhos CORS para permitir requisições seguras
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Resposta rápida para requisições de preflight do navegador (OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    // Parse defensivo do corpo da requisição
    let message = '';
    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        message = body.message;
    } catch (parseError) {
        return res.status(400).json({ error: 'Formato JSON inválido no corpo da requisição.' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Mensagem não informada ou vazia.' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('ERRO: OPENAI_API_KEY não foi configurada nas variáveis de ambiente.');
        return res.status(500).json({
            error: 'Chave da API da OpenAI não configurada no servidor. Configure OPENAI_API_KEY nas variáveis de ambiente.'
        });
    }

    try {
        const client = new OpenAI({ apiKey });

        const completion = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: instructions },
                { role: 'user', content: message.trim()}
            ],
            temperature: 0.7
        });

        const reply = completion.choices[0]?.message?.content || 'Não consegui obter uma resposta no momento.';

        return res.status(200).json({
            response: reply
        });
    } catch (error) {
        console.error('ERRO OPENAI:', {
            message: error.message,
            status: error.status,
            code: error.code,
            type: error.type
        });

        return res.status(500).json({
            error: error.message || 'Erro interno ao processar a resposta da IA.'
        });
    }
};