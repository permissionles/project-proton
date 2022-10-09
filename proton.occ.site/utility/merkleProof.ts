// import { MerkleTree } from "merkletreejs";
import Web3 from "web3";
// import keccak256 from "keccak256";
export const getMerkleProof = (wallet: string, amount: string) => {
  const buf2hex = (x: any) => "0x" + x.toString("hex");

  // const finaladdress = buf2hex(keccak256(wallet).toString("hex"));

  /* 
    the amount should be converted into bytes32 value using the method below
    */
  const finalamount = Web3.utils.encodePacked(amount);

  /* Now the array should look like this */
  // const preArray: any = [finaladdress, finalamount];

  // const finalArray: any = Web3.utils.soliditySha3(preArray[0], preArray[1]);
  // console.log("finalarray" + finalArray);
  var finalhex = [
    "0x38bef520539e2fe824912f9eb9e651040b73fa467eb6975909a9a74dacf61ddb",
    "0x2b7410b4511c8dc59128f5f36c40fe816d1fd1ba17fdb951fd30d4e81951e279",
    "0x281c04ac517c0ebde829403b79fcf301674ece595c77d6f3da9e015ead7cf730",
    "0x7726076b5f7bf5762a3c44c10eee70485137391235bfa5bd489314974cbf596d",
    "0x38bef520539e2fe824912f9eb9e651040b73fa467eb6975909a9a74dacf61dde",
  ];
  // const leaves = finalhex.map((x) => keccak256(x));

  // const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  // const root = tree.getRoot().toString("hex");
  // const leaf = keccak256(finalArray);
  // const proof = tree.getProof(leaf);
  // console.log(tree.verify(proof, leaf, root)); // true
  // return proof.map((x) => buf2hex(x.data));
};

//returned array of bytes32 will be used to call the withdraw function
