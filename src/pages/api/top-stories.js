import { readFile } from 'node:fs/promises';
import { cwd } from 'node:process';
import { join } from 'node:path';
async function handler(req, res) {
  const file = await readFile(join(cwd(),'src','database','top-stories.json'),'utf-8');
  const data = (JSON.parse(file));
  res.status('200').json(data);
}
export default handler;