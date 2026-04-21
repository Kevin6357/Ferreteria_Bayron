## TRELLO
Más info en [mi tablero de trello](https://trello.com/b/4lC3J8oT/java-proyecto-senati)
![TRELLO](https://github.com/Kevin6357/Ferreteria_Bayron/blob/a65f2edaee9a97e385b0895dd7b36b57ceea333c/Captura%20de%20pantalla%202026-04-20%20222502.png)

---
# Sistema de Préstamos Gota a Gota
Sistema web para la gestión de préstamos a crédito con facilidades de pago diario, semanal y mensual. Desarrollado como proyecto final del curso de Java Web en SENATI.

## Descripcion del negocio
Nombre: Prestamos Gota a Gota <br>
Giro: Financiera informal de creditos personales <br>
Tamaño: Pequeña empresa, operacion individual o familiar <br>
Contexto: Negocio muy comun en el Peru donde un cobrador otorga prestamos pequeños a personas que no acceden a bancos, cobrando cuotas diarias, semanales o mensuales visitando al cliente en su domicilio o trabajo. <br>
Justificacion: Se necesita un sistema digital para reemplazar el cuaderno manual del cobrador, evitar errores y tener un control claro de cada prestamo y cobro.

## Identificar el problema y solución
Problema: El cobrador lleva el registro de prestamos y cobros en un cuaderno o en papel, lo que genera errores, perdida de informacion, dificultad para saber cuanto debe cada cliente y cuantas cuotas faltan. <br>
Solucion tecnologica: Desarrollar un sistema web con Java Spring Boot y MySQL que permita registrar clientes, prestamos y cobros diarios, mostrando en todo momento el estado de cada prestamo y el historial de pagos.

 
## Requerimientos Funcionales
| Codigo | Descripcion |
|---|---|
| RF01 | El sistema debe permitir registrar un nuevo cliente con nombre, apellido, DNI, telefono y direccion |
| RF02 | El sistema debe permitir registrar un nuevo prestamo indicando monto total, cuota, numero de cuotas y fecha de inicio |
| RF03 | El sistema debe permitir registrar el cobro diario de un cliente asociado a su prestamo |
| RF04 | El sistema debe mostrar el listado de todos los clientes con su estado de deuda |
| RF05 | El sistema debe mostrar el historial de cobros realizados por prestamo |
 
## Requerimientos No Funcionales
 
| Codigo | Tipo | Descripcion |
|---|---|---|
| RNF01 | Rendimiento | El sistema debe cargar cada pantalla en menos de 3 segundos |
| RNF02 | Usabilidad | La interfaz debe ser intuitiva y facil de usar sin necesidad de capacitacion previa |
| RNF03 | Seguridad | Solo usuarios autorizados podran acceder al sistema mediante usuario y contraseña |

## Stack completo
1. Trello             = Gestión del proyecto (Kanban)
2. Draw.io            = Diagrama ER + Diagrama de Clases
3. Figma              = Wireframe + Diseño UI/UX
4. MySQL Workbench    = Diseñar y administrar BD
5. IntelliJ           = Frontend (HTML,CSS,JS) + Backend (Spring Boot)
6. XAMPP              = Servidor Tomcat para correr la app

## Tecnologias utilizadas
- Java 17
- Spring Boot 3
- MySQL 8
- HTML5, CSS3, JavaScript
- IntelliJ IDEA
- XAMPP (Tomcat)
- MySQL Workbench
- Figma (diseño UI/UX)
- Draw.io (diagramas)
---
 
## Estructura del proyecto
 
```
JavaWeb-GotaGota/
├── backend/          → Spring Boot (Java)
│   ├── src/
│   ├── pom.xml
│   └── ...
├── frontend/         → HTML, CSS, JS
│   ├── css/
│   ├── js/
│   └── index.html
```
 
---

### DIAGRAMA DE FIGMA UI/UX
![FIGMA](https://www.figma.com/design/BXoCcKRR9FjiXnO5TxFhuK/Proyecto-Senati?node-id=1-7&t=OXx4vC4zMc8uVobf-1)

## Base de datos
 
El sistema cuenta con 4 tablas principales:
 
| Tabla | Descripcion |
|---|---|
| COBRADOR | Personas encargadas de gestionar y cobrar los prestamos |
| CLIENTE | Personas que solicitan el prestamo |
| PRESTAMO | Registro de cada prestamo otorgado |
| COBRO | Registro de cada pago diario realizado |

### Diagrama Entidad-Relacion (DER)
![Diagrama Entidad Relacion](https://github.com/ojitoslanda/testing/blob/master/img/javaweb/Diagrama_Entidad_Relacion.png)
 
### Modelo Relacional (MR)
![Modelo Relacional](https://github.com/ojitoslanda/testing/blob/master/img/javaweb/Modelo_Relacional.png)

### Cardinalidades
COBRADOR — PRESTAMO (1:N) <br>
Un cobrador puede gestionar muchos prestamos, pero un prestamo es gestionado por un solo cobrador. <br>
CLIENTE — PRESTAMO (1:N) <br>
Un cliente puede solicitar muchos prestamos, pero un prestamo pertenece a un solo cliente. <br>
PRESTAMO — COBRO (1:N) <br>
Un prestamo puede generar muchos cobros, pero un cobro pertenece a un solo prestamo.

| Entidad A | Relacion | Entidad B | Cardinalidad |
|---|---|---|---|
| COBRADOR | gestiona | PRESTAMO | 1:N |
| CLIENTE | solicita | PRESTAMO | 1:N |
| PRESTAMO | genera | COBRO | 1:N |


### Base de datos
 
El sistema cuenta con 4 tablas principales:

```sql
CREATE DATABASE IF NOT EXISTS gota_a_gota;
USE gota_a_gota;

CREATE TABLE cobrador (
    cobrador_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(100)
);

CREATE TABLE cliente (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(8) NOT NULL UNIQUE,
    telefono VARCHAR(15),
    direccion VARCHAR(255)
);

CREATE TABLE prestamo (
    prestamo_id INT AUTO_INCREMENT PRIMARY KEY,
    cobrador_id INT NOT NULL,
    cliente_id INT NOT NULL,
    monto_total DECIMAL(10,2) NOT NULL,
    monto_cuota DECIMAL(10,2) NOT NULL,
    num_cuotas INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    estado ENUM('activo', 'pagado') DEFAULT 'activo',
    FOREIGN KEY (cobrador_id) REFERENCES cobrador(cobrador_id),
    FOREIGN KEY (cliente_id) REFERENCES cliente(cliente_id)
);

CREATE TABLE cobro (
    cobro_id INT AUTO_INCREMENT PRIMARY KEY,
    prestamo_id INT NOT NULL,
    fecha_cobro DATE NOT NULL,
    monto_cobrado DECIMAL(10,2) NOT NULL,
    estado ENUM('pagado', 'pendiente') DEFAULT 'pendiente',
    FOREIGN KEY (prestamo_id) REFERENCES prestamo(prestamo_id)
);


INSERT INTO cliente (nombre, apellido, dni, telefono, direccion) VALUES
('Juan', 'Perez', '12345678', '961234567', 'Jr. Inmaculada 123, Pucallpa'),
('Maria', 'Garcia', '23456789', '962345678', 'Av. Centenario 456, Pucallpa'),
('Carlos', 'Lopez', '34567890', '963456789', 'Jr. Ucayali 789, Pucallpa'),
('Rosa', 'Martinez', '45678901', '964567890', 'Av. Tupac Amaru 321, Pucallpa'),
('Pedro', 'Sanchez', '56789012', '965678901', 'Jr. 7 de Junio 654, Pucallpa'),
('Ana', 'Torres', '67890123', '966789012', 'Av. Yarinacocha 987, Pucallpa'),
('Luis', 'Flores', '78901234', '967890123', 'Jr. Progreso 147, Pucallpa'),
('Carmen', 'Ramirez', '89012345', '968901234', 'Av. Sáenz Peña 258, Pucallpa'),
('Jorge', 'Diaz', '90123456', '969012345', 'Jr. Coronel Portillo 369, Pucallpa'),
('Sandra', 'Vega', '01234567', '960123456', 'Av. Nueva Requena 741, Pucallpa');


```

---
 
## Como correr el proyecto
 
### Requisitos previos
- Tener instalado IntelliJ IDEA
- Tener instalado XAMPP (para MySQL)
- Tener instalado MySQL Workbench
- Tener instalado JDK 21 o superior
 
### Backend
1. Abrir la carpeta `backend/` en IntelliJ IDEA
2. Configurar `application.properties` con los datos de MySQL
3. Iniciar XAMPP y activar MySQL
4. Ejecutar `GotagotaApplication.java`
5. El backend corre en: `http://localhost:8080`
 
### Frontend
1. Abrir la carpeta `frontend/` en VsCode
2. Abrir `index.html` con Live Server
3. El frontend se comunica con el backend via fetch()
 
> El frontend y el backend corren por separado.
> El backend debe estar iniciado antes de abrir el frontend.
 
### Configuracion de base de datos
```
spring.application.name=gotagota
# CONEXION A MYSQL
spring.datasource.url=jdbc:mysql://localhost:3306/gota_a_gota
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

#JPA / HIBERNATE
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Puerto del servidor
server.port=8080

```
 
