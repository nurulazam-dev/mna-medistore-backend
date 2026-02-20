import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seededAdmin() {
  try {
    const adminData = {
      name: "MNA MediStore",
      email: "admin@medistore.com",
      password: "Admin123",
      role: UserRole.ADMIN,
      emailVerified: true,
      phone: "+8801721233215",
      status: "ACTIVE",
      address: "Dhaka",
    };

    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exist!");
    }

    const signUpAdmin = await fetch(
      "https://mna-medistore-backend.vercel.app/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "https://mna-medistore-backend.vercel.app",
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
