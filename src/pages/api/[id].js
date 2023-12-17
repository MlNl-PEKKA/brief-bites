import { collection, getDocs } from "firebase/firestore";
import { db2 } from "../../components/utils";
const collections = ['business','community','entertainment','health','international','local','national','political','science','sports','technology','top-stories']
let result = {"result":[]}
async function handler(req, res) {
  try{
      collections.map(async (c,i)=>{
      let category = {"category":c,"articles":[]}
      const querySnapshot = await getDocs(collection(db2, c));
      querySnapshot.forEach((doc)=>{
        category.articles.push(doc.data());
      })
      result.result.push(category)
    })
    await res.status(200).json(result);
  }
  catch{
    console.log("ERROR")
    res.status(500).send({ error: 'failed to fetch data' })
  }
}
export default handler;