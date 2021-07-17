import firebase from './Firestore';

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
  async addUser(phoneNum, email, firstName, lastName) {
     const db = firebase.firestore();
     const userRef = db.collection('users').doc(phoneNum);
     if (await userRef.get().then(doc=>{return !doc.exists})) {
        const userData = {'email' : email, 'firstName': firstName, 'lastName':lastName, 'currentOrders': []};
        await userRef.set(userData);
        console.log('Added user successfully');
        return true;
     }else{
        console.log('user ID already exists');
        return false;
     }
  }

  async addOrder(userPhone, restaurant, firstName, lastName, phoneNum, orderedItems, address, note) {
         const db = firebase.firestore();
         restaurant = restaurant.toLowerCase();
         const restaurantRef = db.collection('restaurants').doc(restaurant);
         let orderNum = await db.runTransaction(t => {
            return t.get(restaurantRef).then(doc => {
                let orderNum = doc.data().nextONum;
                t.update(restaurantRef,{'nextONum': doc.data().nextONum+1});
                return Promise.resolve(orderNum);
            })
         })
         const orderRef = db.collection(restaurant+"Orders").doc(orderNum.toString());
         if (await orderRef.get().then(doc=>{return !doc.exists})) {
            const userRef = db.collection("users").doc(userPhone);
            if (await userRef.get().then(doc=>{return doc.exists})) {
              const orderData = {'firstName' : firstName, 'lastName':lastName, 'phoneNum':phoneNum ,'orderedItems':orderedItems,'address':address, 'note': note, 'state': 1};
              await orderRef.set(orderData);
              await userRef.update({
                "currentOrders": firebase.firestore.FieldValue.arrayUnion(restaurant+ "/"+orderNum)
              });
            }else{
                console.log('userPhone '+ userPhone +' doesnt exists');
                return false;
            }
            console.log('Added order '+orderNum +' successfully');
            return true;
         }else{
             console.log('orderID '+ orderNum +' already exists');
             return false;
         }
  }


  /**
   * adds restaurant to the database
   * @param name is the restaurant name
   * @param data is the restaurant menu
   * @throws some sort of firebase error
   */
  async addRestaurant(name, banner, categories, food) {
    name = name.toLowerCase();
    const db = firebase.firestore();
    const restaurantRef = db.collection('restaurants').doc(name);
    if (await restaurantRef.get().then(doc => {return !doc.exists})) {
      await restaurantRef.set({'banner':banner, 'categories':categories, 'food':food, 'nextONum': 0});
      console.log('Added restaurant successfully');
      return true;
    } else {
      console.log('restaurant already exists');
      return false;
    }
  }

  async addRestaurantJSON(restaurantName, JSONFile){
    restaurantName = restaurantName.toLowerCase();
    const db = firebase.firestore();
    const restaurantRef = db.collection('restaurants').doc(restaurantName);
    if (await restaurantRef.get().then(doc => {return !doc.exists})) {
      await restaurantRef.set({'name':JSONFile.name, 'location':JSONFile.location, 'styles':JSONFile.styles, 'categories': JSONFile.categories, 'menu':JSONFile.menu, 'customisations':JSONFile.customisations});
      console.log('Added restaurant successfully');
      return true;
    } else {
      console.log('restaurant already exists');
      return false;
    }
  }

  /**
   * get restaurant information
   * @param name is the restaurant name
   * @throws some sort of firebase error
   */
  async getRestaurant(name) {
    name = name.toLowerCase();
    const result = await firebase.firestore().collection('restaurants').doc(name).get();
    return result ? result.data() : null;
  }
    // /**
    //  * returns a promise of user information for a given user id
    //  * @param id is a string of a user ID
    //  * @return promise of user information if id exists, else it returns a
    //  string
    //  * @throws some sort of firebase error
    //  */
    async getUser(id) {
       const result = await firebase.firestore().collection('users').doc(id).get();
       return result ? result.data() : null;
    }

    async getOrder(orderID, restaurant) {
        restaurant = restaurant.toLowerCase();
        const result = await firebase.firestore().collection(restaurant+"Orders").doc(orderID.toString()).get();
        return result ? result.data() : null;
    }


    async editRestaurant(name, banner, categories, food, nextONum) {
       const db = firebase.firestore();
       name = name.toLowerCase();
       const restaurantRef = db.collection('restaurants').doc(name);
       if (await restaurantRef.get().then(doc => {return doc.exists})) {
             await restaurantRef.set({'banner':banner, 'categories':categories, 'food':food, 'nextONum':nextONum});
             console.log('modified restaurant data successfully');
             return true;
       } else {
             console.log('cant modify non-existant restaurant '+name);
             return false;
       }
    }

    async editUser(phoneNum, email, firstName, lastName, currentOrders) {
       const db = firebase.firestore();
       const userRef = db.collection('users').doc(phoneNum);
       if (await userRef.get().then(doc => {return doc.exists})) {
             const userData = {'email' : email, 'firstName': firstName, 'lastName':lastName, 'currentOrders':currentOrders};
             await userRef.set(userData);
             console.log('modified user data successfully');
             return true;
       } else {
             console.log('cant modify non-existant user '+phoneNum);
              return false;
       }
    }

    async editOrder(orderID, restaurant, firstName, lastName, phoneNum, orderedItems, address, note, state) {
           const db = firebase.firestore();
           restaurant = restaurant.toLowerCase();
           const orderRef = db.collection(restaurant+"Orders").doc(orderID);
           if (await orderRef.get().then(doc=>{return doc.exists})) {
                  const orderData = {'phoneNum' : phoneNum,'firstName':firstName,'lastName':lastName ,'orderedItems':orderedItems,'address':address,'note':note, 'state':state};
                  await orderRef.set(orderData);
                  console.log('modified order successfully');
                  return true;
           }else{
                  console.log('cant modify non-existant order');
                  return false;
           }
    }

    async incrementOrderState(ORDER_ID, restaurant){
      const db = firebase.firestore();
      restaurant = restaurant.toLowerCase();
      var orderID = ORDER_ID.toString();
      var orderRef = db.collection(restaurant+"Orders").doc(orderID);
      if (await orderRef.get().then(doc=>{return doc.exists})) {
        orderRef.update({
          state: firebase.firestore.FieldValue.increment(1)
        });
        console.log("incremented order "+ orderID+"\n\n\n\n\n\n\n\n");
        return true;
      }else{
        console.log("failed increment orderID doesnt exist "+ orderID+"\n\n\n\n\n\n\n\n");
        return false;
      }
    }

    async decrementOrderState(ORDER_ID, restaurant){
      const db = firebase.firestore();
      restaurant = restaurant.toLowerCase();
      var orderID = ORDER_ID.toString();
      var orderRef = db.collection(restaurant+"Orders").doc(orderID);
      if (await orderRef.get().then(doc=>{return doc.exists})) {
        orderRef.update({
          state: firebase.firestore.FieldValue.increment(-1)
        });
        console.log("decrement order "+ orderID+"\n\n\n\n\n\n\n\n");
        return true;
      }else{
        console.log("failed decrement orderID doesnt exist "+ orderID+"\n\n\n\n\n\n\n\n");
        return false;
      }
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

     async deleteRestaurant(name){
          const db = firebase.firestore();
          name = name.toLowerCase();
          const restaurantRef = db.collection('restaurants').doc(name);
          if (await restaurantRef.get().then(doc => {return doc.exists})) {
                await restaurantRef.delete();
                console.log('deleted restaurants '+name+' successfully');
                return true;
          } else {
                console.log('cant delete non-existant restaurants '+name);
                return false;
          }
     }

        async deleteOrder(orderID, restaurant) {
               const db = firebase.firestore();
               restaurant = restaurant.toLowerCase();
               const orderRef = db.collection(restaurant+"Orders").doc(orderID);
               if (await orderRef.get().then(doc=>{return doc.exists})) {
                      await orderRef.delete();
                      console.log('deleted order '+orderID+' successfully');
                      return true;
               }else{
                      console.log('cant deleted non-existant order '+orderID);
                      return false;
               }
        }

        async realTimeUserOrders(userPhone, arrayOfOrders){
            const db = firebase.firestore();
            let doc = db.collection("users").doc(userPhone);
            global.observer = doc.onSnapshot(docSnapshot => {
              //console.log(docSnapshot.data().currentOrders);
                docSnapshot.data().currentOrders.forEach(function(item, index, array) {
                    arrayOfOrders[index] = item;
                }, err => {
                    console.log('Encountered error: ${err}');
                });
              });
        }

        async unsubOrders(){
          global.observer();
        }
        async unsubOrdersR(){
          global.rObserver();
        }

        async realTimeRestaurantOrders(restaurant, state, arrayOfOrders){
          restaurant = restaurant.toLowerCase();
          const db = firebase.firestore();
          if(state<0){                        //return orders of all states
            global.rObserver =  db.collection(restaurant+"Orders").onSnapshot(query =>{
              query.docChanges().forEach(change => {
                  arrayOfOrders.push(change.doc.data());
              });
            });
          }else if (state<=3){                //returns unconfirmed orders
            global.rObserver =  db.collection(restaurant+"Orders").where('state','==',state).onSnapshot(query =>{
                query.docChanges().forEach(change => {
                    arrayOfOrders.push(change.doc.data());
                });
            });
          }else{
            console.log("Invalid State");
          }
        }

}