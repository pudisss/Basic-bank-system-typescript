// interface 

interface userDataType {
    username: string,
    email: string,
    password: string,
    mn_amount: number
}


// Data 

let db: userDataType[] = [
    {
        username: "Imadev",
        email: "pudis.2550@gmail.com",
        password: "kkong30102550",
        mn_amount: 0,
    }
    
];
// Class user
class User {

    username: string;
    email: string;
    password: string;
    mn_amount: number;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.mn_amount = 0;
    }


    get getData() {
        return {
            username: this.username,
            password: this.password,
            email: this.email,
            mn_amount: this.mn_amount,
        }
    }

    showInfo() {
        console.log(`
            Username: ${this.username}
            Password: ${this.password}
            email: ${this.email}
            total_amount: ${this.mn_amount}
        `)
    }
}

// Main class

const Bank = (user: User) =>  {
    

    // Sub functions

    const showMoney = () => {
        (user.mn_amount == 0) ? console.log("You don't have any money. Please deposit your money into your account to do further activity") : 
        console.log(`Your amount is ${user.mn_amount}`);

    
    }

    const login = (usrs?: string, emails?: string, passwords?: string): [boolean, number] => {
        const [ username, email, password ]: [string, string, string] = [user.username, user.email, user.password];
        let login: boolean = false;
        let data_index = 0;
        if (usrs != undefined) {
            for (let i=0; i<db.length; i++) {
                if (db[i].email == email && db[i].password == password) {
                    login = true;
                    data_index = i;
                } else {
                    console.log(`There's no account named ${username}. Please try again`);
                    continue;
                }
            }

        } else {
            for (let i=0; i<db.length; i++) {
                if (db[i].email == emails && db[i].password == passwords) {
                    login = true;
                    data_index = 1;
                } else {
                    console.log(`There's no account named ${usrs}. Please try again`);
                    continue;
                }
            }
        }

        return [login, data_index]


    }

    const signup = () => {
        const [username, email, password ]: [string, string, string ] = [user.username, user.email, user.password];

        let signup = false;

        for (let i=0; i<db.length; i++) {
            if (db[i].email == email && db[i].password == password) {
                console.log("You already have an account in the system. We will redirect to the login function");

                login(username, email, password);
            } else {
                let data: userDataType = {
                    username: username,
                    email: email,
                    password: password,
                    mn_amount: 0
                }

                db.push(data);

                signup = true;
                console.log("Sign up complete");
            }
        }

        return signup;
    }




    const deposit = (credentials: [boolean, number], amountMonkey: number) => {

        if (credentials[0]) {
            db[credentials[1]].mn_amount += amountMonkey;

            console.log("Deposit succesful");

        } else {
            console.log("Please login before using the system");
        }

        

    }

    
    const withdraw = (credentials: [boolean, number], amountMonkey: number) => {
        if (credentials[0]) {
            db[credentials[1]].mn_amount -= amountMonkey;

            console.log("Withdrawn success");

        } else {
            console.log("Please login before using the system");
        }

    }

    const user_interaction = () => {
        
        // Try to login
        if (login(user.username, user.email, user.password)) {
            console.log("What service do you want us to do : ");

            let answer = "Deposit";

            interface posAnswerType {
                [key: string]: [string, string]
            }
            let pos_answers: posAnswerType = {
                "deposit": ["Deposit", "deposit"],
                "withdraw": ["Withdraw", "withdraw"],
                "showMonkey": ["Show money", "show money"]

                
            }

            switch(answer) {
                case pos_answers["deposit"][0] || pos_answers["deposit"][1]:

                    let depositInputMoney = 2500;
                    deposit(login(user.username, user.email, user.password), depositInputMoney);
                case pos_answers["withdraw"][0] || pos_answers["withdraw"][1]:

                    let withdrawInputMoney = 2500;
                    withdraw(login(user.username, user.email, user.password), withdrawInputMoney);
                case pos_answers["showMonkey"][0] || pos_answers["showMonkey"][1]:
                    showMoney();
            }

            
        } else {
            signup();
            
        }
    }

    // Run right at the parent function runs

    user_interaction();

}

// User interaction function

const get_userinput = () => {
    // Normal user input mu = made up. Credential information for using in a user input
    let username_mu = "Imadev";
    let password_mu = "kkong30102550";
    let email_mu = "pudis.2550@gmail.com";


    const user: User = new User(username_mu, password_mu, email_mu);

    

    Bank(user);


}


get_userinput();
