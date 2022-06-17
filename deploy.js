async function main() {
  // We get the contracts to deploy
  const Recepta = await ethers.getContractFactory("Recepta", {
    libraries: {
      DateTime: "0x92482Ba45A4D2186DafB486b322C6d0B88410FE7",
    },
  });
  const recepta = await Recepta.deploy();

  await recepta.deployed();

  console.log("Recepta deployed to:", recepta.address);

  const Ministeri = await ethers.getContractFactory("Ministeri", {
    libraries: {
      //DateTime: "0x92482Ba45A4D2186DafB486b322C6d0B88410FE7",
    },
  });
  const ministeri = await Ministeri.deploy(recepta.address);

  await ministeri.deployed();

  console.log("Ministeri deployed to:", ministeri.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });