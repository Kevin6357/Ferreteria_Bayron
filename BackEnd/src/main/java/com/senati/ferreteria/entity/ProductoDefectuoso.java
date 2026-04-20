package com.senati.ferreteria.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "productos_defectuosos")
public class ProductoDefectuoso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_defecto")
    private Integer idDefecto;

    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = true)
    private Producto producto;

    @Column(length = 100)
    private String motivo;

    public ProductoDefectuoso() {}

    public ProductoDefectuoso(Integer idDefecto, Producto producto, String motivo) {
        this.idDefecto = idDefecto;
        this.producto = producto;
        this.motivo = motivo;
    }

    public Integer getIdDefecto() {
        return idDefecto;
    }

    public void setIdDefecto(Integer idDefecto) {
        this.idDefecto = idDefecto;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}