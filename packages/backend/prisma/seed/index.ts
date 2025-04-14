import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create a demo tenant
  const demoTenant = await prisma.tenant.upsert({
    where: { name: 'demo' },
    update: {},
    create: {
      name: 'demo',
      schema: 'demo',
      displayName: 'Demo Radiology Center',
      address: '123 Main St, Anytown, USA',
      phone: '+1-555-123-4567',
      email: 'info@demoradiology.com',
      logo: 'https://via.placeholder.com/150',
      isActive: true,
    },
  });

  console.log('Created demo tenant:', demoTenant);

  // Create admin user
  const adminPassword = await bcrypt.hash('password123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@radiology.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@radiology.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: Role.ADMIN,
      tenantId: demoTenant.id,
    },
  });

  console.log('Created admin user:', adminUser.email);

  // Create doctor user
  const doctorPassword = await bcrypt.hash('password123', 10);
  const doctorUser = await prisma.user.upsert({
    where: { email: 'doctor@radiology.com' },
    update: {},
    create: {
      username: 'doctor',
      email: 'doctor@radiology.com',
      password: doctorPassword,
      firstName: 'Doctor',
      lastName: 'Smith',
      role: Role.DOCTOR,
      tenantId: demoTenant.id,
    },
  });

  console.log('Created doctor user:', doctorUser.email);

  // Create receptionist user
  const receptionistPassword = await bcrypt.hash('password123', 10);
  const receptionistUser = await prisma.user.upsert({
    where: { email: 'receptionist@radiology.com' },
    update: {},
    create: {
      username: 'receptionist',
      email: 'receptionist@radiology.com',
      password: receptionistPassword,
      firstName: 'Reception',
      lastName: 'Desk',
      role: Role.RECEPTIONIST,
      tenantId: demoTenant.id,
    },
  });

  console.log('Created receptionist user:', receptionistUser.email);

  // Create technician user
  const technicianPassword = await bcrypt.hash('password123', 10);
  const technicianUser = await prisma.user.upsert({
    where: { email: 'technician@radiology.com' },
    update: {},
    create: {
      username: 'technician',
      email: 'technician@radiology.com',
      password: technicianPassword,
      firstName: 'Tech',
      lastName: 'Support',
      role: Role.TECHNICIAN,
      tenantId: demoTenant.id,
    },
  });

  console.log('Created technician user:', technicianUser.email);

  // Create sample patients
  const patient1 = await prisma.patient.upsert({
    where: { id: '1' },
    update: {},
    create: {
      name: 'John Doe',
      dob: new Date('1980-01-15'),
      mobile: '555-123-4567',
      email: 'john.doe@example.com',
      address: '456 Oak St, Anytown, USA',
      tenantId: demoTenant.id,
    },
  });

  console.log('Created patient:', patient1.name);

  const patient2 = await prisma.patient.upsert({
    where: { id: '2' },
    update: {},
    create: {
      name: 'Jane Smith',
      dob: new Date('1992-05-20'),
      mobile: '555-987-6543',
      email: 'jane.smith@example.com',
      address: '789 Pine St, Anytown, USA',
      tenantId: demoTenant.id,
    },
  });

  console.log('Created patient:', patient2.name);

  console.log('Database seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });