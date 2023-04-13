import { useEffect, useState } from "react";
import Book from "./book";
import Furniture from "./furniture";
import Dvd from "./dvd";


export default function TypeSwitcher() {
  
    const [type, setType] = useState("DVD");
    const [bookContentVisible, setBookContentVisible] = useState(false);
    const [FurnitureContentVisible, setFurnitureContentVisible] = useState(false);
    const [DvdContentVisible, setDvdContentVisible] = useState(false);
    
    useEffect(() =>{
        type === "DVD"
        ? setDvdContentVisible(true) : setDvdContentVisible(false);
        type === "Book"
        ? setBookContentVisible(true) : setBookContentVisible(false);
        type === "Furniture"
        ? setFurnitureContentVisible(true) : setFurnitureContentVisible(false);
    }, [type]);

    const handleOnChange = (e) => {
        setType(e.target.value);
    };

    return(
        <div>
            <select className="form-select" value={type} onChange={handleOnChange}>
                
                <option value="DVD">DVD</option>
                <option value="Furniture">Furniture</option>
                <option value="Book">Book</option>
            </select>
            <div id="removepart" style={{display:'block'}}>
            {bookContentVisible && <Book />}
            {FurnitureContentVisible && <Furniture />}
            {DvdContentVisible && <Dvd />}
            </div>
        </div>
    )
}