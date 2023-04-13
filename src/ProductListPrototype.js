import React from "react";
import "./style/ProductList.css";
import { useState, useEffect } from "react";
import axios from "axios";


// eslint-disable-next-line no-lone-blocks
{/*http://localhost/test/index.php*/}
export default function ProductListPrototype() {

   function getUsers() {
    axios.get('http://levanbokhuascandiweb.epizy.com/api/').then(function(response) {
    console.log(response.data);
    setUsers(response.data);
    })
  }

    const [users, setUsers] = useState([]);
    useEffect(() => {
      getUsers();
    },  []);
    
    function handleDelete(e) {
 
      e.preventDefault();
      const checkboxes = document.querySelectorAll('.checkbox-spin:checked');
      if (checkboxes.length > 0) {
        const ids = Array.from(checkboxes).map(checkbox => checkbox.value);
        axios.delete('http://levanbokhuascandiweb.epizy.com/api/', { data: { ids } 
      })
          .then(response => {
            console.log(response.data);
            window.location.reload(false);
            if (response.data.status === 1) {
              // remove deleted records from the table
              ids.forEach(id => {
                const row = document.querySelector(`#row-${id}`);
                row.remove();
               
              });
            }
          
          })
          
          .catch(error => console.log(error));
      }
    }
  
    return (
        <div className="ProductListprototypeheader">
          <form id="delete-form" onSubmit={handleDelete}>
            <div className="boxHeader">
            
           {users.map((user, key)=> 
                <div className="card3" key={key}>
                  <h3>SKU:  </h3><p className="small">{user.sku}</p>
                      
                      <h3>Name: </h3>
                      <p className="small">{user.name}</p>
                      <h3>Price: </h3>
                      <p className="small">{user.price}</p>
                      <h3>Type: </h3>
                      <p className="small">{user.type}</p>
                      <div>
                  
                         {
                        (() => {
                          if(user.type === 'Book'){
                            return(
                              <p style={{color:'red'}}>Weight: {user.weight} KG</p>
                            )
                          } else if(user.type === 'DVD'){
                            return (
                              <p style={{color:'red'}}>Size: {user.size} MB</p>
                            )
                          } else if(user.type === 'Furniture'){
                            return(
                              <p style={{color:'red'}}>Dimensions: {user.height} x {user.width} x {user.length}</p>
                            )
                          }
                        })()
                        } 
                 
                      </div>
                     
                      <div className="dimmer"></div>
                      <div className="go-corner">
                    
                 
                      <label className="container">
                        <input className="checkbox-spin go-arrow delete-checkbox" type="checkbox" name="delete[]" id="check4" value={user.id}></input>
                        <span className="checkmark"></span>
                      </label>    
                     
                     
               
                       </div>
                     </div>
               )} 
          
            </div>
            </form>
        </div>
    )
 
}