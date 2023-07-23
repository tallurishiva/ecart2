import React from "react";
import Prodects from "./Prodects";
//import AuthContext from './Home';
import image from "./WhatsApp Image 2023-06-30 at 22.54.22.jpg"
import axios from "axios";
//export const AuthContext = React.createContext();
export default function Prodpage(){
   // var url = "https://course-api.com/react-store-products";
    var [data, setdata] = React.useState([]);
    var [category, setcategory] = React.useState("All");
    var [empty, setempty] = React.useState(0);
    var [loading,setLoading]=React.useState(true);
    React.useEffect(() => {
        var fetchData = async () => {
            try {
                var resp = await axios("http://localhost:3001/products");
                var newdata = await resp.data;
                setLoading(false);
                console.log()
                //console.log(newdata);
                setdata(newdata);
            }
            catch(error){
                console.error(error);
            }
        }
        fetchData();
    }, []);

    function addtocart(data){
        //console.log("from cart" + data);
        setempty(data + empty);
    };
    function changecat(e) {
        setcategory(e.target.value);
    }
    var a = [];
    data.map(item =>{
        if (!a.includes(item.category)) {
            a.push(item.category);
        }
    });

    return (
                <div className="prodpage">
                    <div className="image" >
                        <div className="imf">
                        <img src={image} alt="welcome"></img>
                        </div>
                            </div>
                    {!loading && <div className="fil">
                        <select className="filter" onChange={changecat}>
                            <option value="All" selected>All</option>
                            {a.map(item => (
                                <option value={item} key={item}>{item}</option>
                            ))}
                        </select>
                    </div>}
                    {!loading && data.map(item => {
                        if (category === "All" || item.category === category) {
                            return <Prodects item={item} carted={addtocart} />
                        }
                    })}
                    
                </div>
            );
}
