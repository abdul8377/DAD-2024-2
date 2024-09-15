package com.example.mspedido.feign;

import com.example.mspedido.dto.ClientDto;
import com.example.mspedido.dto.ProductDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-client-service", path = "/Client")
public interface ClientFeign {
    @GetMapping("/{id}")
    public ResponseEntity<ClientDto> listById(@PathVariable Integer id);

}
