const chainSelectDropdown = document.getElementById("chainSelect");
const tabList = document.getElementById("tabList");
const tabContents = document.getElementById("tabContent");
const accountTab = document.getElementById("accountColumn");
const withdrawlTab = document.getElementById("withdrawlColumn");
const createAcctBtn = document.getElementById("createAcctBtn");
const createAccountModal = document.getElementById("createAcctModal");
const createAccountCloseBtn = document.getElementById("createAcctCloseBtn");
const createAccountCancelBtn = document.getElementById("createAcctCancelBtn");
const createAccountControl = document.getElementById("accountControl");
const addInputBtn = document.getElementById("addInput");
const removeInputBtn = document.getElementById("removeInput");
const depositModal = document.getElementById("depositModal");
const depositCloseBtn = document.getElementById("depositCloseBtn");
const depositCancelBtn = document.getElementById("depositCancelBtn");
const depositInput = document.getElementById("depositInput");
const withdrawlModal = document.getElementById("withdrawlModal");
const withdrawlCloseBtn = document.getElementById("withdrawlCloseBtn");
const withdrawlCancelBtn = document.getElementById("withdrawlCancelBtn");
const withdrawlInput = document.getElementById("withdrawlInput");

var modalInput = 1;

const userAccountCard = ({
  creator,
  balance,
  addresses,
  withdrawlRequests,
  accountId,
}) => {
  let allAddress = "";
  for (addr of addresses) {
    allAddress += `<p class="is-size-6 has-text-grey-light">
    ${addr}
  </p>`;
  }
  return ` <div class="card mb-3" id="account-id-${accountId}" data-creator="${creator}" data-balance="${ethers.utils.formatEther(balance)}">
  <header
    class="card-header px-3 py-2 is-flex is-justify-content-space-between"
  >
    <div class="is-flex is-align-items-center">
      <span class="icon owner-icon">
        <i class="fas fa-user"></i>
      </span>
      <div class="ml-2">
        <p class="is-size-7 has-text-grey-lighter">creator</p>
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-semibold"
        >
          ${creator}
        </p>
      </div>
    </div>
    <div>
      <p class="is-size-7 has-text-grey-lighter">Balance</p>
      <p
        class="is-size-7 has-text-grey-dark has-text-weight-semibold"
      >
        ${ethers.utils.formatEther(balance)}ETH
      </p>
    </div>
  </header>
  <div
    class="card-content is-flex is-justify-content-space-between is-align-items-end"
  >
    <div>
      <p class="is-size-7 has-text-grey-dark has-text-weight-bold">
        ADRESSES
      </p>
      <div>
      ${allAddress}
      </div>
      <div class="is-flex mt-4">
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-bold"
        >
          ACCOUNT ID:
        </p>
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-bold ml-2"
        >
          ${accountId}
        </p>
      </div>
      <div class="is-flex mt-4">
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-bold"
        >
          WITHDRAWL REQUESTS:
        </p>
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-bold ml-2"
        >
          ${withdrawlRequests}
        </p>
      </div>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item" onclick="toggleDepositModal(${accountId})">Make Deposit</a>
    <a href="#" class="card-footer-item" onclick="toggleWithdrawlModal(${accountId})">Request Withdrawal</a>
  </footer>
</div>`;
};

const withdrawlRequestCard = ({
  creator,
  withdrawlId,
  accountId,
  amount,
  user,
  requestedAt,
  approvals,
}) => {
  return `<div class="card">
  <header
    class="card-header px-3 py-2 is-flex is-justify-content-space-between"
  >
    <div class="is-flex is-align-items-center">
      <span class="icon owner-icon">
        <i class="fas fa-user"></i>
      </span>
      <div class="ml-2">
        <p class="is-size-7 has-text-grey-lighter">creator</p>
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-semibold"
        >
          ${creator}
        </p>
      </div>
    </div>
    <div class="has-text-right">
      <p class="is-size-7 has-text-grey-lighter">Withdrawl ID</p>
      <p
        class="is-size-7 has-text-grey-dark has-text-weight-semibold"
      >
        ${withdrawlId}
      </p>
    </div>
  </header>
  <div
    class="card-content is-flex is-justify-content-space-between is-align-items-end"
  >
    <div>
      <div class="is-flex mt-4">
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-normal"
        >
          ACCOUNT ID:
        </p>
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-bold ml-2"
        >
          ${accountId}
        </p>
      </div>
      <div class="is-flex mt-4">
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-normal"
        >
          AMOUNT:
        </p>
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-bold ml-2"
        >
          ${amount} ETH
        </p>
      </div>
      <div class="is-flex mt-4">
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-normal"
        >
          USER:
        </p>
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-bold ml-2"
        >
          ${user}
        </p>
      </div>
      <div class="is-flex mt-4">
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-normal"
        >
          REQUESTED AT:
        </p>
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-bold ml-2"
        >
          ${requestedAt}
        </p>
      </div>
      <div class="is-flex mt-4">
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-normal"
        >
          APPROVALS:
        </p>
        <p
          class="is-size-7 has-text-grey-dark has-text-weight-bold ml-2"
        >
          ${approvals}
        </p>
      </div>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Make Deposit</a>
    <a href="#" class="card-footer-item">Request Withdrawal</a>
  </footer>
</div>`;
};

