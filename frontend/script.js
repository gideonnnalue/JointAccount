const connectWalletBtn = document.getElementById("connectWalletBtn");
const newAccountBtn = document.getElementById("createAcctSaveBtn");

const provider = new ethers.providers.Web3Provider(window.ethereum);

const WALLET_VALIDATION = /^0x[a-fA-F0-9]{40}$/;

const abi = [
  "event AccountCreated(address[] owners, uint256 indexed id, uint256 timestamp)",
  "event Deposit(address indexed user, uint256 indexed accountId, uint256 value, uint256 timestamp)",
  "event Withdraw(uint256 indexed withdrawId, uint256 timestamp)",
  "event WithdrawRequested(address indexed user, uint256 indexed accountId, uint256 withdrawId, uint256 amount, uint256 timestamp)",
  "function approveWithdrawl(uint256 accountId, uint256 withdrawId)",
  "function createAccount(address[] otherOwners)",
  "function deposit(uint256 accountId) payable",
  "function getAccounts() view returns (uint256[])",
  "function getAccountsInfo() view returns (tuple(uint256 id, address[] owners, uint256 balance, uint256 requests)[])",
  "function getApprovals(uint256 accountId, uint256 withdrawId) view returns (uint256)",
  "function getBalance(uint256 accountId) view returns (uint256)",
  "function getOwners(uint256 accountId) view returns (address[])",
  "function requestWithdrawl(uint256 accountId, uint256 amount)",
  "function withdraw(uint256 accountId, uint256 withdrawId)",
];
const address = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

let contract = null;

async function createAccount() {
  await getAccess();
  const addressInputs = document.querySelectorAll(".account-input");
  const owners = [];
  for (let i = 0; i < addressInputs.length; i++) {
    if (!addressInputs[i].value) return;
    if (!addressInputs[i].value.match(WALLET_VALIDATION)) {
      alert(`Input ${i + 1} does not match a valid wallet address`);
    }
    owners.push(addressInputs[i].value);
  }
  try {
    newAccountBtn.classList.add("is-loading");
    await contract.createAccount(owners).then(() => alert("Success"));
    toggleModal();
  } catch (e) {
    console.log(e);
    alert(e.message);
  } finally {
    newAccountBtn.classList.remove("is-loading");
  }
}

async function viewAccounts() {
  await getAccess();
  const result = await contract.getAccountsInfo();
  for (let i = 0; i < result.length; i++) {
    accountTab.insertAdjacentHTML(
      "beforeend",
      userAccountCard({
        creator: result[i][1][0],
        balance: result[i][2],
        addresses: result[i][1],
        withdrawlRequests: result[i][3],
        accountId: result[i][0],
      })
    );
  }
  document.getElementById("accounts").innerHTML = result;
}

// async function checkAccount() {
//   try {
//     const balance = await provider.getBalance("ethers.eth")
//     console.log('PPPRRR')
//     if(balance) return true;
//     else return false;
//   } catch(err) {
//     console.log(err)
//     return false;
//   }
// }

async function makeWithdrawl() {
  const amount = withdrawlInput.value;
  if (!amount.trim() || isNaN(amount)) {
    alert("Input a valid number");
    return;
  }
}

async function makeDeposit() {
  const amount = depositInput.value;
  if (!amount.trim() || isNaN(amount)) {
    alert("Input a valid number");
    return;
  }
  const depositBtn = document.getElementById("depositSaveBtn");
  const accountId = depositModal.getAttribute("data-account-id");
  const weiAmount = ethers.utils.parseUnits(amount, "ether");
  try {
    depositBtn.classList.add("is-loading")
    const depositTx = await contract.deposit(accountId, { value: weiAmount });
    await depositTx.wait(depositTx);
    toggleDepositModal();
  } catch (e) {
    console.log(e);
    alert("Error occured, check console")
  } finally {
    depositBtn.classList.remove("is-loading")
  }
}

async function getAccounts() {
  try {
    const accounts = await contract.getAccountsInfo();
    console.log(accounts);
  } catch (e) {
    console.log(e);
  }
}

async function getAccess() {
  if (contract) return;

  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  contract = new ethers.Contract(address, abi, signer);

  const eventLog = document.getElementById("events");
  contract.on("AccountCreated", (owners, id, event) => {
    eventLog.append(`Account Created: ID = ${id}, Owners = ${owners}`);
  });
}

window.addEventListener("load", (event) => {
  viewAccounts();
});

connectWalletBtn.addEventListener("click", getAccess);
newAccountBtn.addEventListener("click", createAccount);
