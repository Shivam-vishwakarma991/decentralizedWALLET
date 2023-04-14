import { useState, useEffect } from "react";
import Web3 from "web3";
import Welcome from "./components/Welcome.jsx";
import Accounts from "./components/Accounts.jsx";
import SendEther from "./components/SendEther.jsx";
import "./App.css";
import detectEthereumProvider from "@metamask/detect-provider";


function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts,setaccounts]= useState(null);
  function setAddress(address){
      setaccounts(address)
  }

  useEffect(() => {
    const init = async () => {
      try {
        const provider = await detectEthereumProvider();
        // console.log(provider)
        const web3 = new Web3(provider);
        // const web3 = new Web3("http://localhost:7545");
        setWeb3(web3);
        // console.log(web3);
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);
  return (
    <div className="Flex">
      <div className="welMargin">
        <Welcome />
      </div>
      <div className="Account">
        <Accounts web3={web3} setAddress={setAddress} />
      </div>

      <div>
        <SendEther web3={web3} account={accounts}  />
      </div>
    </div>
  );
};
export default App;
