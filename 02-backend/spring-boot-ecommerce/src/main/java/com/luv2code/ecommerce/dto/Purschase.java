package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.*;
import lombok.Data;

import java.util.Set;

@Data
public class Purschase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
