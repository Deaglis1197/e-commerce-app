package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.Purschase;
import com.luv2code.ecommerce.dto.PurschaseResponse;
import com.luv2code.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private CheckoutService checkoutService;
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService=checkoutService;
    }
    @PostMapping("/purchase")
    public PurschaseResponse placeOrder(@RequestBody Purschase purschase){

        PurschaseResponse purschaseResponse=checkoutService.placeOrder(purschase);
        return purschaseResponse;
    }
}
