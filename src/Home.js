import React,{useState, useEffect} from "react";
import app from "./base";
import { withRouter, Redirect } from "react-router";
import "./home.css"

import firebase from "firebase";

const Home = ({history}) => {
  const [key, setKey] = useState("")
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState(0)
  const [prescribe, setPrescribe] = useState("")
  const [image,setImage]=useState("")
  const [imageUrl,setImageUrl]=useState("")
  const [ProductList, setProductList] = useState([]);
  const [currentItem, setCurrentItem] = useState({})

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  


  var adminpanelRef = firebase.database().ref("/AdminPanel");
  const Push = (object) => {
   adminpanelRef
     .push(object)
     .then(() => {
       console.log("Data send");
       // window.location.reload(false);
     })
     .catch(alert);
    }
   

    useEffect(() => {
      adminpanelRef.once("value", function (snapshot) {
        var tutorials = [];
        console.log('second check')
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var data = childSnapshot.val();
          console.log(childSnapshot.val());
          tutorials.push({
            id: key,
           title: data.title,
           amount:data.amount,
           prescribe:data.prescribe
          });
        });
        setProductList(tutorials);
        console.log(tutorials);
      });
    }, [])


  return (
    <div >
    <div className="papa">
  
     <button style={{float:"right" }} onClick={() => app.auth().signOut()}>Sign out</button>
  
 <div>
 <div className="Brands">
 <div  className="top-brand-1">
    Speed Sports
</div>
<div className="top-brand"  onClick={
    ()=>  history.push("/Nike")} >
Nike
</div>

<div className="top-brand"  onClick={
    ()=>  history.push("/Adidas")}>
Adidas
</div>
<div className="top-brand"  onClick={
    ()=>  history.push("/Cart")}>
  My Cart
</div>

 </div>


 <div className='chris'>
             
            
                    
          {
            ProductList.map((data) => {
              return(
<div className="showcase">
<img style={{width:"200px",height:"200px"}} src="{data.imageUrl}" alt="profile"/>
                    <div>{ data.title }</div>
                   <div> { data.amount } </div>
                   <div> {  data.prescribe } </div>

</div>              )
               
            
            })
          }
           </div>
 </div>

{/* <img style={{width:"300px",height:"300px"}} src="https://firebasestorage.googleapis.com/v0/b/air-wear.appspot.com/o/images%2FAMARISALI.jpg?alt=media&token=a5ab1d6a-2b7d-446e-83bb-bf5a383e859e" alt="profile"/> */}
    </div>
  
     </div>
  );

}

export default Home;