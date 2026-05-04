import fs from 'fs';
import path from 'path';

const srcPath = 'C:\\Users\\moarc\\.gemini\\antigravity\\brain\\8eccec5f-e6cf-4736-8e9d-1b34f5ea5759\\carteira_de_trabalho_1777925505708.png';
const destPath = 'C:\\Users\\moarc\\OneDrive\\Documentos\\batistaealvesadvocacialp\\client\\public\\carteira-de-trabalho.png';

try {
  // Check if source exists
  if (!fs.existsSync(srcPath)) {
    console.error('A imagem original não foi encontrada. Você pode precisar baixá-la manualmente.');
    process.exit(1);
  }
  
  // Create public directory if it doesn't exist
  const publicDir = path.dirname(destPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(srcPath, destPath);
  console.log('✅ Sucesso! A imagem da Carteira de Trabalho foi copiada para a pasta public.');
  console.log('Agora você pode atualizar o seu navegador.');
} catch (err) {
  console.error('Erro ao copiar a imagem:', err);
}
