package com.example.msproduct.controller;

import com.example.msproduct.entity.Product;
import com.example.msproduct.service.ProductService;
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
    public ResponseEntity<Product> findById(@PathVariable(required = true) Integer id){
        return ResponseEntity.ok().body(productService.listarPorId(id).get());
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
    public String delete(@PathVariable(required = true) Integer id){
        productService.eliminar(id);
        return "eliminacion correcta";
    }
}
