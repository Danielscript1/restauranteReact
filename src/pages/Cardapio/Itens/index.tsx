import styles from './Itens.module.scss';
import Items from './itens.json'
import Item from './Item';
import { useEffect, useState } from 'react';

interface Props{
busca: string;
filtro: number | null;
ordenador: string; 
}


export default function Itens(props:Props){

    const [lista,setLista] = useState(Items);
   
    const {filtro,busca,ordenador} = props;

    function testarBuscador(title: string) {
        const regex = new RegExp(busca,"i");
        return regex.test(title);
    }

    function testarFilter(id: number) {
        if(id != null ) return filtro === id;
        return true;
    }

    function ordenar(novaLista: typeof Items) {
        switch(ordenador) {
          case 'porcao': 
            return novaLista.sort((a, b) => a.size > b.size ? 1 : -1);
          case 'qtd_pessoas':
            return novaLista.sort((a,b) => a.serving > b.serving ? 1 : -1);
          case 'preco':
            return novaLista.sort((a,b) => a.price > b.price ? 1 : -1);
          default:
            return novaLista; 
        }
      }

    useEffect(()=>{
      const novaLista = Items.filter(item => testarBuscador(item.title) && testarFilter(item.category.id) );
      setLista(ordenar(novaLista));
    },[busca,filtro,ordenador])

    useEffect(()=>{
      setLista(Items)
      },[])

    return(
        <div className={styles.itens}>{lista.map((item) => (
            <Item key={item.id} {...item}/>
        ))}</div>
    )
}


