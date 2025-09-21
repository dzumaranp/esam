 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a//dev/null b/script.js
index 0000000000000000000000000000000000000000..e62b02f84eed06949aebda3c980fd46af039eb3f 100644
--- a//dev/null
+++ b/script.js
@@ -0,0 +1,78 @@
+const tabLinks = document.querySelectorAll('.tab-link');
+const tabSections = document.querySelectorAll('.tab-section');
+const yearSpan = document.getElementById('year');
+const form = document.getElementById('verificacion-form');
+const resultado = document.getElementById('resultado');
+
+const certificadosValidos = {
+    'ESAM-2024-001': {
+        nombre: 'María Fernanda López',
+        curso: 'Gestión Integral de Residuos Sólidos',
+        fecha: '12 de enero de 2024'
+    },
+    'ESAM-2024-014': {
+        nombre: 'Carlos Huamán',
+        curso: 'Prevención de Riesgos Laborales',
+        fecha: '28 de marzo de 2024'
+    },
+    'ESAM-2023-087': {
+        nombre: 'Lucía Rojas',
+        curso: 'Valores Máximos Admisibles en Aguas Residuales',
+        fecha: '9 de noviembre de 2023'
+    }
+};
+
+tabLinks.forEach((link) => {
+    link.addEventListener('click', () => {
+        const targetId = link.dataset.target;
+
+        tabLinks.forEach((item) => item.classList.remove('active'));
+        link.classList.add('active');
+
+        tabSections.forEach((section) => {
+            if (section.id === targetId) {
+                section.classList.add('active');
+                section.setAttribute('tabindex', '-1');
+                section.focus({ preventScroll: false });
+            } else {
+                section.classList.remove('active');
+                section.removeAttribute('tabindex');
+            }
+        });
+    });
+});
+
+if (yearSpan) {
+    yearSpan.textContent = new Date().getFullYear();
+}
+
+if (form) {
+    form.addEventListener('submit', (event) => {
+        event.preventDefault();
+        const codigo = form.codigo.value.trim().toUpperCase();
+
+        if (!codigo) {
+            mostrarResultado('Por favor ingresa un código de verificación.', false);
+            return;
+        }
+
+        const certificado = certificadosValidos[codigo];
+
+        if (certificado) {
+            const mensaje = `✅ Código válido. ${certificado.nombre} completó el curso "${certificado.curso}" el ${certificado.fecha}.`;
+            mostrarResultado(mensaje, true);
+        } else {
+            mostrarResultado('❌ No encontramos un certificado con ese código. Revisa el dato e inténtalo nuevamente o contáctanos.', false);
+        }
+
+        form.reset();
+        form.codigo.focus();
+    });
+}
+
+function mostrarResultado(mensaje, esValido) {
+    resultado.textContent = mensaje;
+    resultado.classList.remove('ok', 'error');
+    resultado.classList.add(esValido ? 'ok' : 'error');
+    resultado.style.display = 'block';
+}
 
EOF
)