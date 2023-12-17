import { readFile } from 'node:fs/promises';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { collection, getDocs } from "firebase/firestore";
import { db2 } from '../../components/utils';
async function handler(req, res) {
    const file = await readFile(join(cwd(),'src','database','firebase_data.json'),'utf-8');
    const result = (JSON.parse(file));
    const community = await getDocs(collection(db2, "community"));
    let categ = {"category":"community","articles":[]}
    community.forEach((doc)=>{
      categ.articles.push(doc.data());
    })
    result.results.push(categ)
    await res.status(200).json(result);
}
export default handler;