package com.senati.ferreteria.repository;

import com.senati.ferreteria.entity.ProductoDefectuoso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoDefectuosoRepository extends JpaRepository<ProductoDefectuoso, Integer> {

}