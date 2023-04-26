import './App.css';
import {useEffect,useRef,useState} from "react";
import AccountForm from "./components/AccountForm";


function App() {
    const [account, setAccount] = useState({ mailAdress: '', password: '' });
    const data = useRef()//id de data
    const [actionState,setActionState] = useState("add")
    const connect = useRef()
    const create = useRef()


    const handleAddAccount = async (event) => {
        event.preventDefault()

        const mailAdress = account["mailAdress"]
        const password = account["password"]

        const formData = new FormData();
        formData.append("mailadress", mailAdress);
        formData.append("password", password);
        const data = Object.fromEntries(formData)

        console.log(mailAdress);
        console.log(password);
        fetch('/users/createAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                alert('compte cree')
                setAccount({mailAdress: '', password: ''})
            })
    }

    const handleConnectAccount = async (event) => {
        event.preventDefault()

        const mailAdress = account["mailAdress"]
        const password = account["password"]

        const formData = new FormData();
        formData.append("mailadress", mailAdress);
        formData.append("password", password);
        const data = Object.fromEntries(formData)

        console.log(mailAdress);
        console.log(password);
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json()
        }).then(data => {
            const user = JSON.stringify(data);
            // console.log('user:', user);
            const parsedData = JSON.parse(user);
            // console.log('parsedData:', parsedData.mail);
            localStorage.setItem('user', parsedData.mail)
            alert('connexion reussie')
            displayData()
            setAccount({mailAdress: '', password: ''})
        }).catch(error => {
            console.log(error)
        })
    }

    // DELETE ACCOUNT
    const deleteAccount = (event) =>{
        event.preventDefault()

        const mailAdress = account["mailAdress"]
        const password = account["password"]

        const formData = new FormData();
        formData.append("mailadress", mailAdress);
        formData.append("password", password);
        const data = Object.fromEntries(formData)

        console.log(mailAdress);
        console.log(password);

        fetch('http://localhost:8000/users/deleteAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json()
        }).then(data => {
            alert('compte supprimé')
            setAccount({mailAdress: '', password: ''})
        }).catch(error => {
            console.log(error)
        })
    }

    const displayData = () =>{
        data.current.textContent = "Bienvenue "+localStorage.getItem('user')
    }

    const disconnect = () =>{
        localStorage.removeItem('user');
        data.current.textContent = ""
        alert("vous etes deconnecter")
    }

    const setActionStateDisplay = () =>{
        if(actionState === "add"){
            connect.current.display = "none"
        }
        else if(actionState === "connect"){
            create.current.display = "none"
        }
    }

    useEffect(() => {
        if (actionState === 'add') {
            connect.current.style.display = 'none';
            create.current.style.display = 'block';
        } else if (actionState === 'connect') {
            create.current.style.display = 'none';
            connect.current.style.display = 'block';
        }
    }, [actionState]);

    const setActionStateFunction = () => {
        if(actionState === "add"){
            return handleAddAccount
        }
        else if(actionState === "connect"){
            return handleConnectAccount
        }
    }

    return (
        <div>
            <div ref={create}>
                <p>create :</p>
                <AccountForm actionClick={setActionStateFunction()} account={account} setAccount={setAccount} actionState={actionState}/>
                <p onClick={() => {setActionState("connect");setActionStateDisplay();}}>I already have an account.</p>
            </div>
            <div ref={connect}>
                <p>connect :</p>
                <AccountForm actionClick={setActionStateFunction()} account={account} setAccount={setAccount} actionState={actionState}/>
                <p ref={data}></p>
                <p onClick={() => {setActionState("add");setActionStateDisplay();}}>I dont have an account.</p>
                <button onClick={disconnect}>Disconnect</button>
            </div>
            <p>delete :</p>
            <AccountForm actionClick={deleteAccount} account={account} setAccount={setAccount} actionState={"delete"}/>
        </div>
);
}

export default App;
