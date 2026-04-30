## TRELLO
Más info en [mi tablero de trello](https://trello.com/invite/b/69a1f855ef397664559d6c61/ATTIb76ef655945bc2780535a61956e18cd720F56000/ferreteria-bayron)
![TRELLO](https://github.com/Kevin6357/Ferreteria_Bayron/blob/a65f2edaee9a97e385b0895dd7b36b57ceea333c/Captura%20de%20pantalla%202026-04-20%20222502.png)

---
# Sistema de Inventario Ferreteria Bayron
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
[mi Figma](https://www.figma.com/design/3EuyqtLwialC0nAuCtEWnA/from_Ferreteria_Bayron?node-id=0-1&t=18cHMgqTxoqX28Rx-1)

## Base de datos
 
El sistema cuenta con 2 tablas principales:
 
| Tabla | Descripcion |
|---|---|
| COBRADOR | Personas encargadas de gestionar y cobrar los prestamos |
| CLIENTE | Personas que solicitan el prestamo |
| PRESTAMO | Registro de cada prestamo otorgado |
| COBRO | Registro de cada pago diario realizado |

### Diagrama Entidad-Relacion (DER)
![Diagrama Entidad Relacion]<img width="561" height="309" alt="image" src="https://github.com/user-attachments/assets/35240e5b-395f-4be2-9883-dc0ce58154b9" />

 
### Modelo Relacional (MR)
![Modelo Relacional]<img width="578" height="358" alt="image" src="https://github.com/user-attachments/assets/5f168264-2cef-42b0-a39e-2470de73fea3" />

### Cardinalidades
PRODUCTO — PRODUCTO_DEFECTUOSO (1:N) <br>
Un producto puede tener varios registros de defectos, pero un producto defectuoso pertenece a un solo producto. <br>
PRODUCTO — ALERTA_STOCK (1:N) <br>
Un cliente puede solicitar muchos prestamos, pero un prestamo pertenece a un solo cliente. <br>
Un producto puede generar múltiples alertas de stock, pero cada alerta corresponde a un solo producto.

| Entidad A | Relacion | Entidad B | Cardinalidad |
|---|---|---|---|
| PRODUCTO  | presenta | PRODUCTO_DEFECTUOSO | 1:N |
| PRODUCTO | genera | ALERTA_STOCK | 1:N |


### Base de datos
 
El sistema cuenta con 2 tablas principales:

```sql
CREATE DATABASE ferreteria_bayron;

USE ferreteria_bayron;


CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    stock INT NOT NULL,
    estado VARCHAR(20) DEFAULT 'disponible'
);

CREATE TABLE productos_defectuosos (
    id_defecto INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    motivo VARCHAR(100),
    FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
        ON DELETE CASCADE
);


INSERT INTO productos (nombre, stock, estado) VALUES
('Taladro percutor inalámbrico', 12, 'disponible'),
('Juego de llaves mixtas 11 piezas', 8, 'disponible'),
('Sierra caladora', 5, 'disponible'),
('Pistola de silicona caliente', 20, 'disponible'),
('Cincel para concreto 3/4', 30, 'disponible'),
('Lima para metal triangular', 15, 'disponible'),
('Caja organizadora de herramientas', 10, 'disponible'),
('Nivel láser autónivelante', 4, 'disponible'),
('Remachadora manual', 18, 'disponible'),
('Escuadra de precisión 12"', 25, 'disponible'),
('Grapadora eléctrica', 7, 'disponible'),
('Máscara de soldar automática', 6, 'disponible'),
('Carretilla de jardín 80L', 3, 'disponible'),
('Cepillo eléctrico para madera', 9, 'disponible'),
('Lijadora orbital', 11, 'disponible');


INSERT INTO productos_defectuosos (id_producto, motivo) VALUES
(1, 'Mango roto'),
(2, 'Punta despuntada'),
(3, 'Motor sobrecalentado'),
(4, 'Hoja doblada'),
(5, 'Engranaje desgastado'),
(6, 'Cinta rasgada'),
(7, 'Resorte sin fuerza'),
(8, 'Disco de corte descentrado'),
(9, 'Llave faltante en el juego'),
(10, 'Envase con fuga'),
(11, 'Batería no retiene carga'),
(12, 'Llave 10mm falta en el juego'),
(13, 'Hoja de sierra doblada'),
(14, 'Pistola no calienta uniformemente'),
(15, 'Lijadora con rodamiento ruidoso');

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
 
