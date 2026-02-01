import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`MNA_MediStore_Server running on port:${PORT}`);
    });
  } catch (error) {
    console.log("Database connection fail", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
