import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, setDoc, getDoc, getDocs, query, doc ,where} from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDyp_tAff0gi-HH5YztygGzaktGlXhoTLs",
    authDomain: "foodpanda-ecd35.firebaseapp.com",
    projectId: "foodpanda-ecd35",
    storageBucket: "foodpanda-ecd35.appspot.com",
    messagingSenderId: "848512602790",
    appId: "1:848512602790:web:02b56e12024e016e99da67",
    measurementId: "G-RXJM9JZ7DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


async function Register(form) {
    const { name, email, password } = form
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const uid = result.user.uid
    console.log('---------> Register is ok')

    await setDoc(doc(db, 'users', uid), {
        email, name, uid
    })

}

async function toLogin(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
}
async function getMenu(restuarantid) {
    const q = query(collection(db, "menuItems"), where("restuarantId" , "==", restuarantid))
    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
      const add = { ...doc.data(), id: doc.id }
      data.push(add)
      console.log('menu items',data)
  });
  return data
    
  }

async function addResturants() {
    const q = query(collection(db, "resturant"))
    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
        // data = [...data, doc.data()]
        const ad = { ...doc.data(), id: doc.id }
        console.log('ad', data)
        data.push(ad)
    });
    console.log('firebase', data)
    return data
}

async function getdetail(addId) {
    const docRef = await doc(db, "resturant", addId);
    const docSnap = await getDoc(docRef);
    console.log('docsnap--?>', docSnap.data())
    return docSnap.data()
}


async function getUserInfo() {
    const uid = auth.currentUser.uid
    console.log('uid', uid)
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    console.log('user Data --> ', docSnap.data())
    return docSnap.data()
}




export {
    Register,
    toLogin,
    addResturants,
    getdetail,
    getUserInfo,
    getMenu
}