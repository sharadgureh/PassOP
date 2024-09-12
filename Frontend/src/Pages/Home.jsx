import React, { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
function Home() {
  const [show, setShow] = useState(false);
  const [passwordArray, setPasswordArray] = useState([])
  const [formdata, setFormData] = useState({
    url:"",
    userName:"",
    password:""
  })
  const getpassword = async () => {
    let req=await fetch("http://localhost:8000/find")
    let password= await req.json()
    setPasswordArray(password)
  }
  useEffect(()=>{
    getpassword()
  },[])

  const changeHandler = (e) => {
    const {name,value}=e.target
    setFormData((prev)=>{
      return ({
        ...prev,
        [name]:value
      })
    })
  }
  const saveHandler= async () => {

    // if already in DB
    let req= await fetch("http://localhost:8000/delete",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:formdata.id}) })



    console.log(formdata)
    setPasswordArray([...passwordArray,{...formdata,id:uuidv4()}])
    await fetch("http://localhost:8000/save", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...formdata,id:uuidv4()})})
    // localStorage.setItem("password",JSON.stringify([...passwordArray,{...formdata,id:uuidv4()}]))
    // console.log([...passwordArray,formdata])
    toast.success("Password Added")
    setFormData({
      url:"",
      userName:"",
      password:""
    })
    
  }

  const copyDataHandler= (text) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied To Clipboard")
    
  }
  
  const DeleteDataHandler= async (id) => {
    console.log("data deleted with id :",id)
    let really=confirm("do u want to delete password?")
    if(really){
      setPasswordArray(passwordArray.filter(item=>item.id !== id))
      let req= await fetch("http://localhost:8000/delete",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id}) })
      // localStorage.setItem("password",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      toast.success("password deleted")
    } 
  }
  const EditDataHandler =(id) => {
    toast.success("You Can Now Edit Your Password")
    console.log("data edited with id :",id)
    setFormData({...passwordArray.filter(i=> i.id===id)[0],id:id});
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    s
  }

  return (
    <div className="mx-auto bg-transparent mycontainer text-center p-4 md:p-8 min-h-[80vh]">
      <h1 className="text-4xl font-bold text-center md:text-8xl ring-black gradient-text">
        <span className="font-bold text-fuchsia-900">&lt;</span>
        PassOP
        <span className="font-bold text-fuchsia-900">/&gt;</span>
      </h1>
      <p className="py-4 text-xl md:text-xl">Your Own Password Manager</p>

      {/* form */}
      <div className="flex flex-col max-w-2xl p-1 mx-auto text-black bg-transparent shadow-2xl md:p-6 shadow-purple-50">
        <input
          type="text"
          className="w-full px-4 py-2 transition border border-purple-500 rounded-full placeholder:text-center hover:border-purple-300 focus:border-purple-300"
          placeholder="Enter Website URL"
          name="url"
          value={formdata.url}
          required
          onChange={changeHandler}
        />
        <div className="flex flex-col py-3 md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <input
            type="text"
            className="w-full px-4 py-2 transition border border-purple-500 rounded-full md:w-3/4 placeholder:text-center hover:border-purple-300 focus:border-purple-300"
            placeholder="Enter UserName"
            name="userName"
            required
            value={formdata.userName}
            onChange={changeHandler}
          />
          <div className="relative flex w-full md:w-2/5">
            <input
              type={show ? "text" : "password"}
              className="w-full px-2 py-2 transition border border-purple-500 rounded-full placeholder:text-center hover:border-purple-300 focus:border-purple-300"
              placeholder="Enter Password"
              name="password"
              value={formdata.password}
              required
              onChange={changeHandler}
            />

            <button
              className="absolute transform -translate-y-1/2 bg-transparent border-none top-1/2 right-3"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <IoEye className="text-black" />
              ) : (
                <IoEyeOff className="text-black" />
              )}
            </button>
          </div>
        </div>
        <button className="flex items-center px-8 py-3 mx-auto text-xl transition bg-purple-100 border border-purple-300 shadow gap-x-2 md:text-2xl hover:border-purple-500 rounded-2xl md:px-24 shadow-purple-900"
        onClick={saveHandler}>
          <AiOutlineAppstoreAdd className="w-6 h-6 my-auto border md:w-8 md:h-8" />
          Add Password
        </button>
      </div>
<div className="flex flex-col items-center justify-center overflow-x-auto password">
  <h1 className="p-2 m-1 text-4xl font-bold">Your Password</h1>
  {passwordArray.length===0 && <div>No password to show</div> }
  {passwordArray.length!=0 && 
  <table className="w-full overflow-hidden border border-white table-auto rounded-2xl md:max-w-4xl">
    <thead className="bg-purple-200 ">
      <tr>
        <th className="py-2">Site</th>
        <th className="py-2">UserName</th>
        <th className="py-2">Password</th>
        <th className="py-2">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-purple-100">
      {
        passwordArray.map((item, index) => {
          return (
            <tr key={index}>
              <td className="py-1 text-center min-w-32">
                <a href={item.url} target="_blank">
                  <span className="cursor-pointer" onClick={() => { copyDataHandler(item.url) }}>{item.url}</span>
                </a>
              </td>
              <td className="py-1 text-center min-w-32">
                <span className="cursor-pointer" onClick={() => { copyDataHandler(item.userName) }}>{item.userName}</span>
              </td>
              <td className="py-1 text-center min-w-32">
                <span className="cursor-pointer" onClick={() => { copyDataHandler(item.password) }}>{item.password}</span>
              </td>
              <td className="flex py-1 text-center min-w-32 justify-evenly">
                <span className="cursor-pointer" onClick={() => { DeleteDataHandler(item.id) }}>
                  <MdOutlineDelete className="w-10 h-6" />
                </span>
                <span className="cursor-pointer" onClick={() => { EditDataHandler(item.id) }}>
                  <CiEdit className="w-10 h-6" />
                </span>
              </td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
}
</div>


    </div>
  );
}

export default Home;
