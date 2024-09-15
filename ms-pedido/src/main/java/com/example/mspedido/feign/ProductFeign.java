package com.example.mspedido.feign;

import com.example.mspedido.dto.ProductDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-catalogo-service", path = "/Product")

public interface ProductFeign {

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> listById(@PathVariable(required = true)Integer id);

}
