## TRELLO
Más info en [mi tablero de trello](https://trello.com/invite/b/69a1f855ef397664559d6c61/ATTIb76ef655945bc2780535a61956e18cd720F56000/ferreteria-bayron)
![TRELLO](https://github.com/Kevin6357/Ferreteria_Bayron/blob/a65f2edaee9a97e385b0895dd7b36b57ceea333c/Captura%20de%20pantalla%202026-04-20%20222502.png)

---
# Sistema de Inventario
Sistema web para la gestión de Venta de herramientas, materiales de construcción y productos de mantenimiento.

## Descripcion del negocio
Nombre: Ferretería Bayron  <br>
Giro: Venta de herramientas, materiales de construcción y artículos de ferretería. <br>
Tamaño: Pequeña empresa, operación individual o familiar. <br>
Contexto: Negocio común en el Perú dedicado a la comercialización de productos como herramientas manuales, eléctricas, materiales de construcción y accesorios. La gestión del inventario, ventas y control de productos defectuosos suele realizarse de forma manual o con registros básicos, lo que puede generar desorden o pérdidas de información. <br>
Justificacion: Se requiere un sistema digital que permita gestionar el inventario, registrar productos defectuosos, controlar el stock y facilitar el seguimiento de ventas, reduciendo errores y mejorando la organización del negocio.

## Identificar el problema y solución
Problema:Se requiere un sistema digital que permita gestionar el inventario, registrar productos defectuosos, controlar el stock y facilitar el seguimiento de ventas, reduciendo errores y mejorando la organización del negocio. <br>
Solucion tecnologica: Para mejorar esta situación, se propone desarrollar un sistema de gestión de inventario que permita tener un mejor control de los productos. 
Este sistema ayudará a identificar fácilmente los productos defectuosos para evitar su venta, avisar cuando un producto esté por agotarse y detectar aquellos que tienen exceso de stock. 
De esta manera, la empresa podrá organizar mejor su inventario, tomar decisiones más acertadas y trabajar de forma más ordenada y eficiente. 


 
## Requerimientos Funcionales
| Codigo | Descripcion |
|---|---|
| DEFECTO  | Registrar productos defectuosos y bloquear su venta  |
| STOCK  | Detectar productos con bajo stock  |
| ALERTA | Generar alertas cuando el producto esté por agotarse  |
| SOBRESTOCK  | Identificar productos con exceso de inventario   |
| CONSULTA | Permitir visualizar el estado del inventario  |
| CONTROL  | Gestionar correctamente los productos disponibles |

## Requerimientos No Funcionales
 
| Codigo | Tipo | Descripcion |
|---|---|---|
| USABLE | Rendimiento | El sistema debe ser fácil de usar  |
| RAPIDO | Usabilidad | El sistema debe responder rápidamente |
| SEGURO | Seguridad | Debe proteger la información  |
| DISPONIBLE | Rendimiento | Debe estar disponible en horario laboral |
| ESCALABLE | Rendimiento | Debe permitir futuras mejoras |

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
├── backend/         
│   ├── src/                  → Spring Boot (Java)
│   ├── pom.xml
│   └── ...
├── frontend/         
│   ├── css/
│   ├── js/
|   ├── defectuoso.html        → HTML, CSS, JS
│   ├── index.html
|   └── stock.html
```
 
---

### DIAGRAMA DE FIGMA UI/UX
![FIGMA](https://www.figma.com/design/3EuyqtLwialC0nAuCtEWnA/from_Ferreteria_Bayron?node-id=0-1&t=18cHMgqTxoqX28Rx-1)

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
 
