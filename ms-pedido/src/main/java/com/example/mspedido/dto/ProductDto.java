package com.example.mspedido.dto;

import lombok.Data;

@Data
public class ProductDto {
    private Integer id;
    private String nombre;
    private String descripcion;
    private String code;
    private CategoryDto category;
}
