import { PrismaClient } from "@prisma/client";
import { roles, admin } from "../src/configs/config.json";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  for (const role of roles) {
    await prisma.role.upsert({
      where: { role_id: role.role_id },
      update: {},
      create: { role_name: role.role_name, role_id: role.role_id },
    });
  }

  console.log("Seeded role thành công");

  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASS!, 10);
  const adminRole = roles.find(r => r.role_name === "admin");

  if (adminRole?.role_id) {
    await prisma.admin.upsert({
      where: { admin_id: admin.admin_id },
      update: {},
      create: {
        admin_id: admin.admin_id,
        email: admin.email,
        first_name: admin.first_name,
        last_name: admin.last_name,
        phone: admin.phone
      }
    })
  
    await prisma.user_account.upsert({
      where: { admin_id: admin.admin_id },
      update: {},
      create: {
        admin_id: admin.admin_id,
        role_id: adminRole.role_id,
        password: adminPassword,
      }
    })

    console.log("Seeded admin account thành công");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
