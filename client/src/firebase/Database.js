import { firestore } from './Firebase';

export default class Database {
  /** no constructor for you */
  Database() {}

    // /**
    //  * promise method to create a new user to the database
    //  * @throws some sort of firebase error
    //  */
    async addUserInfo(userId) {
        const db = firestore;
        const userRef = db.collection('users').doc(userId);
        if (await userRef.get().then(doc=>{return !doc.exists})) {
            const userData = {'firstName': null, 'lastName':null, 'age': null, 'sex': null, 'diabetic': null};
            await userRef.set(userData);
            console.log('Added user successfully');
            return true;
        } else{
            console.log('user ID already exists');
            return false;
        }
    }

    async editUserInfo(userId, firstName, lastName, sex, age, diabetic, profilePicture) {
        const db = firestore;
        const userRef = db.collection('users').doc(userId);
        if (await userRef.get().then(doc => {return doc.exists})) {
            const userData = {'firstName': firstName, 'lastName':lastName, 'age': age, 'sex': sex, 'diabetic': diabetic, 'profilePicture': profilePicture};
            await userRef.set(userData);
            console.log('modified user data successfully');
            return true;
        } else {
            console.log('cant modify non-existant user '+userId);
            return false;
        }
    }

 
    async getUserInfo(id) {
        const result = await firestore.collection('users').doc(id).get();
        return result ? result.data() : null;
    }

    async deleteUserInfo(id){
        const db = firestore;
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