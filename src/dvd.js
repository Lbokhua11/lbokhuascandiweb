import React from "react"



const Dvd = () => {
    return(
        <div id="removepart2" >
        <h6>Please, provide size </h6>
        <input className="form-control"type="number" placeholder='Size' id="size" style={{display:'block'}} name="size" required></input><br/>
      </div>
    );
};
export default Dvd;