import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roles = [
    {
        role_id: 1,
        role_name: "admin"
    },
    {
        role_id: 2,
        role_name: "lecturer"
    },
    {
        role_id: 3,
        role_name: "student"
    }
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { role_id: role.role_id },
      update: {},
      create: { role_name: role.role_name, role_id: role.role_id },
    });
  }

  console.log("Seeded role thành công");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
