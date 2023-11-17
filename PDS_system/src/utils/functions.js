


export const connectWallet = async () =>{
    try{
        if(!window.ethereum) return {error : true , message : "Install Metamask"}

        const accounts = await window.ethereum.request({
            method : "eth_requestAccounts",
        })

        console.log(accounts[0])
        return {error : false , message : accounts[0]}
    }catch(err){
        console.log(err)
    }
}