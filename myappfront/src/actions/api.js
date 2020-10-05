import axios from "axios";

const baseUrl="http://localhost:4000/";

export default{
    user(url=baseUrl+"users/"){
        return{
            login:()=> axios.post(url,),
            fetchAll:() => axios.get(url),
            fetchById:id => axios.get(url+id),
            create: newUser =>axios.post(url,newUser),
            update:(id,updatedUser) => axios.put(url+id,updatedUser),
            delete:id => axios.delete(url+id)
        }
    },
    modele(url=baseUrl+"modeles/"){
        return{
            fetchAll:() => axios.get(url),
            fetchById:id => axios.get(url+id),
            create: newModele =>axios.post(url,newModele),
            update:(id,updatedModele) => axios.put(url+id,updatedModele),
            delete:id => axios.delete(url+id)
        }
    },
    produit(url=baseUrl+"produits/"){
        return{
            fetchAll:() => axios.get(url),
            fetchById:id => axios.get(url+id),
            create: newProduct =>axios.post(url,newProduct),
            update:(id,updatedProduct) => axios.put(url+id,updatedProduct),
            delete:id => axios.delete(url+id)
        }
    }
    
}