package com.example.mspedido.controller;

import com.example.mscatalogo.entity.Category;
import com.example.mscatalogo.service.CategoryService;
import com.example.mspedido.entity.Order;
import com.example.mspedido.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Category")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping()
    public ResponseEntity<List<Order>> list(){
        return ResponseEntity.ok().body(orderService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> listById(@PathVariable(required = true)Integer id){
        return ResponseEntity.ok().body(orderService.findById(id).get());
    }

    @PostMapping()
    public ResponseEntity<Order> save(@RequestBody Order order){
        return ResponseEntity.ok().body(orderService.save(order));
    }

    @PutMapping()
    public ResponseEntity<Order> update(@RequestBody Order order){
        return ResponseEntity.ok().body(orderService.save(order));
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable(required = true)Integer id){
        orderService.delete(id);
        return "elminacion correcta";
    }
}