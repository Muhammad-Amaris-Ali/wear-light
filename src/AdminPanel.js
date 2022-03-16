import React, { useState, useEffect } from 'react'
import firebase from "firebase";
import { withRouter, Redirect } from "react-router";
import "./AdminPanel.css";

const AdminPanel = ({history}) => {
  const [key, setKey] = useState("")
const [title, setTitle] = useState("")
const [amount, setAmount] = useState(0)
const [prescribe, setPrescribe] = useState("")
const [image,setImage]=useState("")
const [imageUrl,setImageUrl]=useState("")
const [adsimage,setAdsimage]=useState("")
const [ProductList, setProductList] = useState([]);
const [currentItem, setCurrentItem] = useState({})

// Category Starts

const [Categorytitle, setCategorytitle] = useState("")
const [CategoryproductList, setCategoryproductList] = useState([]);

const countryChange = event =>{
  if(event.target.value){
    setCategorytitle(event.target.value)
  }
}


var CategoryRef = firebase.database().ref("/Category");
const CategoryPush = (object) => {
 CategoryRef
   .push(object)
   .then(() => {
     console.log("Data send");
     // window.location.reload(false);
   })
   .catch(alert);
}
   
   useEffect(() => {
     console.log("Category useffect")
    CategoryRef.once("value", function (snapshot) {
      var Categorytutorials = [];
      console.log('second check')
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
       // console.log(data.Categorytitle);
       Categorytutorials.push({
          id: key,
         Categorytitle: data.Categorytitle,
        });
      });
      console.log(Categorytutorials)
      setCategoryproductList(Categorytutorials);
      console.log(CategoryproductList);
    });
  }, [])

// End of category
const [open, setOpen] = useState(false);
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


 const upload = async () => {
    console.log("Enter in upload")
        //alert(image.uri)
        if(image == null)
          return;
      const imageRef = firebase.storage().ref(`/images/${image.name}`);
      await imageRef.put(image);
      const url = await imageRef.getDownloadURL();
      setImageUrl(url)
      console.log("Image uploaded")
      Push({
        title:title,
        amount:`$${amount}`,
        prescribe:prescribe,
        Categorytitle:Categorytitle,
        imageUrl: url 
      })
      console.log("Push hogya")

      // alert("Image uploaded")
          // window.location.reload(false);

    
     }
     var adminpanelRef = firebase.database().ref("/AdminPanel");
     const Push = (object) => {
      console.log("Enter in push")
      adminpanelRef
        .push(object)
        .then(() => {
          console.log("Data send");
          // window.location.reload(false);
        })
        .catch(alert);
    };

    const Remove = (id) => {
      adminpanelRef.child(id).remove();
      window.location.reload(false); 
    }

    useEffect(() => {
      console.log("Products useffect")
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
           prescribe:data.prescribe,
          
          });
        });
        setProductList(tutorials);
        console.log(tutorials);
      });
    }, [])



  return (
    <div>
   <div className='panel-1'>
   <div className='lefter'>
    <div className="btn-007">
My Cart
    </div>
  <div  className="btn-007">
Nike
  </div>
  <div  className="btn-007">
Adidas
  </div>
</div>

    <span className='topper'>
    <input type="search" placeholder='Search' className='bar-1'  /> <div className='tag-btn' > search</div>
      
           <div className='tag-btn'   onClick={
    ()=>  history.push("/")}>Home</div>
           <div className='tag-btn'  >About</div>
           <div className='tag-btn'  >Contacts</div>
      
</span>
<br/>
<div>
    <div className='frm-2'>
    <h1> Admins Control your Web Products</h1>
    <label className="lbl-Ad2"> Title </label>
    <input className='form-admin' type="text"  placeholder='Enter Title'  onChange={(e) => setTitle(e.target.value)} required/>
<br/>
<label className="lbl-Ad"> Amount </label>
    <input className='form-admin' type="number"  placeholder='$'  onChange={(e) => setAmount(e.target.value)} required/>
<br/>
<label className="lbl-Ad"> Prescribtion </label>
    <input className='form-admin' type="text"  placeholder='Description'  onChange={(e) => setPrescribe(e.target.value)} required/>
<br/>
<label > Choose a category</label>
<select onChange={countryChange}>
        <option value="" />
        {CategoryproductList.map(allCountries => {
          return <option value={allCountries.Categorytitle}>{allCountries.Categorytitle}</option>;
        })}
      </select>
<div>
<p> Add your Product Pictues here</p>
     <input className='btn-7' type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
     {/* <button className='btn-8'  onClick={upload} >Upload</button> */}
    </div>
    <br />
    
          <button className='btn-4'
            onClick={() => {
              upload()
 }}> post </button>
            </div>
            <br/>
<div className='tableofData'>
<h1>Given Below is "The Data" of your Site</h1>
             <table className='title-table'>
             
            <tr className='heading-tbl-1' >
                    <th >Title</th>
                    <th>Amount</th>
                    <th>Prescribtion</th>
                    
                </tr>  
          {
            ProductList.map((data) => {
              return(
                  <tr className="uka-1">  
                    <td> { data.title }</td>
                    <td>{  data.amount }</td>
                    <td>{  data.prescribe }</td>
                    <td>{ data.imageUrl }</td>
    
                    <td> <button 
                    onClick={() => {
                 Remove(data.id)
               }}
                    style={{backgroundColor:"red", borderRadius:"10px" }}> X </button></td>
              <td>
              <button onClick={()=>{
                setOpen(true)
                setTitle(data.title)
                setAmount(data.amount)
                setPrescribe(data.prescribe)
                setImage(data.image)
                setKey(data.id)
            }}> Edit </button>

              </td>
                  </tr>
              )
               
            
            })
          }
           </table>
</div>

<form className='frm-2'>
    <label className="lbl-Ad2"> Category </label>
    <input className='form-admin' type="text"  placeholder='Category'  onChange={(e) => setCategorytitle(e.target.value)} required/>

    <br />
    
          <button className='btn-4'
            onClick={() => {
              CategoryPush({
                    Categorytitle:Categorytitle,
                    
               
              })
            }}> post </button>
            </form>




</div>

<div>
{/* <p> Add your Product Pictues here</p>
     <input className='btn-7' type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
     <button className='btn-8'  onClick={upload} >Upload</button> */}
</div>

</div>
    </div>
  )
}

export default AdminPanel;