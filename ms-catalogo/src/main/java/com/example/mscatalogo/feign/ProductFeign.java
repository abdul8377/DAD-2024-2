package com.example.mscatalogo.feign;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "ms-catalogo-service", path = "/Productos")
public class ProductFeign {
    @PutMapping("/{productId}/reduce-stock")
    public ResponseEntity<Void> reduceStock(@PathVariable("productId") Integer productId, @RequestParam Integer amount);
}
