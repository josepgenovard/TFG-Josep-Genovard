async function main() {
  // We get the contract to deploy
  const Ministeri = await ethers.getContractFactory("Ministeri", {
    libraries: {
      DateTime: "0x92482Ba45A4D2186DafB486b322C6d0B88410FE7",
    },
  });
  const ministeri = await Ministeri.deploy();

  await ministeri.deployed();

  console.log("Ministeri deployed to:", ministeri.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });