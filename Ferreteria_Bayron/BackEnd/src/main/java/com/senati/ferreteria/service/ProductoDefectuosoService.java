package com.senati.ferreteria.service;

import com.senati.ferreteria.entity.Producto;
import com.senati.ferreteria.entity.ProductoDefectuoso;
import com.senati.ferreteria.repository.ProductoDefectuosoRepository;
import com.senati.ferreteria.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoDefectuosoService {

    private final ProductoDefectuosoRepository productoDefectuosoRepository;
    private final ProductoRepository productoRepository;

    public ProductoDefectuosoService(ProductoDefectuosoRepository productoDefectuosoRepository, ProductoRepository productoRepository) {
        this.productoDefectuosoRepository = productoDefectuosoRepository;
        this.productoRepository = productoRepository;
    }

    public List<ProductoDefectuoso> listarTodos() {
        return productoDefectuosoRepository.findAll();
    }

    public ProductoDefectuoso obtenerPorId(Integer id) {
        return productoDefectuosoRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto defectuoso no encontrado con ID: " + id));
    }

    public List<ProductoDefectuoso> listarPorProducto(Integer idProducto) {
        Producto producto = productoRepository.findById(idProducto).orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + idProducto));
        return productoDefectuosoRepository.findAll().stream()
                .filter(defectuoso -> defectuoso.getProducto() != null && defectuoso.getProducto().getIdProducto().equals(idProducto))
                .toList();
    }

    public ProductoDefectuoso guardar(ProductoDefectuoso productoDefectuoso) {
        if (productoDefectuoso.getProducto() != null) {
            Producto producto = productoRepository.findById(productoDefectuoso.getProducto().getIdProducto())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado para asociar al defectuoso"));
            productoDefectuoso.setProducto(producto);
        }
        return productoDefectuosoRepository.save(productoDefectuoso);
    }

    public ProductoDefectuoso actualizar(Integer id, ProductoDefectuoso defectuosoActualizado) {
        ProductoDefectuoso defectuosoExistente = obtenerPorId(id);
        if (defectuosoActualizado.getProducto() != null) {
            Producto producto = productoRepository.findById(defectuosoActualizado.getProducto().getIdProducto())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            defectuosoExistente.setProducto(producto);
        }
        defectuosoExistente.setMotivo(defectuosoActualizado.getMotivo());
        return productoDefectuosoRepository.save(defectuosoExistente);
    }

    // DELETE - Elimina el producto defectuoso por ID
    public void eliminar(Integer id) {
        productoDefectuosoRepository.deleteById(id);
    }
}