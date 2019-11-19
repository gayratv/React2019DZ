import React, {useEffect,useState} from 'react';
import style from './itemOneCustomHook.module.css';

import Spinner from "../spinner/spinner";
import ErrMsg from "../errorMessage/errorMessage";


// что будет в props :
// 1. getDataFunc функция получения данных
// 2. charID - id персонажа
// 3. fieldList ="aa bb" список полей для вывода через пробел
// 4. primaryKeyField = название поля с ID
// nameField - название главного поля
// promtThenEmpty = Пожалуйста, выберите персонажа

export default function ItemOneCustomHook (props) {

        // Пол/gender/Born/born/Died/died/Culture/culture
        const fld = props.fieldList || 'Пол/gender';
        let pairs =fld.split('/');
        let useEffectStart = false;
        
        let fldsArray=[];
        
        for (let i=0;i < pairs.length;i+=2) {
            let fld = {fldDesc : pairs[i] , fldName : pairs[i+1] };
            fldsArray.push(fld);
        }

        
        const [updateState,SetUpdateState] = useState(!! props.charID);
        
        const [errorState,SetErrorState] = useState(false);
        const [char, SetChar] = useState(null);

        console.log('ItemOneCustom  constructor ==== : ',props.charID);
       

        function updateChar()  {
            
            const charId = props.charID;
            if (!charId) return;
            console.log('ItemOneCustom updateChar step 1 ', charId);
            SetUpdateState(true);
            SetErrorState(false);
    
            props.getDataFunc(charId)
            .then ( data => {
                
                console.log('ItemOneCustom updateChar step 2');
                if (useEffectStart) {
                    console.log('ItemOneCustom updateChar step 3');
                
                    SetUpdateState(false);
                    console.log('ItemOneCustom updateChar step 4');
                    SetErrorState(false);
                    console.log('ItemOneCustom updateChar step 5');
                    SetChar(data);

                    useEffectStart = false;

                    console.log('ItemOneCustom updateChar : ',charId,' ',data);
                
                }
               }
            )
            .catch (
                    err => {
                        
                        SetErrorState(true);
                    }
                );
    
        }

              


        useEffect(() => {
            console.log('ItemOneCustomHook useEffect ', props.charID);

            useEffectStart = true;

            if (props.charID ) {
                  
                updateChar();
            }

            return () => {useEffectStart = false;};
        }
        ,[props.charID]);
        

        
    
        if (errorState) {
            return <ErrMsg />
        }

        if (! char) {
            // promtThenEmpty = Пожалуйста, выберите персонажа
            const {promtThenEmpty = 'Пожалуйста, выберите персонажа'} = props;
            return (
                <span className={style.select_error}>{promtThenEmpty}</span>
            );
        }

        if (updateState) {
            return <Spinner />
        }

        // nameField - название главного поля
        const { nameField = 'name'} = props;


        return (
            <div className={style.char_details + " rounded"}>
                <h4>{char[nameField]}</h4>
                <ul className="list-group list-group-flush">
                    {fldsArray.map( fld => (
                        char[fld.fldName] ?
                            <li key={fld.fldName} className="list-group-item d-flex justify-content-between">
                                <span className="term">{fld.fldDesc}</span>
                                <span>{char[fld.fldName]}</span>
                            </li>
                        : null
                    ))}

                </ul>
            </div>
        );
    
}    