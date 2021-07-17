import firebase from './Firebase';

export default class Database {
  /** no constructor for you */
  Database() {}

    // /**
    //  * promise method to create a new user to the database
    //  * @param id is the user id
    //  * @param email is the user email
    //  * @return true if added user successfully, else false
    //  * @throws some sort of firebase error
    //  */
    async addUser(userId, email, firstName, lastName) {
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(userId);
        if (await userRef.get().then(doc=>{return !doc.exists})) {
        const userData = {'email' : email, 'firstName': firstName, 'lastName':lastName, 'age': null, 'sex': null, 'diabetic': null};
        await userRef.set(userData);
        console.log('Added user successfully');
        return true;
        }else{
        console.log('user ID already exists');
        return false;
        }
    }

    async editUser(userId, email, firstName, lastName, age, sex, diabetic) {
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(phoneNum);
        if (await userRef.get().then(doc => {return doc.exists})) {
                const userData = {'email' : email, 'firstName': firstName, 'lastName':lastName, 'age': age, 'sex': sex, 'diabetic': diabetic};
                await userRef.set(userData);
                console.log('modified user data successfully');
                return true;
        } else {
                console.log('cant modify non-existant user '+phoneNum);
                return false;
        }
    }

 
    async getUser(id) {
        const result = await firebase.firestore().collection('users').doc(id).get();
        return result ? result.data() : null;
    }

    async deleteUser(id){
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(id);

        if (await userRef.get().then(doc => {return doc.exists})) {
                await userRef.delete();
                console.log('deleted user '+id+' successfully');
                return true;
        } else {
                console.log('cant delete non-existant user '+id);
                return false;
        }
    }
}