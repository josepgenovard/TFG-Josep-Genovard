async function main() {
  // We get the contracts to deploy
  const Recepta = await ethers.getContractFactory("Recepta", {
    libraries: {
      DateTime: "0x92482Ba45A4D2186DafB486b322C6d0B88410FE7",
    },
  });
  const recepta = await Recepta.deploy();

  console.log("Desplegant Recepta a l'adreça:", recepta.address);

  await recepta.deployed();

  console.log("Recepta deployed to:", recepta.address);
  

  const Ministeri = await ethers.getContractFactory("Ministeri", {
    libraries: {
      //DateTime: "0x92482Ba45A4D2186DafB486b322C6d0B88410FE7",
    },
  });
  const ministeri = await Ministeri.deploy(recepta.address);
  //const ministeri = await Ministeri.deploy('0x3A1dee4Ca5184636F772c72921C937AAb2b3c447');


  console.log("Desplegant Ministeri a l'adreça:", ministeri.address);

  await ministeri.deployed();

  console.log("Ministeri deployed to:", ministeri.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });