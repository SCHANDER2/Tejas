const nodemailer = require('nodemailer');

async function test(user, pass) {
  console.log(`Testing login for: ${user} ...`);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass }
  });

  try {
    await transporter.verify();
    console.log(`✅ SUCCESS: Authentication succeeded for ${user}!`);
    return true;
  } catch (err) {
    console.log(`❌ FAILED: ${user} failed: ${err.message}`);
    return false;
  }
}

async function run() {
  const passStripped = 'vrclaqfkgxigdhht';
  const passSpaced = 'vrcl aqfk gxig dhht';

  console.log('--- Testing password without spaces ---');
  await test('rajenderbana83@gmail.com', passStripped);
  await test('lakshaybana404@gmail.com', passStripped);

  console.log('\n--- Testing password with spaces ---');
  await test('rajenderbana83@gmail.com', passSpaced);
  await test('lakshaybana404@gmail.com', passSpaced);
}

run();