const chainSelectClicked = () => {
  chainSelectDropdown.classList.toggle("is-active");
};

const toggleTabs = (idx) => {
  for (let i = 0; i < tabList.children.length; i++) {
    if (i == idx) {
      if (tabList.children[i].classList.contains("is-active")) return;
      tabList.children[i].classList.add("is-active");
      tabContents.children[i].classList.remove("is-hidden");
    } else {
      tabList.children[i].classList.remove("is-active");
      tabContents.children[i].classList.add("is-hidden");
    }
  }
};

const toggleModal = () => {
  createAccountModal.classList.toggle("is-active");
};

const toggleDepositModal = (accountId) => {
  depositModal.classList.toggle("is-active");
  if (!isNaN(accountId)) {
    depositModal.setAttribute("data-account-id", accountId);
  } else {
    depositModal.removeAttribute("data-account-id");
    depositInput.value = "";
  }
};

const toggleWithdrawlModal = (accountId) => {
  withdrawlModal.classList.toggle("is-active");
  if (!isNaN(accountId)) {
    withdrawlModal.setAttribute("data-account-id", accountId);
  } else {
    withdrawlModal.removeAttribute("data-account-id");
    withdrawlInput.value = "";
  }
};

// const makeDeposit = (id) => {
//   console.log(id)
// }

const disableInputBtns = () => {
  if (modalInput === 3) {
    addInputBtn.setAttribute("disabled", true);
    removeInputBtn.removeAttribute("disabled");
  } else if (modalInput === 1) {
    addInputBtn.removeAttribute("disabled");
    removeInputBtn.setAttribute("disabled", true);
  }
};

const addInput = () => {
  if (modalInput > 2) return;
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", `address ${modalInput + 1}`);
  input.className = "input account-input mb-2";
  createAccountControl.appendChild(input);
  modalInput++;
  disableInputBtns();
};

const removeInput = () => {
  if (modalInput < 2) return;
  createAccountControl.removeChild(createAccountControl.lastChild);
  modalInput--;
  disableInputBtns();
};

const setupEventListeners = () => {
  chainSelectDropdown.addEventListener("click", chainSelectClicked);
  createAcctBtn.addEventListener("click", toggleModal);
  createAccountCloseBtn.addEventListener("click", toggleModal);
  createAccountCancelBtn.addEventListener("click", toggleModal);
  addInputBtn.addEventListener("click", addInput);
  removeInputBtn.addEventListener("click", removeInput);
  depositCloseBtn.addEventListener("click", toggleDepositModal);
  depositCancelBtn.addEventListener("click", toggleDepositModal);
  withdrawlCancelBtn.addEventListener("click", toggleWithdrawlModal);
  withdrawlCloseBtn.addEventListener("click", toggleWithdrawlModal);

  for (let i = 0; i < tabList.children.length; i++) {
    tabList.children[i].addEventListener("click", () => toggleTabs(i));
  }
  // accountTab.insertAdjacentHTML(
  //   "beforeend",
  //   userAccountCard({
  //     creator: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //     balance: "0.0090",
  //     addresses: [
  //       "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //       "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  //       "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  //     ],
  //     withdrawlRequests: 5,
  //   })
  // );

  withdrawlTab.insertAdjacentHTML(
    "beforeend",
    withdrawlRequestCard({
      creator: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      withdrawlId: "001",
      accountId: "005",
      amount: "0.0090",
      approvals: "1 / 3",
      requestedAt: "25TH MAY 2023 - 5:00AM",
      user: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    })
  );
};

setupEventListeners();

// const { chainSelectDropdown } = init_UIELEMENTS();
