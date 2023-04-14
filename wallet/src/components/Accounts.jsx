import {useEffect, useState } from "react";
import "./Main.css";


function Accounts({web3, setAddress}) {

  const [provider,setprovider] =useState("None");
  const [balance,setbalance]= useState(null) 
  const [account,setaccount]= useState(null) 
  useEffect (()=>{

    async function Allaccounts(){
      const select =document.querySelector("#selectNumber");
      try {

        const ACCOUNTS= await web3.eth.getAccounts();
        setprovider("Metamask")
        for(let i=0;i<=ACCOUNTS.length;i++){
          let opt = ACCOUNTS[i];
          let element = document.createElement("option");
          element.textContent=opt;
          element.value=opt;
          select.appendChild(element);
        }
      }catch(error){
        setprovider("not connected to any provider")
      }
      
    }     
   web3 &&  Allaccounts()
  },[web3])

 async function selectAccount (){
    let selectedAccount= document.querySelector("#selectNumber").value;
    if(selectedAccount && selectedAccount!=="Select Account"){
      try{

        // console.log(selectedAccount)
        setAddress(selectedAccount);
        let accountbalance= await web3.eth.getBalance(selectedAccount);
        const balanceInEth= web3.utils.fromWei(accountbalance,"ether");
        setbalance(balanceInEth);
        
        setaccount(selectedAccount);
      }catch(error){
        alert(error);
      }
  }else{
    setaccount(null);
    setbalance(null)
  }};

  return (
    <>
      <form className="label1" id="myForm">
        <label className="black-text" htmlFor="selectNumber">Select an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option  >Select Account</option>
        </select>
      </form>
      <span className="conAc">Connected Account:{account }</span>
      <br></br>
      <span className="acBal">Account Balance:{balance} ether</span>
      <br></br>
      <span className="provider">Provider :{provider}</span>
    </>
  );
}

export default Accounts;
