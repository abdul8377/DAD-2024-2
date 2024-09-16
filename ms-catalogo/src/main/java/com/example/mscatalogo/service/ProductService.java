package com.example.mscatalogo.service;

import com.example.mscatalogo.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    public List<Product> listar();
    public Optional<Product> buscarPorId(Integer id);
    public Product guardar(Product product);
    public Product actualizar(Product product);
    public void eliminarPorId(Integer id);
    void reduceStock(Integer productId, Integer amount);
}