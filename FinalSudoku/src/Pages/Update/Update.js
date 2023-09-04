import { motion } from 'framer-motion'
import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router'
import logo from '../../images/e.jpg'
import axios from 'axios'
import './Update.css'
import { toast } from 'react-toastify'
import { Placeholder } from 'react-bootstrap'


export default function Update() {

    const navigate = useNavigate()
    const [playerId , setPlayerId] =useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setemail] = useState('')
    const [phoneNo, setphoneNumber] = useState('')
    const [password, setPassword] = useState('')
   
    const logout = () => {
        toast.error("Logging Off")
        alert("Logging off");
        navigate("/");
    };
    const getSessionStorageId=()=>{
        const userId=sessionStorage.getItem('currentplayerId')
        return userId
        
    }
    useEffect(() => {
       
        const playerId=getSessionStorageId()
        
          const url = `http://localhost:7071/Player/getbyid?playerId=${playerId}`
          axios.get(url).then((response) => {
            const result = response.data
    
            
              result={ playerId, firstName, lastName, email, phoneNo } 
              console.log(result.playerId)
         
         } )
    
           
    })
    
    
    const Updatee = () => {
        const curId=getSessionStorageId();
        setPlayerId(curId)
        const body = {
            firstName, lastName, email, phoneNo, password, playerId
        }
       
        const url = `http://localhost:7071/Player/update`
        axios.post(url, body).then((response) => {
            const result = response.data
            console.log(result)
            if (result== 'updated') {
                toast.success("Player Updated Successfully")
                
                navigate('/boardd')
            } else {
                toast.error(result['error'])
            }
        })
    }
return (
    <div style={{ overflowX: "hidden" }}>
        <div >
            <div>
                <div className="row shadow sticky-top"  >
                    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "black" }}>
                        <div className="container-fluid">
                            <a className="navbar-brand" href='/Admin'><img src={logo} alt="" id='headerlogoProfile' /></a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ backgroundColor: "white" }}>
                                <span className="navbar-toggler-icon" style={{ backgroundColor: "grey" }}></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" onClick={() => (navigate('/boardd'))} id='headerBtn'>Home</a>
                                    </li>
                                </ul>
                                <div className=''>
                                    <motion.button className='btn btn-primary SignButton'
                                        whileHover={{ backgroundColor: "rgb(220, 222, 224)", color: "black" }}
                                        whileTap={{ backgroundColor: "rgb(220, 222, 224)", color: "black" }}
                                        onClick={logout}
                                    >Logout</motion.button>
                                </div>


                            </div>
                        </div>
                    </nav>
                </div >
            </div  >

        </div>
        <br></br>

        <br></br>

        <br></br>

        <br></br>

        <br></br>
        <div className='container'>
            <div className='card-fluid'>
                <div className='card-header'>
                    <center><h1>Update details</h1></center>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <form action="JavaScript:Updatee()">
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="label-control">First Name</label>
                                        <input onChange={e => (
                                            setFirstName(e.target.value)
                                        )}
                                            required="true" type="text" className="form-control shadow" />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="label-control">Last Name</label>
                                        <input onChange={e => (
                                            setLastName(e.target.value)
                                        )}

                                      required="true" type="text" className="form-control shadow" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="label-control">Email</label>
                                <input onChange={e => (
                                    setemail(e.target.value)
                                )}
                                    required="true" type="email" className="form-control shadow" />
                            </div>
                            <div className="mb-3">
                                <label className="label-control ">Phone Number   (excluding postal code)</label>
                                <input onChange={e => (
                                    setphoneNumber(e.target.value)
                                )}
                                    maxLength="10" minLength="10"
                                           required="true" type="tel" className="form-control shadow" />
                            </div>
                            <div className="mb-3">
                                <label className="label-control">Password</label>
                                <input onChange={e => (
                                    setPassword(e.target.value)
                                )}
                                    minLength="5" maxLength="14"
                              placeholder='***'      required="true" type="password" className="form-control shadow" />
                            </div>

                            <div>
                                <h6 style={{ color: "grey" }}>All Rights reserved with @GamingIndia</h6>
                            </div>
                            <div className="col">
                                <motion.button className='float-end UpBtn'
                                    whileHover={{ backgroundColor: "rgb(7, 84, 133)", color: "white" }}
                                    onClick={Updatee}
                                >Submit</motion.button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>


        <br>
        </br>
        <br>
        </br>
        <br></br>
        <br></br>

        <br></br>
        <br></br>

    </div>
);
                                
}