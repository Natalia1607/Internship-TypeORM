import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as Crypto from 'crypto';

export const functionGet = async (id) => { 
    const userRep = AppDataSource.getRepository(User)
    const userGet = await userRep.findOneBy({
        id: id
    })

    if(userGet) {
        const user:User = {
            id: userGet.id,
            firstName: userGet.firstName,
            email: userGet.email,
            password: userGet.password,
        }

        return JSON.stringify(user);
    }

    return 'User does not exist';
}

export const functionDelete = async (id) => {
    const userRep = AppDataSource.getRepository(User)

    try {
        const userRemove = await userRep.findOneBy({
            id: id
        })
    
        await userRep.remove(userRemove);
    
        const users = await AppDataSource.manager.find(User)
        console.log(users)
    }

    catch {
        return 'User does not exist';
    }
}

export const functionPost = async (formObj) => {
    const newUser = new User();
    console.log(formObj);

    newUser.firstName = formObj.firstName;
    newUser.email = formObj.email;

    const salt = Crypto.randomBytes(16).toString('hex'); 
    const hash = Crypto.pbkdf2Sync(formObj.userPass, salt, 1000, 64, 'sha512').toString('hex'); 
    newUser.password = hash; 

    await AppDataSource.manager.save(newUser);
    console.log('Request completed successfully');

    const users = await AppDataSource.manager.find(User)
    console.log(users)
}

export const functionPut = async (id, params) => {
    const userRep = AppDataSource.getRepository(User)
    try {
        const userPut= await userRep.findOneBy({
            id: id
        })

        const userPutArr = Object.keys(userPut);
        let count = 1;
        for(let item in params) {
    
            if(count==4) {
                const salt = Crypto.randomBytes(16).toString('hex');
                const hash = Crypto.pbkdf2Sync(params[item], salt, 1000, 64, 'sha512').toString('hex'); 
                userPut[userPutArr[count]] = hash;
            }
    
            else {
                userPut[userPutArr[count]] = params[item]; 
            }
            
            count++;
    
            if(count>userPutArr.length) {
                break;
            }
        }
        await userRep.save(userPut);
    
        console.log('Request completed successfully');
        console.log(userPut);
    }

    catch {
        return 'User does not exist';
    }
}
