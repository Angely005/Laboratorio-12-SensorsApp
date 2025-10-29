# 📱 Laboratorio Semana 13 - Acceso a Sensores del Dispositivo

Este laboratorio tiene como objetivo desarrollar una aplicación móvil en **React Native con Expo** que acceda a los sensores del dispositivo: **GPS** y **acelerómetro**. El estudiante aprenderá a solicitar permisos, capturar datos sensoriales en tiempo real y visualizar resultados dinámicos en pantalla.

---

## 🧩 Estructura del Proyecto

A continuación se muestra la estructura base del proyecto `SensorsApp` creada con `create-expo-app`. Se incluyen las carpetas y archivos principales:

---
<img width="372" height="320" alt="image" src="https://github.com/user-attachments/assets/86908005-4dec-469a-9383-3bcdd149b37b" />

---
## 🛠️ Archivo Modificado: App.js

El archivo `App.js` fue modificado para incluir:

- Solicitud de permisos GPS
- Lectura de ubicación actual (latitud, longitud, velocidad)
- Lectura del acelerómetro (x, y, z)
- Detección de sacudidas
- Fecha y hora de la última lectura
- Historial de las últimas 5 lecturas
- Visualización en mapa con `react-native-maps`
- Botón para actualizar datos
- Almacenamiento de última ubicación con `AsyncStorage`
- Cálculo de distancia recorrida

<img width="721" height="889" alt="image" src="https://github.com/user-attachments/assets/66b3bd23-cdd3-4c4c-9e0a-ed5d9912c633" />

---
<img width="705" height="893" alt="image" src="https://github.com/user-attachments/assets/e426be4c-115b-4d47-b8e7-70008476ee88" />

---
<img width="759" height="806" alt="image" src="https://github.com/user-attachments/assets/315114c6-8b03-4885-8fa4-19e839474795" />

---

## 🚀 Funcionamiento de la App

Al ejecutar la aplicación en el emulador, se espera observar:

1. ✅ Permiso de GPS concedido
2. ✅ Lectura visible de coordenadas (latitud / longitud / velocidad)
3. ✅ Lectura dinámica del acelerómetro
4. ✅ Reacción visual al detectar movimiento brusco
5. ✅ Mapa con marcador de ubicación actual
6. ✅ Botón funcional para actualizar datos
7. ✅ Historial de movimiento visible
8. ✅ Distancia recorrida acumulada
---
<img width="723" height="1600" alt="image" src="https://github.com/user-attachments/assets/687284a8-4424-4373-ad01-0f6d431b187a" />

---
<img width="723" height="1600" alt="image" src="https://github.com/user-attachments/assets/e9a8a0a0-2e69-4883-ace1-fcd85325ed2b" />

---
<img width="723" height="1600" alt="image" src="https://github.com/user-attachments/assets/c8a75cbb-495d-44e4-bd83-437a3495d200" />

---
<img width="723" height="1600" alt="image" src="https://github.com/user-attachments/assets/9aef3984-6e6c-4ffb-b44f-b93ddc7c76ea" />

---
