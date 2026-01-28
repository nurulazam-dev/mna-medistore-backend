import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seededAdmin() {
  try {
    const adminData = {
      name: "MNA MediStore",
      email: "admin@medistore.com",
      password: "Admin123",
      role: UserRole.ADMIN,
      phone: "+8801721233215",
      status: "UNBAN",
      address: "Dhaka",
    };

    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });
    console.log(existingUser);

    if (existingUser) {
      throw new Error("User already exist!");
    }

    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:5000",
        },
        body: JSON.stringify(adminData),
      },
    );

    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }
  } catch (err) {
    console.error(err);
  }
}

seededAdmin();
