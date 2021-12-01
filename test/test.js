const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20 DemoToken", function () {

  let demoToken;
  let owner;
  let addr1;
  let addr2;

  this.beforeEach(async function(){
    const DemoToken = await ethers.getContractFactory("DemoToken");
    demoToken = await DemoToken.deploy();
    await demoToken.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should successfully deploy", async function () {
    console.log('success');
  });

  it("Should deploy with 1m of supply for the owner of the contract", async function(){
    
    const decimals = await demoToken.decimals();
    const balance = await demoToken.balanceOf(owner.address);
    console.log(ethers.utils.formatEther(balance));
    expect(await ethers.utils.formatEther(balance)).to.equal("1000000.0");
  });

  it("Should let you send tokens to another address", async function(){
    await demoToken.transfer(addr1.address, ethers.utils.parseEther("100"));
    expect(await demoToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should let you give another address to approval to send on yout behalf ", async function(){
    await demoToken.connect(addr1).approve(owner.address, ethers.utils.parseEther("1000"));
    await demoToken.transfer(addr1.address, ethers.utils.parseEther("1000"));
    await demoToken.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther("1000"));
    expect(await demoToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("1000"));
  });
});
