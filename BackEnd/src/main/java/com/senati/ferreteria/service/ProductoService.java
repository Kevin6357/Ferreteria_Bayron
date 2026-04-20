package com.senati.ferreteria.service;

import com.senati.ferreteria.entity.Producto;
import com.senati.ferreteria.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    public Producto obtenerPorId(Integer id) {
        return productoRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));
    }

    public Producto guardar(Producto producto) {
        if (producto.getEstado() == null || producto.getEstado().isEmpty()) {
            producto.setEstado("disponible");
        }
        return productoRepository.save(producto);
    }

    public Producto actualizar(Integer id, Producto productoActualizado) {
        Producto productoExistente = obtenerPorId(id);
        productoExistente.setNombre(productoActualizado.getNombre());
        productoExistente.setStock(productoActualizado.getStock());
        productoExistente.setEstado(productoActualizado.getEstado());
        return productoRepository.save(productoExistente);
    }

    // DELETE - Elimina el producto por ID (versión recomendada)
    public void eliminar(Integer id) {
        productoRepository.deleteById(id);
    }
}