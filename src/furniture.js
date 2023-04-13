import React from "react"



const Furniture = () => {
    return(
        <div id="removepart3" style={{display:'block'}}>
        <h6>Please, provide dimensions </h6>
        <input className="form-control" type="number" placeholder='Height' id="height" style={{display:'block'}} name="height" required></input><br/>

        <input className="form-control" type="number"  placeholder='Width' id="width" style={{display:'block'}} name="width" required></input><br/>

        <input className="form-control" type="number"  placeholder='Length' id="length" style={{display:'block'}} name="length" required></input><br/>
      </div>
    );
};
export default Furniture;