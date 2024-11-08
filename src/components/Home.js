import React, {useState, useEffect, useContext} from 'react'
import { NavLink } from "react-router-dom";

import { UserContext } from "../App"

const Home = () => {
    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
    

    
    const {state, dispatch} = useContext(UserContext)

    

    const userContact = async () =>{
        try {
            const res = await fetch ('/getdata', {
                method: 'GET',
                headers:{
                    "Content-Type" : "application/json"
                },
            });

            const data = await res.json();
            
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone});


            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
       userContact();
    }, [])

    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value });
    }

    const sendMessage = async (e) =>{
        e.preventDefault();

        const {name, email, phone, message}= userData;

        const res = await fetch('/contact',{
            method:'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if(!data){
            console.log("message not sent");
        }
        else{
            alert("Message send")
            setUserData({...userData, message:""});
        }
    }

    
    
    const Loginbutton= () =>{
        
        if(state){
            return <div> 
                <button ><NavLink className="btn" to="/signout">logout</NavLink></button>      
            </div>
        }
        else{
            return <div>  
                    <button ><NavLink className="btn" to="/signin">login</NavLink></button>
                    
                </div>
        }
    
    }


    return (
        

        <>

        <header className="header">

            <div id="menu-btn" className="fas fa-bars"></div>

            <NavLink className="logo" to="/"> Bike<span>Hub</span></NavLink>
        
            

            <nav className="navbar">
                <NavLink  to="/">Home</NavLink>
                <NavLink  to="/rentbike">Rent Bikes</NavLink>
                <a href="#services">Testimonial</a>
                <a href="#contact">Contact</a>
            </nav>
            <div id="login-btn">
                    <Loginbutton />
            </div>

        </header> 


        

<section className="home" id="home">

<h3 data-speed="-2" className="home-parallax">Rent a Bike</h3>

<img data-speed="5" className="home-parallax" src="/image/home.png" alt=""/>

<NavLink className="btn" to="/exploreRentBikes">Bike Showcase</NavLink>

</section>

<section className="icons-container">

<div className="icons">
    <i className="fas fa-home"></i>
    <div className="content">
        <h3>15+</h3>
        <p>Branches</p>
    </div>
</div>

<div className="icons">
  <i class="fa-sharp fa-solid fa-person-biking"></i>
    <div className="content">
        <h3>400+</h3>
        <p>Bikes Rented</p>
    </div>
</div>

<div className="icons">
    <i className="fas fa-users"></i>
    <div className="content">
        <h3>600+</h3>
        <p>Happy clients</p>
    </div>
</div>

<div className="icons">
<i class="fa-sharp fa-solid fa-motorcycle"></i>
    <div className="content">
        <h3>150+</h3>
        <p>Available Bikes</p>
    </div>
</div>

</section>

<section className="services" id="services">

<h1 className="heading"> Our Customers <span>Thoughts</span> </h1>

<div className="box-container">

    <div className="box">
        <div className="rev-img">
            <img src="/image/rev1.jpeg" alt="" />
        </div>
        <h3>Sourabh Samal</h3>
        <p>Excelent servuce.</p>
    </div>

    <div className="box">
    <div className="rev-img">
            <img src="/image/jaga.jpg" alt="" />
        </div>
        <h3>Jagannatha Mishra</h3>
        <p>Behtareen.... I loved the service ❤️</p>
    </div>


    <div className="box">
    <div className="rev-img">
            <img src="/image/Deechu.jpg" alt="" />
        </div>
        <h3>Deekshith Kumar S</h3>
        <p>Liked the verity of bikes.</p>
    </div>

</div>

</section>





<section className="contact" id="contact">

<h1 className="heading"><span>contact</span> us</h1>

<div className="row">

    <form method="POST">
        <h3>get in touch</h3>
        <input type="text" name="name" value={userData.name} onChange={handleInputs} placeholder="your name" className="box"/>
        <input type="email" name="email" value={userData.email} onChange={handleInputs} placeholder="your email" className="box"/>
        <input type="tel" name="phone" value={userData.phone} onChange={handleInputs} placeholder="your phone" className="box"/>
        <textarea placeholder="your message" name="message" value={userData.message} onChange={handleInputs} className="box" cols="30" rows="10"></textarea>
        <input type="submit" value="send message" onClick={sendMessage} className="btn"/>
    </form>

</div>

</section>

<section className="footer" id="footer">

<div className="box-container">

    <div className="box">
        <h3>our branches</h3>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Sarjapur </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Kormangala </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Kolar </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> BTM Layout </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Marathahalli </a>
    </div>

    <div className="box">
        <h3>quick links</h3>
        <a href="#"> <i className="fas fa-arrow-right"></i> home </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> vehicles </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> services </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> featured </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> reviews </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> contact </a>
    </div>

    <div className="box">
        <h3>contact info</h3>
        <a href="#"> <i className="fas fa-phone"></i> +91-9187127382 </a>
        <a href="#"> <i className="fas fa-phone"></i> +91-2222223613 </a>
        <a href="#"> <i className="fas fa-envelope"></i> bikehub@gmail.com </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Sarjapur, Bangalore, Karnataka </a>
    </div>

    <div className="box">
        <h3>contact info</h3>
        <a href="#"> <i className="fab fa-facebook-f"></i> facebook </a>
        <a href="#"> <i className="fab fa-twitter"></i> twitter </a>
        <a href="#"> <i className="fab fa-instagram"></i> instagram </a>
        <a href="#"> <i className="fab fa-linkedin"></i> linkedin </a>
        <a href="#"> <i className="fab fa-pinterest"></i> pinterest </a>
    </div>

</div>

<div className="credit"> Made with ❤️ | All rights reserved </div>

</section>





        </>
    )
    
}



export default Home