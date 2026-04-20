package com.senati.ferreteria.controller;

import com.senati.ferreteria.entity.ProductoDefectuoso;
import com.senati.ferreteria.service.ProductoDefectuosoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/productos-defectuosos")
@CrossOrigin(origins = "*")

public class ProductoDefectuosoController {

    private final ProductoDefectuosoService productoDefectuosoService;

    public ProductoDefectuosoController(ProductoDefectuosoService productoDefectuosoService) {
        this.productoDefectuosoService = productoDefectuosoService;
    }

    @GetMapping
    public List<ProductoDefectuoso> listar() {
        return productoDefectuosoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ProductoDefectuoso obtenerPorId(@PathVariable Integer id) {
        return productoDefectuosoService.obtenerPorId(id);
    }

    @GetMapping("/producto/{idProducto}")
    public List<ProductoDefectuoso> listarPorProducto(@PathVariable Integer idProducto) {
        return productoDefectuosoService.listarPorProducto(idProducto);
    }

    @PostMapping
    public ProductoDefectuoso crear(@RequestBody ProductoDefectuoso productoDefectuoso) {
        return productoDefectuosoService.guardar(productoDefectuoso);
    }

    @PutMapping("/{id}")
    public ProductoDefectuoso actualizar(@PathVariable Integer id, @RequestBody ProductoDefectuoso productoDefectuoso) {
        return productoDefectuosoService.actualizar(id, productoDefectuoso);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        productoDefectuosoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}