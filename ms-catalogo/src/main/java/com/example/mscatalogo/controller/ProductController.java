package com.example.mscatalogo.controller;

import com.example.mscatalogo.entity.Category;
import com.example.mscatalogo.entity.Product;
import com.example.mscatalogo.service.CategoryService;
import com.example.mscatalogo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping()
    public ResponseEntity<List<Product>> list(){
        return ResponseEntity.ok().body(productService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> listById(@PathVariable(required = true)Integer id){
        return ResponseEntity.ok().body(productService.buscarPorId(id).get());
    }

    @PostMapping()
    public ResponseEntity<Product> save(@RequestBody Product product){
        return ResponseEntity.ok().body(productService.guardar(product));
    }

    @PutMapping()
    public ResponseEntity<Product> update(@RequestBody Product product){
        return ResponseEntity.ok().body(productService.actualizar(product));
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable(required = true)Integer id){
        productService.eliminarPorId(id);
        return "elminacion correcta";
    }
}