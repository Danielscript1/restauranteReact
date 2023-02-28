import styles from "./Ordenador.module.scss";
import opcoes from './opcoes.json'
import { useState } from "react";
import classNames from "classnames";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

interface Props{
    ordenador:string;
    setOrdenador: React.Dispatch<React.SetStateAction<string>>
}

export default function Ordenador({ordenador,setOrdenador}:Props){

    const[aberto,setAberto] = useState(false);
    const opcoesOrdenador = opcoes.find(opcao => opcao.value === ordenador)?.nome;

    return(
        <button 
         onClick={()=>setAberto(!aberto)}
         onBlur={()=>setAberto(false)}
         className={
            classNames({
                [styles.ordenador]:true,
                [styles["ordenador--ativo"]]:ordenador !== ""
               
            })}
        
         >
            <span>{opcoesOrdenador || "Ordernar Por"}</span>
            {aberto ? <MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} /> }
            <div className={
                classNames({
                    [styles.ordenador__options]:true,
                    [styles["ordenador__options--ativo"]] :aberto
                   
                })
            }>
                {
                    opcoes.map((opcoes) => (
                        <div className={styles.ordenador__option}
                         key={opcoes.value}
                         onClick={() => setOrdenador(opcoes.value)}
                         >{opcoes.nome}</div>

                    ))}
                
               
            </div>
        </button>
    )
}