import {useEffect, useRef} from "react";

export default function AccountForm(props){
    //state
    const account = props.account
    const setAccount = props.setAccount
    const actionClick = props.actionClick
    const button = useRef()
    const actionState = props.actionState


    //comportement
    const handleInputChange = (event) =>{
        //copie du state
        const accountCopy = { ...account };

        //manipulation du state
        accountCopy[event.target.name] = event.target.value
        //event.target.(name ou value) recupere le nom ou la valeur de l'input qui à appeler la fonction

        //actualiser le state
        setAccount(accountCopy)
    }

    useEffect(() => {
        if(actionState === "add"){
            button.current.textContent = "Create account"
        }
        else if(actionState === "connect"){
            button.current.textContent = "connect"
        }
        else if(actionState === "delete"){
            button.current.textContent = "delete"
        }
    }, [actionState]);

    //affichage
    return (
        <form action="submit" onSubmit={actionClick}>
            <label>
                Adresse mail:
                <input type="text" name="mailAdress" value={account.mailAdress} onChange={handleInputChange} />
            </label>
            <label>
                Mot de passe:
                <input type="password" name="password" value={account.password} onChange={handleInputChange} />
            </label>
            <button ref={button} >Create account</button>
        </form>
    );

}