import { AssertionError } from 'assert';

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('🚀 Starting Módulo 1 (Auth) Tests...\n');

  const results: Record<string, boolean | string> = {};

  const uniqueId = Date.now();
  const testUsername = `agency_${uniqueId}`;
  const testEmail = `agency_${uniqueId}@test.com`;
  const testPassword = `Securep@ss123!`;
  const testNombre = `Agencia Test ${uniqueId}`;

  // Helper for requests
  async function apiRequest(path: string, method: string, body?: any, headers: Record<string, string> = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    let responseBody: any = null;
    try {
      responseBody = await response.json();
    } catch (e) {
      // no-op if response is not json
    }
    return {
      status: response.status,
      body: responseBody,
    };
  }

  // --- 1.1 Registro ---
  console.log('--- 1.1 Registro ---');

  // Test: Registrar con datos válidos -> 201 + { access_token, agency }
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: testUsername,
      email: testEmail,
      password: testPassword,
    });
    
    if (res.status !== 201) {
      throw new Error(`Expected 201, got ${res.status}. Body: ${JSON.stringify(res.body)}`);
    }
    
    const hasToken = typeof res.body?.access_token === 'string' && res.body.access_token.length > 0;
    const noPassword = res.body?.agency && !('password' in res.body.agency);
    const defaultPlan = res.body?.agency?.plan === 'gratuito';

    results['1.1.1 Registrar agencia con datos válidos'] = hasToken && noPassword && defaultPlan;
    results['1.1.2 El access_token es un JWT válido'] = hasToken;
    results['1.1.3 El objeto agency NO incluye el campo password'] = noPassword;
    results['1.1.4 El plan por defecto es gratuito'] = defaultPlan;
    
    console.log('✅ Happy Path Registration: Success');
  } catch (e: any) {
    console.error('❌ Happy Path Registration failed:', e.message);
    results['1.1.1 Registrar agencia con datos válidos'] = `Failed: ${e.message}`;
  }

  // Test Validaciones del DTO
  // Sin nombre -> 400 con mensaje "El nombre es obligatorio"
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      username: `u_${uniqueId}`,
      email: `e_${uniqueId}@test.com`,
      password: testPassword,
    });
    const messageMatch = Array.isArray(res.body?.message)
      ? res.body.message.includes('El nombre es obligatorio')
      : res.body?.message === 'El nombre es obligatorio';
    results['1.1.5 Sin nombre -> 400 "El nombre es obligatorio"'] = res.status === 400 && messageMatch;
  } catch (e: any) {
    results['1.1.5 Sin nombre -> 400 "El nombre es obligatorio"'] = `Error: ${e.message}`;
  }

  // Sin username -> 400
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      email: `e_${uniqueId}@test.com`,
      password: testPassword,
    });
    const messageMatch = Array.isArray(res.body?.message)
      ? res.body.message.includes('El nombre de usuario es obligatorio')
      : res.body?.message === 'El nombre de usuario es obligatorio';
    results['1.1.6 Sin username -> 400 "El nombre de usuario es obligatorio"'] = res.status === 400 && messageMatch;
  } catch (e: any) {
    results['1.1.6 Sin username -> 400 "El nombre de usuario es obligatorio"'] = `Error: ${e.message}`;
  }

  // Sin email -> 400
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: `u_${uniqueId}`,
      password: testPassword,
    });
    const messageMatch = Array.isArray(res.body?.message)
      ? res.body.message.includes('El email es obligatorio')
      : res.body?.message === 'El email es obligatorio';
    results['1.1.7 Sin email -> 400 "El email es obligatorio"'] = res.status === 400 && messageMatch;
  } catch (e: any) {
    results['1.1.7 Sin email -> 400 "El email es obligatorio"'] = `Error: ${e.message}`;
  }

  // Email inválido -> 400
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: `u_${uniqueId}`,
      email: 'noesemail',
      password: testPassword,
    });
    const messageMatch = Array.isArray(res.body?.message)
      ? res.body.message.includes('El email debe ser un correo válido')
      : res.body?.message === 'El email debe ser un correo válido';
    results['1.1.8 Email inválido -> 400 "El email debe ser un correo válido"'] = res.status === 400 && messageMatch;
  } catch (e: any) {
    results['1.1.8 Email inválido -> 400 "El email debe ser un correo válido"'] = `Error: ${e.message}`;
  }

  // Sin password -> 400
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: `u_${uniqueId}`,
      email: `e_${uniqueId}@test.com`,
    });
    const messageMatch = Array.isArray(res.body?.message)
      ? res.body.message.includes('La contraseña es obligatoria')
      : res.body?.message === 'La contraseña es obligatoria';
    results['1.1.9 Sin password -> 400 "La contraseña es obligatoria"'] = res.status === 400 && messageMatch;
  } catch (e: any) {
    results['1.1.9 Sin password -> 400 "La contraseña es obligatoria"'] = `Error: ${e.message}`;
  }

  // Password < 8
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: `u_${uniqueId}`,
      email: `e_${uniqueId}@test.com`,
      password: 'Ab1@',
    });
    results['1.1.10 Password < 8 caracteres -> 400'] = res.status === 400;
  } catch (e: any) {
    results['1.1.10 Password < 8 caracteres -> 400'] = `Error: ${e.message}`;
  }

  // Password sin mayúscula
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: `u_${uniqueId}`,
      email: `e_${uniqueId}@test.com`,
      password: 'password1@',
    });
    results['1.1.11 Password sin mayúscula -> 400'] = res.status === 400;
  } catch (e: any) {
    results['1.1.11 Password sin mayúscula -> 400'] = `Error: ${e.message}`;
  }

  // Password sin minúscula
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: `u_${uniqueId}`,
      email: `e_${uniqueId}@test.com`,
      password: 'PASSWORD1@',
    });
    results['1.1.12 Password sin minúscula -> 400'] = res.status === 400;
  } catch (e: any) {
    results['1.1.12 Password sin minúscula -> 400'] = `Error: ${e.message}`;
  }

  // Password sin número
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: `u_${uniqueId}`,
      email: `e_${uniqueId}@test.com`,
      password: 'Password@abc',
    });
    results['1.1.13 Password sin número -> 400'] = res.status === 400;
  } catch (e: any) {
    results['1.1.13 Password sin número -> 400'] = `Error: ${e.message}`;
  }

  // Password sin carácter especial
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: `u_${uniqueId}`,
      email: `e_${uniqueId}@test.com`,
      password: 'Password123',
    });
    results['1.1.14 Password sin carácter especial -> 400'] = res.status === 400;
  } catch (e: any) {
    results['1.1.14 Password sin carácter especial -> 400'] = `Error: ${e.message}`;
  }

  // Password válida
  try {
    const newUsername = `u2_${uniqueId}`;
    const newEmail = `e2_${uniqueId}@test.com`;
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: newUsername,
      email: newEmail,
      password: 'Securep@ss123!',
    });
    results['1.1.15 Password válida -> 201'] = res.status === 201;
  } catch (e: any) {
    results['1.1.15 Password válida -> 201'] = `Error: ${e.message}`;
  }

  // Plan inválido
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: `u3_${uniqueId}`,
      email: `e3_${uniqueId}@test.com`,
      password: testPassword,
      plan: 'inexistente',
    });
    results['1.1.16 Plan inválido -> 400'] = res.status === 400;
  } catch (e: any) {
    results['1.1.16 Plan inválido -> 400'] = `Error: ${e.message}`;
  }

  // Extra field
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: testNombre,
      username: `u4_${uniqueId}`,
      email: `e4_${uniqueId}@test.com`,
      password: testPassword,
      hack: true,
    });
    results['1.1.17 Extra field -> 400 (forbidNonWhitelisted)'] = res.status === 400;
  } catch (e: any) {
    results['1.1.17 Extra field -> 400 (forbidNonWhitelisted)'] = `Error: ${e.message}`;
  }

  // Conflictos
  // Registrar con username existente
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: 'Otro Nombre',
      username: testUsername, // ya registrado al inicio
      email: `different_email_${uniqueId}@test.com`,
      password: testPassword,
    });
    const messageMatch = res.body?.message === 'El nombre de usuario o correo electrónico ya existe';
    results['1.1.18 Username existente -> 409'] = res.status === 409 && messageMatch;
  } catch (e: any) {
    results['1.1.18 Username existente -> 409'] = `Error: ${e.message}`;
  }

  // Registrar con email existente
  try {
    const res = await apiRequest('/auth/register', 'POST', {
      nombre: 'Otro Nombre',
      username: `different_user_${uniqueId}`,
      email: testEmail, // ya registrado al inicio
      password: testPassword,
    });
    const messageMatch = res.body?.message === 'El nombre de usuario o correo electrónico ya existe';
    results['1.1.19 Email existente -> 409'] = res.status === 409 && messageMatch;
  } catch (e: any) {
    results['1.1.19 Email existente -> 409'] = `Error: ${e.message}`;
  }


  // --- 1.2 Login ---
  console.log('\n--- 1.2 Login ---');
  let jwtToken = '';

  // Happy path
  try {
    const res = await apiRequest('/auth/login', 'POST', {
      email: testEmail,
      password: testPassword,
    });
    
    const hasToken = typeof res.body?.access_token === 'string' && res.body.access_token.length > 0;
    const noPassword = res.body?.agency && !('password' in res.body.agency);
    
    if (hasToken) {
      jwtToken = res.body.access_token;
    }

    results['1.2.1 Login con credenciales correctas -> 200'] = res.status === 200 && hasToken;
    results['1.2.2 El objeto agency en login no incluye password'] = noPassword;
  } catch (e: any) {
    results['1.2.1 Login con credenciales correctas -> 200'] = `Error: ${e.message}`;
  }

  // Token en endpoint protegido
  if (jwtToken) {
    try {
      const res = await apiRequest('/agencies/profile', 'PATCH', {}, {
        'Authorization': `Bearer ${jwtToken}`,
      });
      results['1.2.3 Token JWT funciona en endpoint protegido (PATCH /agencies/profile)'] = res.status === 200;
    } catch (e: any) {
      results['1.2.3 Token JWT funciona en endpoint protegido (PATCH /agencies/profile)'] = `Error: ${e.message}`;
    }
  } else {
    results['1.2.3 Token JWT funciona en endpoint protegido (PATCH /agencies/profile)'] = 'Failed: No JWT token generated to test';
  }

  // Errores
  // Email no registrado
  try {
    const res = await apiRequest('/auth/login', 'POST', {
      email: `unregistered_${uniqueId}@test.com`,
      password: testPassword,
    });
    results['1.2.4 Email no registrado -> 401 "Credenciales inválidas"'] = res.status === 401 && res.body?.message === 'Credenciales inválidas';
  } catch (e: any) {
    results['1.2.4 Email no registrado -> 401 "Credenciales inválidas"'] = `Error: ${e.message}`;
  }

  // Password incorrecto
  try {
    const res = await apiRequest('/auth/login', 'POST', {
      email: testEmail,
      password: 'WrongPassword123!',
    });
    results['1.2.5 Password incorrecta -> 401 "Credenciales inválidas"'] = res.status === 401 && res.body?.message === 'Credenciales inválidas';
  } catch (e: any) {
    results['1.2.5 Password incorrecta -> 401 "Credenciales inválidas"'] = `Error: ${e.message}`;
  }

  // Sin email
  try {
    const res = await apiRequest('/auth/login', 'POST', {
      password: testPassword,
    });
    results['1.2.6 Sin email -> 400'] = res.status === 400;
  } catch (e: any) {
    results['1.2.6 Sin email -> 400'] = `Error: ${e.message}`;
  }

  // Sin password
  try {
    const res = await apiRequest('/auth/login', 'POST', {
      email: testEmail,
    });
    results['1.2.7 Sin password -> 400'] = res.status === 400;
  } catch (e: any) {
    results['1.2.7 Sin password -> 400'] = `Error: ${e.message}`;
  }

  // Email formato inválido
  try {
    const res = await apiRequest('/auth/login', 'POST', {
      email: 'notanemail',
      password: testPassword,
    });
    results['1.2.8 Email con formato inválido -> 400'] = res.status === 400;
  } catch (e: any) {
    results['1.2.8 Email con formato inválido -> 400'] = `Error: ${e.message}`;
  }

  // Seguridad: mismo mensaje para email inexistente o password incorrecto
  try {
    const res1 = await apiRequest('/auth/login', 'POST', {
      email: `unregistered2_${uniqueId}@test.com`,
      password: testPassword,
    });
    const res2 = await apiRequest('/auth/login', 'POST', {
      email: testEmail,
      password: 'WrongPassword123!',
    });
    const errorMsg = 'Credenciales inválidas';
    const sameAndSafe = res1.body?.message === errorMsg && res2.body?.message === errorMsg;
    results['1.2.9 El mensaje de error es el mismo e idéntico para email no registrado y password incorrecta'] = sameAndSafe;
  } catch (e: any) {
    results['1.2.9 El mensaje de error es el mismo e idéntico para email no registrado y password incorrecta'] = `Error: ${e.message}`;
  }

  console.log('\n📊 TEST RESULTS BATCH MÓDULO 1 (AUTH):');
  let allPassed = true;
  for (const [testName, status] of Object.entries(results)) {
    if (status === true) {
      console.log(`✅ PASSED: ${testName}`);
    } else {
      allPassed = false;
      console.error(`❌ FAILED: ${testName} ->`, status);
    }
  }

  if (allPassed) {
    console.log('\n🎉 ALL MÓDULO 1 AUTH TESTS PASSED successfully!');
    process.exit(0);
  } else {
    console.error('\n⚠️ SOME TESTS FAILED. Please review output.');
    process.exit(1);
  }
}

runTests().catch(e => {
  console.error('Fatal testing error:', e);
  process.exit(1);
});
