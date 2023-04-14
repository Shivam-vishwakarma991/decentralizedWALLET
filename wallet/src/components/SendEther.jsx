import { useState } from "react";
import "./Main.css";

function SendEther({web3,account}) {
  const [receipt, setreceipt]=useState({});
  const [toggle,settoggle]= useState(false);

  function Ethersend(event) {
    
    event.preventDefault();
    const _to= document.querySelector("#to").value;
    const amnt= document.querySelector("#value").value;
    const weivalue= web3.utils.toWei(amnt,"ether");
    web3.eth.sendTransaction({
      from:account,
      to: _to,
      value: weivalue
    }).then(function(receipt){
      setreceipt(receipt);
      settoggle(true);
      // console.log(receipt)
    })
  }
    return (
    <>
      <form className="box" onSubmit={Ethersend}>
        <p style={{ marginTop: "50px" }} className="label">
          <label style={{fontSize: "24px", fontWeight: "bold", textShadow: "2px 2px 4px #000"  }} htmlFor="">Enter Receiver's Address</label>
          <input placeholder="Enter the address" className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label style={{fontSize: "24px", fontWeight: "bold", textShadow: "2px 2px 4px #000"  }} htmlFor="">Enter Amount to Send (Ether)</label>
          <input placeholder="Enter Amount" className="receive" type="text" id="value"></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <div className="box">
        <pre className="json">
          <h3>Json Response</h3>
          <code>{toggle &&JSON.stringify(receipt, ["transactionHash","blockHash", "blockNumber", "gasUsed"],2)}</code>
        </pre>
      </div>
    </>
  );
}

export default SendEther;
