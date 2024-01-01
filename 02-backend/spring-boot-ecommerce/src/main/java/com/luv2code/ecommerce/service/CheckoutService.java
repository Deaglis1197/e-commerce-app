package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.Purschase;
import com.luv2code.ecommerce.dto.PurschaseResponse;

public interface CheckoutService {
    PurschaseResponse placeOrder(Purschase purschase);
}
