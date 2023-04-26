import dataBase from "../../dataBase.js";
import bcrypt from 'bcrypt';

const createAccount = (req,res) =>{
    const user = {
        mail: req.body.mailadress,
        password: req.body.password
    }
    console.log(user.mail)
    console.log(user.password)
    dataBase.query('SELECT `mail` FROM `userstable` WHERE mail = ?', user.mail,(err,result) =>{
        if (err) throw err
        if(result.length>0)
        {
            res.send('mail deja existant')
        }
        else{
            bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) throw err
                user.password = hash
                dataBase.query('INSERT INTO userstable SET ?', user,(err,result3) =>{
                    if (err) throw err
                    if(result3)
                    {
                        res.send(result)
                        console.log("vous avez reussi à creer votre compte")
                    }
                })
            })
        }
    })
}



const login = (req,res) =>{
    const user = {
        mail: req.body.mailadress,
        password: req.body.password
    }
    dataBase.query('SELECT `mail`, `password` FROM userstable WHERE mail = ?', user.mail,(err, result) =>{
        if (err) throw err
        if(result.length>0)
        {
            bcrypt.compare(user.password, result[0].password, (err, response) =>{
                if (err) throw err
                if(response)
                {
                    // console.log(result[0])
                    // res.send(req.session.user)
                    res.send(result[0])
                    // displayLogin(user.mail,res)
                }
                else{
                    console.log('vous vous etes tromper de mot de passe')
                    res.send('vous vous etes tromper de mot de passe')
                }
            })
        }
        else
        {
            console.log('votre adresse mail nexiste pas')
            res.send('votre adresse mail nexiste pas')
        }
    })
}

const deleteAccount = (req,res) =>{
    const user = {
        mail: req.body.mailadress,
        password: req.body.password
    }
    dataBase.query('SELECT `mail`, `password` FROM userstable WHERE mail = ?', user.mail,(err, result) =>{
        if (err) throw err
        if(result.length>0)
        {
            bcrypt.compare(user.password, result[0].password, (err, response) =>{
                if (err) throw err
                if(response)
                {
                    dataBase.query('DELETE FROM userstable WHERE mail = ?', user.mail,(err,result3) =>{
                        if (err) throw err
                        if(result3)
                        {
                            res.send(result)
                            console.log("vous avez reussi à supprimer votre compte")
                        }
                    })
                }
                else{
                    console.log('vous vous etes tromper de mot de passe')
                    res.send('vous vous etes tromper de mot de passe')
                }
            })
        }
        else
        {
            console.log('votre adresse mail nexiste pas')
            res.send('votre adresse mail nexiste pas')
        }
    })
}



export default {
    createAccount,
    login,
    deleteAccount,
}